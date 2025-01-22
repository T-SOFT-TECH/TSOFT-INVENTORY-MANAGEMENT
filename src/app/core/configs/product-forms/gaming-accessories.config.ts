import { CategoryFormConfig, commonFields } from './product-form.types';

export const gamingAccessoriesConfig: CategoryFormConfig = {
  id: 'gaming-accessories', // Matches the category name from initial-categories.ts
  name: 'Gaming Accessories',
  fields: [
    ...commonFields,
    {
      name: 'accessoryType',
      type: 'select',
      label: 'Accessory Type',
      required: true,
      options: [
        'Gaming Controller',
        'Gaming Headset',
        'Gaming Mouse Pad',
        'Gaming Glasses',
        'Console Stand',
        'Controller Charging Dock'
      ],
      group: 'specifications'
    },
    {
      name: 'compatibility',
      type: 'multiselect',
      label: 'Compatible Platforms',
      required: true,
      options: [
        'PC',
        'PlayStation 5',
        'PlayStation 4',
        'Xbox Series X|S',
        'Xbox One',
        'Nintendo Switch'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'select',
      label: 'Connectivity',
      required: true,
      options: [
        'Wired',
        'Wireless 2.4GHz',
        'Bluetooth',
        'Wireless + Bluetooth',
        'None'
      ],
      group: 'specifications'
    },
    {
      name: 'rgb',
      type: 'checkbox',
      label: 'RGB Lighting',
      required: false,
      group: 'specifications'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: false,
      unit: 'hours',
      group: 'specifications'
    },
    {
      name: 'chargingType',
      type: 'select',
      label: 'Charging Type',
      required: false,
      options: [
        'USB-C',
        'Micro USB',
        'USB-A',
        'Proprietary',
        'AA/AAA Batteries',
        'None'
      ],
      group: 'specifications'
    },
    {
      name: 'material',
      type: 'select',
      label: 'Primary Material',
      required: true,
      options: [
        'Plastic',
        'Metal',
        'Fabric',
        'Glass',
        'Mixed Materials'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Special Features',
      required: false,
      options: [
        'Programmable Buttons',
        'Haptic Feedback',
        'Adjustable Parts',
        'Anti-Glare',
        'Noise Cancellation',
        'Quick Charging'
      ],
      group: 'specifications'
    },
    {
      name: 'cableLength',
      type: 'number',
      label: 'Cable Length',
      required: false,
      unit: 'm',
      group: 'specifications'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'g',
      group: 'specifications'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: true,
      placeholder: 'e.g., 150 x 80 x 40 mm',
      group: 'specifications'
    },
    {
      name: 'warranty',
      type: 'number',
      label: 'Warranty Period',
      required: true,
      unit: 'months',
      group: 'specifications'
    }
  ]
}; 