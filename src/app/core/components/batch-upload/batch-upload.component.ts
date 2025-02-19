import {Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {HotToastService} from '@ngxpert/hot-toast';
import { LoadingService } from '../../services/loading.service';
import {CurrencyPipe} from '@angular/common';
import {BatchStockItem} from '../../interfaces/stock-transaction/stock-transaction.interfaces';
import { read, utils, writeFile } from 'xlsx';



@Component({
  selector: 'app-batch-upload',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './batch-upload.component.html',
  styleUrl: './batch-upload.component.scss'
})
export class BatchUploadComponent {

  @Output() dataProcessed = new EventEmitter<BatchStockItem[]>();

  private toast = inject(HotToastService);
  private loadingService = inject(LoadingService);

  parsedData = signal<BatchStockItem[]>([]);

  async onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      this.loadingService.start('Reading file...');
      const data = await this.readFile(file);
      this.validateAndSetData(data);
    } catch (error) {
      console.error('File processing error:', error);
      this.toast.error('Failed to process file');
    } finally {
      this.loadingService.clear();
    }
  }

  private async readFile(file: File): Promise<BatchStockItem[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = read(data, { type: 'binary' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = utils.sheet_to_json(worksheet);

          resolve(jsonData as BatchStockItem[]);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  }

  private validateAndSetData(data: any[]) {
    const validatedData: BatchStockItem[] = [];
    const errors: string[] = [];

    data.forEach((row, index) => {
      if (!row.sku || !row.quantity || !row.unitCost) {
        errors.push(`Row ${index + 1}: Missing required fields`);
        return;
      }

      if (isNaN(row.quantity) || row.quantity <= 0) {
        errors.push(`Row ${index + 1}: Invalid quantity`);
        return;
      }

      if (isNaN(row.unitCost) || row.unitCost <= 0) {
        errors.push(`Row ${index + 1}: Invalid unit cost`);
        return;
      }

      validatedData.push({
        sku: row.sku.toString(),
        quantity: Number(row.quantity),
        unitCost: Number(row.unitCost),
        supplierReference: row.supplierReference
      });
    });

    if (errors.length > 0) {
      this.toast.error(`Validation errors found:\n${errors.join('\n')}`);
      return;
    }

    this.parsedData.set(validatedData);
    this.toast.success(`Successfully parsed ${validatedData.length} items`);
  }

  downloadTemplate() {
    const template = [
      {
        sku: 'SKU123',
        quantity: 10,
        unitCost: 1000,
        supplierReference: 'INV-001'
      }
    ];

    const ws = utils.json_to_sheet(template);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Template');

    writeFile(wb, 'stock-upload-template.xlsx');
  }

  clearData() {
    this.parsedData.set([]);
  }

  processData() {
    this.dataProcessed.emit(this.parsedData());
    this.clearData();
  }

}
