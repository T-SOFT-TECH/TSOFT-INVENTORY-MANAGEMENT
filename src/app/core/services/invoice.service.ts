// invoice.service.ts
import { inject, Injectable } from '@angular/core';
import { AppwriteService } from './appwrite.service';
import { environment } from '../../../environments/environment';
import { Sale } from '../interfaces/sales/sales.interfaces';
import { LoadingService } from './loading.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private appwrite = inject(AppwriteService);
  private loadingService = inject(LoadingService);
  private toast = inject(HotToastService);

  private companyInfo = {
    name: environment.company.name,
    address: environment.company.address,
    phone: environment.company.phone,
    email: environment.company.email,
    website: environment.company.website,
    logo: environment.company.logo
  };

  // Get URL to pre-rendered invoice preview
  async getInvoicePreviewUrl(saleId: string): Promise<string> {
    this.loadingService.start('Generating invoice preview...');

    try {
      const execution = await this.appwrite.functions.createExecution(
        'get-invoice-preview-python',
        JSON.stringify({ saleId })
      );

      const result = JSON.parse(execution.responseBody);
      if (!result.success) {
        console.error('Invoice preview generation failed:', result.message);
        throw new Error(result.message || 'Failed to generate preview');
      }

      return result.previewUrl;
    } catch (error) {
      console.error('Invoice preview error:', error);
      this.toast.error('Unable to generate invoice preview');
      throw error;
    } finally {
      this.loadingService.clear();
    }
  }

  // Download invoice
  async downloadInvoice(saleId: string): Promise<void> {
    this.loadingService.start('Preparing invoice download...');

    try {
      const execution = await this.appwrite.functions.createExecution(
        'get-invoice-download',
        JSON.stringify({
          saleId,
          downloadType: 'attachment'  // Specify that we want an attachment
        })
      );

      const result = JSON.parse(execution.responseBody);
      if (!result.success) {
        throw new Error(result.message || 'Failed to generate download URL');
      }

      // Open download in new tab
      window.open(result.downloadUrl, '_blank');
    } catch (error) {
      console.error('Invoice download error:', error);
      this.toast.error('Unable to download invoice');
      throw error;
    } finally {
      this.loadingService.clear();
    }
  }

  // Print invoice
  async printInvoice(saleId: string): Promise<void> {
    this.loadingService.start('Preparing invoice for printing...');

    try {
      // We can use the preview URL for printing
      const previewUrl = await this.getInvoicePreviewUrl(saleId);

      // Open in new window for printing
      const printWindow = window.open(previewUrl, '_blank');
      if (!printWindow) {
        throw new Error('Popup blocked. Please allow popups to print.');
      }

      printWindow.addEventListener('load', () => {
        setTimeout(() => {
          printWindow.print();
        }, 1000); // Give enough time for PDF to render
      });
    } catch (error) {
      console.error('Invoice print error:', error);
      this.toast.error('Unable to prepare invoice for printing');
      throw error;
    } finally {
      this.loadingService.clear();
    }
  }

  // Email invoice
  async emailInvoice(saleId: string, email: string): Promise<void> {
    this.loadingService.start(`Sending invoice to ${email}...`);

    try {
      const execution = await this.appwrite.functions.createExecution(
        'email-invoice',
        JSON.stringify({ saleId, email })
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
}
