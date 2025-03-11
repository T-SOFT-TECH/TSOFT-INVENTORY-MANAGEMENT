// receipt.component.ts
import { Component, inject, Input, signal } from '@angular/core';
import { Sale, SaleWithDetails } from '../../interfaces/sales/sales.interfaces';
import { HotToastService } from '@ngxpert/hot-toast';
import { InvoiceService } from '../../services/invoice.service';
import { LoadingService } from '../../services/loading.service';
import { CurrencyPipe, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { SafeResourceUrlPipe } from '../../Pipes/safe-resource-url.pipe';
import { SettingsService } from '../../services/settings.service';
import {FormsModule} from '@angular/forms';

interface BluetoothDevice {
  id: string;
  name?: string;
  device?: any; // The actual device object
  characteristic?: any; // The Bluetooth characteristic for sending data
  service?: any; // The Bluetooth service
}

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgClass,
    DatePipe,
    SafeResourceUrlPipe,
    FormsModule
  ],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss'
})
export class ReceiptComponent {
  @Input() sale: Sale | null = null;

  isPreviewLoading = signal(false);
  previewUrl = signal<string | null>(null);

  manualCharacteristicUUID = '';

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


// Scan for Bluetooth devices - Fixed UUID format
  async scanForBluetoothDevices() {
    this.isScanning.set(true);
    this.bluetoothDevices.set([]);

    try {
      // Request Bluetooth devices with properly formatted UUIDs
      const device = await (navigator as any).bluetooth.requestDevice({
        // Accept all Bluetooth printers with common patterns
        filters: [
          { namePrefix: 'BT' }, // Common prefix for Bluetooth thermal printers
          { namePrefix: 'POS' },
          { namePrefix: 'Printer' },
          { namePrefix: 'SPRT' }, // Common for some thermal printers
          { namePrefix: 'TP' },   // Thermal Printer abbreviation
          { namePrefix: 'ZJ' }    // Common for Zjiang printers
        ],
        // Include all potential services used by printers with PROPER UUID formats
        optionalServices: [
          '000018f0-0000-1000-8000-00805f9b34fb',
          'e7810a71-73ae-499d-8c15-faa9aef0c3f2',
          '0000ffe0-0000-1000-8000-00805f9b34fb',
          '49535343-fe7d-4ae5-8fa9-9fafd205e455',
          '0000fff0-0000-1000-8000-00805f9b34fb' // Corrected format
        ]
      });

      if (device) {
        console.log("Found device:", device.name, device.id);
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
        this.toast.error(`Bluetooth error: ${(error as Error).message}`);
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

      // Get all available services
      const services = await server.getPrimaryServices();
      console.log('Available services:', services);

      // Try to find a service we can use for printing
      let service = null;
      let characteristic = null;

      // Common service UUIDs for ESC/POS printers
      const serviceUUIDs = [
        '000018f0-0000-1000-8000-00805f9b34fb',
        'e7810a71-73ae-499d-8c15-faa9aef0c3f2',
        '0000ffe0-0000-1000-8000-00805f9b34fb',
        '49535343-fe7d-4ae5-8fa9-9fafd205e455',
        '18f0',  // Shortened version
        'ffe0',  // Shortened version
        'fff0'   // Another common one
      ];

      // Common characteristic UUIDs for ESC/POS printers
      const characteristicUUIDs = [
        '0000ffe1-0000-1000-8000-00805f9b34fb',
        '00002af1-0000-1000-8000-00805f9b34fb',
        'ffe1',
        '2af1',
        'fff1',
        'fff2'
      ];

      // First, try the most common combinations
      for (const serviceUUID of serviceUUIDs) {
        try {
          service = await server.getPrimaryService(serviceUUID);
          console.log(`Found service: ${serviceUUID}`);

          // Try each characteristic UUID
          for (const charUUID of characteristicUUIDs) {
            try {
              characteristic = await service.getCharacteristic(charUUID);
              console.log(`Found characteristic: ${charUUID} in service ${serviceUUID}`);
              break;
            } catch (e) {
              console.log(`Characteristic ${charUUID} not found in service ${serviceUUID}`);
            }
          }

          if (characteristic) break;
        } catch (e) {
          console.log(`Service ${serviceUUID} not found`);
        }
      }

      // If we didn't find a known combination, try discovery
      if (!characteristic && services.length > 0) {
        console.log('Attempting auto-discovery of characteristics...');

        for (const svc of services) {
          try {
            console.log(`Discovering characteristics for service: ${svc.uuid}`);
            const characteristics = await svc.getCharacteristics();

            console.log(`Found ${characteristics.length} characteristics in service ${svc.uuid}:`,
              characteristics.map((c: { uuid: any; }) => c.uuid));

            // Find a characteristic with write property
            for (const char of characteristics) {
              const props = await char.getProperties();
              console.log(`Characteristic ${char.uuid} properties:`, props);

              if (props.write || props.writeWithoutResponse) {
                console.log(`Found writable characteristic: ${char.uuid}`);
                service = svc;
                characteristic = char;
                break;
              }
            }

            if (characteristic) break;
          } catch (e) {
            console.log(`Error discovering characteristics for service ${svc.uuid}:`, e);
          }
        }
      }

      // If we found a suitable characteristic
      if (characteristic) {
        // Store the connected device and its characteristic
        this.connectedDevice.set({
          ...device,
          characteristic,
          service
        });

        this.toast.success(`Connected to ${device.name || 'printer'}`);
        this.showBluetoothDialog.set(false);
      } else {
        throw new Error('No suitable characteristic found for printing');
      }
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

  // Send data to connected Bluetooth printer - Fixed version
  private async sendDataToPrinter(data: Uint8Array) {
    const device = this.connectedDevice();
    if (!device || !device.characteristic) {
      throw new Error('No printer connected');
    }

    try {
      console.log("Sending data to printer...");
      // For large data, we need to chunk it
      const CHUNK_SIZE = 20; // Common BLE MTU size

      // Try to determine if writeValueWithoutResponse is available
      let useWriteWithoutResponse = false;
      try {
        useWriteWithoutResponse = typeof device.characteristic.writeValueWithoutResponse === 'function';
        console.log("writeValueWithoutResponse available:", useWriteWithoutResponse);
      } catch (e) {
        console.log("Error checking writeValueWithoutResponse:", e);
      }

      for (let i = 0; i < data.length; i += CHUNK_SIZE) {
        const chunk = data.slice(i, i + CHUNK_SIZE);

        try {
          // First try writeValueWithoutResponse if available (better for printers)
          if (useWriteWithoutResponse) {
            await device.characteristic.writeValueWithoutResponse(chunk);
          } else {
            // Fall back to standard writeValue
            await device.characteristic.writeValue(chunk);
          }

          // Log progress for debugging
          if (i % 100 === 0) {
            console.log(`Sent ${i}/${data.length} bytes`);
          }
        } catch (chunkError) {
          console.error(`Error sending chunk at position ${i}:`, chunkError);
          // Continue with next chunk - don't abort the whole process
        }

        // Small delay between chunks to avoid buffer overflow
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      console.log("Data sent successfully!");
    } catch (error: unknown) {
      console.error('Error sending data to printer:', error);

      // Fix the TypeScript error by proper handling of unknown type
      const errorMessage = error instanceof Error
        ? error.message
        : 'Unknown error occurred';

      throw new Error(`Failed to send data to printer: ${errorMessage}`);
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


  async tryManualConnection() {
    if (!this.manualCharacteristicUUID || this.bluetoothDevices().length === 0) {
      this.toast.error('Please enter a UUID and select a device first');
      return;
    }

    const device = this.bluetoothDevices()[0];

    try {
      this.loadingService.start('Connecting with manual UUID...');
      const btDevice = device.device;

      // Connect to the GATT server
      const server = await btDevice.gatt.connect();

      // Get all services
      const services = await server.getPrimaryServices();

      if (services.length === 0) {
        throw new Error('No services found on device');
      }

      // Try the manual UUID with each service
      let characteristic = null;
      let service = null;

      for (const svc of services) {
        try {
          // Try with and without the full UUID format
          const fullUUID = this.manualCharacteristicUUID.includes('-')
            ? this.manualCharacteristicUUID
            : `0000${this.manualCharacteristicUUID}-0000-1000-8000-00805f9b34fb`;

          // Try both formats
          try {
            characteristic = await svc.getCharacteristic(fullUUID);
          } catch {
            characteristic = await svc.getCharacteristic(this.manualCharacteristicUUID);
          }

          if (characteristic) {
            service = svc;
            break;
          }
        } catch (e) {
          console.log(`Manual UUID not found in service ${svc.uuid}`);
        }
      }

      if (characteristic) {
        this.connectedDevice.set({
          ...device,
          characteristic,
          service
        });

        this.toast.success(`Connected using manual UUID`);
        this.showBluetoothDialog.set(false);
      } else {
        throw new Error(`Characteristic with UUID ${this.manualCharacteristicUUID} not found`);
      }
    } catch (error: unknown) {
      console.error('Manual connection error:', error);
      this.toast.error('Manual connection failed');
    } finally {
      this.loadingService.clear();
    }
  }


  // Alternative scanning approach for all Bluetooth devices
  async scanForAllBluetoothDevices() {
    this.isScanning.set(true);
    this.bluetoothDevices.set([]);

    try {
      // Request ALL Bluetooth devices and let user select
      const device = await (navigator as any).bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          '000018f0-0000-1000-8000-00805f9b34fb',
          'e7810a71-73ae-499d-8c15-faa9aef0c3f2',
          '0000ffe0-0000-1000-8000-00805f9b34fb',
          '49535343-fe7d-4ae5-8fa9-9fafd205e455',
          '0000fff0-0000-1000-8000-00805f9b34fb'
        ]
      });

      if (device) {
        console.log("Found device:", device.name, device.id);
        this.bluetoothDevices.update(devices => [...devices, {
          id: device.id,
          name: device.name,
          device: device
        }]);
      }
    } catch (error) {
      console.error('Bluetooth scan error:', error);
      this.toast.error(`Bluetooth error: ${(error as Error).message}`);
    } finally {
      this.isScanning.set(false);
    }
  }

// Add this to your component
  async sendTestPrint() {
    if (!this.isBluetoothConnected()) {
      this.toast.info('Please connect to a Bluetooth printer first');
      this.connectBluetoothPrinter();
      return;
    }

    try {
      this.loadingService.start('Sending test print...');

      // Create simple test data
      const encoder = new TextEncoder();
      const testData = new Uint8Array([
        0x1B, 0x40,           // Initialize printer
        0x1B, 0x61, 0x01,     // Center alignment
        ...encoder.encode("=== TEST PRINT ===\n\n"),
        ...encoder.encode("If you can read this,\nyour printer is working!\n\n\n"),
        0x1D, 0x56, 0x00      // Cut paper
      ]);

      // Send the data to the printer
      await this.sendDataToPrinter(testData);

      this.toast.success('Test print sent to printer');
    } catch (error) {
      console.error('Test print error:', error);
      this.toast.error('Failed to send test print');
    } finally {
      this.loadingService.clear();
    }
  }

}
