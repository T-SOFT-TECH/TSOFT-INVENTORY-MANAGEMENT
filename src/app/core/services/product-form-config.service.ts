import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class ProductFormConfigService {
  private formConfigs = new Map<string, CategoryFormConfig>([
    // Storage Devices
    ['678d4fb600315bebfecf', {
      id: '678d4fb600315bebfecf',
      name: 'Storage Devices',
      fields: [
        // Basic Information
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
        // Technical Specifications
        {
          name: 'type',
          type: 'select',
          label: 'Storage Type',
          required: true,
          options: ['SSD', 'HDD', 'Flash Drive', 'Memory Card'],
          group: 'specifications'
        },
        {
          name: 'capacity',
          type: 'number',
          label: 'Capacity',
          required: true,
          unit: 'GB',
          min: 0,
          group: 'specifications'
        },
        {
          name: 'readSpeed',
          type: 'number',
          label: 'Read Speed',
          required: true,
          unit: 'MB/s',
          min: 0,
          group: 'specifications'
        },
        {
          name: 'writeSpeed',
          type: 'number',
          label: 'Write Speed',
          required: true,
          unit: 'MB/s',
          min: 0,
          group: 'specifications'
        },
        {
          name: 'interface',
          type: 'select',
          label: 'Interface',
          options: ['SATA III', 'PCIe NVMe', 'USB 3.0', 'USB 3.1', 'USB-C', 'SD', 'microSD'],
          group: 'specifications'
        },
        {
          name: 'formFactor',
          type: 'select',
          label: 'Form Factor',
          options: ['2.5"', '3.5"', 'M.2', 'Standard SD', 'microSD'],
          group: 'specifications'
        },
        // Common fields
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
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          placeholder: 'Detailed product description',
          group: 'basic'
        },
        {
          name: 'status',
          type: 'radio',
          label: 'Status',
          required: true,
          options: ['active', 'inactive'],
          defaultValue: 'active',
          group: 'basic'
        }
      ]
    }],

    // Chargers & Power Adapters
    ['678d510c00111d7f1f4a', {
      id: 'chargers',
      name: 'Chargers & Power Adapters',
      fields: [
        // Basic Information
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
        // Technical Specifications
        {
          name: 'outputWattage',
          type: 'number',
          label: 'Output Power',
          required: true,
          unit: 'W',
          min: 0,
          group: 'specifications'
        },
        {
          name: 'inputVoltage',
          type: 'text',
          label: 'Input Voltage',
          required: true,
          placeholder: 'e.g., 100-240V',
          group: 'specifications'
        },
        {
          name: 'outputVoltage',
          type: 'text',
          label: 'Output Voltage',
          required: true,
          placeholder: 'e.g., 5V/9V/12V',
          group: 'specifications'
        },
        {
          name: 'compatibleDevices',
          type: 'multiselect',
          label: 'Compatible Devices',
          required: true,
          options: ['iPhone', 'iPad', 'MacBook', 'Android Phones', 'Tablets', 'Laptops'],
          group: 'compatibility'
        },
        {
          name: 'cableLength',
          type: 'number',
          label: 'Cable Length',
          unit: 'm',
          step: 0.1,
          min: 0,
          group: 'specifications'
        },
        {
          name: 'connectorType',
          type: 'multiselect',
          label: 'Connector Type',
          required: true,
          options: ['USB-C', 'Lightning', 'Micro USB', 'USB-A'],
          group: 'specifications'
        },
        {
          name: 'features',
          type: 'checkbox',
          label: 'Features',
          options: [
            'Fast Charging',
            'Power Delivery (PD)',
            'Quick Charge',
            'GaN Technology',
            'Foldable Pins',
            'LED Indicator'
          ],
          group: 'features'
        },
        // Common fields
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
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          placeholder: 'Detailed product description',
          group: 'basic'
        },
        {
          name: 'status',
          type: 'radio',
          label: 'Status',
          required: true,
          options: ['active', 'inactive'],
          defaultValue: 'active',
          group: 'basic'
        }
      ]
    }]
  ]);

  getFormConfig(categoryId: string): CategoryFormConfig | undefined {
    return this.formConfigs.get(categoryId);
  }

  getAllConfigs(): Map<string, CategoryFormConfig> {
    return this.formConfigs;
  }

  updateBrandOptions(brands: string[]) {
    // Update brand options for all configurations
    this.formConfigs.forEach(config => {
      const brandField = config.fields.find(field => field.name === 'brandId');
      if (brandField) {
        brandField.options = brands;
      }
    });
  }
}
