
import { CategoryFormConfig } from './product-form.types';

export const twoInOneLaptopsConfig: CategoryFormConfig = {
  id: '2_in_1_laptops',
  name: '2-in-1 Laptops',
  fields: [
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      min: 11,
      max: 17,
      step: 0.1,
      group: 'display'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Display Resolution',
      required: true,
      options: [
        '1920x1080 (FHD)',
        '2560x1440 (QHD)',
        '3840x2160 (4K)'
      ],
      group: 'display'
    },
    {
      name: 'touchscreen',
      type: 'checkbox',
      label: 'Touchscreen Support',
      required: true,
      group: 'display'
    },
    {
      name: 'convertibleType',
      type: 'select',
      label: 'Convertible Type',
      required: true,
      options: [
        '360-Degree Hinge',
        'Detachable',
        'Dual-Screen'
      ],
      group: 'design'
    },
    {
      name: 'penSupport',
      type: 'select',
      label: 'Pen Support',
      required: true,
      options: [
        'Active Pen Support',
        'MPP Support',
        'Wacom AES',
        'No Pen Support'
      ],
      group: 'features'
    },
    {
      name: 'processorModel',
      type: 'text',
      label: 'Processor Model',
      required: true,
      group: 'performance'
    },
    {
      name: 'ramSize',
      type: 'number',
      label: 'RAM Size',
      required: true,
      unit: 'GB',
      min: 4,
      max: 32,
      group: 'performance'
    },
    {
      name: 'storageType',
      type: 'select',
      label: 'Storage Type',
      required: true,
      options: ['SSD', 'NVMe SSD'],
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
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'kg',
      step: 0.01,
      min: 1,
      max: 2.5,
      group: 'physical'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: true,
      unit: 'hours',
      min: 4,
      max: 24,
      group: 'battery'
    },
    {
      name: 'ports',
      type: 'multiselect',
      label: 'Ports',
      required: true,
      options: [
        'USB-C',
        'USB-A',
        'HDMI',
        'Audio Jack',
        'microSD Card Reader'
      ],
      group: 'connectivity'
    },
    {
      name: 'biometricSecurity',
      type: 'multiselect',
      label: 'Biometric Security',
      options: [
        'Fingerprint Reader',
        'IR Camera',
        'Face Recognition'
      ],
      group: 'security'
    },
    {
      name: 'screenModes',
      type: 'multiselect',
      label: 'Screen Modes',
      required: true,
      options: [
        'Laptop Mode',
        'Tablet Mode',
        'Tent Mode',
        'Stand Mode'
      ],
      group: 'features'
    }
  ]
};
