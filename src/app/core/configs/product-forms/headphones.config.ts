import {CategoryFormConfig} from './product-form.types';

export const headphonesConfig: CategoryFormConfig = {
  id: 'headphones',
  name: 'Headphones',
  fields: [
    {
      name: 'headphoneType',
      type: 'select',
      label: 'Type',
      required: true,
      options: [
        'Over-Ear',
        'On-Ear',
        'In-Ear',
        'True Wireless',
        'Gaming',
       ' Earbuds & In-ear Monitors',
        'Wireless Earbuds'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'select',
      label: 'Connectivity',
      required: true,
      options: [
        'Wired (3.5mm)',
        'Wireless (Bluetooth)',
        'Wireless (RF)',
        'USB',
        'USB-C'
      ],
      group: 'specifications'
    },
    {
      name: 'driver',
      type: 'text',
      label: 'Driver Size',
      required: true,
      unit: 'mm',
      group: 'specifications'
    },
    {
      name: 'frequency',
      type: 'text',
      label: 'Frequency Response',
      required: true,
      placeholder: 'e.g., 20Hz-20kHz',
      group: 'specifications'
    },
    {
      name: 'impedance',
      type: 'number',
      label: 'Impedance',
      required: true,
      unit: 'Ω',
      group: 'specifications'
    },
    {
      name: 'sensitivity',
      type: 'number',
      label: 'Sensitivity',
      required: true,
      unit: 'dB',
      group: 'specifications'
    },
    {
      name: 'noiseControl',
      type: 'multiselect',
      label: 'Noise Control',
      options: [
        'Active Noise Cancellation',
        'Passive Noise Isolation',
        'Ambient Sound Mode',
        'None'
      ],
      group: 'features'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      unit: 'hours',
      group: 'specifications'
    },
    {
      name: 'waterResistance',
      type: 'select',
      label: 'Water Resistance Rating',
      options: [
        'IPX4',
        'IPX5',
        'IPX7',
        'IPX8',
        'None'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Touch Controls',
        'Voice Assistant',
        'Multipoint Connection',
        'Foldable Design',
        'Built-in Microphone',
        'Volume Control',
        'EQ Customization'
      ],
      group: 'features'
    }
  ]
};
