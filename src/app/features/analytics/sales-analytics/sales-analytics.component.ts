import { Component, inject, signal } from '@angular/core';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ChartComponent } from '../../../core/components/chart/chart.component';
import { FormsModule } from '@angular/forms';
import { TooltipItem } from 'chart.js';
import { CommonModule } from '@angular/common';
import {AutoAnimationDirective} from '../../../core/Directives/auto-Animate.directive';
import {CurrencyCountUpDirective} from '../../../core/Directives/currency-countup.directive';
import {AnimatedMetricComponent} from '../../../core/components/animated-metric/animated-metric.component';

@Component({
  selector: 'app-sales-analytics',
  standalone: true,
  imports: [
    CommonModule,
    ChartComponent,
    FormsModule,
    AutoAnimationDirective,
    AnimatedMetricComponent
  ],
  templateUrl: './sales-analytics.component.html',
  styleUrl: './sales-analytics.component.scss'
})
export class SalesAnalyticsComponent {
  private analyticsService = inject(AnalyticsService);
  private loadingService = inject(LoadingService);

  // Type-safe time range keys
  readonly timeRangeKeys: Array<keyof typeof this.analyticsService.timeRanges> = [
    'today', 'yesterday', 'last7Days', 'last30Days', 'thisMonth', 'lastMonth', 'thisYear'
  ];

  // Time range related properties
  timeRanges = this.analyticsService.timeRanges;
  currentRange = this.analyticsService.currentRange;

  // Use regular properties instead of signals for two-way binding
  private _customStartDate = '';
  private _customEndDate = '';
  customRangePopup = false;

  // Getters and setters for date properties
  get customStartDate(): string {
    return this._customStartDate;
  }

  set customStartDate(value: string) {
    this._customStartDate = value;
  }

  get customEndDate(): string {
    return this._customEndDate;
  }

  set customEndDate(value: string) {
    this._customEndDate = value;
  }

  // Analytics data
  salesData = this.analyticsService.salesData;
  isLoading = this.analyticsService.isLoadingSales;

  // Chart data signals
  revenueChartData = signal<any>(null);
  categoryChartData = signal<any>(null);
  topProductsChartData = signal<any>(null);
  paymentMethodsChartData = signal<any>(null);

  // Aggregation period
  aggregation = signal<'day' | 'week' | 'month'>('day');

  // Chart options
  revenueChartOptions = {
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => '₦' + value.toLocaleString()
        }
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false
        },
        title: {
          display: true,
          text: 'Orders'
        }
      }
    }
  };

  doughnutChartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15
        }
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const label = context.label || '';
            const value = context.raw as number || 0;
            return label + ': ₦' + value.toLocaleString();
          }
        }
      }
    }
  };

  pieChartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15
        }
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const label = context.label || '';
            const value = context.raw as number || 0;
            return label + ': ₦' + value.toLocaleString();
          }
        }
      }
    }
  };

  ngOnInit() {
    // Load initial data
    this.loadData();
  }

  async loadData(options: any = {}) {
    try {
      this.loadingService.start('Loading sales analytics...');
      await this.analyticsService.getSalesAnalytics({
        ...options,
        aggregation: this.aggregation()
      });
      this.updateCharts();
    } finally {
      this.loadingService.clear();
    }
  }

  updateCharts() {
    const data = this.salesData();
    if (!data) return;

    // Revenue chart
    this.revenueChartData.set({
      labels: data.salesByTime.map(item => item.period),
      datasets: [{
        label: 'Revenue',
        data: data.salesByTime.map(item => item.revenue),
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true
      }, {
        label: 'Orders',
        data: data.salesByTime.map(item => item.orders),
        borderColor: '#10B981',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        yAxisID: 'y1'
      }]
    });

    // Category chart
    this.categoryChartData.set({
      labels: data.salesByCategory.map(cat => cat.name),
      datasets: [{
        label: 'Revenue by Category',
        data: data.salesByCategory.map(cat => cat.revenue)
      }]
    });

    // Payment methods chart
    this.paymentMethodsChartData.set({
      labels: data.paymentMethods.map(method => method.method),
      datasets: [{
        label: 'Revenue',
        data: data.paymentMethods.map(method => method.amount)
      }]
    });
  }

  setTimeRange(rangeKey: keyof typeof this.analyticsService.timeRanges) {
    this.analyticsService.setTimeRange(rangeKey);
  }

  applyCustomRange() {
    if (!this.customStartDate || !this.customEndDate) return;

    this.analyticsService.setTimeRange('custom', {
      start: new Date(this.customStartDate),
      end: new Date(this.customEndDate)
    });

    this.customRangePopup = false;
  }

  changeAggregation(period: 'day' | 'week' | 'month') {
    this.aggregation.set(period);
    this.loadData({ aggregation: period });
  }

  exportToCSV() {
    const csvContent = this.analyticsService.exportMetricsToCSV('sales');
    this.downloadCSV(csvContent, 'sales-analytics.csv');
  }

  private downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      currencyDisplay: 'narrowSymbol'
    }).format(value);
  }
}
