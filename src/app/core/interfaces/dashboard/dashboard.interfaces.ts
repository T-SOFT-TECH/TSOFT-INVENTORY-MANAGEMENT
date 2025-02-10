


import { Customer } from '../customer/customer.interfaces';
import { BaseProductFields, Product } from '../product/product.interfaces';
import { Sale } from '../sales/sales.interfaces';

export interface DashboardSummary {
  todayRevenue: number;
  todayOrders: number;
  totalCustomers: number;
  lowStockCount: number;
  metrics: {
    todayRevenue: number;
    todayOrders: number;
    totalCustomers: number;
    lowStockCount: number;
  };
  recentSales: Sale[];
  lowStockItems: BaseProductFields[];
  activeCustomers: Customer[];
  todaySales: Sale[];
  topProducts: Product[];
}

export interface TopProduct {
  product: {
    id: string;
    name: string;
    sku: string;
  };
  totalQuantity: number;
  totalRevenue: number;
}

export interface SalesTrend {
  date: string;
  total: number;
  count: number;
}