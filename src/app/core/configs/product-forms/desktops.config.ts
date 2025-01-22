import { CategoryFormConfig, commonFields } from './product-form.types';

export const desktopsConfig: CategoryFormConfig = {
  id: 'desktops',
  name: 'Desktops',
  fields: [
    ...commonFields,
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
      max: 64,
      group: 'performance'
    },
    {
      name: 'ramSize',
      type: 'number',
      label: 'RAM Size',
      required: true,
      unit: 'GB',
      min: 4,
      max: 256,
      group: 'performance'
    },
    {
      name: 'ramType',
      type: 'select',
      label: 'RAM Type',
      required: true,
      options: ['DDR4', 'DDR5'],
      group: 'performance'
    },
    {
      name: 'gpuModel',
      type: 'text',
      label: 'Graphics Card Model',
      required: true,
      group: 'performance'
    },

    // Storage
    {
      name: 'storageType',
      type: 'select',
      label: 'Primary Storage Type',
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

    // Form Factor
    {
      name: 'caseType',
      type: 'select',
      label: 'Case Type',
      required: true,
      options: [
        'Full Tower',
        'Mid Tower',
        'Mini Tower',
        'Small Form Factor',
        'All-in-One'
      ],
      group: 'formFactor'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions (HxWxD)',
      required: true,
      placeholder: 'e.g., 450x200x400mm',
      group: 'formFactor'
    },

    // Power
    {
      name: 'powerSupply',
      type: 'text',
      label: 'Power Supply Model',
      required: true,
      group: 'power'
    },
    {
      name: 'powerRating',
      type: 'number',
      label: 'Power Supply Rating',
      required: true,
      unit: 'W',
      min: 300,
      max: 1500,
      group: 'power'
    },

    // Ports
    {
      name: 'frontPorts',
      type: 'multiselect',
      label: 'Front Ports',
      required: true,
      options: [
        'USB 3.0',
        'USB 3.1',
        'USB-C',
        'Audio Jack',
        'Microphone Jack',
        'Card Reader'
      ],
      group: 'ports'
    },
    {
      name: 'rearPorts',
      type: 'multiselect',
      label: 'Rear Ports',
      required: true,
      options: [
        'USB 2.0',
        'USB 3.0',
        'USB 3.1',
        'USB-C',
        'HDMI',
        'DisplayPort',
        'Ethernet',
        'Audio Ports',
        'PS/2'
      ],
      group: 'ports'
    },

    // Features
    {
      name: 'wifi',
      type: 'select',
      label: 'WiFi',
      required: false,
      options: ['No WiFi', 'WiFi 5', 'WiFi 6', 'WiFi 6E'],
      group: 'features'
    },
    {
      name: 'bluetooth',
      type: 'select',
      label: 'Bluetooth',
      required: false,
      options: ['No Bluetooth', '4.0', '5.0', '5.1', '5.2', '5.3'],
      group: 'features'
    },
    {
      name: 'opticalDrive',
      type: 'select',
      label: 'Optical Drive',
      required: false,
      options: ['None', 'DVD-RW', 'Blu-ray'],
      group: 'features'
    },
    {
      name: 'cooling',
      type: 'multiselect',
      label: 'Cooling Solution',
      required: true,
      options: [
        'Air CPU Cooler',
        'Liquid CPU Cooler',
        'Case Fans',
        'Liquid Cooling Kit'
      ],
      group: 'features'
    }
  ]
}; 