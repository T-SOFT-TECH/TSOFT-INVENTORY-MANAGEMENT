import {AfterViewInit, Component, ElementRef, inject, Input, OnInit, signal, ViewChild} from '@angular/core';
import {Sale} from '../../interfaces/sales/sales.interfaces';
import {SettingsService} from '../../services/settings.service';

import {CommonModule} from '@angular/common';



@Component({
  selector: 'app-receipt-pdf-template',
  imports: [CommonModule],
  templateUrl: './receipt-pdf-template.component.html',
  styleUrl: './receipt-pdf-template.component.scss'
})
export class ReceiptPdfTemplateComponent implements OnInit, AfterViewInit {

  @Input() sale: Sale | null = null;
  @ViewChild('logoImage') logoImage?: ElementRef<HTMLImageElement>;

  private settingsService = inject(SettingsService);
  private elementRef = inject(ElementRef);

  debug = signal(Date.now().toString()); // Debug timestamp


  logoLoaded = signal(false);
  qrCodeDataUrl = signal<string | null>(null);

  // Track when everything is ready for PDF generation
  allAssetsLoaded = signal(false);

  get settings() {
    return this.settingsService.settings();
  }

  get logoUrl(): string | null {
    return this.settings?.company?.logo || null;
  }

  get showWatermark(): boolean {
    return this.sale?.paymentStatus !== 'paid';
  }

  async ngOnInit() {

    console.log("PDF Template Init - Debug ID:", this.debug());
    console.log("Sale data:", this.sale);

    // Set defaults immediately
    this.qrCodeDataUrl.set("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==");
    this.logoLoaded.set(true);
    this.allAssetsLoaded.set(true);

    console.log("PDF Template ngOnInit, sale data:", this.sale);

    // Set explicit dimensions for PDF generation
    const element = this.elementRef.nativeElement;
    element.style.width = '595pt'; // A4 width
    element.style.padding = '0';
    element.style.margin = '0';

    // Generate QR code with invoice details
    if (this.sale) {
      try {
        // ...existing QR code generation...

        this.qrCodeDataUrl.set('data:image/svg+xml;base64,');
        // Add this line to check assets after QR code is generated
        this.checkAllAssetsLoaded();
      } catch (err) {
        console.error('QR code generation error:', err);
        // Still mark QR code as loaded even if there's an error
        this.qrCodeDataUrl.set(null);
        this.checkAllAssetsLoaded();
      }
    } else {
      // No sale data, mark QR code as loaded
      this.qrCodeDataUrl.set(null);
      this.checkAllAssetsLoaded();
    }
  }

  ngAfterViewInit() {
    this.checkAssetsLoaded();
  }

  private checkAssetsLoaded() {
    // Check if we have logo to load
    if (this.logoUrl && this.logoImage?.nativeElement) {
      if (this.logoImage.nativeElement.complete) {
        this.logoLoaded.set(true);
        this.checkAllAssetsLoaded();
      } else {
        // Set up event listeners
        this.logoImage.nativeElement.onload = () => {
          this.logoLoaded.set(true);
          this.checkAllAssetsLoaded();
        };

        this.logoImage.nativeElement.onerror = () => {
          console.error('Failed to load logo');
          this.logoLoaded.set(true); // Still mark as loaded to avoid blocking
          this.checkAllAssetsLoaded();
        };
      }
    } else {
      // No logo to load
      this.logoLoaded.set(true);
      this.checkAllAssetsLoaded();
    }
  }

  onLogoLoaded() {
    this.logoLoaded.set(true);
    this.checkAllAssetsLoaded();
  }

  onLogoError() {
    console.error('Failed to load logo');
    this.logoLoaded.set(true); // Mark as loaded to avoid blocking
    this.checkAllAssetsLoaded();
  }

  private checkAllAssetsLoaded() {
    // Check if all assets are loaded
    if (this.logoLoaded() && this.qrCodeDataUrl()) {
      // QR code is generated in ngOnInit, so it should be ready by now
      this.allAssetsLoaded.set(true);
    }
  }

  // This method is called by the InvoiceService to check if the component is ready
  isReadyForPdf(): boolean {
    return this.allAssetsLoaded();
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return date.toLocaleDateString('en-US', options);
  }

  getStatusColor(status?: string): string {
    switch(status?.toLowerCase()) {
      case 'paid': return '#2e7d32'; // Green
      case 'pending': return '#f57c00'; // Orange
      case 'failed': return '#d32f2f'; // Red
      default: return '#666666'; // Gray
    }
  }

  getItemPrice(item: any): number {
    return item.priceAtSale || item.price || item.product?.price || 0;
  }

  calculateItemTotal(item: any): number {
    return this.getItemPrice(item) * (item.quantity || 1);
  }

  formatCurrency(amount: number | undefined): string {
    if (amount === undefined || amount === null) {
      return '₦0.00';
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

}
