import { Component, inject, Input, signal } from '@angular/core';
import {Sale, SaleWithDetails} from '../../interfaces/sales/sales.interfaces';
import { HotToastService } from '@ngxpert/hot-toast';
import { InvoiceService } from '../../services/invoice.service';
import { LoadingService } from '../../services/loading.service';
import { CurrencyPipe, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { SafeResourceUrlPipe } from '../../Pipes/safe-resource-url.pipe';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-receipt',
  imports: [
    TitleCasePipe,
    NgClass,
    DatePipe,
    SafeResourceUrlPipe
  ],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss'
})
export class ReceiptComponent {
  @Input() sale: Sale | null = null;

  isPreviewLoading = signal(false);
  previewUrl = signal<string | null>(null);

  private invoiceService = inject(InvoiceService);
  private toast = inject(HotToastService);
  private loadingService = inject(LoadingService);
  protected settingService = inject(SettingsService);

  // For accessing sale in the template
  get saleData() {
    return this.sale;
  }

  printReceipt() {
    if (!this.sale) return;

    this.loadingService.start('Preparing to print...');
    this.invoiceService.printInvoice(this.sale.$id)
      .then(() => {
        // Success is handled by the service opening the print dialog
      })
      .catch(error => {
        this.toast.error('Failed to prepare document for printing');
        console.error('Print error:', error);
      })
      .finally(() => {
        this.loadingService.clear();
      });
  }

  downloadPdf() {
    if (!this.sale) return;

    this.loadingService.start('Preparing download...');
    this.invoiceService.downloadInvoice(this.sale.$id)
      .then(() => {
        this.toast.success('Download started');
      })
      .catch(error => {
        this.toast.error('Failed to download receipt');
        console.error('Download error:', error);
      })
      .finally(() => {
        this.loadingService.clear();
      });
  }

  async emailReceipt(emailAddress?: string) {
    if (!this.sale) return;

    const email = emailAddress || this.sale.customer?.email;

    if (!email) {
      this.toast.error('No email address provided');
      return;
    }

    this.loadingService.start(`Sending receipt to ${email}...`);

    try {
      await this.invoiceService.emailInvoice(this.sale.$id, email);
      this.toast.success(`Receipt sent to ${email}`);
    } catch (error) {
      this.toast.error('Failed to send receipt');
      console.error('Email error:', error);
    } finally {
      this.loadingService.clear();
    }
  }

  // Helper method to get product name safely regardless of structure
  getProductName(item: any): string {
    return item.product?.name || item.productName || 'Unknown Product';
  }

  // Helper method to get item price safely regardless of structure
  getItemPrice(item: any): number {
    return item.priceAtSale || item.price || item.product?.price || 0;
  }

  // Helper method to calculate item total safely
  calculateItemTotal(item: any): number {
    return this.getItemPrice(item) * (item.quantity || 1);
  }

  formatCurrency(amount: number | undefined): string {
    if (amount === undefined || amount === null) {
      return '0.00'; // Return a default value when amount is undefined
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      currencyDisplay: 'narrowSymbol' // For compact currency symbol
    }).format(amount);
  }

// Add this method to receipt.component.ts
  async printToPos(): Promise<void> {
    if (!this.sale) {
      this.toast.error('No sale data available');
      return;
    }

    try {
      // Show loading indicator
      this.loadingService.start('Sending to POS printer...');

      // Call the invoice service method for POS printing
      await this.invoiceService.testPrinter();

      this.toast.success('Receipt sent to POS printer');
    } catch (error) {
      console.error('POS printing error:', error);
      this.toast.error('Failed to print to POS printer');
    } finally {
      this.loadingService.clear();
    }
  }


  async loadPreview() {
    if (this.previewUrl() || !this.sale) return;

    try {
      // Validate the sale object
      if (!this.sale.$id) {
        this.toast.error('Invalid sale data - missing ID');
        console.error('Invalid sale data:', this.sale);
        return;
      }

      console.log("Loading preview for sale:", this.sale.$id);
      this.isPreviewLoading.set(true);
      const url = await this.invoiceService.getInvoicePreviewUrl(this.sale.$id);
      this.previewUrl.set(url);
    } catch (error) {
      console.error('Error loading preview:', error);
      this.toast.error('Failed to load preview');
    } finally {
      this.isPreviewLoading.set(false);
    }
  }

}
