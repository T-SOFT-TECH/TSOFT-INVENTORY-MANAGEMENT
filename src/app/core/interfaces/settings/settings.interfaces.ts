// settings.interfaces.ts
import { BaseDocument } from '../base/base.interfaces';

export interface CompanySettings {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  taxId?: string;
  logo?: string;
}

export interface InvoiceSettings extends BaseDocument {
  invoicePrefix: string;
  nextInvoiceNumber: number;
  termsAndConditions?: string;
  notes?: string;
  taxRate: number;
  currency: string;
  dateFormat: string;
}

export interface NotificationSettings {
  lowStockThreshold: number;
  emailNotifications: boolean;
  salesAlerts: boolean;
  inventoryAlerts: boolean;
}

export interface SystemSettings {
  dateFormat: string;
  timezone: string;
  language: string;
  theme: 'light' | 'dark' | 'system';
}

export interface Settings extends BaseDocument {
  company: CompanySettings;
  invoice: InvoiceSettings;
  notifications: NotificationSettings;
  system: SystemSettings;
}
