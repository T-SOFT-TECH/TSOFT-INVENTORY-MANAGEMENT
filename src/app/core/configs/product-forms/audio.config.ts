import {CategoryFormConfig, commonFields} from './product-form.types';

export const audioConfig: CategoryFormConfig = {
  id: 'audio-devices',
  name: 'Audio Devices',
  fields: [
    ...commonFields,
    {
      name: 'deviceType',
      type: 'select',
      label: 'Device Type',
      required: true,
      options: [
        'Headphones',
        'Speakers',
        'Microphone',
        'Audio Interface',
        'Sound Card'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'select',
      label: 'Connectivity',
      required: true,
      options: ['Wired', 'Wireless', 'Bluetooth', 'USB'],
      group: 'specifications'
    },
    {
      name: 'frequency',
      type: 'text',
      label: 'Frequency Response',
      placeholder: 'e.g., 20Hz-20kHz',
      group: 'specifications'
    },
    {
      name: 'impedance',
      type: 'number',
      label: 'Impedance',
      unit: 'Ω',
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Noise Cancellation',
        'Surround Sound',
        'RGB Lighting',
        'Volume Control',
        'Detachable Cable'
      ],
      group: 'features'
    }
  ]
};
