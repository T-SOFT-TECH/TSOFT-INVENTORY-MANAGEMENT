// customer.interfaces.ts
import {BaseDocument} from '../base/base.interfaces';

export interface CustomerOrder {
  orderId: string;
  date: string;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Customer extends BaseDocument {
  name: string;
  email: string;
  phone: string;
  addresses: CustomerAddress[];
  status: 'active' | 'inactive';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  notes?: string;
  orders?: CustomerOrder[];
}
