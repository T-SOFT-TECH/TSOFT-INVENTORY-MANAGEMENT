import { CategoryFormConfig, commonFields } from './product-form.types';

export const smartphonesConfig: CategoryFormConfig = {
  id: 'smartphones',
  name: 'Smartphones',
  fields: [
    ...commonFields,
    {
      name: 'platform',
      type: 'select',
      label: 'Operating System',
      required: true,
      options: [
        'Android',
        'iOS'
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
        'Google',
        'OnePlus',
        'Xiaomi',
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
      name: 'resolution',
      type: 'text',
      label: 'Screen Resolution',
      required: true,
      placeholder: 'e.g., 2532 x 1170',
      group: 'specifications'
    },
    {
      name: 'processor',
      type: 'text',
      label: 'Processor',
      required: true,
      placeholder: 'e.g., A15 Bionic, Snapdragon 8 Gen 2',
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
        '64GB',
        '128GB',
        '256GB',
        '512GB',
        '1TB'
      ],
      group: 'specifications'
    },
    {
      name: 'mainCamera',
      type: 'text',
      label: 'Main Camera',
      required: true,
      placeholder: 'e.g., 48MP + 12MP Ultra Wide',
      group: 'specifications'
    },
    {
      name: 'frontCamera',
      type: 'text',
      label: 'Front Camera',
      required: true,
      placeholder: 'e.g., 12MP TrueDepth',
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
      name: 'chargingSpeed',
      type: 'number',
      label: 'Charging Speed',
      required: false,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'biometrics',
      type: 'multiselect',
      label: 'Biometric Security',
      required: false,
      options: [
        'Face Recognition',
        'Fingerprint (Under Display)',
        'Fingerprint (Side)',
        'Fingerprint (Rear)'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        '5G',
        '4G LTE',
        'Wi-Fi 6',
        'Bluetooth 5.0',
        'NFC',
        'UWB'
      ],
      group: 'specifications'
    },
    {
      name: 'waterResistance',
      type: 'select',
      label: 'Water Resistance Rating',
      required: false,
      options: [
        'IP67',
        'IP68',
        'None'
      ],
      group: 'specifications'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: true,
      placeholder: 'e.g., 146.7 x 71.5 x 7.4 mm',
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