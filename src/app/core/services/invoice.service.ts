import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { environment } from '../../../environments/environment';
import {SaleWithDetails} from '../interfaces/sales/sales.interfaces';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private companyInfo = {
    name: environment.company.name,
    address: environment.company.address,
    phone: environment.company.phone,
    email: environment.company.email,
    website: environment.company.website,
    logo: environment.company.logo
  };

  async generateInvoice(sale: SaleWithDetails): Promise<Blob> {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let yPos = 20;

    // Add company logo
    if (this.companyInfo.logo) {
      doc.addImage(this.companyInfo.logo, 'PNG', 20, yPos, 40, 40);
      yPos += 45;
    }

    // Company Info
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text('INVOICE', pageWidth - 20, yPos, { align: 'right' });

    doc.setFontSize(10);
    doc.text(this.companyInfo.name, 20, yPos);
    doc.text(this.companyInfo.address, 20, yPos + 5);
    doc.text(this.companyInfo.phone, 20, yPos + 10);
    doc.text(this.companyInfo.email, 20, yPos + 15);

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

    const tableRows = sale.products.map(item => ({
      name: item.product?.name,
      quantity: item.quantity,
      price: `$${item.priceAtSale.toFixed(2)}`,
      total: `$${(item.quantity * item.priceAtSale).toFixed(2)}`
    }));

    (doc as any).autoTable({
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

    yPos = (doc as any).lastAutoTable.finalY + 20;

    // Summary
    const subtotal = sale.totalAmount / 1.1;
    const tax = sale.totalAmount - subtotal;

    doc.setFontSize(10);
    doc.text('Subtotal:', pageWidth - 80, yPos);
    doc.text(`$${subtotal.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });

    doc.text('Tax (10%):', pageWidth - 80, yPos + 7);
    doc.text(`$${tax.toFixed(2)}`, pageWidth - 20, yPos + 7, { align: 'right' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Total:', pageWidth - 80, yPos + 15);
    doc.text(`$${sale.totalAmount.toFixed(2)}`, pageWidth - 20, yPos + 15, { align: 'right' });

    // Payment Status
    yPos += 30;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Payment Status: ${sale.paymentStatus.toUpperCase()}`, 20, yPos);

    // Footer
    const footer = 'Thank you for your business!';
    doc.setFontSize(10);
    doc.text(footer, pageWidth / 2, doc.internal.pageSize.height - 20, { align: 'center' });

    return doc.output('blob');
  }

  async downloadInvoice(sale: SaleWithDetails): Promise<void> {
    const blob = await this.generateInvoice(sale);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${sale.invoiceNumber}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  async previewInvoice(sale: SaleWithDetails): Promise<string> {
    const blob = await this.generateInvoice(sale);
    return URL.createObjectURL(blob);
  }

  generatePDF(sale: SaleWithDetails): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let yPos = 20;

    // Add company header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('COMPANY NAME', pageWidth / 2, yPos, { align: 'center' });

    // Add invoice details
    yPos += 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice #: ${sale.invoiceNumber}`, 20, yPos);
    doc.text(`Date: ${new Date(sale.date).toLocaleDateString()}`, pageWidth - 20, yPos, { align: 'right' });

    // Add customer details
    yPos += 20;
    doc.text('Bill To:', 20, yPos);
    yPos += 6;
    doc.text(sale.customer.name, 20, yPos);
    yPos += 6;
    doc.text(sale.customer.email, 20, yPos);
    yPos += 6;

    // Add items header
    yPos += 20;
    doc.setFont('helvetica', 'bold');
    doc.text('Item', 20, yPos);
    doc.text('Qty', pageWidth - 80, yPos, { align: 'center' });
    doc.text('Price', pageWidth - 50, yPos, { align: 'center' });
    doc.text('Total', pageWidth - 20, yPos, { align: 'right' });

    // Add items
    doc.setFont('helvetica', 'normal');
    sale.products.forEach(item => {
      yPos += 10;
      doc.text(item.product?.name || 'Unknown Product', 20, yPos);
      doc.text(item.quantity.toString(), pageWidth - 80, yPos, { align: 'center' });
      doc.text(`$${item.priceAtSale.toFixed(2)}`, pageWidth - 50, yPos, { align: 'center' });
      doc.text(`$${(item.quantity * item.priceAtSale).toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });
    });

    // Add totals
    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('Total:', pageWidth - 80, yPos);
    doc.text(`$${sale.totalAmount.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });

    // Add payment status
    yPos += 20;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Payment Status: ${sale.paymentStatus.toUpperCase()}`, 20, yPos);

    // Save the PDF
    doc.save(`invoice-${sale.invoiceNumber}.pdf`);
  }
}
