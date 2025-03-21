import { Client, Databases, Storage, ID, Query } from 'node-appwrite';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default async ({ req, res, log, error }) => {
  try {
    // Parse request
    const { saleId } = JSON.parse(req.body);

    if (!saleId) {
      return res.json({
        success: false,
        message: 'Sale ID is required'
      }, 400);
    }

    log(`Generating download for sale: ${saleId}`);

    // Initialize Appwrite
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);
    const storage = new Storage(client);

    // Fetch all required data (same as preview function)
    const sale = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      'sales',
      saleId
    );

    const customer = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      'customers',
      sale.customer.$id
    );

    const saleItems = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      'sale-items',
      [Query.equal('saleId', saleId)]
    );

    const products = await Promise.all(
      saleItems.documents.map(item =>
        databases.getDocument(
          process.env.APPWRITE_DATABASE_ID,
          'products',
          item.productId
        )
      )
    );

    const saleData = {
      ...sale,
      customer,
      items: saleItems.documents.map((item, index) => ({
        ...item,
        product: products[index]
      }))
    };

    // Generate PDF
    const pdfBuffer = await generateInvoicePdf(saleData);

    // Upload to storage with download name
    const fileName = `invoice-${sale.invoiceNumber}.pdf`;
    const file = await storage.createFile(
      process.env.APPWRITE_INVOICES_BUCKET_ID,
      ID.unique(),
      pdfBuffer,
      fileName,
      ['role:all'],
      [`expire:${Date.now() + 3600000}`, `download:${fileName}`] // URL expires in 1 hour, force download
    );

    // Get download URL
    const downloadUrl = storage.getFileDownload(
      process.env.APPWRITE_INVOICES_BUCKET_ID,
      file.$id
    );

    return res.json({
      success: true,
      downloadUrl
    });

  } catch (err) {
    error(`Error generating invoice download: ${err.message}`);
    return res.json({
      success: false,
      message: 'Failed to generate invoice download',
      error: err.message
    }, 500);
  }
};

// Helper function to generate PDF (same as in preview function)
async function generateInvoicePdf(sale) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  // Company Info
  doc.setFontSize(20);
  doc.setTextColor(44, 62, 80);
  doc.text('INVOICE', pageWidth - 20, yPos, { align: 'right' });

  doc.setFontSize(12);
  doc.text(process.env.COMPANY_NAME, 20, yPos);
  doc.setFontSize(10);
  doc.text(process.env.COMPANY_ADDRESS, 20, yPos + 5);
  doc.text(process.env.COMPANY_PHONE, 20, yPos + 10);
  doc.text(process.env.COMPANY_EMAIL, 20, yPos + 15);

  yPos += 30;

  // Invoice Details
  doc.setFontSize(12);
  doc.text(`Invoice Number: ${sale.invoiceNumber}`, pageWidth - 20, yPos, { align: 'right' });
  doc.text(`Date: ${new Date(sale.date).toLocaleDateString()}`, pageWidth - 20, yPos + 7, { align: 'right' });

  yPos += 20;

  // Customer Info
  doc.setFillColor(241, 245, 249);
  doc.rect(20, yPos, pageWidth - 40, 25, 'F');

  doc.setFontSize(10);
  doc.text('Bill To:', 25, yPos + 7);
  doc.setFontSize(12);
  doc.text(sale.customer?.name || '', 25, yPos + 15);
  doc.setFontSize(10);
  doc.text(sale.customer?.email || '', 25, yPos + 22);

  yPos += 35;

  // Products Table
  const tableColumns = [
    { header: 'Product', dataKey: 'name' },
    { header: 'Quantity', dataKey: 'quantity' },
    { header: 'Price', dataKey: 'price' },
    { header: 'Total', dataKey: 'total' }
  ];

  const tableRows = sale.items.map(item => ({
    name: item.product?.name || 'Unknown Product',
    quantity: item.quantity,
    price: `$${(item.priceAtSale || item.product?.price || 0).toFixed(2)}`,
    total: `$${((item.quantity || 1) * (item.priceAtSale || item.product?.price || 0)).toFixed(2)}`
  }));

  doc.autoTable({
    head: [tableColumns.map(col => col.header)],
    body: tableRows,
    startY: yPos,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 5
    },
    headStyles: {
      fillColor: [44, 62, 80],
      textColor: [255, 255, 255]
    },
    columnStyles: {
      price: { halign: 'right' },
      total: { halign: 'right' }
    }
  });

  yPos = doc.lastAutoTable.finalY + 20;

  // Summary
  const subtotal = sale.subtotal || (sale.totalAmount / 1.1);
  const tax = sale.tax || (sale.totalAmount - subtotal);

  doc.setFontSize(10);
  doc.text('Subtotal:', pageWidth - 80, yPos);
  doc.text(`$${subtotal.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });

  doc.text('Tax (10%):', pageWidth - 80, yPos + 7);
  doc.text(`$${tax.toFixed(2)}`, pageWidth - 20, yPos + 7, { align: 'right' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', pageWidth - 80, yPos + 15);
  doc.text(`$${sale.totalAmount.toFixed(2)}`, pageWidth - 20, yPos + 15, { align: 'right' });

  // Payment Info
  yPos += 30;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Payment Status: ${sale.paymentStatus.toUpperCase()}`, 20, yPos);
  doc.text(`Payment Method: ${(sale.paymentMethod || 'Cash').toUpperCase()}`, 20, yPos + 7);

  // Footer
  doc.setFontSize(10);
  doc.text('Thank you for your business!', pageWidth / 2, doc.internal.pageSize.height - 20, { align: 'center' });

  return Buffer.from(doc.output('arraybuffer'));
}
