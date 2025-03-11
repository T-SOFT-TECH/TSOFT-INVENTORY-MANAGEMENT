import {CategoryFormConfig} from './product-form.types';

export const documentScannersConfig: CategoryFormConfig = {
  id: 'document_scanners',
  name: 'Document Scanners',
  fields: [
    {
      name: 'scannerType',
      type: 'select',
      label: 'Scanner Type',
      required: true,
      options: [
        'Flatbed',
        'Sheet-fed',
        'Portable',
        'All-in-One',
        'Book Scanner'
      ],
      group: 'specifications'
    },
    {
      name: 'resolution',
      type: 'number',
      label: 'Optical Resolution',
      required: true,
      unit: 'dpi',
      group: 'specifications'
    },
    {
      name: 'scanSpeed',
      type: 'number',
      label: 'Scan Speed',
      required: true,
      unit: 'ppm',
      group: 'specifications'
    },
    {
      name: 'adfCapacity',
      type: 'number',
      label: 'ADF Capacity',
      unit: 'sheets',
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'USB',
        'Wi-Fi',
        'Ethernet',
        'Bluetooth'
      ],
      group: 'connectivity'
    },
    {
      name: 'documentSize',
      type: 'multiselect',
      label: 'Supported Document Sizes',
      required: true,
      options: [
        'A4',
        'A3',
        'Legal',
        'Letter',
        'Business Card'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Duplex Scanning',
        'OCR',
        'Auto Document Feeder',
        'Cloud Integration',
        'Mobile Scanning'
      ],
      group: 'features'
    }
  ]
};
