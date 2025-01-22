import { CategoryFormConfig, commonFields } from './product-form.types';

export const tabletsConfig: CategoryFormConfig = {
  id: 'tablets',
  name: 'Tablets',
  fields: [
    ...commonFields,
    {
      name: 'platform',
      type: 'select',
      label: 'Operating System',
      required: true,
      options: [
        'iPadOS',
        'Android',
        'Windows',
        'Chrome OS'
      ],
      group: 'specifications'
    },
    {
      name: 'brand',
      type: 'select',
      label: 'Brand',
      required: true,
      options: [
        'Apple',
        'Samsung',
        'Microsoft',
        'Lenovo',
        'Amazon',
        'Other'
      ],
      group: 'specifications'
    },
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      group: 'specifications'
    },
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: true,
      options: [
        'IPS LCD',
        'OLED',
        'Mini LED',
        'AMOLED',
        'E-ink'
      ],
      group: 'specifications'
    },
    {
      name: 'resolution',
      type: 'text',
      label: 'Screen Resolution',
      required: true,
      placeholder: 'e.g., 2732 x 2048',
      group: 'specifications'
    },
    {
      name: 'processor',
      type: 'text',
      label: 'Processor',
      required: true,
      placeholder: 'e.g., M2, Snapdragon 8 Gen 2',
      group: 'specifications'
    },
    {
      name: 'ram',
      type: 'number',
      label: 'RAM',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'storage',
      type: 'select',
      label: 'Storage Capacity',
      required: true,
      options: [
        '32GB',
        '64GB',
        '128GB',
        '256GB',
        '512GB',
        '1TB',
        '2TB'
      ],
      group: 'specifications'
    },
    {
      name: 'expandableStorage',
      type: 'checkbox',
      label: 'Expandable Storage',
      required: false,
      group: 'specifications'
    },
    {
      name: 'rearCamera',
      type: 'text',
      label: 'Rear Camera',
      required: false,
      placeholder: 'e.g., 12MP Wide + 10MP Ultra Wide',
      group: 'specifications'
    },
    {
      name: 'frontCamera',
      type: 'text',
      label: 'Front Camera',
      required: false,
      placeholder: 'e.g., 12MP Ultra Wide',
      group: 'specifications'
    },
    {
      name: 'battery',
      type: 'number',
      label: 'Battery Capacity',
      required: true,
      unit: 'mAh',
      group: 'specifications'
    },
    {
      name: 'pencilSupport',
      type: 'checkbox',
      label: 'Stylus Support',
      required: false,
      group: 'specifications'
    },
    {
      name: 'keyboardSupport',
      type: 'checkbox',
      label: 'Keyboard Support',
      required: false,
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'Wi-Fi',
        'Cellular',
        'Bluetooth',
        'USB-C',
        'Thunderbolt'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      required: false,
      options: [
        'Face Recognition',
        'Fingerprint Reader',
        'GPS',
        'Accelerometer',
        'Gyroscope',
        'Stereo Speakers'
      ],
      group: 'specifications'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: true,
      placeholder: 'e.g., 280.6 x 214.9 x 6.4 mm',
      group: 'specifications'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'g',
      group: 'specifications'
    }
  ]
}; 