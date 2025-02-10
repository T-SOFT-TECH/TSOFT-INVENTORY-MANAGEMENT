// dashboard.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import {ProductService} from '../../core/services/product.service';
import {CustomerService} from '../../core/services/customer.service';
import {SalesService} from '../../core/services/sales.service';
import {HotToastService} from '@ngxpert/hot-toast';
import {Sale} from '../../core/interfaces/sales/sales.interfaces';
import {Product} from '../../core/interfaces/product/product.interfaces';

interface DashboardMetrics {
  todayRevenue: number;
  totalOrders: number;
  activeCustomers: number;
  lowStockCount: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private productService = inject(ProductService);
  private customerService = inject(CustomerService);
  private salesService = inject(SalesService);
  private toast = inject(HotToastService);

  isLoading = signal(false);
  metrics = signal<DashboardMetrics>({
    todayRevenue: 0,
    totalOrders: 0,
    activeCustomers: 0,
    lowStockCount: 0
  });

  recentSales = signal<Sale[]>([]);
  lowStockProducts = signal<Product[]>([]);
  salesChart: Chart | undefined;

  ngOnInit() {
    this.loadDashboardData();
    this.initializeCharts();
  }

  private async loadDashboardData() {
    try {
      this.isLoading.set(true);
      const [sales, lowStockProducts, customers] = await Promise.all([
        this.salesService.fetchRecentSales(),
        this.productService.getLowStockProducts(),
        this.customerService.getActiveCustomers()
      ]);

      // Transform BaseProduct to Product
      const productsWithMetrics: Product[] = lowStockProducts.map(product => ({
        ...product,
        totalQuantitySold: 0, // You might want to calculate this from sales data
        totalRevenue: 0       // You might want to calculate this from sales data
      }));

      this.recentSales.set(sales);
      this.lowStockProducts.set(productsWithMetrics);

      this.metrics.set({
        todayRevenue: this.calculateTodayRevenue(sales),
        totalOrders: sales.length,
        activeCustomers: customers.length,
        lowStockCount: productsWithMetrics.length
      });
    } catch (error) {
      this.toast.error('Failed to load dashboard data');
    } finally {
      this.isLoading.set(false);
    }
  }


  private initializeCharts() {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.salesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: '#22c55e',
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private calculateTodayRevenue(sales: Sale[]): number {
    const today = new Date().toDateString();
    return sales
      .filter(sale => new Date(sale.date).toDateString() === today)
      .reduce((total, sale) => total + sale.totalAmount, 0);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}
