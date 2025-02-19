import {Component, inject, Input, signal} from '@angular/core';
import {SaleWithDetails} from '../../interfaces/sales/sales.interfaces';
import {HotToastService} from '@ngxpert/hot-toast';
import {InvoiceService} from '../../services/invoice.service';
import {LoadingService} from '../../services/loading.service';
import {CurrencyPipe, DatePipe, NgClass, TitleCasePipe} from '@angular/common';
import {SafeResourceUrlPipe} from '../../Pipes/safe-resource-url.pipe';

@Component({
  selector: 'app-receipt',
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    NgClass,
    DatePipe,
    SafeResourceUrlPipe
  ],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss'
})
export class ReceiptComponent {



  @Input() set sale(value: any) {
    if (value) {
      console.log('Raw sale data received by receipt:', value);
      const normalizedSale = this.normalizeReceiptData(value);
      console.log('Normalized sale data:', normalizedSale);
      this._sale.set(normalizedSale);
    }
  }

  private _sale = signal<SaleWithDetails | null>(null);
  isPreviewLoading = signal(false);
  previewUrl = signal<string | null>(null);

  private invoiceService = inject(InvoiceService);
  private toast = inject(HotToastService);
  private loadingService = inject(LoadingService);

  // For accessing sale in the template
  get saleData() {
    return this._sale();
  }

  // Load preview only when requested
  async loadPreview() {
    if (this.previewUrl() || !this._sale()) return;

    const sale = this._sale();
    if (!sale) return;

    try {
      this.isPreviewLoading.set(true);
      const url = await this.invoiceService.getInvoicePreviewUrl(sale.$id);
      this.previewUrl.set(url);
    } catch (error) {
      console.error('Error loading preview:', error);
      this.toast.error('Failed to load preview');
    } finally {
      this.isPreviewLoading.set(false);
    }
  }

  printReceipt() {
    const sale = this._sale();
    if (!sale) return;

    this.loadingService.start('Preparing to print...');
    this.invoiceService.printInvoice(sale.$id)
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
    const sale = this._sale();
    if (!sale) return;

    this.loadingService.start('Preparing download...');
    this.invoiceService.downloadInvoice(sale.$id)
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
    const sale = this._sale();
    if (!sale) return;

    const email = emailAddress || sale.customer?.email;

    if (!email) {
      this.toast.error('No email address provided');
      return;
    }

    this.loadingService.start(`Sending receipt to ${email}...`);

    try {
      await this.invoiceService.emailInvoice(sale.$id, email);
      this.toast.success(`Receipt sent to ${email}`);
    } catch (error) {
      this.toast.error('Failed to send receipt');
      console.error('Email error:', error);
    } finally {
      this.loadingService.clear();
    }
  }

  // Helper methods to handle different item structures
  getProductName(item: any): string {
    // Handle different possible structures
    if (item.product?.name) {
      return item.product.name;
    } else if (item.productName) {
      return item.productName;
    } else {
      return 'Unknown Product';
    }
  }

  getItemPrice(item: any): number {
    // Handle different price fields
    if (typeof item.priceAtSale === 'number') {
      return item.priceAtSale;
    } else if (typeof item.price === 'number') {
      return item.price;
    } else if (item.product?.price) {
      return item.product.price;
    } else {
      return 0;
    }
  }

  calculateItemTotal(item: any): number {
    return this.getItemPrice(item) * (item.quantity || 1);
  }

  private normalizeReceiptData(sale: any): SaleWithDetails {
    // Create a normalized version of the sale data
    return {
      ...sale,
      $id: sale.$id || sale.id,
      invoiceNumber: sale.invoiceNumber || `INV-${Date.now()}`,
      totalAmount: sale.totalAmount || sale.total || 0,
      subtotal: sale.subtotal || (sale.totalAmount ? sale.totalAmount / 1.1 : 0),
      tax: sale.tax || (sale.totalAmount ? sale.totalAmount * 0.1 : 0),
      date: sale.date || new Date().toISOString(),
      paymentStatus: sale.paymentStatus || 'paid',
      status: sale.status || 'completed',
      paymentMethod: sale.paymentMethod || 'cash',
      customer: this.normalizeCustomer(sale.customer),
      products: this.normalizeProducts(sale.products || sale.items || [])
    };
  }

  private normalizeCustomer(customer: any): any {
    if (!customer) return null;

    // Ensure consistent customer structure
    return {
      id: customer.id || customer.$id,
      name: customer.name || 'Customer',
      email: customer.email || '',
      phone: customer.phone || ''
    };
  }

  private normalizeProducts(items: any[]): any[] {
    if (!items || !Array.isArray(items)) return [];

    return items.map(item => {
      // If item already has necessary structure, return as is
      if (item.product && item.quantity && item.priceAtSale) {
        return item;
      }

      // Otherwise create normalized structure
      return {
        productId: item.productId || item.product?.$id || '',
        quantity: item.quantity || 1,
        priceAtSale: this.getItemPrice(item),
        product: {
          id: item.productId || item.product?.$id || '',
          name: this.getProductName(item),
          sku: item.product?.sku || '',
          imageUrl: item.product?.imageUrl || item.product?.imageId || ''
        }
      };
    });
  }

}
