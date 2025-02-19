import { Client, Databases, Storage, ID, Query } from 'node-appwrite';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export default async ({ req, res, log, error }) => {
  try {
    // Parse request
    log('Parsing request body');
    let saleId;
    try {
      const body = JSON.parse(req.body);
      saleId = body.saleId;
      log(`Request parsed successfully, saleId: ${saleId}`);
    } catch (parseError) {
      log(`Failed to parse request body: ${parseError.message}`);
      return res.json({
        success: false,
        message: 'Invalid request format'
      }, 400);
    }

    if (!saleId) {
      log('Request missing required saleId parameter');
      return res.json({
        success: false,
        message: 'Sale ID is required'
      }, 400);
    }

    log(`Starting invoice generation for sale: ${saleId}`);
    log(`Using database: ${process.env.APPWRITE_DATABASE_ID}`);
    log(`Using bucket: ${process.env.APPWRITE_INVOICES_BUCKET_ID}`);

    // Initialize Appwrite
    log('Initializing Appwrite client');
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);
    const storage = new Storage(client);
    log('Appwrite client initialized successfully');

    // Fetch sale data
    log(`Fetching sale document with ID: ${saleId}`);
    let sale;
    try {
      sale = await databases.getDocument(
        process.env.APPWRITE_DATABASE_ID,
        'sales',
        saleId
      );
      log(`Sale fetched successfully: ${JSON.stringify(sale)}`);
    } catch (fetchError) {
      log(`Failed to fetch sale: ${fetchError.message}`);
      return res.json({
        success: false,
        message: `Failed to fetch sale: ${fetchError.message}`
      }, 404);
    }

    // Validate customer ID exists, handling different potential structures
    const customerId = sale.customer?.$id || sale.customerId || null;
    if (!customerId) {
      log(`Sale is missing customer information. Sale data: ${JSON.stringify(sale)}`);
      return res.json({
        success: false,
        message: 'Sale record is missing customer information'
      }, 400);
    }

    // Fetch customer
    log(`Fetching customer with ID: ${customerId}`);
    let customer;
    try {
      customer = await databases.getDocument(
        process.env.APPWRITE_DATABASE_ID,
        'customers',
        customerId
      );
      log(`Customer fetched successfully: ${JSON.stringify(customer)}`);
    } catch (customerError) {
      log(`Failed to fetch customer: ${customerError.message}`);
      // Continue without customer data instead of failing
      customer = { name: 'Unknown Customer', email: '', phone: '' };
      log('Using placeholder customer data to continue');
    }

    // Check if sale already contains products data
    let processedItems = [];
    if (Array.isArray(sale.products) && sale.products.length > 0) {
      log(`Using embedded products data from sale record. Count: ${sale.products.length}`);
      // Map the embedded products to a consistent format
      processedItems = sale.products.map(item => {
        const product = item.product || {};
        const productId = product.$id || product.id || 'unknown';
        const name = product.name || 'Unknown Product';
        const price = item.priceAtSale || product.price || 0;
        const quantity = item.quantity || 1;

        log(`Mapped embedded product: ${name}, ID: ${productId}, Price: ${price}, Qty: ${quantity}`);

        return {
          product: {
            $id: productId,
            name: name,
            price: price
          },
          quantity: quantity,
          priceAtSale: price
        };
      });
    } else {
      // Fetch sale items if not embedded
      log(`Fetching sale items for saleId: ${saleId}`);
      try {
        const saleItems = await databases.listDocuments(
          process.env.APPWRITE_DATABASE_ID,
          'sale-items',
          [Query.equal('saleId', saleId)]
        );
        log(`Sale items fetched successfully. Count: ${saleItems.documents.length}`);

        if (saleItems.documents.length === 0) {
          log('Warning: No sale items found for this sale');
          // Create a placeholder item to avoid empty invoice
          processedItems = [{
            product: {
              $id: 'placeholder',
              name: 'Sale Item',
              price: sale.totalAmount || 0
            },
            quantity: 1,
            priceAtSale: sale.totalAmount || 0
          }];
        } else {
          // Process sale items with productId
          for (const item of saleItems.documents) {
            try {
              const productId = item.product?.$id || item.productId;
              if (!productId) {
                log(`Item missing productId: ${JSON.stringify(item)}`);
                // Instead of skipping, add an "Unknown Product" entry
                processedItems.push({
                  product: {
                    $id: 'unknown',
                    name: 'Unknown Product',
                    price: item.priceAtSale || 0
                  },
                  quantity: item.quantity || 1,
                  priceAtSale: item.priceAtSale || 0
                });
                continue;
              }

              // Fetch product details
              log(`Fetching product: ${productId}`);
              const product = await databases.getDocument(
                process.env.APPWRITE_DATABASE_ID,
                'products',
                productId
              );

              processedItems.push({
                product,
                quantity: item.quantity || 1,
                priceAtSale: item.priceAtSale || product.price || 0
              });

              log(`Added product to invoice: ${product.name}`);
            } catch (itemError) {
              log(`Error processing item: ${itemError.message}`);
              // Add with available info rather than failing
              processedItems.push({
                product: {
                  $id: item.product?.$id || 'unknown',
                  name: 'Unknown Product',
                  price: item.priceAtSale || 0
                },
                quantity: item.quantity || 1,
                priceAtSale: item.priceAtSale || 0
              });
            }
          }
        }
      } catch (itemsError) {
        log(`Failed to fetch sale items: ${itemsError.message}`);
        // Create a single item with the total amount to avoid empty invoice
        processedItems = [{
          product: {
            $id: 'placeholder',
            name: 'Complete Sale',
            price: sale.totalAmount || 0
          },
          quantity: 1,
          priceAtSale: sale.totalAmount || 0
        }];
        log('Created placeholder sale item with total amount');
      }
    }

    // Compile complete sale data
    log('Compiling complete sale data');
    const saleData = {
      ...sale,
      customer,
      items: processedItems
    };
    log(`Sale data compilation complete. Items count: ${processedItems.length}`);

    // Generate PDF
    log('Generating PDF invoice');
    let pdfBuffer;
    try {
      pdfBuffer = await generateInvoicePdf(saleData, log);
      log(`PDF generation successful. Buffer type: ${typeof pdfBuffer}, is Buffer: ${Buffer.isBuffer(pdfBuffer)}`);
    } catch (pdfError) {
      log(`Failed to generate PDF: ${pdfError.message}`);
      log(`PDF error stack: ${pdfError.stack}`);
      return res.json({
        success: false,
        message: `Failed to generate PDF: ${pdfError.message}`
      }, 500);
    }

    // Validate buffer
    if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
      log(`Invalid PDF buffer type: ${typeof pdfBuffer}`);
      return res.json({
        success: false,
        message: 'Generated PDF is invalid'
      }, 500);
    }

    log(`PDF buffer size: ${pdfBuffer.length} bytes`);
    if (pdfBuffer.length === 0) {
      log('PDF buffer is empty');
      return res.json({
        success: false,
        message: 'Generated PDF is empty'
      }, 500);
    }

    // Upload to storage directly with buffer as Uint8Array
    log(`Uploading PDF to storage bucket: ${process.env.APPWRITE_INVOICES_BUCKET_ID}`);
    let file;

    try {
      const fileName = `invoice-${sale.invoiceNumber || saleId}-preview.pdf`;
      log(`Uploading file with name: ${fileName}`);

      // Convert buffer to Uint8Array which works better with Appwrite
      const uint8Array = new Uint8Array(pdfBuffer);

      file = await storage.createFile(
        process.env.APPWRITE_INVOICES_BUCKET_ID,
        ID.unique(),
        uint8Array,
        fileName,
        ['role:all'],
        [`expire:${Date.now() + 3600000}`] // URL expires in 1 hour
      );

      log(`File uploaded successfully. File ID: ${file.$id}`);
    } catch (uploadError) {
      log(`Failed to upload PDF: ${uploadError.message}`);
      log(`Upload error stack: ${uploadError.stack}`);

      return res.json({
        success: false,
        message: `Failed to upload PDF: ${uploadError.message}`
      }, 500);
    }

    // Get preview URL
    log(`Generating preview URL for file: ${file.$id}`);
    let previewUrl;
    try {
      previewUrl = storage.getFileView(
        process.env.APPWRITE_INVOICES_BUCKET_ID,
        file.$id
      );
      log(`Preview URL generated: ${previewUrl}`);
    } catch (previewError) {
      log(`Failed to generate preview URL: ${previewError.message}`);
      return res.json({
        success: false,
        message: `Failed to generate preview URL: ${previewError.message}`
      }, 500);
    }

    log('Function completed successfully');
    return res.json({
      success: true,
      previewUrl
    });

  } catch (err) {
    error(`Unhandled error in invoice preview function: ${err.message}`);
    error(`Stack trace: ${err.stack}`);
    return res.json({
      success: false,
      message: 'Failed to generate invoice preview',
      error: err.message
    }, 500);
  }
};

// Helper function to generate PDF
async function generateInvoicePdf(sale, log) {
  log('Starting PDF generation');
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  try {
    log('Adding company info to PDF');
    // Company Info
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text('INVOICE', pageWidth - 20, yPos, { align: 'right' });

    doc.setFontSize(12);
    doc.text(process.env.COMPANY_NAME || 'Company Name', 20, yPos);
    doc.setFontSize(10);
    doc.text(process.env.COMPANY_ADDRESS || 'Company Address', 20, yPos + 5);
    doc.text(process.env.COMPANY_PHONE || 'Company Phone', 20, yPos + 10);
    doc.text(process.env.COMPANY_EMAIL || 'Company Email', 20, yPos + 15);

    yPos += 30;

    log('Adding invoice details to PDF');
    // Invoice Details
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${sale.invoiceNumber || 'N/A'}`, pageWidth - 20, yPos, { align: 'right' });
    doc.text(`Date: ${new Date(sale.date || Date.now()).toLocaleDateString()}`, pageWidth - 20, yPos + 7, { align: 'right' });

    yPos += 20;

    log('Adding customer info to PDF');
    // Customer Info
    doc.setFillColor(241, 245, 249);
    doc.rect(20, yPos, pageWidth - 40, 25, 'F');

    doc.setFontSize(10);
    doc.text('Bill To:', 25, yPos + 7);
    doc.setFontSize(12);
    doc.text(sale.customer?.name || 'Customer', 25, yPos + 15);
    doc.setFontSize(10);
    doc.text(sale.customer?.email || '', 25, yPos + 22);

    yPos += 35;

    log('Creating products table');
    // Products Table
    const tableColumns = [
      { header: 'Product', dataKey: 'name' },
      { header: 'Quantity', dataKey: 'quantity' },
      { header: 'Price', dataKey: 'price' },
      { header: 'Total', dataKey: 'total' }
    ];

    // Safe way to process items, handling potential missing data
    const items = Array.isArray(sale.items) ? sale.items : [];
    log(`Processing ${items.length} items for table`);

    // If no items, add a warning in the PDF
    if (items.length === 0) {
      doc.setFontSize(12);
      doc.setTextColor(255, 0, 0);
      doc.text("Warning: No items found for this sale", 20, yPos);
      doc.setTextColor(0, 0, 0);
      yPos += 15;
    }

    // Safely map items, handling potential missing data
    const tableRows = items.map((item, index) => {
      const name = item.product?.name || 'Unknown Product';
      const quantity = item.quantity || 1;
      const price = item.priceAtSale || item.product?.price || 0;
      const total = quantity * price;

      log(`Table row ${index}: ${name}, Qty: ${quantity}, Price: ${price}, Total: ${total}`);

      return {
        name,
        quantity,
        price: `$${price.toFixed(2)}`,
        total: `$${total.toFixed(2)}`
      };
    });

    log(`Created table with ${tableRows.length} rows`);

    try {
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
      log('Table created successfully');
    } catch (tableError) {
      log(`Error creating table: ${tableError.message}`);
      // Create a simplified table as fallback
      doc.setFontSize(10);
      doc.text('Product details could not be displayed', 20, yPos + 10);
      yPos += 30; // Skip some space
    }

    // Get the Y position after the table
    yPos = doc.lastAutoTable?.finalY + 20 || yPos + 30;

    log('Adding summary section');
    // Summary
    const subtotal = sale.subtotal || (sale.totalAmount ? sale.totalAmount / 1.1 : 0);
    const tax = sale.tax || (sale.totalAmount ? sale.totalAmount - subtotal : 0);
    const total = sale.totalAmount || subtotal + tax;

    doc.setFontSize(10);
    doc.text('Subtotal:', pageWidth - 80, yPos);
    doc.text(`$${subtotal.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });

    doc.text('Tax (10%):', pageWidth - 80, yPos + 7);
    doc.text(`$${tax.toFixed(2)}`, pageWidth - 20, yPos + 7, { align: 'right' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Total:', pageWidth - 80, yPos + 15);
    doc.text(`$${total.toFixed(2)}`, pageWidth - 20, yPos + 15, { align: 'right' });

    log('Adding payment info');
    // Payment Info
    yPos += 30;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Payment Status: ${(sale.paymentStatus || 'UNKNOWN').toUpperCase()}`, 20, yPos);
    doc.text(`Payment Method: ${(sale.paymentMethod || 'Cash').toUpperCase()}`, 20, yPos + 7);

    log('Adding footer');
    // Footer
    doc.setFontSize(10);
    doc.text('Thank you for your business!', pageWidth / 2, doc.internal.pageSize.height - 20, { align: 'center' });

    log('PDF generation complete, converting to buffer');
    // Convert to proper buffer that Appwrite can handle
    const arrayBuffer = doc.output('arraybuffer');
    return Buffer.from(arrayBuffer);
  } catch (error) {
    log(`Error in PDF generation: ${error.message}`);
    log(`PDF generation error stack: ${error.stack}`);
    throw error;
  }
}
