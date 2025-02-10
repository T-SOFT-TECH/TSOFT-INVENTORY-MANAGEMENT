// src/app/features/sales/dashboard/sales-dashboard.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../core/services/customer.service';
import { ProductService } from '../../../core/services/product.service';
import { SalesService } from '../../../core/services/sales.service';
import {Sale} from '../../../core/interfaces/sales/sales.interfaces';
import {BaseProduct} from '../../../core/interfaces/product/product.interfaces';

interface SalesDashboardSummary {
  totalSales: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingPayments: number;
  recentSales: Sale[];
  topProducts: BaseProduct[];
  activeCustomers: number;
  lowStockItems: BaseProduct[];
}

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-dashboard.component.html'
})
export class SalesDashboardComponent {
  private customerService = inject(CustomerService);
  private productService = inject(ProductService);
  private salesService = inject(SalesService);

  isLoading = signal(false);
  error = signal<string | null>(null);
  summary = signal<SalesDashboardSummary>({
    totalSales: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    pendingPayments: 0,
    recentSales: [],
    topProducts: [],
    activeCustomers: 0,
    lowStockItems: []
  });

  constructor() {
    this.loadDashboardData();
  }

  private async loadDashboardData() {
    try {
      this.isLoading.set(true);
      const [activeCustomers, lowStockProducts, topProducts] = await Promise.all([
        this.customerService.getActiveCustomers(),
        this.productService.getLowStockProducts(),
        this.productService.getTopProducts()
      ]);

      // Calculate metrics
      this.summary.update(current => ({
        ...current,
        activeCustomers: activeCustomers.length,
        lowStockItems: lowStockProducts,
        topProducts: topProducts
      }));

    } catch (err) {
      this.error.set('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  getStatusColor(status: string): string {
    const colors = {
      'paid': 'success',
      'pending': 'warning',
      'failed': 'error'
    };
    return colors[status as keyof typeof colors] || 'gray';
  }
}
