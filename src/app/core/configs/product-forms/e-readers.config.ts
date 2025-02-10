import {CategoryFormConfig} from './product-form.types';

export const eReadersConfig: CategoryFormConfig = {
  id: 'e-readers',
  name: 'E-Readers',
  fields: [
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      group: 'display'
    },
    {
      name: 'screenTechnology',
      type: 'select',
      label: 'Screen Technology',
      required: true,
      options: [
        'E-Ink Carta',
        'E-Ink Pearl',
        'E-Ink Carta HD',
        'E-Ink Mobius',
        'Color E-Ink'
      ],
      group: 'display'
    },
    {
      name: 'resolution',
      type: 'text',
      label: 'Display Resolution',
      required: true,
      placeholder: 'e.g., 1448 x 1072',
      group: 'display'
    },
    {
      name: 'frontLight',
      type: 'select',
      label: 'Front Light',
      required: true,
      options: [
        'None',
        'Adjustable White',
        'Adjustable White + Warmth'
      ],
      group: 'display'
    },
    {
      name: 'storage',
      type: 'number',
      label: 'Storage Capacity',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: true,
      unit: 'weeks',
      group: 'power'
    },
    {
      name: 'waterproofRating',
      type: 'select',
      label: 'Waterproof Rating',
      options: [
        'None',
        'IPX7',
        'IPX8'
      ],
      group: 'durability'
    },
    {
      name: 'supportedFormats',
      type: 'multiselect',
      label: 'Supported Formats',
      required: true,
      options: [
        'EPUB',
        'PDF',
        'MOBI',
        'AZW',
        'AZW3',
        'DOC',
        'DOCX',
        'TXT'
      ],
      group: 'compatibility'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'Wi-Fi',
        'Bluetooth',
        'Mobile Data',
        'USB'
      ],
      group: 'connectivity'
    },
    {
      name: 'audioSupport',
      type: 'checkbox',
      label: 'Audio Support (Audiobooks)',
      group: 'features'
    },
    {
      name: 'accessibilityFeatures',
      type: 'multiselect',
      label: 'Accessibility Features',
      options: [
        'Text-to-Speech',
        'Adjustable Font Size',
        'Screen Reader',
        'Dyslexic Font',
        'High Contrast'
      ],
      group: 'accessibility'
    },
    {
      name: 'educationalFeatures',
      type: 'multiselect',
      label: 'Educational Features',
      options: [
        'Dictionary',
        'Wikipedia Access',
        'Vocabulary Builder',
        'Translation',
        'Note Taking',
        'Highlighting'
      ],
      group: 'education'
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
