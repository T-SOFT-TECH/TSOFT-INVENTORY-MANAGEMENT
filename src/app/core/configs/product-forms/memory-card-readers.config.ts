import {CategoryFormConfig} from './product-form.types';

export const memoryCardReadersConfig: CategoryFormConfig = {
  id: 'memory_card_readers',
  name: 'Memory Card Readers',
  fields: [
    {
      name: 'readerType',
      type: 'select',
      label: 'Reader Type',
      required: true,
      options: ['Single-format', 'Multi-format', 'All-in-One'],
      group: 'specifications',
    },
    // Changed to checkbox-group to allow multiple interfaces
    {
      name: 'connectionInterfaces',
      type: 'checkbox-group',
      label: 'Connection Interfaces',
      required: true,
      options: ['USB-A', 'USB-C', 'Micro USB', 'Thunderbolt', 'Lightning', 'Internal'],
      group: 'specifications',
    },
    // Added for dual-interface readers
    {
      name: 'multiInterfaceType',
      type: 'select',
      label: 'Multi-Interface Type',
      required: false,
      options: [
        'Single Interface',
        'Dual Interface (2-in-1)',
        'Multi-Interface (3+ connections)'
      ],
      helpText: 'For readers with multiple connectors',
      group: 'specifications',
    },
    {
      name: 'usbVersion',
      type: 'select',
      label: 'USB Version',
      required: true,
      options: ['USB 1.0/1.1', 'USB 2.0', 'USB 3.0', 'USB 3.1', 'USB 3.2'],
      group: 'specifications',
    },
    // Changed to checkbox-group since readers typically support multiple formats
    {
      name: 'supportedCardFormats',
      type: 'checkbox-group',
      label: 'Supported Card Formats',
      required: true,
      options: [
        'SD', 'SDHC', 'SDXC',
        'microSD', 'microSDHC', 'microSDXC',
        'CompactFlash (CF)', 'CFexpress',
        'XQD', 'Memory Stick', 'Memory Stick Pro',
        'Memory Stick Duo', 'MMC',
        'xD-Picture Card', 'UFS', 'CFast', 'M.2'
      ],
      group: 'specifications',
    },
    {
      name: 'transferSpeed',
      type: 'select',
      label: 'Maximum Transfer Speed',
      required: false,
      options: ['Up to 480 Mbps', 'Up to 5 Gbps', 'Up to 10 Gbps', 'Up to 20 Gbps'],
      group: 'specifications',
    },
    // Added form factor
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: false,
      options: [
        'Ultra-Compact/Nano',
        'Standard Portable',
        'Desktop/Multi-Slot',
        'Internal Bay',
        'Integrated Hub'
      ],
      group: 'physical',
    },
    {
      name: 'simultaneousReadWrite',
      type: 'checkbox',  // Changed from radio to checkbox
      label: 'Simultaneous Read/Write Support',
      group: 'features',
    },
    {
      name: 'plugPlay',
      type: 'checkbox',
      label: 'Plug and Play (No Drivers Required)',
      group: 'features',
    },
    {
      name: 'otgSupport',
      type: 'checkbox',
      label: 'OTG Support for Mobile Devices',
      group: 'features',
    },
    {
      name: 'ledIndicator',
      type: 'checkbox',  // Changed from radio to checkbox
      label: 'Activity LED Indicator',
      group: 'features',
    },
    {
      name: 'portableFeatures',
      type: 'checkbox-group',
      label: 'Portable Design Features',
      required: false,
      options: [
        'Keychain Hole',
        'Cap/Cover Included',
        'Retractable Design',
        'Lanyard Included'
      ],
      group: 'physical',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['Black', 'White', 'Silver', 'Gray', 'Blue', 'Red', 'Other'],
      group: 'physical',
    },
    {
      name: 'warranty',
      type: 'select',
      label: 'Warranty',
      required: false,
      options: ['1 Year', '2 Years', '3 Years', '5 Years', 'Lifetime'],
      group: 'additional',
    }
  ],
};
