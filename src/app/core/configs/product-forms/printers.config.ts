import { CategoryFormConfig, commonFields } from './product-form.types';

export const printersConfig: CategoryFormConfig = {
  id: 'printers-scanners', // Matches the category name from initial-categories.ts
  name: 'Printers & Scanners',
  fields: [
    ...commonFields,
    {
      name: 'deviceType',
      type: 'select',
      label: 'Device Type',
      required: true,
      options: ['Printer', 'Scanner', 'All-in-One', 'Label Printer'],
      group: 'specifications'
    },
    {
      name: 'printTechnology',
      type: 'select',
      label: 'Print Technology',
      required: true,
      options: ['Inkjet', 'Laser', 'Thermal', 'LED', 'Dot Matrix'],
      group: 'specifications'
    },
    {
      name: 'printColor',
      type: 'select',
      label: 'Print Color',
      required: true,
      options: ['Color', 'Monochrome'],
      group: 'specifications'
    },
    {
      name: 'printResolution',
      type: 'text',
      label: 'Print Resolution',
      required: true,
      placeholder: 'e.g., 4800 x 1200 dpi',
      group: 'specifications'
    },
    {
      name: 'printSpeed',
      type: 'number',
      label: 'Print Speed',
      required: true,
      unit: 'ppm',
      group: 'specifications'
    },
    {
      name: 'duplexPrinting',
      type: 'checkbox',
      label: 'Automatic Duplex Printing',
      required: false,
      group: 'specifications'
    },
    {
      name: 'paperSize',
      type: 'multiselect',
      label: 'Supported Paper Sizes',
      required: true,
      options: ['A4', 'A3', 'Letter', 'Legal', 'Photo', 'Envelope'],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: ['USB', 'Ethernet', 'Wi-Fi', 'Bluetooth', 'NFC'],
      group: 'specifications'
    },
    {
      name: 'mobilePrinting',
      type: 'multiselect',
      label: 'Mobile Printing',
      required: false,
      options: ['AirPrint', 'Google Cloud Print', 'Mopria', 'Mobile App'],
      group: 'specifications'
    },
    {
      name: 'scannerType',
      type: 'select',
      label: 'Scanner Type',
      required: false,
      options: ['Flatbed', 'Sheet-fed', 'Both'],
      group: 'specifications'
    },
    {
      name: 'scanResolution',
      type: 'text',
      label: 'Scan Resolution',
      required: false,
      placeholder: 'e.g., 1200 x 2400 dpi',
      group: 'specifications'
    },
    {
      name: 'documentFeeder',
      type: 'checkbox',
      label: 'Automatic Document Feeder',
      required: false,
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
      name: 'monthlyDutyCycle',
      type: 'number',
      label: 'Monthly Duty Cycle',
      required: true,
      unit: 'pages',
      group: 'specifications'
    },
    {
      name: 'displayScreen',
      type: 'checkbox',
      label: 'LCD Display Screen',
      required: false,
      group: 'specifications'
    },
    {
      name: 'faxFunction',
      type: 'checkbox',
      label: 'Fax Functionality',
      required: false,
      group: 'specifications'
    }
  ]
}; 