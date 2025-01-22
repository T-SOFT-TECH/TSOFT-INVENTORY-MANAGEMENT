import {CategoryFormConfig, commonFields} from './product-form.types';

export const wearablesConfig: CategoryFormConfig = {
  id: 'smart-wearables',
  name: 'Smart Wearables',
  fields: [
    ...commonFields,
    {
      name: 'wearableType',
      type: 'select',
      label: 'Wearable Type',
      required: true,
      options: ['Smartwatch', 'Fitness Band', 'Smart Ring', 'Smart Glasses'],
      group: 'specifications'
    },
    {
      name: 'compatibility',
      type: 'multiselect',
      label: 'Device Compatibility',
      required: true,
      options: ['iOS', 'Android', 'Windows'],
      group: 'specifications'
    },
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: true,
      options: ['AMOLED', 'LCD', 'E-ink'],
      group: 'specifications'
    },
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      unit: 'inches',
      step: 0.1,
      group: 'specifications'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: true,
      unit: 'hours',
      group: 'specifications'
    },
    {
      name: 'sensors',
      type: 'multiselect',
      label: 'Sensors',
      options: [
        'Heart Rate',
        'SpO2',
        'ECG',
        'GPS',
        'Accelerometer',
        'Gyroscope',
        'Temperature'
      ],
      group: 'specifications'
    },
    {
      name: 'waterResistance',
      type: 'text',
      label: 'Water Resistance Rating',
      placeholder: 'e.g., IP68, 5ATM',
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Sleep Tracking',
        'Stress Monitoring',
        'NFC Payments',
        'Voice Assistant',
        'Music Control',
        'Call Handling'
      ],
      group: 'features'
    }
  ]
};
