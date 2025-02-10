// src/interfaces/sales/sales.interfaces.ts
import { BaseDocument, PaymentStatus } from '../base/base.interfaces';

export interface SaleProduct {
  productId: string;
  product: {
    id: string;
    name: string;
    sku: string;
    imageUrl?: string;
  };
  quantity: number;
  priceAtSale: number;
}

export interface Sale extends BaseDocument {
  customerId: string;
  invoiceNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  products: {
    productId: string;
    quantity: number;
    priceAtSale: number;
  }[];
  totalAmount: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  paymentStatus: PaymentStatus;
}

export interface SaleWithDetails extends Sale {
  customer: {
    id: string;
    name: string;
    email: string;
  };
  products: {
    productId: string;
    quantity: number;
    priceAtSale: number;
    product: {
      id: string;
      name: string;
      sku: string;
      imageUrl?: string;
    };
  }[];
}

export interface SalesQueryOptions {
  startDate?: Date;
  endDate?: Date;
  customerId?: string;
  status?: PaymentStatus;
}