import {Component, inject, OnInit, signal} from '@angular/core';
import {AnalyticsService} from '../../../core/services/analytics.service';
import {LoadingService} from '../../../core/services/loading.service';
import {AutoAnimationDirective} from '../../../core/Directives/auto-Animate.directive';
import {ChartComponent} from '../../../core/components/chart/chart.component';

@Component({
  selector: 'app-customer-insights',
  imports: [
    AutoAnimationDirective,
    ChartComponent
  ],
  templateUrl: './customer-insights.component.html',
  styleUrl: './customer-insights.component.scss'
})
export class CustomerInsightsComponent implements OnInit {

  private analyticsService = inject(AnalyticsService);
  private loadingService = inject(LoadingService);

  // Time range properties
  timeRanges = this.analyticsService.timeRanges;
  currentRange = this.analyticsService.currentRange;
  timeRangeKeys: Array<keyof typeof this.analyticsService.timeRanges> = [
    'today', 'yesterday', 'last7Days', 'last30Days', 'thisMonth', 'lastMonth', 'thisYear'
  ];

  // Customer data and loading state
  customerData = this.analyticsService.customerData;
  isLoading = this.analyticsService.isLoadingCustomers;

  // Charts data
  segmentChartData = signal<any>(null);
  trendChartData = signal<any>(null);

  // Segmentation options
  segmentationOptions = [
    { value: 'spending', label: 'By Spending' },
    { value: 'frequency', label: 'By Purchase Frequency' },
    { value: 'recency', label: 'By Purchase Recency' }
  ];
  selectedSegmentation = signal('spending');

  // Chart options
  segmentChartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: { boxWidth: 15 }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const percent = context.raw.toFixed(1);
            return `${label}: ${percent}%`;
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
        title: { display: true, text: 'Customers' }
      }
    }
  };

  ngOnInit() {
    this.loadData();
  }

  async loadData(options: any = {}) {
    try {
      this.loadingService.start('Loading customer insights...');
      await this.analyticsService.getCustomerAnalytics({
        segmentBy: this.selectedSegmentation(),
        ...options
      });
      this.updateCharts();
    } finally {
      this.loadingService.clear();
    }
  }

  updateCharts() {
    const data = this.customerData();
    if (!data) return;

    // Segment chart
    this.segmentChartData.set({
      labels: data.customerSegments.map(seg => seg.segment),
      datasets: [{
        label: 'Customer Segments',
        data: data.customerSegments.map(seg => seg.percentage),
        backgroundColor: [
          '#4F46E5', '#10B981', '#F59E0B', '#EF4444'
        ]
      }]
    });

    // Customer trends chart
    this.trendChartData.set({
      labels: data.customerTrends.map(day => day.date),
      datasets: [
        {
          label: 'New Customers',
          data: data.customerTrends.map(day => day.new),
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true
        },
        {
          label: 'Returning Customers',
          data: data.customerTrends.map(day => day.returning),
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true
        }
      ]
    });
  }

  setTimeRange(rangeKey: keyof typeof this.analyticsService.timeRanges) {
    this.analyticsService.setTimeRange(rangeKey);
  }

  onSegmentationChange(segmentation: string) {
    this.selectedSegmentation.set(segmentation);
    this.loadData();
  }

  exportToCSV() {
    const csvContent = this.analyticsService.exportMetricsToCSV('customers');
    this.downloadCSV(csvContent, 'customer-analytics.csv');
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


}
