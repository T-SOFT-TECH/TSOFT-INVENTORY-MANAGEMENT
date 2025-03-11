// sales.interfaces.ts
import { BaseDocument, PaymentStatus } from '../base/base.interfaces';
import { Customer } from '../customer/customer.interfaces';
import { Product } from '../product/product.interfaces';

// Base item in a sale
export interface SaleItem {
  productId: string;
  quantity: number;
  priceAtSale: number;
  product?: Partial<Product>; // Using Partial to allow for minimal product data
}

// Core sale interface
export interface Sale extends BaseDocument {
  customer: Customer;
  invoiceNumber: string;
  saleItems: SaleItem[];
  totalAmount: number;
  subtotal?: number; // Optional for backward compatibility
  tax?: number; // Optional for backward compatibility
  date: string;
  paymentMethod?: 'cash' | 'card' | 'transfer';
  paymentStatus: PaymentStatus;
  status: 'completed' | 'pending' | 'cancelled';
  paidAt: string;
  notes?: string;
  salesRep: string;


}

// Query options for filtering sales
export interface SalesQueryOptions {
  startDate?: Date;
  endDate?: Date;
  customerId?: string;
  status?: PaymentStatus;
  searchTerm?: string;
}

// Keep SaleWithDetails for backward compatibility
export interface SaleWithDetails extends Sale {
  products: (SaleItem & {
    product: {
      id: string;
      name: string;
      sku: string;
      imageUrl?: string;
    }
  })[];
}
