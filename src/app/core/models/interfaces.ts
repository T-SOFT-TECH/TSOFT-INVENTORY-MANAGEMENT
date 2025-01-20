// Base Interfaces
export interface BaseDocument {
  "$id": string;
  "$createdAt": string;
  "$updatedAt": string;
}

// Product Types & Interfaces
export type ProductStatus = 'active' | 'inactive' | 'archived';

export interface BaseProductFields {
  name: string;
  sku: string;
  brand: string;
  price: number;
  cost: number;
  stockQuantity: number;
  lowStockThreshold: number;
  description: string;
  imageUrl?: string;
  status: ProductStatus;
}

// Specific Product Types
interface StorageDeviceFields extends BaseProductFields {
  capacity: number;
  readSpeed: number;
  writeSpeed: number;
  type: 'SSD' | 'HDD' | 'Flash Drive' | 'Memory Card';
  interface?: 'SATA' | 'NVMe' | 'USB' | 'SD';
  formFactor?: string;
}

interface ChargerFields extends BaseProductFields {
  outputWattage: number;
  inputVoltage: string;
  outputVoltage: string;
  compatibleDevices: string[];
  cableLength?: number;
  connectorType: string;
}

interface ModemFields extends BaseProductFields {
  wifiStandard: string;
  maxSpeed: number;
  bands: string[];
  ports: {
    ethernet: number;
    usb: number;
  };
  antennas: number;
  features: string[];
}

type ProductFields = BaseProductFields | StorageDeviceFields | ChargerFields | ModemFields;

// Form Field Configuration
export interface FormFieldConfig {
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea' | 'radio' | 'checkbox';
  label: string;
  required?: boolean;
  options?: string[];
  validation?: any[];
  defaultValue?: any;
  placeholder?: string;
  helpText?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  group?: string;
}

export interface CategoryFormConfig {
  id: string;
  name: string;
  fields: FormFieldConfig[];
}

// Main Product Interface
export interface BaseProduct extends BaseDocument {
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  cost: number;
  stockQuantity: number;
  lowStockThreshold: number;
  sku: string;
  status: ProductStatus;
  imageUrl?: string;
  specifications?: Record<string, any>;
}

export interface Product extends BaseProduct {
  totalQuantitySold: number;
  totalRevenue: number;
}

export type ProductInput = Omit<BaseProduct, keyof BaseDocument>;
export type ProductFormData = ProductInput;
export type CreateProductInput = ProductInput;
export type UpdateProductInput = Partial<ProductInput>;

// Form Value Types
export interface ProductFormRawValue {
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  cost: number;
  stockQuantity: number;
  lowStockThreshold: number;
  sku: string;
  status: ProductStatus;
  imageUrl?: string;
  [key: string]: any; // For dynamic fields
}

// Customer Interfaces
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

// Sales Interfaces
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

export type PaymentStatus = 'paid' | 'pending' | 'failed';

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

export type SaleCreateDTO = Omit<Sale, keyof BaseDocument>;
export type SaleUpdateDTO = Partial<SaleCreateDTO>;

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

// Category Interfaces
export interface Category extends BaseDocument {
  name: string;
  slug: string;
  parentId?: string;
  description?: string;
  children?: Category[];
  level: number;
  order: number;
}

export interface CategoryCreateDTO {
  name: string;
  description?: string;
  parentId?: string;
  level: number;
  order?: number;  // Make order optional
  slug?: string;   // Make slug optional as it will be generated in service
}

export type CategoryUpdateDTO = Partial<CategoryCreateDTO>;

// User Interfaces
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sales: boolean;
    inventory: boolean;
  };
}

export interface User extends BaseDocument {
  name: string;
  email: string;
  role: 'admin' | 'sales_rep';
  isActive: boolean;
  lastLogin?: string;
  preferences?: UserPreferences;
}

export type UserCreateDTO = Omit<User, keyof BaseDocument | 'lastLogin'>;
export type UserUpdateDTO = Partial<UserCreateDTO>;

// Settings Interfaces
export interface CompanySettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  taxId?: string;
  logo?: string;
}

export interface InvoiceSettings extends BaseDocument {
  prefix: string;
  nextNumber: number;
  terms?: string;
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

// Dashboard Interfaces
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
  lowStockItems: BaseProduct[];
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

// Brand Interfaces
export interface Brand extends BaseDocument {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  status: 'active' | 'inactive';
  websiteUrl?: string;
  productCount?: number;
}

export type BrandInput = Omit<Brand, keyof BaseDocument | 'productCount'>;

// Cart Interface
export interface CartItem {
  product: Product;
  quantity: number;
}
