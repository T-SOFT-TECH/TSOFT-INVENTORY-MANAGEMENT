
// Base Document Interface
export interface BaseDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
}

// Shared Types
export type ProductStatus = 'active' | 'inactive' | 'archived';
export type PaymentStatus = 'paid' | 'pending' | 'failed';

// Form Configuration
export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldConfig {
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea' | 'radio' | 'checkbox' | 'checkbox-group';
  label: string;
  required?: boolean;
  options?: string[] | FormFieldOption[]; // Updated to support both formats
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

// User Preferences (if reusable)
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
