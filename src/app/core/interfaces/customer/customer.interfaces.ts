
import { BaseDocument } from '../base/base.interfaces';

export interface Customer extends BaseDocument {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  notes?: string;
  orders?: Array<{
    id: string;
    date: string;
    total: number;
  }>;
  totalOrders?: number;
  totalSpent?: number;
  lastOrderDate?: string;
}

export type CustomerCreateDTO = Omit<Customer, keyof BaseDocument | 'orders' | 'totalOrders' | 'totalSpent' | 'lastOrderDate'>;
export type CustomerUpdateDTO = Partial<CustomerCreateDTO>;