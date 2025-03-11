import {Component, inject, OnInit, signal} from '@angular/core';
import {AnalyticsService} from '../../../core/services/analytics.service';
import {LoadingService} from '../../../core/services/loading.service';
import {ChartComponent} from '../../../core/components/chart/chart.component';
import {AutoAnimationDirective} from '../../../core/Directives/auto-Animate.directive';
import {AnimatedMetricComponent} from '../../../core/components/animated-metric/animated-metric.component';

@Component({
  selector: 'app-inventory-status',
  imports: [
    ChartComponent,
    AutoAnimationDirective,
    AnimatedMetricComponent
  ],
  templateUrl: './inventory-status.component.html',
  styleUrl: './inventory-status.component.scss'
})
export class InventoryStatusComponent implements OnInit {

  private analyticsService = inject(AnalyticsService);
  private loadingService = inject(LoadingService);

  // Time range properties (similar to sales-analytics)
  timeRanges = this.analyticsService.timeRanges;
  currentRange = this.analyticsService.currentRange;
  timeRangeKeys: Array<keyof typeof this.analyticsService.timeRanges> = [
    'today', 'yesterday', 'last7Days', 'last30Days', 'thisMonth', 'lastMonth', 'thisYear'
  ];

  // Inventory data and loading state
  inventoryData = this.analyticsService.inventoryData;
  isLoading = this.analyticsService.isLoadingInventory;

  // Charts data
  categoryChartData = signal<any>(null);
  trendChartData = signal<any>(null);

  // Filtering
  selectedCategory = signal<string | null>(null);
  selectedBrand = signal<string | null>(null);

  // Chart options
  categoryChartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: { boxWidth: 15 }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return label + ': ₦' + value.toLocaleString();
          }
        }
      }
    }
  };

  trendChartOptions = {
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Quantity' }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return label + ': ' + value;
          }
        }
      }
    }
  };

  ngOnInit() {
    this.loadData();
  }

  async loadData(options: any = {}) {
    try {
      this.loadingService.start('Loading inventory analytics...');
      await this.analyticsService.getInventoryAnalytics({
        categoryId: this.selectedCategory() || undefined,
        brandId: this.selectedBrand() || undefined,
        ...options
      });
      this.updateCharts();
    } finally {
      this.loadingService.clear();
    }
  }

  updateCharts() {
    const data = this.inventoryData();
    if (!data) return;

    // Category chart
    this.categoryChartData.set({
      labels: data.stockByCategory.map(cat => cat.name),
      datasets: [{
        label: 'Stock Value',
        data: data.stockByCategory.map(cat => cat.value),
        backgroundColor: [
          '#4F46E5', '#10B981', '#F59E0B', '#EF4444',
          '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
        ]
      }]
    });

    // Stock trends chart
    this.trendChartData.set({
      labels: data.stockTrends.map(day => day.date),
      datasets: [
        {
          label: 'Stock Level',
          data: data.stockTrends.map(day => day.remaining),
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true
        },
        {
          label: 'Incoming',
          data: data.stockTrends.map(day => day.incoming),
          borderColor: '#10B981',
          backgroundColor: 'transparent',
          borderDash: [5, 5]
        },
        {
          label: 'Outgoing',
          data: data.stockTrends.map(day => day.outgoing),
          borderColor: '#EF4444',
          backgroundColor: 'transparent',
          borderDash: [5, 5]
        }
      ]
    });
  }

  setTimeRange(rangeKey: keyof typeof this.analyticsService.timeRanges) {
    this.analyticsService.setTimeRange(rangeKey);
  }

  onCategoryChange(categoryId: string | null) {
    this.selectedCategory.set(categoryId);
    this.loadData();
  }

  onBrandChange(brandId: string | null) {
    this.selectedBrand.set(brandId);
    this.loadData();
  }

  getHealthyStockCount(): number {
    const data = this.inventoryData();
    if (!data) return 0;
    return data.stockItems - data.lowStockItems - data.outOfStockItems;
  }

  exportToCSV() {
    const csvContent = this.analyticsService.exportMetricsToCSV('inventory');
    this.downloadCSV(csvContent, 'inventory-analytics.csv');
  }

  private downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      currencyDisplay: 'narrowSymbol'
    }).format(amount);
  }


  protected readonly Math = Math;
}
