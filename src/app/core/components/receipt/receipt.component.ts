// receipt.component.ts
import { Component, inject, Input, signal } from '@angular/core';
import { Sale, SaleWithDetails } from '../../interfaces/sales/sales.interfaces';
import { HotToastService } from '@ngxpert/hot-toast';
import { InvoiceService } from '../../services/invoice.service';
import { LoadingService } from '../../services/loading.service';
import { CurrencyPipe, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { SafeResourceUrlPipe } from '../../Pipes/safe-resource-url.pipe';
import { SettingsService } from '../../services/settings.service';

interface BluetoothDevice {
  id: string;
  name?: string;
  device?: any; // The actual device object
  characteristic?: any; // The Bluetooth characteristic for sending data
}

@Component({
  selector: 'app-receipt',
  standalone: true,
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

  // Bluetooth-related signals
  showBluetoothDialog = signal(false);
  isScanning = signal(false);
  bluetoothDevices = signal<BluetoothDevice[]>([]);
  connectedDevice = signal<BluetoothDevice | null>(null);

  private invoiceService = inject(InvoiceService);
  private toast = inject(HotToastService);
  private loadingService = inject(LoadingService);
  protected settingService = inject(SettingsService);

  // For accessing sale in the template
  get saleData() {
    return this.sale;
  }

  // Check if Bluetooth is connected
  isBluetoothConnected() {
    return this.connectedDevice() !== null;
  }

  // Connect to Bluetooth printer
  connectBluetoothPrinter() {
    // Check if Web Bluetooth API is available
    if (!('bluetooth' in navigator)) {
      this.toast.error('Bluetooth is not supported in this browser');
      return;
    }

    this.showBluetoothDialog.set(true);
    this.scanForBluetoothDevices();
  }

  // Scan for Bluetooth devices
  async scanForBluetoothDevices() {
    this.isScanning.set(true);
    this.bluetoothDevices.set([]);

    try {
      // Request Bluetooth devices
      const device = await (navigator as any).bluetooth.requestDevice({
        // Accept all Bluetooth printers that advertise as serial port
        filters: [
          { services: ['000018f0-0000-1000-8000-00805f9b34fb'] }, // Common thermal printer service
          { services: ['e7810a71-73ae-499d-8c15-faa9aef0c3f2'] }, // ESCPOS service
          { namePrefix: 'BT' }, // Common prefix for Bluetooth thermal printers
          { namePrefix: 'POS' },
          { namePrefix: 'Printer' }
        ],
        optionalServices: ['battery_service', 'device_information']
      });

      if (device) {
        this.bluetoothDevices.update(devices => [...devices, {
          id: device.id,
          name: device.name,
          device: device
        }]);
      }
    } catch (error) {
      console.error('Bluetooth scan error:', error);
      if ((error as Error).name === 'NotFoundError') {
        this.toast.info('No Bluetooth printers found');
      } else {
        this.toast.error('Error searching for Bluetooth devices');
      }
    } finally {
      this.isScanning.set(false);
    }
  }

  // Connect to selected Bluetooth device
  async connectToDevice(device: BluetoothDevice) {
    try {
      this.loadingService.start('Connecting to printer...');
      const btDevice = device.device;

      // Connect to the GATT server
      const server = await btDevice.gatt.connect();

      // Get the primary service for printing
      // (actual service UUID may vary depending on your printer)
      const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb')
        .catch(() => server.getPrimaryService('e7810a71-73ae-499d-8c15-faa9aef0c3f2'))
        .catch(() => server.getPrimaryService(0xFFE0)); // Fallback to common UUID

      // Get the characteristic for sending data
      const characteristic = await service.getCharacteristic(0xFFE1);

      // Store the connected device and its characteristic
      this.connectedDevice.set({
        ...device,
        characteristic
      });

      this.toast.success(`Connected to ${device.name || 'printer'}`);
      this.showBluetoothDialog.set(false);
    } catch (error) {
      console.error('Bluetooth connection error:', error);
      this.toast.error('Failed to connect to the printer');
    } finally {
      this.loadingService.clear();
    }
  }

  // Print to thermal printer via Bluetooth
  async printToThermal() {
    if (!this.sale) {
      this.toast.error('No sale data available');
      return;
    }

    if (!this.isBluetoothConnected()) {
      this.toast.info('Please connect to a Bluetooth printer first');
      this.connectBluetoothPrinter();
      return;
    }

    try {
      this.loadingService.start('Sending to thermal printer...');

      // Get the thermal receipt format from the invoice service
      const receiptData = await this.invoiceService.prepareThermalReceipt(this.sale.$id);

      // Send the data to the printer
      await this.sendDataToPrinter(receiptData);

      this.toast.success('Receipt sent to printer');
    } catch (error) {
      console.error('Thermal printing error:', error);
      this.toast.error('Failed to print receipt');
    } finally {
      this.loadingService.clear();
    }
  }

  // Send data to connected Bluetooth printer
  private async sendDataToPrinter(data: Uint8Array) {
    const device = this.connectedDevice();
    if (!device || !device.characteristic) {
      throw new Error('No printer connected');
    }

    // For large data, we need to chunk it
    const CHUNK_SIZE = 20; // Common BLE MTU size

    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      const chunk = data.slice(i, i + CHUNK_SIZE);
      await device.characteristic.writeValue(chunk);

      // Small delay between chunks to avoid buffer overflow
      await new Promise(resolve => setTimeout(resolve, 50));
    }
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
      return '₦0.00';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      currencyDisplay: 'narrowSymbol'
    }).format(amount);
  }

  // Test PDF generation
  async printToPos(): Promise<void> {
    if (!this.sale) {
      this.toast.error('No sale data available');
      return;
    }

    try {
      this.loadingService.start('Testing printer...');
      await this.invoiceService.testPrinter();
      this.toast.success('Test command sent to printer');
    } catch (error) {
      console.error('Printer test error:', error);
      this.toast.error('Failed to test printer');
    } finally {
      this.loadingService.clear();
    }
  }

  async loadPreview() {
    if (this.previewUrl() || !this.sale) return;

    try {
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
