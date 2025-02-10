import { CategoryFormConfig } from './product-form.types';

export const scannersConfig: CategoryFormConfig = {
  id: 'scanners',
  name: 'Scanners',
  fields: [
    {
      name: 'scannerType',
      type: 'select',
      label: 'Scanner Type',
      required: true,
      options: [
        'Flatbed',
        'Document Scanner',
        'Sheet-fed',
        'Portable',
        'Film Scanner'
      ],
      group: 'basic'
    },
    {
      name: 'opticalResolution',
      type: 'text',
      label: 'Optical Resolution',
      required: true,
      placeholder: '4800x4800 dpi',
      group: 'specifications'
    },
    {
      name: 'interpolatedResolution',
      type: 'text',
      label: 'Interpolated Resolution',
      placeholder: '19200x19200 dpi',
      group: 'specifications'
    },
    {
      name: 'colorDepth',
      type: 'text',
      label: 'Color Depth',
      required: true,
      placeholder: '48-bit',
      group: 'specifications'
    },
    {
      name: 'scanSpeed',
      type: 'number',
      label: 'Scan Speed',
      required: true,
      unit: 'ppm',
      group: 'performance'
    },
    {
      name: 'adfCapacity',
      type: 'number',
      label: 'ADF Capacity',
      unit: 'sheets',
      group: 'features'
    },
    {
      name: 'duplexScanning',
      type: 'checkbox',
      label: 'Duplex Scanning',
      group: 'features'
    },
    {
      name: 'maximumScanSize',
      type: 'select',
      label: 'Maximum Scan Size',
      required: true,
      options: [
        'A4',
        'A3',
        'Legal',
        'Letter'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'USB 3.0',
        'USB 2.0',
        'Wi-Fi',
        'Ethernet',
        'Bluetooth'
      ],
      group: 'connectivity'
    },
    {
      name: 'fileFormats',
      type: 'multiselect',
      label: 'Supported File Formats',
      required: true,
      options: [
        'PDF',
        'JPEG',
        'PNG',
        'TIFF',
        'BMP',
        'PDF/A'
      ],
      group: 'compatibility'
    },
    {
      name: 'ocrSupport',
      type: 'checkbox',
      label: 'OCR Support',
      group: 'features'
    },
    {
      name: 'documentFeeder',
      type: 'select',
      label: 'Document Feeder Type',
      options: [
        'None',
        'ADF',
        'RADF',
        'DADF'
      ],
      group: 'features'
    },
    {
      name: 'scannerButtons',
      type: 'multiselect',
      label: 'Scanner Buttons',
      options: [
        'Scan',
        'Copy',
        'Email',
        'PDF',
        'Custom'
      ],
      group: 'features'
    },
    {
      name: 'operatingSystems',
      type: 'multiselect',
      label: 'Compatible Operating Systems',
      required: true,
      options: [
        'Windows 11',
        'Windows 10',
        'macOS',
        'Linux'
      ],
      group: 'compatibility'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions (WxDxH)',
      required: true,
      placeholder: '300x250x100mm',
      group: 'physical'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'kg',
      group: 'physical'
    },
    {
      name: 'operatingPowerConsumption',
      type: 'number',
      label: 'Operating Power Consumption',
      unit: 'W',
      group: 'power'
    },
    {
      name: 'standbyPowerConsumption',
      type: 'number',
      label: 'Standby Power Consumption',
      unit: 'W',
      group: 'power'
    },
    {
      name: 'warranty',
      type: 'number',
      label: 'Warranty',
      required: true,
      unit: 'years',
      group: 'support'
    }
  ]
};
