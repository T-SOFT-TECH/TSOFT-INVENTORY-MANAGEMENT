export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  cost?: number;
  stockQuantity: number;
  lowStockThreshold: number;
  sku: string;
  status: 'active' | 'archived';
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

// Base product interface for creation/updates
export interface BaseProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stockQuantity: number;
  lowStockThreshold: number;
  sku: string;
  status: 'active' | 'archived';
  imageUrl?: string;
  cost?: number;
  createdAt: string;
  updatedAt: string;
}
  
  // Extended product interface with sales metrics for dashboard
  export interface Product extends BaseProduct {
    totalQuantitySold: number;
    totalRevenue: number;
  }
  
  // Product creation type
  export type CreateProductInput = Omit<BaseProduct, 'id' | 'createdAt' | 'updatedAt'>;
  
  // Product update type
  export type UpdateProductInput = Partial<CreateProductInput>;

export interface ProductCreateDTO extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ProductUpdateDTO extends Partial<ProductCreateDTO> {}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  orders?: Array<{
    id: string;
    date: string;
    total: number;
  }>;
  totalOrders?: number;
  totalSpent?: number;
  lastOrderDate?: string;
}


export interface CustomerCreateDTO extends Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'purchaseHistory' | 'totalOrders' | 'totalSpent' | 'lastOrderDate'> {}
export interface CustomerUpdateDTO extends Partial<CustomerCreateDTO> {}

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

export interface Sale {
  id: string;
  customerId: string;
  invoiceNumber: string;  // Add this to base Sale interface
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
  paymentStatus: 'paid' | 'pending' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface SaleCreateDTO extends Omit<Sale, 'id' | 'createdAt' | 'updatedAt'> {}
export interface SaleUpdateDTO extends Partial<SaleCreateDTO> {}

export interface SalesQueryOptions {
  startDate?: Date;
  endDate?: Date;
  customerId?: string;
  status?: PaymentStatus;
}

export type PaymentStatus = 'paid' | 'pending' | 'failed';

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  description?: string;
  children?: Category[];
  level: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryCreateDTO extends Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'children'> {}
export interface CategoryUpdateDTO extends Partial<CategoryCreateDTO> {}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales_rep';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  preferences?: UserPreferences;
}

export interface UserCreateDTO extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'lastLogin'> {}
export interface UserUpdateDTO extends Partial<UserCreateDTO> {}

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

// Update interface in interfaces.ts
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

export interface Settings {
  company: CompanySettings;
  invoice: InvoiceSettings;
  notifications: NotificationSettings;
  system: SystemSettings;
}

export interface CompanySettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  taxId?: string;
  logo?: string;
}

export interface InvoiceSettings {
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
  topProducts: Product[]; // Keep as Product[] since we need the sales metrics
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

