// invoice.service.ts
import { Injectable, inject } from '@angular/core';
import { AppwriteService } from './appwrite.service';
import { environment } from '../../../environments/environment';
import { Sale, SaleWithDetails } from '../interfaces/sales/sales.interfaces';
import { LoadingService } from './loading.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { SettingsService } from './settings.service';
// Import html2pdf
import html2pdf from 'html2pdf.js';
// Optional: Import jsPDF directly for advanced customization
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // Inject necessary services
  private appwrite = inject(AppwriteService);
  private loadingService = inject(LoadingService);
  private toast = inject(HotToastService);
  private settingsService = inject(SettingsService);

  /**
   * Get sale details from database
   */
  private async getSaleDetails(saleId: string): Promise<SaleWithDetails> {
    try {
      const response = await this.appwrite.database.getDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collections.sales,
        saleId
      );

      return response as unknown as SaleWithDetails;
    } catch (error) {
      console.error('Error fetching sale details:', error);
      throw new Error('Unable to fetch sale details');
    }
  }

  /**
   * Generate PDF invoice preview URL
   */
  async getInvoicePreviewUrl(saleId: string): Promise<string> {
    this.loadingService.start('Generating invoice preview...');

    try {
      // Get the sale data
      const sale = await this.getSaleDetails(saleId);

      // Generate PDF and return as data URL
      return await this.generatePDF(sale, 'dataurl');
    } catch (error) {
      console.error('Invoice preview error:', error);
      this.toast.error('Unable to generate invoice preview');
      throw error;
    } finally {
      this.loadingService.clear();
    }
  }

  /**
   * Download invoice as PDF
   */
  async downloadInvoice(saleId: string): Promise<void> {
    this.loadingService.start('Preparing invoice download...');

    try {
      // Get the sale data
      const sale = await this.getSaleDetails(saleId);

      // Generate PDF and trigger download
      await this.generatePDF(sale, 'download');
      this.toast.success('Invoice downloaded successfully');
    } catch (error) {
      console.error('Invoice download error:', error);
      this.toast.error('Unable to download invoice');
      throw error;
    } finally {
      this.loadingService.clear();
    }
  }

  /**
   * Print invoice
   */
  async printInvoice(saleId: string): Promise<void> {
    this.loadingService.start('Preparing invoice for printing...');

    try {
      // Get the sale data
      const sale = await this.getSaleDetails(saleId);

      // Generate PDF as blob URL
      const blobUrl = await this.generatePDF(sale, 'bloburl');

      // Open in new window for printing
      const printWindow = window.open(blobUrl, '_blank');
      if (!printWindow) {
        throw new Error('Popup blocked. Please allow popups to print.');
      }

      // Wait for the PDF to load, then print
      printWindow.addEventListener('load', () => {
        setTimeout(() => {
          printWindow.print();
          // Clean up the blob URL
          URL.revokeObjectURL(blobUrl);
        }, 1000);
      });
    } catch (error) {
      console.error('Invoice print error:', error);
      this.toast.error('Unable to prepare invoice for printing');
      throw error;
    } finally {
      this.loadingService.clear();
    }
  }

  /**
   * Email invoice to customer
   */
  async emailInvoice(saleId: string, email: string): Promise<void> {
    this.loadingService.start(`Sending invoice to ${email}...`);

    try {
      // Get the sale data
      const sale = await this.getSaleDetails(saleId);

      // Generate PDF as base64
      const base64PDF = await this.generatePDF(sale, 'base64');

      // Call backend function to send email with PDF attachment
      const execution = await this.appwrite.functions.createExecution(
        'email-invoice',
        JSON.stringify({
          saleId,
          email,
          pdfBase64: base64PDF.split(',')[1], // Remove data:application/pdf;base64, prefix
          invoiceNumber: sale.invoiceNumber
        })
      );

      const result = JSON.parse(execution.responseBody);
      if (!result.success) {
        throw new Error(result.message || 'Failed to send email');
      }

      this.toast.success(`Invoice sent to ${email}`);
    } catch (error) {
      console.error('Invoice email error:', error);
      this.toast.error('Unable to email invoice');
      throw error;
    } finally {
      this.loadingService.clear();
    }
  }

  /**
   * Helper method to preload images
   */
  private async preloadImages(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!src) {
        resolve(false);
        return;
      }

      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        resolve(false);
      };
      img.src = src;
    });
  }

  /**
   * Core method that generates the PDF
   * @param sale Sale data
   * @param outputType Type of output needed
   */
  private async generatePDF(sale: SaleWithDetails, outputType: 'download' | 'dataurl' | 'bloburl' | 'base64'): Promise<string> {
    console.log("Generating PDF for sale:", sale.$id);

    // Wait for fonts to load
    try {
      await document.fonts.ready;
      console.log("Fonts loaded successfully");
    } catch (err) {
      console.warn("Font loading issue:", err);
    }

    // Preload company logo if exists
    const logoSrc = this.settingsService.settings()?.company?.logo;
    if (logoSrc) {
      await this.preloadImages(logoSrc);
    }

    // Create the invoice HTML element
    const container = document.createElement('div');
    container.style.width = '8.27in';  // A4 width
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.backgroundColor = '#ffffff';
    container.style.padding = '0';
    container.style.margin = '0';
    container.innerHTML = this.createInvoiceHTML(sale);
    document.body.appendChild(container);

    try {
      // Using the two-step process for better rendering
      return await this.generatePDFTwoStep(container, sale, outputType);
    } finally {
      // Clean up
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
  }

  /**
   * Generate PDF using a two-step process (HTML -> Canvas -> PDF)
   * This produces better results than direct HTML to PDF
   */
  private async generatePDFTwoStep(
    element: HTMLElement,
    sale: SaleWithDetails,
    outputType: 'download' | 'dataurl' | 'bloburl' | 'base64'
  ): Promise<string> {
    // Step 1: Render HTML to Canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (doc) => {
        // Any document manipulation before rendering
        return doc;
      }
    });

    // Step 2: Convert Canvas to PDF
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

    // For multi-page documents
    if (imgHeight > pageHeight) {
      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft > pageHeight) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    }

    // Return based on requested output
    switch(outputType) {
      case 'download':
        pdf.save(`Invoice-${sale.invoiceNumber || 'unknown'}.pdf`);
        return '';
      case 'dataurl':
      case 'base64':
        return pdf.output('dataurlstring');
      case 'bloburl':
        const blob = pdf.output('blob');
        return URL.createObjectURL(blob);
      default:
        throw new Error(`Unsupported output type: ${outputType}`);
    }
  }

  /**
   * Creates the HTML template for the invoice using table-based layout
   * for better PDF rendering and alignment
   */
  private createInvoiceHTML(sale: SaleWithDetails): string {
    // Get company info from settings
    const companyName = this.settingsService.settings()?.company?.companyName || 'Your Company';
    const companyLogo = this.settingsService.settings()?.company?.logo || '';
    const companyAddress = this.settingsService.settings()?.company?.address || '';
    const companyPhone = this.settingsService.settings()?.company?.phone || '';
    const companyEmail = this.settingsService.settings()?.company?.email || '';
    const taxRate = this.settingsService.settings()?.invoice?.taxRate || '';

    // Format currency
    const formatCurrency = (amount: number | undefined | null): string => {
      if (amount === undefined || amount === null || isNaN(Number(amount))) return '₦0.00';
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2
      }).format(Number(amount));
    };

    // Format date
    const formattedDate = sale.date ? new Date(sale.date).toLocaleDateString() : 'N/A';

    // Safely get items
    const saleItems = Array.isArray(sale.saleItems) ? sale.saleItems : [];

    // Watermark styling based on payment status
    let watermarkColor = '';
    let watermarkText = '';

    switch(sale.paymentStatus?.toLowerCase()) {
      case 'paid':
        watermarkColor = 'rgba(16, 185, 129, 0.15)'; // Light green
        watermarkText = 'PAID';
        break;
      case 'pending':
        watermarkColor = 'rgba(245, 158, 11, 0.15)'; // Light amber
        watermarkText = 'PENDING';
        break;
      case 'failed':
      case 'cancelled':
        watermarkColor = 'rgba(239, 68, 68, 0.15)'; // Light red
        watermarkText = 'CANCELLED';
        break;
      default:
        watermarkColor = 'rgba(156, 163, 175, 0.15)'; // Light gray
        watermarkText = 'DRAFT';
    }

    return `
    <div style="font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.5; color: #333333; max-width: 800px; margin: 0 auto; padding: 20px; position: relative; overflow: hidden; min-height: 1000px;">
      <!-- Watermark - Positioned lower in the document -->
      <div style="position: absolute; top: 50%; left: 0; right: 0; text-align: center; transform: translateY(-50%) rotate(-45deg);
                  font-size: 100px; font-weight: bold; color: ${watermarkColor};
                  z-index: -1; opacity: 1; pointer-events: none; width: 150%; margin-left: -25%;">
        ${watermarkText}
      </div>

      <!-- Header -->
      <table style="width: 100%; margin-bottom: 30px; border-collapse: collapse; position: relative; z-index: 1;">
        <tr>
          <td style="width: 60%; vertical-align: top; padding-bottom: 20px;">
            <h1 style="font-size: 24pt; font-weight: bold; margin: 0 0 5px 0; color: #333333;">${companyName}</h1>
            ${companyAddress ? `<p style="margin: 2px 0; font-size: 10pt; color: #666;">${companyAddress}</p>` : ''}
            ${companyPhone ? `<p style="margin: 2px 0; font-size: 10pt; color: #666;">${companyPhone}</p>` : ''}
            ${companyEmail ? `<p style="margin: 2px 0; font-size: 10pt; color: #666;">${companyEmail}</p>` : ''}
          </td>
          <td style="width: 40%; text-align: right; vertical-align: top; padding-bottom: 20px;">
            ${companyLogo ? `<img src="${companyLogo}" alt="Logo" style="max-height: 70px; max-width: 200px;">` : ''}
          </td>
        </tr>
      </table>

      <!-- Receipt Header -->
      <table style="width: 100%; margin-bottom: 30px; border-collapse: collapse; position: relative; z-index: 1;">
        <tr>
          <td style="width: 60%; vertical-align: top;">
            <h2 style="font-size: 18pt; font-weight: bold; margin: 0 0 10px 0; color: #333333;">RECEIPT</h2>
            <p style="margin: 0 0 5px 0; font-size: 11pt;">
              <strong>Invoice #:</strong> ${sale.invoiceNumber || 'N/A'}
            </p>
            <p style="margin: 0 0 10px 0; font-size: 11pt;">
              <strong>Date:</strong> ${formattedDate}
            </p>
            <div style="display: inline-block; padding: 4px 10px; border-radius: 15px; text-transform: uppercase; font-size: 10pt; font-weight: bold;
                      ${sale.paymentStatus === 'paid' ? 'background-color: #d1fae5; color: #065f46;' :
      sale.paymentStatus === 'pending' ? 'background-color: #fef3c7; color: #92400e;' :
        'background-color: #fee2e2; color: #991b1b;'
    }">
              ${sale.paymentStatus || 'Pending'}
            </div>
          </td>
          ${sale.customer ? `
          <td style="width: 40%; vertical-align: top; background-color: #f9fafb; border-radius: 8px; padding: 15px;">
            <h3 style="font-size: 10pt; color: #6b7280; margin: 0 0 5px 0; font-weight: 500;">BILL TO</h3>
            <p style="font-weight: 500; font-size: 12pt; margin: 0 0 5px 0;">${sale.customer.name || 'N/A'}</p>
            ${sale.customer.email ? `<p style="margin: 0 0 2px 0; font-size: 10pt; color: #4b5563;">${sale.customer.email}</p>` : ''}
            ${sale.customer.phone ? `<p style="margin: 0; font-size: 10pt; color: #4b5563;">${sale.customer.phone}</p>` : ''}
          </td>
          ` : '<td></td>'}
        </tr>
      </table>

      <!-- Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; position: relative; z-index: 1;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 600; font-size: 11pt;">Description</th>
            <th style="text-align: center; padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 600; font-size: 11pt;">Qty</th>
            <th style="text-align: right; padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 600; font-size: 11pt;">Unit Price</th>
            <th style="text-align: right; padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 600; font-size: 11pt;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${saleItems.length > 0
      ? saleItems.map(item => {
        const price = item.priceAtSale || (item.product && item.product.price) || 0;
        const quantity = item.quantity || 1;
        const total = price * quantity;

        return `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #f3f4f6; font-size: 11pt;">
                    ${(item.product && item.product.name) || 'Unknown Product'}
                  </td>
                  <td style="text-align: center; padding: 10px; border-bottom: 1px solid #f3f4f6; font-size: 11pt;">
                    ${quantity}
                  </td>
                  <td style="text-align: right; padding: 10px; border-bottom: 1px solid #f3f4f6; font-size: 11pt;">
                    ${formatCurrency(price)}
                  </td>
                  <td style="text-align: right; padding: 10px; border-bottom: 1px solid #f3f4f6; font-weight: 500; font-size: 11pt;">
                    ${formatCurrency(total)}
                  </td>
                </tr>
                `;
      }).join('')
      : `<tr><td colspan="4" style="text-align: center; padding: 15px; font-size: 11pt;">No items found in this sale</td></tr>`
    }
        </tbody>
      </table>

      <!-- Summary Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; position: relative; z-index: 1;">
        <tr>
          <td style="width: 60%;"></td>
          <td style="width: 40%;">
            <table style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-radius: 8px;">
              <tr>
                <td style="padding: 10px 15px; font-size: 11pt; color: #4b5563;">Subtotal:</td>
                <td style="padding: 10px 15px; text-align: right; font-size: 11pt;">${formatCurrency(sale.subtotal)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 15px; font-size: 11pt; color: #4b5563;">Tax${taxRate ? ` (${taxRate}%)` : ''}:</td>
                <td style="padding: 10px 15px; text-align: right; font-size: 11pt;">${formatCurrency(sale.tax)}</td>
              </tr>
              <tr style="border-top: 1px solid #e5e7eb;">
                <td style="padding: 10px 15px; font-weight: bold; font-size: 12pt;">Total:</td>
                <td style="padding: 10px 15px; text-align: right; font-weight: bold; font-size: 12pt;">${formatCurrency(sale.totalAmount)}</td>
              </tr>
              <tr>
                <td style="padding: 5px 15px 15px; font-size: 10pt; color: #4b5563;">Payment Method:</td>
                <td style="padding: 5px 15px 15px; text-align: right; font-size: 10pt; text-transform: capitalize;">${sale.paymentMethod || 'Cash'}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Terms & Notes -->
      <div style="margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 20px; position: relative; z-index: 1;">
        ${this.settingsService.settings()?.invoice?.termsAndConditions ?
      `<div style="margin-bottom: 15px;">
            <h4 style="font-size: 10pt; color: #6b7280; margin: 0 0 5px 0;">TERMS & CONDITIONS</h4>
            <p style="font-size: 10pt; color: #4b5563; margin: 0;">${this.settingsService.settings()?.invoice?.termsAndConditions}</p>
          </div>` : ''
    }

        ${this.settingsService.settings()?.invoice?.notes ?
      `<div style="margin-bottom: 15px;">
            <h4 style="font-size: 10pt; color: #6b7280; margin: 0 0 5px 0;">NOTES</h4>
            <p style="font-size: 10pt; color: #4b5563; margin: 0;">${this.settingsService.settings()?.invoice?.notes}</p>
          </div>` : ''
    }
      </div>

      <!-- Footer -->
      <div style="margin-top: 40px; text-align: center; color: #6b7280; font-size: 10pt; border-top: 1px solid #e5e7eb; padding-top: 20px; position: relative; z-index: 1;">
        <p style="margin: 0;">Thank you for your business!</p>
      </div>
    </div>
  `;
  }

  /**
   * Test method to generate a PDF for verification
   */


  /**
   * Creates a simplified invoice template suitable for thermal POS printers
   * @param sale Sale data
   * @param paperWidth Width in characters (default: 40 for 80mm paper, use 24 for 58mm)
   */
  private createPOSInvoiceTemplate(sale: SaleWithDetails, paperWidth: number = 40): string {
    // Get company info from settings
    const companyName = this.settingsService.settings()?.company?.companyName || 'Your Company';
    const companyPhone = this.settingsService.settings()?.company?.phone || '';
    const taxRate = this.settingsService.settings()?.invoice?.taxRate || '';

    // Date formatting
    const formattedDate = sale.date ? new Date(sale.date).toLocaleDateString() : 'N/A';
    const formattedTime = sale.date ? new Date(sale.date).toLocaleTimeString() : 'N/A';

    // Safely get items
    const saleItems = Array.isArray(sale.saleItems) ? sale.saleItems : [];

    // Format currency for POS
    const formatAmount = (amount: number | undefined | null): string => {
      if (amount === undefined || amount === null || isNaN(Number(amount))) return '0.00';
      return Number(amount).toFixed(2);
    };

    // Create divider line
    const divider = '-'.repeat(paperWidth);

    // Center text
    const center = (text: string): string => {
      const spaces = Math.max(0, Math.floor((paperWidth - text.length) / 2));
      return ' '.repeat(spaces) + text;
    };

    // Right align text (for prices)
    const rightAlign = (text: string, width: number): string => {
      return text.padStart(width);
    };

    // Left align with max length
    const leftAlign = (text: string, maxLength: number): string => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength - 3) + '...';
    };

    // Build receipt content
    let receipt = `\n${center(companyName)}\n`;

    if (companyPhone) {
      receipt += `${center(companyPhone)}\n`;
    }

    receipt += `\n${divider}\n`;
    receipt += `${center('RECEIPT')}\n`;
    receipt += `${divider}\n\n`;

    // Invoice info
    receipt += `Invoice #: ${sale.invoiceNumber || 'N/A'}\n`;
    receipt += `Date: ${formattedDate}\n`;
    receipt += `Time: ${formattedTime}\n`;

    // Status line with asterisks for emphasis
    receipt += `\n*** ${sale.paymentStatus?.toUpperCase() || 'PENDING'} ***\n`;

    // Customer info if available
    if (sale.customer) {
      receipt += `\n${divider}\n`;
      receipt += `Customer: ${sale.customer.name || 'N/A'}\n`;
      if (sale.customer.phone) {
        receipt += `Phone: ${sale.customer.phone}\n`;
      }
    }

    // Items header
    receipt += `\n${divider}\n`;
    receipt += `ITEM                  QTY    PRICE    TOTAL\n`;
    receipt += `${divider}\n`;

    // Item rows
    for (const item of saleItems) {
      const price = item.priceAtSale || (item.product && item.product.price) || 0;
      const quantity = item.quantity || 1;
      const total = price * quantity;
      const productName = (item.product && item.product.name) || 'Unknown Product';

      // Format name to fit
      const name = leftAlign(productName, 20);

      // Format numbers
      const qtyStr = rightAlign(quantity.toString(), 3);
      const priceStr = rightAlign(formatAmount(price), 8);
      const totalStr = rightAlign(formatAmount(total), 8);

      // Add item line
      receipt += `${name} ${qtyStr} ${priceStr} ${totalStr}\n`;
    }

    // Summary
    receipt += `${divider}\n`;
    receipt += `Subtotal: ${rightAlign(formatAmount(sale.subtotal), paperWidth - 10)}\n`;
    receipt += `Tax${taxRate ? ` (${taxRate}%)` : ''}: ${rightAlign(formatAmount(sale.tax), paperWidth - 10 - (taxRate ? 4 : 0))}\n`;
    receipt += `${divider}\n`;
    receipt += `TOTAL: ${rightAlign(formatAmount(sale.totalAmount), paperWidth - 7)}\n`;
    receipt += `\n`;
    receipt += `Payment: ${sale.paymentMethod ? sale.paymentMethod.toUpperCase() : 'CASH'}\n`;

    // Footer
    receipt += `\n${divider}\n`;
    receipt += `${center('Thank you for your business!')}\n`;
    receipt += `${center(new Date().toLocaleDateString())}\n`;
    receipt += `\n\n\n`; // Extra space for cutting paper

    return receipt;
  }



//Print to a POS thermal printer

  async printToPOS(saleId: string): Promise<void> {
    try {
      this.loadingService.start('Preparing receipt for printing...');

      // Get the sale data
      const sale = await this.getSaleDetails(saleId);

      // Generate POS-friendly receipt
      const receiptContent = this.createPOSInvoiceTemplate(sale);

      // Send to print service
      // The implementation here depends on your POS hardware interface
      // For example, using a Bluetooth or network printer
      await this.sendToPrinter(receiptContent);

      this.toast.success('Receipt sent to printer');
    } catch (error) {
      console.error('POS printing error:', error);
      this.toast.error('Failed to print receipt');
      throw error;
    } finally {
      this.loadingService.clear();
    }
  }

  /**
   * Sends content to the POS printer
   * This is a placeholder - implement according to your printer interface
   */
  private async sendToPrinter(content: string): Promise<void> {
    // Implementation examples:

    // 1. Using a Bluetooth printer library
    // return await BluetoothPrinter.print(content);

    // 2. Using a WebUSB interface
    // const printer = await connectToUSBPrinter();
    // return await printer.print(content);

    // 3. Using a printer service API
    // return await this.http.post('http://printer-service/print', { content }).toPromise();

    // This is where you'd implement your actual printer connection
    console.log('Printing to POS:', content);
    return Promise.resolve();
  }

  /**
   * Print to a smaller 58mm POS printer
   */
  async printToNarrowPOS(saleId: string): Promise<void> {
    try {
      this.loadingService.start('Preparing receipt for printing...');

      // Get the sale data
      const sale = await this.getSaleDetails(saleId);

      // Use narrower width (typically 24 characters for 58mm printers)
      const receiptContent = this.createPOSInvoiceTemplate(sale, 24);

      // Send to print service
      await this.sendToPrinter(receiptContent);

      this.toast.success('Receipt sent to printer');
    } catch (error) {
      console.error('POS printing error:', error);
      this.toast.error('Failed to print receipt');
      throw error;
    } finally {
      this.loadingService.clear();
    }
  }

  /**
   * Send binary data to USB printer using WebUSB
   * Note: This requires HTTPS or localhost context for security reasons
   */
  private async sendBinaryToPrinter(data: Uint8Array): Promise<void> {
    try {
      // Cast navigator to any to access the usb property
      const usb = (navigator as any).usb;

      // Request a USB device that is a printer
      const device = await usb.requestDevice({
        filters: [
          { classCode: 7, subclassCode: 1, protocolCode: 1 }, // Printer
          { classCode: 7, subclassCode: 1, protocolCode: 2 }  // Printer
        ]
      });

      // Open a connection to the device
      await device.open();

      // Select the first configuration
      if (device.configuration === null) {
        await device.selectConfiguration(1);
      }

      // Find an interface with the class code for printers
      const interfaceNumber = device.configurations[0].interfaces.find(
          (i: { alternates: { interfaceClass: number; }[]; }) => i.alternates[0].interfaceClass === 7
      )?.interfaceNumber;

      if (interfaceNumber === undefined) {
        throw new Error('Printer interface not found');
      }

      // Claim the interface
      await device.claimInterface(interfaceNumber);

      // Find the bulk OUT endpoint
      const outEndpoint = device.configuration?.interfaces[interfaceNumber].alternates[0].endpoints.find(
          (e: { direction: string; type: string; }) => e.direction === 'out' && e.type === 'bulk'
      )?.endpointNumber;

      if (outEndpoint === undefined) {
        throw new Error('Printer output endpoint not found');
      }

      // Send the data to the printer
      await device.transferOut(outEndpoint, data);

      // Release the interface
      await device.releaseInterface(interfaceNumber);

      // Close the device
      await device.close();

    } catch (error) {
      console.error('USB printer error:', error);
      throw new Error('Failed to communicate with the printer');
    }
  }


  async testPrinter(): Promise<void> {
    try {
      // Send simple test pattern
      const testData = new Uint8Array([
        0x1B, 0x40,           // Initialize printer
        0x1B, 0x21, 0x08,     // Emphasized mode
        0x1B, 0x61, 0x01,     // Center alignment
        ...new TextEncoder().encode("*** PRINTER TEST ***\n\n"),
        0x1B, 0x21, 0x00,     // Normal mode
        ...new TextEncoder().encode("If you can read this, the printer is working!\n\n\n"),
        0x1D, 0x56, 0x00      // Cut paper
      ]);

      await this.sendBinaryToPrinter(testData);
      this.toast.success('Test pattern sent to printer');
    } catch (error) {
      console.error('Printer test failed:', error);
      this.toast.error('Printer test failed');
    }
  }



  // Add these methods to your invoice.service.ts

  /**
   * Prepare formatted data for 58mm thermal printer
   * @param saleId Sale ID to get data for
   * @returns Uint8Array of ESC/POS commands
   */
// Update this method in invoice.service.ts to handle async
  async prepareThermalReceipt(saleId: string): Promise<Uint8Array> {
    try {
      // Get the sale data
      const sale = await this.getSaleDetails(saleId);

      // Generate the ESC/POS commands with our custom formatter
      return await this.generateESCPOSCommands('', sale);
    } catch (error) {
      console.error('Error preparing thermal receipt:', error);
      throw new Error('Failed to prepare receipt for thermal printer');
    }
  }

  /**
   * Generate ESC/POS commands for thermal printers
   * This creates a binary command sequence that most ESC/POS printers understand
   */

// Updated ESC/POS command generator with fixed logo and currency symbol
  private async generateESCPOSCommands(textContent: string, sale: SaleWithDetails): Promise<Uint8Array> {
    // Initialize command array
    const parts: Uint8Array[] = [];

    // ESC/POS Commands
    const ESC = 0x1B;  // Escape
    const GS = 0x1D;   // Group Separator
    const LF = 0x0A;   // Line Feed

    // Company information from settings
    const companyName = this.settingsService.settings()?.company?.companyName || 'TSOFT TECHNOLOGIES';
    const companyAddress = this.settingsService.settings()?.company?.address || 'Lagos, Nigeria';
    const companyPhone = this.settingsService.settings()?.company?.phone || '+234 123 456 7890';
    const companyEmail = this.settingsService.settings()?.company?.email || 'info@tsoft.com';

    // Get logo URL
    const logoUrl = this.settingsService.settings()?.company?.logo ||
      'https://appwrite.tsoft-tech.dev/v1/storage/buckets/company-logo/files/67d1af1700020874c397/view?project=tsoftmart-inventory-invoice-system&project=tsoftmart-inventory-invoice-system&mode=admin';

    // Constants for receipt layout
    const CHARS_PER_LINE = 32; // Character limit for 58mm paper
    const DOUBLE_LINE = '================================';
    const SINGLE_LINE = '--------------------------------';

    // Fix Naira symbol with "N" instead of ₦
    const formatCurrency = (amount: number | undefined): string => {
      if (amount === undefined || amount === null || isNaN(Number(amount))) return 'N0.00';

      // Format with thousand separators and fixed decimal places
      const formatter = new Intl.NumberFormat('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      return 'N' + formatter.format(Number(amount));
    };

    // Function to build receipt
    const buildReceipt = async () => {
      // 1. INITIALIZE PRINTER
      parts.push(new Uint8Array([ESC, 0x40])); // Initialize printer

      // 2. HEADER SECTION WITH LOGO
      parts.push(new Uint8Array([ESC, 0x61, 0x01])); // Center alignment

      // Try to fetch and print logo
      try {
        const logoParts = await this.fetchAndPrintLogo(logoUrl);
        parts.push(...logoParts);
        // Add a line break after logo
        parts.push(this.textToUint8Array('\n'));
      } catch (error) {
        console.error('Error printing logo, falling back to text-only header', error);
      }

      // Company Name - Large bold text
      parts.push(new Uint8Array([ESC, 0x21, 0x18])); // Double width, double height
      parts.push(this.textToUint8Array(companyName + '\n'));

      // Reset text formatting
      parts.push(new Uint8Array([ESC, 0x21, 0x00])); // Normal size

      // Company contact details
      parts.push(this.textToUint8Array(companyAddress + '\n'));
      parts.push(this.textToUint8Array('Tel: ' + companyPhone + '\n'));
      parts.push(this.textToUint8Array(companyEmail + '\n'));
      parts.push(this.textToUint8Array(DOUBLE_LINE + '\n'));

      // Rest of the receipt formatting stays the same as before, but with the fixed currency formatter

      // 3. RECEIPT INFORMATION
      parts.push(new Uint8Array([ESC, 0x21, 0x08])); // Bold
      parts.push(this.textToUint8Array('RECEIPT\n'));
      parts.push(new Uint8Array([ESC, 0x21, 0x00])); // Normal

      // Format date nicely
      const dateStr = sale.date ? new Date(sale.date).toLocaleString('en-NG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) : 'N/A';

      // Switch to left align for details
      parts.push(new Uint8Array([ESC, 0x61, 0x00])); // Left align

      // Receipt details
      parts.push(this.textToUint8Array('Invoice #: ' + (sale.invoiceNumber || 'N/A') + '\n'));
      parts.push(this.textToUint8Array('Date: ' + dateStr + '\n'));

      // Payment status with highlight
      parts.push(new Uint8Array([ESC, 0x21, 0x08])); // Bold
      parts.push(this.textToUint8Array('Status: ' + (sale.paymentStatus?.toUpperCase() || 'PENDING') + '\n'));
      parts.push(new Uint8Array([ESC, 0x21, 0x00])); // Normal

      // 4. CUSTOMER SECTION
      if (sale.customer) {
        parts.push(this.textToUint8Array(SINGLE_LINE + '\n'));
        parts.push(new Uint8Array([ESC, 0x21, 0x08])); // Bold
        parts.push(this.textToUint8Array('CUSTOMER DETAILS\n'));
        parts.push(new Uint8Array([ESC, 0x21, 0x00])); // Normal
        parts.push(this.textToUint8Array('Name: ' + (sale.customer.name || 'N/A') + '\n'));

        if (sale.customer.phone) {
          parts.push(this.textToUint8Array('Tel: ' + sale.customer.phone + '\n'));
        }

        if (sale.customer.email) {
          parts.push(this.textToUint8Array('Email: ' + sale.customer.email + '\n'));
        }
      }

      // 5. ITEMS SECTION
      parts.push(this.textToUint8Array(DOUBLE_LINE + '\n'));

      // Item header with emphasis
      parts.push(new Uint8Array([ESC, 0x21, 0x08])); // Bold
      parts.push(this.textToUint8Array('ITEM DESCRIPTION\n'));
      parts.push(new Uint8Array([ESC, 0x21, 0x00])); // Normal
      parts.push(this.textToUint8Array(SINGLE_LINE + '\n'));

      // Items with optimized layout
      const saleItems = Array.isArray(sale.saleItems) ? sale.saleItems : [];
      for (const item of saleItems) {
        const price = item.priceAtSale || (item.product && item.product.price) || 0;
        const quantity = item.quantity || 1;
        const total = price * quantity;
        const productName = (item.product && item.product.name) || 'Unknown Product';

        // Product name - can be longer since it's on its own line
        parts.push(new Uint8Array([ESC, 0x21, 0x08])); // Bold

        // Truncate name if too long
        if (productName.length > CHARS_PER_LINE) {
          parts.push(this.textToUint8Array(productName.substring(0, CHARS_PER_LINE - 3) + '...\n'));
        } else {
          parts.push(this.textToUint8Array(productName + '\n'));
        }

        parts.push(new Uint8Array([ESC, 0x21, 0x00])); // Normal

        // Price details with tabular format
        const qtyPrice = `${quantity} x ${formatCurrency(price)}`;
        const subtotal = formatCurrency(total);

        // Format to align the subtotal to the right
        const detailLine = qtyPrice + ' '.repeat(Math.max(0, CHARS_PER_LINE - qtyPrice.length - subtotal.length)) + subtotal;
        parts.push(this.textToUint8Array(detailLine + '\n'));

        // Add a separator between items
        if (saleItems.indexOf(item) < saleItems.length - 1) {
          parts.push(this.textToUint8Array('-  -  -  -  -  -  -  -  -  -  -  -\n'));
        }
      }

      // 6. SUMMARY SECTION
      parts.push(this.textToUint8Array(DOUBLE_LINE + '\n'));

      // Create a structured summary with right-aligned values
      const subtotalText = 'Subtotal:';
      const subtotalValue = formatCurrency(sale.subtotal);
      const subtotalLine = subtotalText + ' '.repeat(Math.max(0, CHARS_PER_LINE - subtotalText.length - subtotalValue.length)) + subtotalValue;
      parts.push(this.textToUint8Array(subtotalLine + '\n'));

      const taxText = `Tax (${this.settingsService.settings()?.invoice?.taxRate || 0}%):`;
      const taxValue = formatCurrency(sale.tax);
      const taxLine = taxText + ' '.repeat(Math.max(0, CHARS_PER_LINE - taxText.length - taxValue.length)) + taxValue;
      parts.push(this.textToUint8Array(taxLine + '\n'));

      parts.push(this.textToUint8Array(SINGLE_LINE + '\n'));

      // Total with emphasis
      const totalText = 'TOTAL:';
      const totalValue = formatCurrency(sale.totalAmount);

      parts.push(new Uint8Array([ESC, 0x21, 0x10])); // Double height for total
      const totalLine = totalText + ' '.repeat(Math.max(0, CHARS_PER_LINE - totalText.length - totalValue.length - 8)) + totalValue;
      parts.push(this.textToUint8Array(totalLine + '\n'));
      parts.push(new Uint8Array([ESC, 0x21, 0x00])); // Normal

      // Payment method
      const paymentText = 'Payment:';
      const paymentValue = sale.paymentMethod ? sale.paymentMethod.toUpperCase() : 'CASH';
      const paymentLine = paymentText + ' '.repeat(Math.max(0, CHARS_PER_LINE - paymentText.length - paymentValue.length)) + paymentValue;
      parts.push(this.textToUint8Array(paymentLine + '\n'));

      // 7. FOOTER
      parts.push(this.textToUint8Array(DOUBLE_LINE + '\n'));
      parts.push(new Uint8Array([ESC, 0x61, 0x01])); // Center align

      // Thank you message
      parts.push(this.textToUint8Array('\nThank you for your business!\n'));
      parts.push(this.textToUint8Array('Please come again\n\n'));

      // Current date and time
      const now = new Date().toLocaleString('en-NG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      parts.push(this.textToUint8Array(now + '\n'));

      // Extra space before cutting
      parts.push(this.textToUint8Array('\n\n\n'));

      // Cut paper
      parts.push(new Uint8Array([GS, 0x56, 0x00]));
    };

    // Execute the receipt building - now async
    await buildReceipt();

    // Combine all parts into a single Uint8Array
    let totalLength = 0;
    for (const part of parts) {
      totalLength += part.length;
    }

    const result = new Uint8Array(totalLength);
    let offset = 0;

    for (const part of parts) {
      result.set(part, offset);
      offset += part.length;
    }

    return result;
  }

  /**
   * Convert text string to Uint8Array for printer
   */
  private textToUint8Array(text: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(text);
  }



  // Fixed fetchAndPrintLogo method
  private async fetchAndPrintLogo(logoUrl: string): Promise<Uint8Array[]> {
    const parts: Uint8Array[] = [];
    const ESC = 0x1B;
    const GS = 0x1D;

    try {
      // Fetch the image
      const response = await fetch(logoUrl);
      const blob = await response.blob();

      // Convert to base64 for processing
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = function() {
          const img = new Image();
          img.onload = function() {
            // For thermal printers, we need to resize and convert to bitmap
            // A good width for 58mm printer is around 300-350 pixels
            const canvas = document.createElement('canvas');
            const maxWidth = 350;
            const scaleFactor = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scaleFactor;

            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

              // Prepare bitmap data for printer
              // GS v 0 - Print raster bitmap
              parts.push(new Uint8Array([GS, 0x76, 0x30, 0x00]));

              // Define bitmap dimensions
              // Width in bytes (each byte is 8 pixels)
              const widthBytes = Math.ceil(canvas.width / 8);
              parts.push(new Uint8Array([widthBytes & 0xff, (widthBytes >> 8) & 0xff]));

              // Height in pixels
              parts.push(new Uint8Array([canvas.height & 0xff, (canvas.height >> 8) & 0xff]));

              // Process image data - convert to 1-bit bitmap
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;
              for (let y = 0; y < canvas.height; y++) {
                let byteValue = 0;
                let bitCount = 0;

                for (let x = 0; x < canvas.width; x++) {
                  const index = (y * canvas.width + x) * 4;
                  // Convert RGB to grayscale
                  const gray = 0.299 * data[index] + 0.587 * data[index + 1] + 0.114 * data[index + 2];

                  // Set bit if pixel is darker than threshold (0=black, 1=white in ESC/POS)
                  byteValue = (byteValue << 1) | (gray < 128 ? 0 : 1);
                  bitCount++;

                  // When we have 8 bits, add the byte to output
                  if (bitCount === 8) {
                    parts.push(new Uint8Array([byteValue]));
                    byteValue = 0;
                    bitCount = 0;
                  }
                }

                // Pad remaining bits in the last byte
                if (bitCount > 0) {
                  byteValue = byteValue << (8 - bitCount);
                  parts.push(new Uint8Array([byteValue]));
                }
              }
            }

            resolve(parts);
          };

          // Set image source to the base64 data
          img.src = reader.result as string;
        };

        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching or processing logo:', error);
      // Return an empty array if logo processing fails
      return parts;
    }
  }


}
