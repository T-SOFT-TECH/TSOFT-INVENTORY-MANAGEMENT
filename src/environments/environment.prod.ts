export const environment = {
  production: true,
  
  // API Configuration
  api: {
    baseUrl: 'https://api.yourcompany.com',
    version: 'v1'
  },

  // Appwrite Configuration
  appwrite: {
    endpoint: 'https://appwrite.yourcompany.com/v1',
    projectId: 'your-production-project-id',
    databaseId: 'your-production-database-id',
    collections: {
      products: 'products-collection-id',
      customers: 'customers-collection-id',
      sales: 'sales-collection-id',
      invoices: 'invoices-collection-id',
      settings: 'settings-collection-id',
      categories: 'categories-collection-id'
    },
    buckets: {
      productImages: 'product-images-bucket-id',
      companyLogos: 'company-logos-bucket-id'
    }
  },

  // Company Information (same as development)
  company: {
    name: 'Your Company Name',
    address: '123 Business Street, City, Country',
    phone: '+1 234 567 890',
    email: 'contact@yourcompany.com',
    website: 'https://yourcompany.com',
    logo: '/assets/images/logo.png',
    taxId: 'TAX-12345-ID'
  },

  // Default Settings (same as development)
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

  // Feature Flags (might differ from development)
  features: {
    darkMode: true,
    multiLanguage: true,
    analytics: true,
    notifications: true,
    customerPortal: true
  },

  // Storage Keys (same as development)
  storage: {
    authToken: 'auth_token',
    userPreferences: 'user_preferences',
    theme: 'selected_theme',
    language: 'selected_language'
  },

  // Notification Settings (same as development)
  notifications: {
    defaultDuration: 3000,
    position: 'top-right'
  },

  // File Upload Limits (same as development)
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxImageDimension: 2048
  }
};