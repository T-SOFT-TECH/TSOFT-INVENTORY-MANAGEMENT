import {Product} from '../product/product.interfaces';

export interface CartItem {
  product: Product;
  quantity: number;
  priceAtSale: number;
  discount?: number;
  subtotal?: number;
}

export interface POSTransaction {
  $id: string;
  customerId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  paymentStatus: 'paid' | 'pending' | 'failed';
  transactionStatus: 'completed' | 'pending' | 'cancelled';
  date: string;
  invoiceNumber: string;
  notes?: string;
}


export interface SaleInput {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
    priceAtSale: number;
  }[];
  paymentMethod: 'cash' | 'card' | 'transfer';
  notes?: string;
}
