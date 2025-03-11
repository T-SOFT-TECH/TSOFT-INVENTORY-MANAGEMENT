
import { CategoryFormConfig } from './product-form.types';

export const miniPcsConfig: CategoryFormConfig = {
  id: 'mini_pcs',
  name: 'Mini PCs',
  fields: [
    {
      name: 'processorModel',
      type: 'text',
      label: 'Processor Model',
      required: true,
      group: 'performance'
    },
    {
      name: 'processorType',
      type: 'select',
      label: 'Processor Type',
      required: true,
      options: [
        'Mobile Processor',
        'Desktop Processor',
        'Embedded Processor'
      ],
      group: 'performance'
    },
    {
      name: 'integratedGraphics',
      type: 'text',
      label: 'Integrated Graphics',
      required: true,
      group: 'performance'
    },
    {
      name: 'discreteGpu',
      type: 'text',
      label: 'Discrete Graphics (Optional)',
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
      name: 'ramType',
      type: 'select',
      label: 'RAM Type',
      required: true,
      options: [
        'DDR4 SO-DIMM',
        'DDR5 SO-DIMM',
        'LPDDR4',
        'LPDDR5'
      ],
      group: 'performance'
    },
    {
      name: 'storageType',
      type: 'select',
      label: 'Storage Type',
      required: true,
      options: [
        'M.2 NVMe SSD',
        'M.2 SATA SSD',
        '2.5" SATA SSD',
        'eMMC'
      ],
      group: 'storage'
    },
    {
      name: 'storageCapacity',
      type: 'number',
      label: 'Storage Capacity',
      required: true,
      unit: 'GB',
      min: 64,
      group: 'storage'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions (LxWxH)',
      required: true,
      group: 'physical'
    },
    {
      name: 'volume',
      type: 'number',
      label: 'Volume',
      required: true,
      unit: 'L',
      step: 0.1,
      group: 'physical'
    },
    {
      name: 'mountingOptions',
      type: 'multiselect',
      label: 'Mounting Options',
      options: [
        'VESA Mount',
        'Wall Mount',
        'DIN Rail',
        'Desktop Stand'
      ],
      group: 'physical'
    },
    {
      name: 'ports',
      type: 'multiselect',
      label: 'Available Ports',
      required: true,
      options: [
        'USB-C',
        'USB-A 3.0',
        'HDMI',
        'DisplayPort',
        'Ethernet',
        'Audio Jack',
        'SD Card Reader'
      ],
      group: 'connectivity'
    },
    {
      name: 'displaySupport',
      type: 'multiselect',
      label: 'Display Support',
      required: true,
      options: [
        'Single 4K',
        'Dual 4K',
        'Triple Display',
        '8K Support'
      ],
      group: 'display'
    },
    {
      name: 'networking',
      type: 'multiselect',
      label: 'Networking Features',
      required: true,
      options: [
        'WiFi 6',
        'Bluetooth 5.0',
        'Gigabit Ethernet',
        '2.5G Ethernet'
      ],
      group: 'connectivity'
    },
    {
      name: 'powerConsumption',
      type: 'number',
      label: 'Power Consumption',
      required: true,
      unit: 'W',
      min: 10,
      max: 150,
      group: 'power'
    },
    {
      name: 'coolingSystem',
      type: 'select',
      label: 'Cooling System',
      required: true,
      options: [
        'Passive Cooling',
        'Active Fan',
        'Liquid Cooling'
      ],
      group: 'thermal'
    },
    {
      name: 'operatingSystem',
      type: 'select',
      label: 'Operating System',
      required: true,
      options: [
        'Windows 11 Pro',
        'Windows 11 Home',
        'Linux',
        'No OS'
      ],
      group: 'software'
    },
    {
      name: 'useCase',
      type: 'multiselect',
      label: 'Intended Use Case',
      options: [
        'Home Office',
        'Digital Signage',
        'Media Center',
        'Edge Computing',
        'Thin Client'
      ],
      group: 'general'
    }
  ]
};
