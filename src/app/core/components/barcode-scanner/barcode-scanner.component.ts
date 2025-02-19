import { Component, ElementRef, EventEmitter, inject, OnInit, OnDestroy, Output, signal, ViewChild } from '@angular/core';
import { BarcodeFormat, BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { DecodeHintType } from '@zxing/library';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barcode-scanner.component.html',
  styleUrl: './barcode-scanner.component.scss'
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @Output() codeScanned = new EventEmitter<string>();

  private codeReader: BrowserMultiFormatReader;
  private currentDeviceId = 0;
  private scannerControls: IScannerControls | undefined;
  private toast = inject(HotToastService);

  isScanning = false;
  deviceCount = signal(0);

  constructor() {
    const hints = new Map<DecodeHintType, any>();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
      BarcodeFormat.DATA_MATRIX
    ]);

    this.codeReader = new BrowserMultiFormatReader(hints);
  }

  async ngOnInit() {
    try {
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      this.deviceCount.set(devices.length);
    } catch (err) {
      console.error('Error accessing camera:', err);
      this.toast.error('Failed to access camera');
    }
  }

  ngOnDestroy() {
    this.stopScanning();
  }

  async toggleScanner() {
    if (this.isScanning) {
      this.stopScanning();
    } else {
      await this.startScanning();
    }
  }

  private async startScanning() {
    try {
      const video = this.videoElement.nativeElement;
      if (!video) {
        throw new Error('Video element not found');
      }

      this.isScanning = true;
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();

      if (devices.length === 0) {
        throw new Error('No camera devices found');
      }

      this.scannerControls = await this.codeReader.decodeFromVideoDevice(
        devices[this.currentDeviceId].deviceId,
        video,
        (result, error) => {
          if (result) {
            this.codeScanned.emit(result.getText());
            // Optionally stop scanning after successful scan
            // this.stopScanning();
          }
          if (error) {
            console.error('Scanning error:', error);
          }
        }
      );
    } catch (err) {
      console.error('Error starting scanner:', err);
      this.toast.error('Failed to start camera');
      this.isScanning = false;
    }
  }

  private stopScanning() {
    if (this.scannerControls) {
      this.scannerControls.stop();
      this.scannerControls = undefined;
    }
    this.isScanning = false;
  }

  async switchCamera() {
    try {
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      if (devices.length > 1) {
        this.currentDeviceId = (this.currentDeviceId + 1) % devices.length;

        if (this.isScanning) {
          this.stopScanning();
          await this.startScanning();
        }
      } else {
        this.toast.error('No additional cameras found');
      }
    } catch (error) {
      console.error('Error switching camera:', error);
      this.toast.error('Failed to switch camera');
    }
  }
}
