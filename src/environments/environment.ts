export const environment = {
  production: false,

  // API Configuration
  api: {
    baseUrl: 'http://localhost:3000/api',
    version: 'v1'
  },

  // Appwrite Configuration
  appwrite: {
    endpoint: 'https://appwrite.tsoft-tech.dev/v1',
    projectId: 'tsoftmart-inventory-invoice-system',
    databaseId: 'inventory-invoice-db',
    collections: {
      products: 'products',
      customers: 'customers',
      sales: 'sales',
      invoices: 'invoices',
      settings: 'settings',
      categories: 'categories',
      brands: 'brands',
      stockTransactions: 'stock_transactions'
    },
    buckets: {
      productImages: 'productImages',
      companyLogos: 'company-logo',
      brandLogos: 'brand-logo',
      receiptImages: 'stock-receipts'
    },
    api:{
      createProduct: 'create-product',
    }
  },

  // Company Information
  company: {
    name: 'Your Company Name',
    address: '123 Business Street, City, Country',
    phone: '+1 234 567 890',
    email: 'contact@yourcompany.com',
    website: 'https://yourcompany.com',
    logo: '/assets/images/logo.png',
    taxId: 'TAX-12345-ID'
  },

  // Default Settings
  defaults: {
    currency: 'NGN',
    dateFormat: 'MM/DD/YYYY',
    timezone: 'UTC',
    language: 'en',
    theme: 'dark',
    itemsPerPage: 10,
    taxRate: 10,
    invoicePrefix: 'INV-',
    invoiceStartNumber: 1000
  },

  // Feature Flags
  features: {
    darkMode: true,
    multiLanguage: true,
    analytics: true,
    notifications: true,
    customerPortal: true
  },

  // Storage Keys
  storage: {
    authToken: 'auth_token',
    userPreferences: 'user_preferences',
    theme: 'selected_theme',
    language: 'selected_language'
  },

  // Notification Settings
  notifications: {
    defaultDuration: 3000,
    position: 'top-right'
  },

  // File Upload Limits
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxImageDimension: 2048
  }
};
