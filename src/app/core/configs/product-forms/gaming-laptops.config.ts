// gaming-laptops.config.ts
import { CategoryFormConfig, } from './product-form.types';

export const gamingLaptopsConfig: CategoryFormConfig = {
  id: 'gaming_laptops',
  name: 'Gaming Laptops',
  fields: [

    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      min: 13,
      max: 18,
      step: 0.1,
      group: 'display'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Display Resolution',
      required: true,
      options: [
        '1920x1080 (FHD)',
        '2560x1440 (QHD)',
        '3840x2160 (4K)'
      ],
      group: 'display'
    },
    {
      name: 'refreshRate',
      type: 'select',
      label: 'Refresh Rate',
      required: true,
      options: ['60Hz', '144Hz', '165Hz', '240Hz', '360Hz'],
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
      max: 16,
      group: 'performance'
    },
    {
      name: 'ramSize',
      type: 'number',
      label: 'RAM Size',
      required: true,
      unit: 'GB',
      min: 8,
      max: 128,
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
      min: 256,
      group: 'storage'
    },
    {
      name: 'coolingSystem',
      type: 'multiselect',
      label: 'Cooling System',
      required: true,
      options: [
        'Vapor Chamber',
        'Liquid Metal',
        'Multiple Fans',
        'Heat Pipes'
      ],
      group: 'cooling'
    },
    {
      name: 'rgbFeatures',
      type: 'multiselect',
      label: 'RGB Features',
      options: [
        'RGB Keyboard',
        'RGB Logo',
        'RGB Strip',
        'Per-Key RGB'
      ],
      group: 'features'
    },
    {
      name: 'ports',
      type: 'multiselect',
      label: 'Ports',
      required: true,
      options: [
        'USB-C',
        'USB-A 3.2',
        'HDMI 2.1',
        'DisplayPort',
        'Ethernet',
        'Audio Jack'
      ],
      group: 'connectivity'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'kg',
      step: 0.01,
      min: 2,
      max: 4.5,
      group: 'physical'
    },
    {
      name: 'batteryCapacity',
      type: 'number',
      label: 'Battery Capacity',
      required: true,
      unit: 'Wh',
      min: 50,
      max: 100,
      group: 'battery'
    },
    {
      name: 'powerSupply',
      type: 'number',
      label: 'Power Supply',
      required: true,
      unit: 'W',
      min: 180,
      max: 330,
      group: 'power'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Additional Features',
      options: [
        'MUX Switch',
        'G-SYNC/FreeSync',
        'Advanced Optimus',
        'Thunderbolt Support',
        'HD Webcam'
      ],
      group: 'features'
    }
  ]
};
