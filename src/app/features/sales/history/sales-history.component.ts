import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { SalesService } from '../../../core/services/sales.service';
import { LoadingService } from '../../../core/services/loading.service';
import { InvoiceService } from '../../../core/services/invoice.service';
import { CustomerService } from '../../../core/services/customer.service';
import { Sale, SaleWithDetails, SalesQueryOptions } from '../../../core/interfaces/sales/sales.interfaces';
import { Customer } from '../../../core/interfaces/customer/customer.interfaces';
import {ReceiptComponent} from '../../../core/components/receipt/receipt.component';


@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ReceiptComponent,
  ],
  templateUrl: './sales-history.component.html'
})
export class SalesHistoryComponent implements OnInit {
  private salesService = inject(SalesService);
  private customerService = inject(CustomerService);
  private invoiceService = inject(InvoiceService);
  private toast = inject(HotToastService);
  private loadingService = inject(LoadingService);
  private fb = inject(FormBuilder);

  // State
  sales = signal<Sale[]>([]);
  customers = signal<Customer[]>([]);
  selectedSale = signal<SaleWithDetails | null>(null);
  showReceiptModal = signal(false);

  //  filterForm structure
  filterForm = this.fb.group({
    dateRange: this.fb.group({
      start: [''],
      end: ['']
    }),
    customerId: [''],  // These are at the top level, not inside dateRange
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
    this.setupFilterListeners();
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
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
        startDate.setHours(0, 0, 0, 0);
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

    this.filterForm.patchValue({
      dateRange: {
        start: startDate ? this.formatDateForInput(startDate) : '',
        end: period !== 'all' ? this.formatDateForInput(new Date()) : ''
      }
    });

    this.applyFilters();
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private applyFilters() {
    const filters = this.filterForm.value;
    const queryOptions: SalesQueryOptions = {};

    // Date range
    if (filters.dateRange?.start) {
      queryOptions.startDate = new Date(filters.dateRange.start);
    }

    if (filters.dateRange?.end) {
      queryOptions.endDate = new Date(filters.dateRange.end);
    }

    // Customer filter
    if (filters.customerId) {
      queryOptions.customerId = filters.customerId;
    }

    // Status filter
    if (filters.status) {
      queryOptions.status = filters.status as any;
    }

    this.loadSalesWithFilters(queryOptions);
  }

  private async loadSalesWithFilters(options: SalesQueryOptions) {
    try {
      this.loadingService.start('Applying filters...');
      const sales = await this.salesService.fetchSales(options);
      this.sales.set(sales);
    } catch (error) {
      console.error('Failed to apply filters:', error);
      this.toast.error('Failed to apply filters');
    } finally {
      this.loadingService.clear();
    }
  }

// In the viewSaleDetails method
  async viewSaleDetails(sale: Sale) {
    try {
      this.loadingService.start('Loading sale details...');
      console.log('Original sale data:', sale);

      const saleDetails = await this.salesService.getSaleDetails(sale.$id);
      console.log('Fetched sale details:', saleDetails);

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
        return 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400';
      case 'pending':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400';
      case 'failed':
      case 'cancelled':
        return 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400';
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
      currency: 'USD'
    }).format(amount);
  }

  getCustomerName(customerId: string): string {
    if (!customerId) return 'No Customer';

    const customer = this.customers().find(c => c.$id === customerId);

    // Log for debugging
    if (!customer) {
      console.log(`Customer not found for ID: ${customerId}`);
      console.log('Available customer IDs:', this.customers().map(c => c.$id));
    }

    return customer?.name || 'Unknown Customer';
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

      // Create CSV content
      const headers = ['Invoice #', 'Date', 'Customer', 'Total', 'Status'];
      const rows = sales.map(sale => [
        sale.invoiceNumber,
        new Date(sale.date).toLocaleDateString(),
        this.getCustomerName(sale.customerId),
        sale.totalAmount.toFixed(2),
        sale.paymentStatus
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
}
