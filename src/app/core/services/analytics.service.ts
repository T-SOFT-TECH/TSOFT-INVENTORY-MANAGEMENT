
import { Injectable, inject, signal } from '@angular/core';
import { AppwriteService } from './appwrite.service';
import { HotToastService } from '@ngxpert/hot-toast';

export interface TimeRange {
  start: Date;
  end: Date;
  label: string;
}

export interface SalesAnalyticsData {
  totalRevenue: number;
  orderCount: number;
  averageOrderValue: number;
  salesByTime: Array<{
    period: string;
    revenue: number;
    orders: number;
  }>;
  salesByCategory: Array<{
    categoryId: string;
    name: string;
    revenue: number;
    count: number;
  }>;
  topProducts: Array<{
    productId: string;
    name: string;
    quantity: number;
    revenue: number;
  }>;
  paymentMethods: Array<{
    method: string;
    count: number;
    amount: number;
  }>;
}

export interface InventoryAnalyticsData {
  totalStockValue: number;
  stockItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  stockByCategory: Array<{
    categoryId: string;
    name: string;
    count: number;
    value: number;
  }>;
  inventoryTurnover: number;
  stockTrends: Array<{
    date: string;
    incoming: number;
    outgoing: number;
    remaining: number;
  }>;
}

export interface CustomerAnalyticsData {
  totalCustomers: number;
  activeCustomers: number;
  newCustomers: number;
  customerRetentionRate: number;
  averageCustomerValue: number;
  customerSegments: Array<{
    segment: string;
    count: number;
    percentage: number;
  }>;
  customerTrends: Array<{
    date: string;
    new: number;
    returning: number;
  }>;
}



export interface AIInsightsData {
  narrative: string;
  keyFindings: Array<{text: string, impact: 'high' | 'medium' | 'low', sentiment: 'positive' | 'negative' | 'neutral'}>;
  smartActions: Array<{action: string, benefit: string, priority: 'high' | 'medium' | 'low'}>;
}

export interface PredictionsData {
  stockForecast: Array<{date: string, productId: string, predictedStock: number}>;
  demandForecast: Array<{date: string, productId: string, predictedDemand: number}>;
  confidenceIntervals: Array<{date: string, productId: string, lower95: number, upper95: number}>;
}

export interface AnomalyData {
  type: 'stock_level' | 'price_change' | 'sales_pattern' | 'procurement';
  description: string;
  severity: 'critical' | 'warning' | 'info';
  affectedProducts: string[];
  detectionMethod: string;
}

export interface OptimizationData {
  reorderSuggestions: Array<{productId: string, name: string, currentStock: number, suggestedOrder: number, urgency: string}>;
  rebalancingSuggestions: Array<{source: string, destination: string, amount: number, rationale: string}>;
  pricingOpportunities: Array<{productId: string, name: string, currentPrice: number, suggestedPrice: number, reasoning: string}>;
}

export interface EnhancedInventoryAnalyticsData extends InventoryAnalyticsData {
  insights: AIInsightsData;
  predictions: PredictionsData;
  anomalies: AnomalyData[];
  optimization: OptimizationData;
  queryResponse?: {answer: string, confidence: number};
}


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private appwrite = inject(AppwriteService);
  private toast = inject(HotToastService);

  // Predefined time ranges
  readonly timeRanges = {
    today: this.generateTimeRange('Today', 0),
    yesterday: this.generateTimeRange('Yesterday', 1),
    last7Days: this.generateTimeRange('Last 7 Days', 7),
    last30Days: this.generateTimeRange('Last 30 Days', 30),
    thisMonth: this.generateMonthRange('This Month', 0),
    lastMonth: this.generateMonthRange('Last Month', 1),
    thisYear: this.generateYearRange('This Year', 0),
    lastYear: this.generateYearRange('Last Year', 1),
    custom: { start: new Date(), end: new Date(), label: 'Custom Range' }
  };

  // Current selected range
  currentRange = signal<TimeRange>(this.timeRanges.last30Days);

  // Analytics data signals
  salesData = signal<SalesAnalyticsData | null>(null);
  inventoryData = signal<InventoryAnalyticsData | null>(null);
  customerData = signal<CustomerAnalyticsData | null>(null);

  inventoryAIData = signal<EnhancedInventoryAnalyticsData | null>(null);


  // Loading states
  isLoadingSales = signal<boolean>(false);
  isLoadingInventory = signal<boolean>(false);
  isLoadingCustomers = signal<boolean>(false);

  // Cache management
  private cache = new Map<string, { data: any, timestamp: number }>();
  private CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache lifetime

  constructor() {
    // Initialize with default time range
    this.setTimeRange('last30Days');
  }

  /**
   * Generate time range from days offset
   */
  private generateTimeRange(label: string, daysOffset: number): TimeRange {
    const end = new Date();
    end.setHours(23, 59, 59, 999); // End of day

    const start = new Date();
    start.setDate(start.getDate() - daysOffset);
    start.setHours(0, 0, 0, 0); // Start of day

    return { start, end, label };
  }

  /**
   * Generate time range for a month
   */
  private generateMonthRange(label: string, monthsOffset: number): TimeRange {
    const now = new Date();

    // Start of current month
    const start = new Date(now.getFullYear(), now.getMonth() - monthsOffset, 1);

    // End of current month
    const end = new Date(now.getFullYear(), now.getMonth() - monthsOffset + 1, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end, label };
  }

  /**
   * Generate time range for a year
   */
  private generateYearRange(label: string, yearsOffset: number): TimeRange {
    const now = new Date();

    // Start of current year
    const start = new Date(now.getFullYear() - yearsOffset, 0, 1);

    // End of current year
    const end = new Date(now.getFullYear() - yearsOffset, 11, 31);
    end.setHours(23, 59, 59, 999);

    return { start, end, label };
  }

  /**
   * Set the time range and refresh all analytics
   */
  async setTimeRange(rangeKey: string, customRange?: { start: Date; end: Date }) {
    if (rangeKey === 'custom' && customRange) {
      // Custom range code...
      this.currentRange.set(this.timeRanges.custom);
    } else {
      const range = this.timeRanges[rangeKey as keyof typeof this.timeRanges];
      if (range) {
        this.currentRange.set(range);
      }
    }

    // Clear cache before refreshing data
    this.clearCache();

    // Refresh all analytics with new time range
    await Promise.all([
      this.getSalesAnalytics(),
      this.getInventoryAnalytics(),
      this.getCustomerAnalytics()
    ]);
  }

  /**
   * Fetch sales analytics
   */
  async getSalesAnalytics(options: {
    categoryId?: string;
    productId?: string;
    customerId?: string;
    aggregation?: 'day' | 'week' | 'month';
  } = {}) {
    try {
      this.isLoadingSales.set(true);

      const range = this.currentRange();
      const params = {
        startDate: range.start.toISOString(),
        endDate: range.end.toISOString(),
        aggregation: options.aggregation || this.getDefaultAggregation(range),
        categoryId: options.categoryId,
        productId: options.productId,
        customerId: options.customerId
      };

      // Check cache first
      const cacheKey = `sales_${JSON.stringify(params)}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      // Call Appwrite function
      const result = await this.appwrite.functions.createExecution(
        'get-sales-analytics',
        JSON.stringify(params)
      );

      const response = JSON.parse(result.responseBody);

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch sales analytics');
      }

      // Store in cache and update signal
      this.addToCache(cacheKey, response.data);
      this.salesData.set(response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching sales analytics:', error);
      this.toast.error('Failed to load sales analytics');
      throw error;
    } finally {
      this.isLoadingSales.set(false);
    }
  }

  /**
   * Fetch inventory analytics
   */
  async getInventoryAnalytics(options: {
    categoryId?: string;
    brandId?: string;
  } = {}) {
    try {
      this.isLoadingInventory.set(true);

      const range = this.currentRange();
      const params = {
        startDate: range.start.toISOString(),
        endDate: range.end.toISOString(),
        categoryId: options.categoryId,
        brandId: options.brandId
      };

      // Check cache first
      const cacheKey = `inventory_${JSON.stringify(params)}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      // Call Appwrite function
      const result = await this.appwrite.functions.createExecution(
        'get-inventory-analytics',
        JSON.stringify(params)
      );

      const response = JSON.parse(result.responseBody);

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch inventory analytics');
      }

      // Store in cache and update signal
      this.addToCache(cacheKey, response.data);
      this.inventoryData.set(response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching inventory analytics:', error);
      this.toast.error('Failed to load inventory analytics');
      throw error;
    } finally {
      this.isLoadingInventory.set(false);
    }
  }

  /**
   * Fetch customer analytics
   */
  async getCustomerAnalytics(options: {
    segmentBy?: 'spending' | 'frequency' | 'recency';
  } = {}) {
    try {
      this.isLoadingCustomers.set(true);

      const range = this.currentRange();
      const params = {
        startDate: range.start.toISOString(),
        endDate: range.end.toISOString(),
        segmentBy: options.segmentBy || 'spending'
      };

      // Check cache first
      const cacheKey = `customers_${JSON.stringify(params)}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      // Call Appwrite function
      const result = await this.appwrite.functions.createExecution(
        'get-customer-analytics',
        JSON.stringify(params)
      );

      const response = JSON.parse(result.responseBody);

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch customer analytics');
      }

      // Store in cache and update signal
      this.addToCache(cacheKey, response.data);
      this.customerData.set(response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching customer analytics:', error);
      this.toast.error('Failed to load customer analytics');
      throw error;
    } finally {
      this.isLoadingCustomers.set(false);
    }
  }

  /**
   * Determine the appropriate time aggregation based on range length
   */
  private getDefaultAggregation(range: TimeRange): 'day' | 'week' | 'month' {
    const days = (range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24);

    if (days <= 14) return 'day';
    if (days <= 90) return 'week';
    return 'month';
  }

  /**
   * Get data from cache if still valid
   */
  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp < this.CACHE_TTL)) {
      return cached.data;
    }
    return null;
  }

  /**
   * Add data to cache
   */
  private addToCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Export metrics to CSV
   */
  exportMetricsToCSV(metricType: 'sales' | 'inventory' | 'customers'): string {
    let csvContent = '';

    switch (metricType) {
      case 'sales':
        const salesData = this.salesData();
        if (salesData) {
          csvContent = `Date,Revenue,Orders\n`;
          salesData.salesByTime.forEach(day => {
            csvContent += `${day.period},${day.revenue},${day.orders}\n`;
          });
        }
        break;

      case 'inventory':
        const inventoryData = this.inventoryData();
        if (inventoryData) {
          csvContent = `Category,Count,Value\n`;
          inventoryData.stockByCategory.forEach(cat => {
            csvContent += `${cat.name},${cat.count},${cat.value}\n`;
          });
        }
        break;

      case 'customers':
        const customerData = this.customerData();
        if (customerData) {
          csvContent = `Segment,Count,Percentage\n`;
          customerData.customerSegments.forEach(segment => {
            csvContent += `${segment.segment},${segment.count},${segment.percentage}\n`;
          });
        }
        break;
    }

    return csvContent;
  }
}
