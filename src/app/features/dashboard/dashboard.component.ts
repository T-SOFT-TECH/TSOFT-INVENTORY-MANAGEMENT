import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CustomerService } from '../../core/services/customer.service';
import { SalesService } from '../../core/services/sales.service';
import { Sale, Product, Customer, BaseProduct } from '../../core/models/interfaces';

interface DashboardMetrics {
  todayRevenue: number;
  todayOrders: number;
  totalCustomers: number;
  lowStockCount: number;
}

interface DashboardSummary {
  todayRevenue: number;
  todayOrders: number;
  totalCustomers: number;
  lowStockCount: number;
  metrics: DashboardMetrics;
  recentSales: Sale[];
  lowStockItems: BaseProduct[];
  activeCustomers: Customer[];
  todaySales: Sale[];
  topProducts: Product[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private salesService = inject(SalesService);
  private customerService = inject(CustomerService);
  private productService = inject(ProductService);

  isLoading = signal(false);
  error = signal<string | null>(null);




  summary = signal<DashboardSummary>({
    todayRevenue: 0,
    todayOrders: 0,
    totalCustomers: 0,
    lowStockCount: 0,
    metrics: {
      todayRevenue: 0,
      todayOrders: 0,
      totalCustomers: 0,
      lowStockCount: 0
    },
    recentSales: [],
    lowStockItems: [],
    activeCustomers: [],
    todaySales: [],
    topProducts: [] // This will be Product[]
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
        this.productService.getTopProducts() // This now returns Product[]
      ]);

      this.summary.update(current => ({
        ...current,
        activeCustomers,
        lowStockItems: lowStockProducts,
        topProducts // Now this is Product[]
      }));
    } catch (err) {
      this.error.set('Failed to load dashboard data');
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
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getStatusColor(status: string): string {
    const statusColors = {
      'completed': 'text-success-500',
      'pending': 'text-warning-500',
      'cancelled': 'text-error-500'
    };
    return statusColors[status as keyof typeof statusColors] || 'text-gray-500';
  }
} 