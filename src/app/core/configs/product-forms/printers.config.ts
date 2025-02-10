import { CategoryFormConfig } from './product-form.types';

export const printersConfig: CategoryFormConfig = {
  id: 'printers',
  name: 'Printers',
  fields: [
    {
      name: 'printerType',
      type: 'select',
      label: 'Printer Type',
      required: true,
      options: [
        'Inkjet',
        'Laser',
        'All-in-One',
        'Photo Printer',
        'Label Printer',
        'Dot Matrix'
      ],
      group: 'basic'
    },
    {
      name: 'functionality',
      type: 'multiselect',
      label: 'Functions',
      required: true,
      options: [
        'Print',
        'Scan',
        'Copy',
        'Fax'
      ],
      group: 'basic'
    },
    {
      name: 'printTechnology',
      type: 'select',
      label: 'Print Technology',
      required: true,
      options: [
        'Thermal Inkjet',
        'Piezo Inkjet',
        'Laser',
        'LED',
        'Dot Matrix',
        'Thermal'
      ],
      group: 'specifications'
    },
    {
      name: 'colorPrinting',
      type: 'checkbox',
      label: 'Color Printing',
      required: true,
      group: 'specifications'
    },
    {
      name: 'printResolution',
      type: 'text',
      label: 'Print Resolution',
      required: true,
      placeholder: '4800x1200 dpi',
      group: 'performance'
    },
    {
      name: 'printSpeedBlackAndWhite',
      type: 'number',
      label: 'Black & White Print Speed',
      unit: 'ppm',
      required: true,
      group: 'performance'
    },
    {
      name: 'printSpeedColor',
      type: 'number',
      label: 'Color Print Speed',
      unit: 'ppm',
      group: 'performance'
    },
    {
      name: 'duplexPrinting',
      type: 'checkbox',
      label: 'Automatic Duplex Printing',
      group: 'features'
    },
    {
      name: 'paperHandling',
      type: 'multiselect',
      label: 'Supported Paper Sizes',
      required: true,
      options: [
        'Letter',
        'Legal',
        'A4',
        'A3',
        'A5',
        'Envelope',
        'Photo'
      ],
      group: 'specifications'
    },
    {
      name: 'paperTrayCapacity',
      type: 'number',
      label: 'Paper Tray Capacity',
      required: true,
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
        'Ethernet',
        'Wi-Fi',
        'Wi-Fi Direct',
        'NFC',
        'Bluetooth'
      ],
      group: 'connectivity'
    },
    {
      name: 'mobilePrinting',
      type: 'multiselect',
      label: 'Mobile Printing',
      options: [
        'AirPrint',
        'Google Cloud Print',
        'Mopria',
        'Manufacturer App'
      ],
      group: 'features'
    },
    {
      name: 'memory',
      type: 'number',
      label: 'Internal Memory',
      unit: 'MB',
      group: 'specifications'
    },
    {
      name: 'processorSpeed',
      type: 'number',
      label: 'Processor Speed',
      unit: 'MHz',
      group: 'specifications'
    },
    {
      name: 'monthlyDutyCycle',
      type: 'number',
      label: 'Monthly Duty Cycle',
      required: true,
      unit: 'pages',
      group: 'specifications'
    },
    {
      name: 'scannerFeatures',
      type: 'multiselect',
      label: 'Scanner Features',
      options: [
        'Flatbed',
        'ADF',
        'Duplex Scanning',
        'Color Scanning'
      ],
      group: 'scanning'
    },
    {
      name: 'scanResolution',
      type: 'text',
      label: 'Scan Resolution',
      placeholder: '1200x2400 dpi',
      group: 'scanning'
    },
    {
      name: 'displayScreen',
      type: 'select',
      label: 'Display Screen',
      options: [
        'None',
        'LCD',
        'Color LCD',
        'Touchscreen'
      ],
      group: 'features'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions (WxDxH)',
      required: true,
      placeholder: '440x420x250mm',
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
      name: 'powerConsumption',
      type: 'number',
      label: 'Power Consumption',
      unit: 'W',
      group: 'power'
    }
  ]
};
