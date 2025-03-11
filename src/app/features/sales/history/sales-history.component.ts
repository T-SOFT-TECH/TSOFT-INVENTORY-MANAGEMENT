import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { SalesService } from '../../../core/services/sales.service';
import { LoadingService } from '../../../core/services/loading.service';
import { CustomerService } from '../../../core/services/customer.service';
import { Sale, SaleWithDetails, SalesQueryOptions, } from '../../../core/interfaces/sales/sales.interfaces';
import { Customer } from '../../../core/interfaces/customer/customer.interfaces';
import {ReceiptComponent} from '../../../core/components/receipt/receipt.component';
import {PaymentStatus} from '../../../core/interfaces/base/base.interfaces';
import {AutoAnimationDirective} from '../../../core/Directives/auto-Animate.directive';

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ReceiptComponent,
    AutoAnimationDirective,
  ],
  templateUrl: './sales-history.component.html'
})
export class SalesHistoryComponent implements OnInit {
  private salesService = inject(SalesService);
  private customerService = inject(CustomerService);
  private toast = inject(HotToastService);
  private loadingService = inject(LoadingService);
  private fb = inject(FormBuilder);

  // State
  sales = signal<Sale[]>([]);
  customers = signal<Customer[]>([]);
  selectedSale = signal<SaleWithDetails | null>(null);
  showReceiptModal = signal(false);


  showPaymentModal = signal(false);
  currentSaleId = signal<string | null>(null);
  selectedPaymentMethod = signal<'cash' | 'card' | 'transfer'>('cash');

  showFilters = signal(false);


  // Sorting
  sortField = signal<string>('date');
  sortDirection = signal<'asc' | 'desc'>('desc');

  //  filterForm structure
  filterForm = this.fb.group({
    dateRange: this.fb.group({
      start: [''],
      end: ['']
    }),
    customerId: [''],
    status: [''],
    searchTerm: ['']
  });

  // Period selections
  periods = [
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'This Year', value: 'year' },
    { label: 'All Time', value: 'all' }
  ];
  selectedPeriod = signal('month');



  ngOnInit() {
    this.loadInitialData();
    //this.setupFilterListeners();
  }

  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  private async loadInitialData() {
    try {
      this.loadingService.start('Loading sales history...');

      const [sales, customers] = await Promise.all([
        this.salesService.fetchSales(),
        this.customerService.getCustomers()
      ]);

      this.sales.set(sales);
      this.customers.set(customers);

      // Set default period filter (this month)
      this.applyPeriodFilter('month');

      // Apply default sorting (newest first)
      this.sortSales('date');

    } catch (error) {
      console.error('Failed to load sales data:', error);
      this.toast.error('Failed to load sales history');
    } finally {
      this.loadingService.clear();
    }
  }

  private setupFilterListeners() {
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyPeriodFilter(period: string) {
    this.selectedPeriod.set(period);

    const now = new Date();
    let startDate: Date | null = null;

    switch(period) {
      case 'today':
        // Just use today's date without manipulating it further
        startDate = new Date(now);
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - now.getDay());
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'all':
        startDate = null;
        break;
    }

    // For all periods except 'all', the end date is today
    const endDate = period !== 'all' ? new Date(now) : null;

    this.filterForm.patchValue({
      dateRange: {
        start: startDate ? this.formatDateForInput(startDate) : '',
        end: endDate ? this.formatDateForInput(endDate) : ''
      }
    });

    this.applyFilters();
  }

  private formatDateForInput(date: Date): string {
    // Format the date in YYYY-MM-DD format using local timezone
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private applyFilters() {
    const filters = this.filterForm.value;
    const queryOptions: SalesQueryOptions = {};

    // Date range
    if (filters.dateRange?.start) {
      const startDate = new Date(filters.dateRange.start);
      // Make sure we're using the start of the day (00:00:00.000)
      startDate.setHours(0, 0, 0, 0);
      queryOptions.startDate = startDate;
    }

    if (filters.dateRange?.end) {
      const endDate = new Date(filters.dateRange.end);
      // Make sure we're using the end of the day (23:59:59.999)
      endDate.setHours(23, 59, 59, 999);
      queryOptions.endDate = endDate;
    }

    // Customer filter
    if (filters.customerId) {
      queryOptions.customerId = filters.customerId;
    }

    // Status filter
    if (filters.status) {
      queryOptions.status = filters.status as PaymentStatus;
    }

    // Search term
    if (filters.searchTerm) {
      queryOptions.searchTerm = filters.searchTerm;
    }

    this.loadSalesWithFilters(queryOptions);
  }

  private async loadSalesWithFilters(options: SalesQueryOptions) {
    try {
      this.loadingService.start('Applying filters...');
      const sales = await this.salesService.fetchSales(options);
      this.sales.set(sales);

      // Re-apply current sorting
      this.sortSales(this.sortField());
    } catch (error) {
      console.error('Failed to apply filters:', error);
      this.toast.error('Failed to apply filters');
    } finally {
      this.loadingService.clear();
    }
  }

  sortSales(field: string) {
    if (this.sortField() === field) {
      // Toggle direction if clicking the same field
      this.sortDirection.update(current => current === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      this.sortField.set(field);
      this.sortDirection.set('desc');
    }

    // Apply sorting
    this.sales.update(currentSales => {
      return [...currentSales].sort((a, b) => {
        const direction = this.sortDirection() === 'asc' ? 1 : -1;

        switch (field) {
          case 'date':
            return (new Date(a.date).getTime() - new Date(b.date).getTime()) * direction;
          case 'amount':
            return (a.totalAmount - b.totalAmount) * direction;
          case 'invoiceNumber':
            // Extract numeric part if invoice numbers follow a pattern like INV-00001
            const numA = parseInt(a.invoiceNumber.replace(/\D/g, '') || '0');
            const numB = parseInt(b.invoiceNumber.replace(/\D/g, '') || '0');
            return (numA - numB) * direction;
          case 'status':
            return a.paymentStatus.localeCompare(b.paymentStatus) * direction;
          case 'customer':
            return a.customer.name.localeCompare(b.customer.name) * direction;
          case 'paymentMethod':
            return (a.paymentMethod || '').localeCompare(b.paymentMethod || '') * direction;
          case 'salesRep':
            return a.salesRep.localeCompare(b.salesRep) * direction;
          default:
            return 0;
        }
      });
    });
  }

  getSortIndicator(field: string): string {
    if (this.sortField() !== field) return '';
    return this.sortDirection() === 'asc' ? '↑' : '↓';
  }

  async viewSaleDetails(sale: Sale) {
    try {
      this.loadingService.start('Loading sale details...');

      const saleDetails = await this.salesService.getSaleDetails(sale.$id);
      console.log('Sale details structure:', {
        hasProducts: !!saleDetails.products,
        productCount: saleDetails.products?.length,
        firstProduct: saleDetails.products?.[0]
      });

      this.selectedSale.set(saleDetails);
      this.showReceiptModal.set(true);
    } catch (error) {
      console.error('Failed to load sale details:', error);
      this.toast.error('Failed to load sale details');
    } finally {
      this.loadingService.clear();
    }
  }

  closeReceiptModal() {
    this.showReceiptModal.set(false);
    setTimeout(() => {
      this.selectedSale.set(null);
    }, 300);
  }

  getStatusClass(status: string): string {
    // Normalize status to lowercase
    const normalizedStatus = status?.toLowerCase() || '';

    switch (normalizedStatus) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      currencyDisplay: 'narrowSymbol'
    }).format(amount);
  }

  exportToCsv() {
    try {
      this.loadingService.start('Exporting sales data...');

      // Get filtered sales
      const sales = this.sales();
      if (sales.length === 0) {
        this.toast.error('No sales data to export');
        return;
      }

      // Create CSV content with payment method included
      const headers = ['Invoice #', 'Date', 'Customer', 'Total', 'Status', 'Payment Method'];
      const rows = sales.map(sale => [
        sale.invoiceNumber,
        new Date(sale.date).toLocaleDateString(),
        sale.customer.name,
        sale.totalAmount.toFixed(2),
        sale.paymentStatus,
        sale.paymentMethod || 'N/A'
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `sales_export_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();

      this.toast.success('Export completed');
    } catch (error) {
      console.error('Export failed:', error);
      this.toast.error('Failed to export data');
    } finally {
      this.loadingService.clear();
    }
  }

  openPaymentModal(saleId: string) {
    this.currentSaleId.set(saleId);
    this.selectedPaymentMethod.set('cash'); // Reset to default
    this.showPaymentModal.set(true);
  }



  async updatePaymentStatus(saleId: string, newStatus: PaymentStatus, paymentMethod?: string) {
    try {
      this.loadingService.start(`Updating payment status...`);

      // Pass payment method if provided
      await this.salesService.updatePaymentStatus(saleId, newStatus, paymentMethod);

      // Refresh the sales list
      await this.loadInitialData();

      this.showPaymentModal.set(false);
      this.toast.success(`Payment status updated successfully`);
    } catch (error) {
      console.error('Failed to update payment status:', error);
      this.toast.error('Failed to update payment status');
    } finally {
      this.loadingService.clear();
    }
  }


  confirmPayment() {
    if (!this.currentSaleId()) return;
    this.updatePaymentStatus(
      this.currentSaleId()!,
      'paid',
      this.selectedPaymentMethod()
    );
  }

}

