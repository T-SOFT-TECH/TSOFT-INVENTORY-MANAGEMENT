import { CategoryFormConfig, commonFields } from './product-form.types';

export const laptopsConfig: CategoryFormConfig = {
  id: 'laptops',
  name: 'Laptops',
  fields: [
    ...commonFields,
    // Display Specifications
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      min: 11,
      max: 17.3,
      step: 0.1,
      group: 'display'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Display Resolution',
      required: true,
      options: [
        '1366x768 (HD)',
        '1920x1080 (FHD)',
        '2560x1440 (QHD)',
        '3840x2160 (4K)'
      ],
      group: 'display'
    },
    {
      name: 'refreshRate',
      type: 'select',
      label: 'Refresh Rate',
      required: true,
      options: ['60Hz', '90Hz', '120Hz', '144Hz', '165Hz', '240Hz'],
      group: 'display'
    },
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: true,
      options: ['IPS', 'OLED', 'VA', 'TN', 'Mini-LED'],
      group: 'display'
    },
    {
      name: 'touchscreen',
      type: 'checkbox',
      label: 'Touchscreen',
      required: false,
      group: 'display'
    },

    // Performance Specifications
    {
      name: 'processorModel',
      type: 'text',
      label: 'Processor Model',
      required: true,
      group: 'performance'
    },
    {
      name: 'cores',
      type: 'number',
      label: 'CPU Cores',
      required: true,
      min: 2,
      max: 24,
      group: 'performance'
    },
    {
      name: 'ramSize',
      type: 'number',
      label: 'RAM Size',
      required: true,
      unit: 'GB',
      min: 4,
      max: 128,
      group: 'performance'
    },
    {
      name: 'ramType',
      type: 'select',
      label: 'RAM Type',
      required: true,
      options: ['DDR4', 'DDR5', 'LPDDR4X', 'LPDDR5'],
      group: 'performance'
    },
    {
      name: 'gpuModel',
      type: 'text',
      label: 'GPU Model',
      required: true,
      group: 'performance'
    },
    {
      name: 'gpuVram',
      type: 'number',
      label: 'GPU VRAM',
      required: false,
      unit: 'GB',
      min: 2,
      max: 16,
      group: 'performance'
    },

    // Storage
    {
      name: 'storageType',
      type: 'select',
      label: 'Storage Type',
      required: true,
      options: ['SSD', 'HDD', 'NVMe SSD'],
      group: 'storage'
    },
    {
      name: 'storageCapacity',
      type: 'number',
      label: 'Storage Capacity',
      required: true,
      unit: 'GB',
      min: 128,
      group: 'storage'
    },
    {
      name: 'storageInterface',
      type: 'select',
      label: 'Storage Interface',
      required: true,
      options: ['SATA III', 'PCIe 3.0', 'PCIe 4.0'],
      group: 'storage'
    },

    // Physical
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'kg',
      step: 0.01,
      min: 0.5,
      max: 5,
      group: 'physical'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions (WxDxH)',
      required: true,
      placeholder: 'e.g., 320x220x15.9mm',
      group: 'physical'
    },
    {
      name: 'color',
      type: 'text',
      label: 'Color',
      required: true,
      group: 'physical'
    },
    {
      name: 'buildMaterial',
      type: 'select',
      label: 'Build Material',
      required: true,
      options: ['Aluminum', 'Plastic', 'Magnesium', 'Carbon Fiber'],
      group: 'physical'
    },

    // Battery
    {
      name: 'batteryCapacity',
      type: 'number',
      label: 'Battery Capacity',
      required: true,
      unit: 'Wh',
      min: 30,
      max: 100,
      group: 'battery'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: true,
      unit: 'hours',
      min: 1,
      max: 24,
      group: 'battery'
    },
    {
      name: 'chargingWattage',
      type: 'number',
      label: 'Charging Wattage',
      required: true,
      unit: 'W',
      min: 30,
      max: 300,
      group: 'battery'
    },

    // Features
    {
      name: 'webcam',
      type: 'checkbox',
      label: 'Webcam',
      required: false,
      group: 'features'
    },
    {
      name: 'backlitKeyboard',
      type: 'checkbox',
      label: 'Backlit Keyboard',
      required: false,
      group: 'features'
    },
    {
      name: 'fingerprint',
      type: 'checkbox',
      label: 'Fingerprint Reader',
      required: false,
      group: 'features'
    },
    {
      name: 'wifi',
      type: 'select',
      label: 'WiFi',
      required: true,
      options: ['WiFi 5', 'WiFi 6', 'WiFi 6E'],
      group: 'features'
    },
    {
      name: 'bluetooth',
      type: 'select',
      label: 'Bluetooth',
      required: true,
      options: ['4.0', '5.0', '5.1', '5.2', '5.3'],
      group: 'features'
    }
  ]
}; 