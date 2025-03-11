
import { CategoryFormConfig } from './product-form.types';

export const businessLaptopsConfig: CategoryFormConfig = {
  id: 'business_laptops',
  name: 'Business Laptops',
  fields: [
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      min: 12,
      max: 17,
      step: 0.1,
      group: 'display'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Display Resolution',
      required: true,
      options: [
        '1366x768 (HD)',
        '1920x1080 (FHD)',
        '2560x1440 (QHD)',
        '3840x2160 (4K)'
      ],
      group: 'display'
    },
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: true,
      options: [
        'IPS',
        'OLED',
        'TN',
        'VA'
      ],
      group: 'display'
    },
    {
      name: 'processorModel',
      type: 'text',
      label: 'Processor Model',
      required: true,
      group: 'performance'
    },
    {
      name: 'vPro',
      type: 'checkbox',
      label: 'Intel vPro Support',
      group: 'performance'
    },
    {
      name: 'ramSize',
      type: 'number',
      label: 'RAM Size',
      required: true,
      unit: 'GB',
      min: 4,
      max: 64,
      group: 'performance'
    },
    {
      name: 'storageType',
      type: 'select',
      label: 'Storage Type',
      required: true,
      options: ['SSD', 'NVMe SSD'],
      group: 'storage'
    },
    {
      name: 'storageCapacity',
      type: 'number',
      label: 'Storage Capacity',
      required: true,
      unit: 'GB',
      min: 128,
      group: 'storage'
    },
    {
      name: 'securityFeatures',
      type: 'multiselect',
      label: 'Security Features',
      required: true,
      options: [
        'TPM 2.0',
        'Fingerprint Reader',
        'Smart Card Reader',
        'IR Camera',
        'Privacy Screen',
        'Privacy Camera Shutter',
        'BIOS Security'
      ],
      group: 'security'
    },
    {
      name: 'dockingSupport',
      type: 'select',
      label: 'Docking Support',
      required: true,
      options: [
        'Proprietary Dock',
        'USB-C Dock',
        'Thunderbolt Dock',
        'No Docking Support'
      ],
      group: 'connectivity'
    },
    {
      name: 'portSelection',
      type: 'multiselect',
      label: 'Ports',
      required: true,
      options: [
        'USB-C',
        'USB-A 3.0',
        'HDMI',
        'DisplayPort',
        'Ethernet',
        'Audio Jack',
        'Smart Card Slot'
      ],
      group: 'connectivity'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: true,
      unit: 'hours',
      min: 4,
      max: 24,
      group: 'battery'
    },
    {
      name: 'durabilityStandards',
      type: 'multiselect',
      label: 'Durability Standards',
      options: [
        'MIL-STD-810G',
        'IP53',
        'Spill Resistant Keyboard',
        'Drop Tested'
      ],
      group: 'durability'
    },
    {
      name: 'managementFeatures',
      type: 'multiselect',
      label: 'Management Features',
      options: [
        'Intel AMT',
        'Remote Management',
        'Wake on LAN',
        'PXE Boot'
      ],
      group: 'management'
    },
    {
      name: 'warranty',
      type: 'select',
      label: 'Warranty Type',
      required: true,
      options: [
        'Standard Warranty',
        'ProSupport',
        'Next Business Day',
        'Onsite Support'
      ],
      group: 'support'
    }
  ]
};
