import {CategoryFormConfig} from './product-form.types';

export const microphonesConfig: CategoryFormConfig = {
  id: 'microphones',
  name: 'Microphones',
  fields: [
    {
      name: 'micType',
      type: 'select',
      label: 'Microphone Type',
      required: true,
      options: [
        'Condenser',
        'Dynamic',
        'USB',
        'Lavalier',
        'Shotgun',
        'Studio'
      ],
      group: 'specifications'
    },
    {
      name: 'polarPattern',
      type: 'select',
      label: 'Polar Pattern',
      required: true,
      options: [
        'Cardioid',
        'Omnidirectional',
        'Bidirectional',
        'Stereo',
        'Multi-pattern'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'select',
      label: 'Connectivity',
      required: true,
      options: [
        'XLR',
        'USB',
        'XLR/USB Combo',
        '3.5mm',
        'Wireless'
      ],
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
      name: 'maxSPL',
      type: 'number',
      label: 'Maximum SPL',
      required: true,
      unit: 'dB',
      group: 'specifications'
    },
    {
      name: 'sampleRate',
      type: 'select',
      label: 'Sample Rate',
      options: [
        '44.1kHz',
        '48kHz',
        '96kHz',
        '192kHz'
      ],
      group: 'specifications'
    },
    {
      name: 'bitDepth',
      type: 'select',
      label: 'Bit Depth',
      options: [
        '16-bit',
        '24-bit',
        '32-bit'
      ],
      group: 'specifications'
    },
    {
      name: 'includes',
      type: 'multiselect',
      label: 'Included Accessories',
      options: [
        'Shock Mount',
        'Pop Filter',
        'Carrying Case',
        'Mic Stand',
        'USB Cable',
        'XLR Cable'
      ],
      group: 'specifications'
    }
  ]
};
