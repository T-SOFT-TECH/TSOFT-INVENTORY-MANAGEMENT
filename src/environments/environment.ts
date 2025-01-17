export const environment = {
  production: false,
  
  // API Configuration
  api: {
    baseUrl: 'http://localhost:3000/api',
    version: 'v1'
  },

  // Appwrite Configuration
  appwrite: {
    endpoint: 'http://localhost/v1',
    projectId: 'tsoftmart-inventory-invoice-system',
    databaseId: 'inventory-invoice-db',
    collections: {
      products: 'products-collection-id',
      customers: 'customers-collection-id',
      sales: 'sales-collection-id',
      invoices: 'invoices-collection-id',
      settings: 'settings-collection-id',
      categories: 'categories-collection-id'
    },
    buckets: {
      productImages: 'your-product-images-bucket-id',
      companyLogos: 'your-company-logos-bucket-id'
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
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timezone: 'UTC',
    language: 'en',
    theme: 'light',
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