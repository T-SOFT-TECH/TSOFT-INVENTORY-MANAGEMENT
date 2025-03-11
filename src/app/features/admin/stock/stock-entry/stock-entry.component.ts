import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StockService } from '../../../../core/services/stock.service';
import { ProductService } from '../../../../core/services/product.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { BaseProduct } from '../../../../core/interfaces/product/product.interfaces';
import { AutoAnimationDirective } from '../../../../core/Directives/auto-Animate.directive';
import { LoadingService } from '../../../../core/services/loading.service';
import {BarcodeScannerComponent} from '../../../../core/components/barcode-scanner/barcode-scanner.component';
import {
  BatchStockItem,
  CreateStockTransactionDTO
} from '../../../../core/interfaces/stock-transaction/stock-transaction.interfaces';
import {BatchUploadComponent} from '../../../../core/components/batch-upload/batch-upload.component';
import {ImageUploadComponent} from '../../../../core/components/image-upload/image-upload.component';

interface StockFormValue {
  items: {
    productId: string;
    quantity: number;
    unitCost: number;
  }[];
  transactionDate: string;
  supplierName: string;
  supplierInvoice: string;
  reference: string;
  notes: string;
  receiptImages: File[];
}

@Component({
  selector: 'app-stock-entry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AutoAnimationDirective, BarcodeScannerComponent, BatchUploadComponent, ImageUploadComponent],
  templateUrl: './stock-entry.component.html'
})
export class StockEntryComponent implements OnInit {
  private fb = inject(FormBuilder);
  private stockService = inject(StockService);
  private productService = inject(ProductService);
  private router = inject(Router);
  private toast = inject(HotToastService);
  private loadingService = inject(LoadingService);

  isLoading = signal(false);
  products = this.productService.products;
  openStates = new Map<number, boolean>();
  searchInputValues = new Map<number, string>();
  showScanner = signal(false);
  showBatchUpload = signal(false);

  stockForm = this.fb.group({
    items: this.fb.array<FormGroup>([]),
    transactionDate: [new Date().toISOString().split('T')[0], Validators.required],
    supplierName: [''],
    supplierInvoice: [''],
    reference: [''],
    notes: [''],
    receiptImages: this.fb.control<File[]>([], { nonNullable: true })
  });

  constructor() {
    this.addStockItem();
  }

  ngOnInit() {
    this.loadInitialData();
    this.initializeFormStates();
  }

  private initializeFormStates() {
    this.stockItems.controls.forEach((_, index) => {
      this.openStates.set(index, false);
      this.searchInputValues.set(index, '');
    });
  }

  private async loadInitialData() {
    try {
      this.isLoading.set(true);
      this.loadingService.start('Loading product catalog...');

      await this.productService.refreshProducts();

      this.loadingService.start('Initializing form...');
      this.initializeFormStates();

    } catch (error) {
      this.toast.error('Failed to load products');
      console.error('Error loading products:', error);
    } finally {
      this.loadingService.clear();
      this.isLoading.set(false);
    }
  }

  get stockItems() {
    return this.stockForm.get('items') as FormArray<FormGroup>;
  }



  removeStockItem(index: number) {
    this.loadingService.start('Removing item...');

    try {
      this.stockItems.removeAt(index);
      this.openStates.delete(index);
      this.searchInputValues.delete(index);

    } finally {
      this.loadingService.clear();
    }
  }

  addStockItem() {
    this.loadingService.start('Adding new item...');

    try {
      const itemForm = this.fb.group({
        productId: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        unitCost: [0, [Validators.required, Validators.min(0)]],

      });

      const index = this.stockItems.length;
      this.openStates.set(index, false);
      this.searchInputValues.set(index, '');
      this.stockItems.push(itemForm);

    } finally {
      this.loadingService.clear();
    }
  }

  private getItemState(index: number) {
    return {
      isOpen: this.openStates.get(index) || false,
      searchTerm: this.searchInputValues.get(index) || ''
    };
  }


  getGroupedProducts(index: number) {
    const searchTerm = this.searchInputValues.get(index)?.toLowerCase() || '';
    return this.products().filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.sku.toLowerCase().includes(searchTerm)
    ).reduce((acc, product) => {
      const category = product.category.name;
      if (!acc.has(category)) acc.set(category, []);
      acc.get(category)?.push(product);
      return acc;
    }, new Map<string, BaseProduct[]>());
  }

  getSelectedProductName(index: number): string {
    const productId = this.stockItems.at(index).get('productId')?.value;
    const product = this.products().find(p => p.$id === productId);
    return product ? `${product.name} (${product.sku})` : '';
  }

  toggleDropdown(index: number) {
    this.openStates.set(index, !this.openStates.get(index));
  }

  selectProduct(product: BaseProduct, index: number) {
    const itemForm = this.stockItems.at(index);

    this.loadingService.start('Updating product selection...');

    try {
      itemForm.patchValue({
        productId: product.$id,
      });

      this.openStates.set(index, false);
      this.searchInputValues.set(index, '');
      this.stockItems.updateValueAndValidity();

    } finally {
      this.loadingService.clear();
    }
  }


  onSearchInput(event: Event, index: number) {
    const value = (event.target as HTMLInputElement).value;
    this.searchInputValues.set(index, value);
  }

  getImageUrl(fileId: string | undefined): string {
    if (!fileId) return 'assets/placeholder.png';
    return this.productService.getProductImageUrl(fileId);
  }

  calculateSubtotal(index: number): number {
    const item = this.stockItems.at(index);
    return (item.get('quantity')?.value || 0) * (item.get('unitCost')?.value || 0);
  }

  calculateTotal(): number {
    return this.stockItems.controls.reduce((total, item, index) => {
      return total + this.calculateSubtotal(index);
    }, 0);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    this.stockItems.controls.forEach((_, index) => {
      const element = document.querySelectorAll('.hs-select-wrapper')[index];
      if (element && !element.contains(event.target as Node)) {
        this.openStates.set(index, false);
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    this.openStates.forEach((_, index) => this.openStates.set(index, false));
  }

  // stock-entry.component.ts
  async onSubmit() {
    if (this.stockForm.invalid) return;

    try {
      this.isLoading.set(true);
      this.loadingService.start('Processing stock entry...');

      const formValue = this.stockForm.getRawValue();
      let imageIds: string[] = [];

      // Handle receipt images if they exist
      if (formValue.receiptImages?.length > 0) {
        this.loadingService.start('Uploading receipt images...');
        imageIds = await Promise.all(
          formValue.receiptImages.map(file =>
            this.stockService.uploadReceiptImage(file, formValue.supplierName || 'unknown_supplier')
          )
        );
      }

      // Create transaction data
      const transactionData: CreateStockTransactionDTO = {
        items: formValue.items.map(item => ({
          productId: item['productId'] || '',
          quantity: Number(item['quantity']) || 0,
          unitCost: Number(item['unitCost']) || 0
        })),
        reference: formValue.reference || undefined,
        notes: formValue.notes || undefined,
        supplierName: formValue.supplierName || undefined,
        supplierInvoice: formValue.supplierInvoice || undefined,
        receiptImageIds: imageIds.length > 0 ? imageIds : undefined
      };

      // Create stock transaction
      await this.stockService.createStockTransaction(transactionData);

      this.toast.success('Stock entry recorded successfully');
      this.router.navigate(['/admin/stock/history']);

    } catch (error) {
      console.error('Stock entry error:', error);
      this.toast.error('Failed to record stock entry');
    } finally {
      this.loadingService.clear();
      this.isLoading.set(false);
    }
  }


  onBarcodeScanned(code: string) {
    // Find product by barcode/SKU
    const product = this.products().find(p => p.sku === code);
    if (product) {
      // Find the first empty form or add a new one
      const emptyIndex = this.stockItems.controls.findIndex(
        control => !control.get('productId')?.value
      );

      if (emptyIndex >= 0) {
        this.selectProduct(product, emptyIndex);
      } else {
        this.addStockItem();
        this.selectProduct(product, this.stockItems.length - 1);
      }

      this.toast.success(`Added ${product.name}`);
    } else {
      this.toast.error('Product not found');
    }
  }

  async onBatchDataProcessed(items: BatchStockItem[]) {
    this.loadingService.start('Processing batch data...');

    try {
      for (const item of items) {
        const product = this.products().find(p => p.sku === item.sku);
        if (!product) {
          this.toast.error(`Product not found: ${item.sku}`);
          continue;
        }

        this.addStockItem();
        const lastIndex = this.stockItems.length - 1;

        this.stockItems.at(lastIndex).patchValue({
          productId: product.$id,
          quantity: item.quantity,
          unitCost: item.unitCost
        });
      }

      this.toast.success(`Added ${items.length} items to stock entry`);
    } catch (error) {
      console.error('Batch processing error:', error);
      this.toast.error('Failed to process batch data');
    } finally {
      this.loadingService.clear();
    }
  }

  onImagesChanged(files: File[]) {
    this.stockForm.patchValue({ receiptImages: files });
  }

  formatCurrency(amount: number | undefined): string {
    if (amount === undefined || amount === null) {
      return '₦0.00'; // Return a default value when amount is undefined
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      currencyDisplay: 'narrowSymbol' // For compact currency symbol
    }).format(amount);
  }

}
