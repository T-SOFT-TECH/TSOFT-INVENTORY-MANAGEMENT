
import { CategoryFormConfig } from './product-form.types';

export const gamingDesktopsConfig: CategoryFormConfig = {
  id: 'gaming_desktops',
  name: 'Gaming Desktops',
  fields: [
    {
      name: 'processorModel',
      type: 'text',
      label: 'Processor Model',
      required: true,
      group: 'performance'
    },
    {
      name: 'processorCores',
      type: 'number',
      label: 'CPU Cores',
      required: true,
      min: 4,
      max: 64,
      group: 'performance'
    },
    {
      name: 'gpuModel',
      type: 'text',
      label: 'Graphics Card',
      required: true,
      group: 'performance'
    },
    {
      name: 'gpuVram',
      type: 'number',
      label: 'GPU Memory',
      required: true,
      unit: 'GB',
      min: 4,
      max: 24,
      group: 'performance'
    },
    {
      name: 'ramSize',
      type: 'number',
      label: 'RAM Size',
      required: true,
      unit: 'GB',
      min: 8,
      max: 256,
      group: 'performance'
    },
    {
      name: 'ramType',
      type: 'select',
      label: 'RAM Type',
      required: true,
      options: ['DDR4', 'DDR5'],
      group: 'performance'
    },
    {
      name: 'primaryStorage',
      type: 'select',
      label: 'Primary Storage Type',
      required: true,
      options: ['NVMe SSD', 'SATA SSD', 'HDD'],
      group: 'storage'
    },
    {
      name: 'primaryStorageCapacity',
      type: 'number',
      label: 'Primary Storage Capacity',
      required: true,
      unit: 'GB',
      min: 256,
      group: 'storage'
    },
    {
      name: 'secondaryStorage',
      type: 'select',
      label: 'Secondary Storage Type',
      options: ['None', 'NVMe SSD', 'SATA SSD', 'HDD'],
      group: 'storage'
    },
    {
      name: 'secondaryStorageCapacity',
      type: 'number',
      label: 'Secondary Storage Capacity',
      unit: 'GB',
      group: 'storage'
    },
    {
      name: 'coolingSystem',
      type: 'multiselect',
      label: 'Cooling Solution',
      required: true,
      options: [
        'Air Cooling',
        'AIO Liquid Cooling',
        'Custom Loop',
        'Hybrid Cooling'
      ],
      group: 'cooling'
    },
    {
      name: 'caseType',
      type: 'select',
      label: 'Case Type',
      required: true,
      options: [
        'Mid Tower',
        'Full Tower',
        'Mini Tower',
        'Super Tower'
      ],
      group: 'physical'
    },
    {
      name: 'powerSupply',
      type: 'number',
      label: 'Power Supply',
      required: true,
      unit: 'W',
      min: 500,
      max: 1600,
      group: 'power'
    },
    {
      name: 'motherboardType',
      type: 'select',
      label: 'Motherboard Type',
      required: true,
      options: ['ATX', 'Micro-ATX', 'Mini-ITX', 'E-ATX'],
      group: 'components'
    },
    {
      name: 'rgbFeatures',
      type: 'multiselect',
      label: 'RGB Features',
      options: [
        'RGB Fans',
        'RGB RAM',
        'RGB Motherboard',
        'RGB GPU',
        'RGB Case Lighting',
        'RGB CPU Cooler'
      ],
      group: 'aesthetics'
    },
    {
      name: 'ports',
      type: 'multiselect',
      label: 'Front Panel Ports',
      required: true,
      options: [
        'USB 3.0',
        'USB 3.1 Type-C',
        'Audio In/Out',
        'Card Reader'
      ],
      group: 'connectivity'
    },
    {
      name: 'networkingFeatures',
      type: 'multiselect',
      label: 'Networking',
      required: true,
      options: [
        'WiFi 6',
        'Bluetooth 5.0',
        '2.5G LAN',
        '10G LAN'
      ],
      group: 'connectivity'
    },
    {
      name: 'expansionSlots',
      type: 'multiselect',
      label: 'Available Expansion Slots',
      required: true,
      options: [
        'PCIe x16',
        'PCIe x8',
        'PCIe x4',
        'PCIe x1',
        'M.2'
      ],
      group: 'expandability'
    }
  ]
};
