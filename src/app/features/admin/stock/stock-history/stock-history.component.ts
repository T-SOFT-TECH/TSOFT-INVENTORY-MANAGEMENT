import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../../../core/services/stock.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { StockTransaction } from '../../../../core/interfaces/stock-transaction/stock-transaction.interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';
import { AutoAnimationDirective } from '../../../../core/Directives/auto-Animate.directive';


type ModalType = 'details' | 'receipts' | null;

@Component({
  selector: 'app-stock-history',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AutoAnimationDirective
  ],
  templateUrl: './stock-history.component.html'
})
export class StockHistoryComponent {
  private stockService = inject(StockService);
  private toast = inject(HotToastService);
  private fb = inject(FormBuilder);
  private loadingService = inject(LoadingService);

  // Signals
  isLoading = signal(false);
  transactions = signal<StockTransaction[]>([]);
  filteredTransactions = signal<StockTransaction[]>([]);
  uniqueSuppliers = signal<string[]>([]);
  totalValue = signal(0);

  selectedTransaction = signal<StockTransaction | null>(null);
  activeModal = signal<ModalType>(null);

  // Form
  filterForm: FormGroup = this.fb.group({
    dateRange: this.fb.group({
      start: [''],
      end: ['']
    }),
    supplier: [''],
    status: [''],
    searchTerm: ['']
  });

  constructor() {
    // Set up form value changes subscription
    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilters();
    });

    // Load initial data
    this.loadTransactions();

    // Set up effects
    effect(() => {
      // Update unique suppliers when transactions change
      const suppliers = [...new Set(
        this.transactions()
          .map(t => t.supplierName)
          .filter(Boolean) as string[]
      )].sort();
      this.uniqueSuppliers.set(suppliers);

      // Calculate total value
      const total = this.transactions().reduce((sum, t) => sum + t.totalCost, 0);
      this.totalValue.set(total);
    });
  }

  private async loadTransactions() {
    try {
      this.isLoading.set(true);
      this.loadingService.start('Loading stock history...');

      const transactions = await this.stockService.getStockHistory();
      this.transactions.set(transactions);
      this.filteredTransactions.set(transactions);

    } catch (error) {
      this.toast.error('Failed to load stock history');
      console.error('Error loading transactions:', error);
    } finally {
      this.loadingService.clear();
      this.isLoading.set(false);
    }
  }

  applyFilters() {
    const filters = this.filterForm.value;
    let filtered = this.transactions();

    // Apply date range filter
    if (filters.dateRange.start) {
      const startDate = new Date(filters.dateRange.start);
      filtered = filtered.filter(t =>
        new Date(t.transactionDate) >= startDate
      );
    }

    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end);
      endDate.setHours(23, 59, 59);
      filtered = filtered.filter(t =>
        new Date(t.transactionDate) <= endDate
      );
    }

    // Apply supplier filter
    if (filters.supplier) {
      filtered = filtered.filter(t =>
        t.supplierName?.toLowerCase().includes(filters.supplier.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    // Apply search term
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.reference?.toLowerCase().includes(searchTerm) ||
        t.supplierName?.toLowerCase().includes(searchTerm) ||
        t.supplierInvoice?.toLowerCase().includes(searchTerm) ||
        t.notes?.toLowerCase().includes(searchTerm) ||
        t.products.some(p =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.sku.toLowerCase().includes(searchTerm)
        )
      );
    }

    this.filteredTransactions.set(filtered);
  }

  resetFilters() {
    this.filterForm.reset({
      dateRange: {
        start: '',
        end: ''
      },
      supplier: '',
      status: '',
      searchTerm: ''
    });
    this.filteredTransactions.set(this.transactions());
  }

  getStatusOptions(): string[] {
    return ['completed', 'pending', 'cancelled'];
  }



  viewTransactionDetails(transaction: StockTransaction) {
    this.selectedTransaction.set(transaction);
    this.activeModal.set('details');
  }

  closeModal() {
    this.selectedTransaction.set(null);
    this.activeModal.set(null);
  }

  calculateTotalQuantity(transaction: StockTransaction): number {
    return transaction.quantities.reduce((sum, qty) => sum + qty, 0);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  async exportHistory() {
    try {
      this.isLoading.set(true);
      this.loadingService.start('Preparing export...');

      // Implementation for exporting to Excel/CSV will go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay

      this.toast.success('History exported successfully');
    } catch (error) {
      this.toast.error('Failed to export history');
      console.error('Export error:', error);
    } finally {
      this.loadingService.clear();
      this.isLoading.set(false);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  }

  viewReceipts(transaction: StockTransaction) {
    if (transaction.receiptImageIds?.length) {
      this.selectedTransaction.set(transaction);
      this.activeModal.set('receipts');
    } else {
      this.toast.info('No receipts available for this transaction');
    }
  }

  getReceiptUrl(imageId: string): string {
    return this.stockService.getReceiptImageUrl(imageId);
  }

  async getReceiptPreview(imageId: string): Promise<string> {
    return await this.stockService.getReceiptPreview(imageId);
  }

  openReceipt(imageId: string) {
    const url = this.stockService.getReceiptImageUrl(imageId);
    window.open(url, '_blank');
  }

  downloadReceipt(imageId: string) {
    const url = this.stockService.getReceiptImageUrl(imageId);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${imageId}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
