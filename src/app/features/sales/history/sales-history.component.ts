import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { SalesService } from '../../../core/services/sales.service';

import { SaleWithDetails, SalesQueryOptions, PaymentStatus, Sale, Customer } from '../../../core/models/interfaces';
import { from } from 'rxjs';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sales-history.component.html'
})
export class SalesHistoryComponent {
  private salesService = inject(SalesService);
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);

  sales = toSignal(from(this.salesService.fetchSalesWithDetails()), {
    initialValue: [] as SaleWithDetails[]
  });
  
  customers = toSignal(from(this.customerService.getCustomers()), {
    initialValue: [] as Customer[]
  });

  isLoading = signal(false);
  error = signal<string | null>(null);
  selectedSale = signal<SaleWithDetails | null>(null);
  showInvoiceModal = signal(false);

  filterForm = this.fb.group({
    startDate: [''],
    endDate: [''],
    customerId: [''],
    status: [''] as unknown as PaymentStatus | ''
  });

  constructor() {
    this.loadInitialData();
    
    // Subscribe to filter changes
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  private async loadInitialData() {
    try {
      this.isLoading.set(true);
      await Promise.all([
        this.salesService.fetchSales(),
        this.customerService.getCustomers()
      ]);
    } catch (err) {
      this.error.set('Failed to load sales data');
    } finally {
      this.isLoading.set(false);
    }
  }

  private async applyFilters() {
    try {
      this.isLoading.set(true);
      const filters = this.filterForm.value;
      
      const queryOptions: SalesQueryOptions = {
        startDate: filters.startDate ? new Date(filters.startDate) : undefined,
        endDate: filters.endDate ? new Date(filters.endDate) : undefined,
        customerId: filters.customerId || undefined,
        status: (filters.status as PaymentStatus) || undefined
      };

      await this.salesService.fetchSales(queryOptions);
    } catch (err) {
      this.error.set('Failed to apply filters');
    } finally {
      this.isLoading.set(false);
    }
  }

  viewSaleDetails(sale: Sale | SaleWithDetails) {
    // Type guard to ensure we have a SaleWithDetails
    if ('product' in sale.products[0]) {
      this.selectedSale.set(sale as SaleWithDetails);
    } else {
      // Fetch detailed sale data if needed
      this.loadSaleDetails(sale.id);
    }
  }

  async updateSaleStatus(saleId: string, status: PaymentStatus) {
    try {
      await this.salesService.updateSale(saleId, { paymentStatus: status });
    } catch (err) {
      this.error.set('Failed to update sale status');
    }
  }

  generateInvoice(sale: Sale | SaleWithDetails) {
    // Type guard to ensure we have a SaleWithDetails
    if ('product' in sale.products[0]) {
      this.salesService.generateInvoice(sale as SaleWithDetails);
    } else {
      // Fetch detailed sale data if needed
      this.loadSaleDetailsAndGenerateInvoice(sale.id);
    }
  }

  private async loadSaleDetails(saleId: string) {
    try {
      const saleDetails = await this.salesService.getSaleDetails(saleId);
      this.selectedSale.set(saleDetails);
    } catch (error) {
      this.error.set('Failed to load sale details');
    }
  }

  private async loadSaleDetailsAndGenerateInvoice(saleId: string) {
    try {
      const saleDetails = await this.salesService.getSaleDetails(saleId);
      this.salesService.generateInvoice(saleDetails);
    } catch (error) {
      this.error.set('Failed to generate invoice');
    }
  }
  getStatusColor(status: PaymentStatus): string {
    const statusColors = {
      'paid': 'text-success-500',
      'pending': 'text-warning-500',
      'failed': 'text-error-500'
    };
    return statusColors[status] || 'text-gray-500';
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

  calculateTotal(sale: SaleWithDetails): number {
    return sale.products.reduce((sum, item) => 
      sum + (item.quantity * item.priceAtSale), 0
    );
  }

  getPaymentStatusOptions(): PaymentStatus[] {
    return ['paid', 'pending', 'failed'];
  }
} 