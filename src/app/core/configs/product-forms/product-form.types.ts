export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldConfig {
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea' | 'radio' | 'checkbox' | 'checkbox-group';
  label: string;
  required?: boolean;
  options?: string[] | FormFieldOption[]; // Updated to support both string and object options
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

// Common fields that all products will have
export const commonFields: FormFieldConfig[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Product Name',
    required: true,
    placeholder: 'Enter product name',
    group: 'basic'
  },
  {
    name: 'sku',
    type: 'text',
    label: 'SKU',
    required: true,
    placeholder: 'Auto-generated SKU',
    helpText: 'Stock Keeping Unit - Unique identifier for the product',
    group: 'basic'
  },
  {
    name: 'brandId',
    type: 'select',
    label: 'Brand',
    required: true,
    options: [], // Will be populated from brands service
    group: 'basic'
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    required: true,
    placeholder: 'Enter product description',
    group: 'basic'
  },
  {
    name: 'price',
    type: 'number',
    label: 'Selling Price',
    required: true,
    min: 0,
    group: 'pricing'
  },
  {
    name: 'cost',
    type: 'number',
    label: 'Cost Price',
    required: true,
    min: 0,
    group: 'pricing'
  },
  {
    name: 'stockQuantity',
    type: 'number',
    label: 'Stock Quantity',
    required: true,
    min: 0,
    group: 'inventory'
  },
  {
    name: 'lowStockThreshold',
    type: 'number',
    label: 'Low Stock Alert Threshold',
    required: true,
    min: 1,
    group: 'inventory'
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    required: true,
    options: ['active', 'inactive'],
    defaultValue: 'active',
    group: 'basic'
  }
];
