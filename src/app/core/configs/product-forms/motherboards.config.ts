import {CategoryFormConfig, commonFields} from './product-form.types';

export const motherboardConfig: CategoryFormConfig = {
  id: 'motherboards',
  name: 'Motherboards',
  fields: [
    ...commonFields,
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: ['ATX', 'Micro-ATX', 'Mini-ITX', 'E-ATX'],
      group: 'specifications'
    },
    {
      name: 'socket',
      type: 'select',
      label: 'CPU Socket',
      required: true,
      options: ['AM5', 'AM4', 'LGA 1700', 'LGA 1200'],
      group: 'specifications'
    },
    {
      name: 'chipset',
      type: 'text',
      label: 'Chipset',
      required: true,
      placeholder: 'e.g., X670, Z790',
      group: 'specifications'
    },
    {
      name: 'memorySpecs',
      type: 'multiselect',
      label: 'Memory Support',
      required: true,
      options: ['DDR4', 'DDR5'],
      group: 'specifications'
    },
    {
      name: 'maxMemory',
      type: 'number',
      label: 'Maximum Memory',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'memorySlots',
      type: 'number',
      label: 'Memory Slots',
      required: true,
      min: 2,
      max: 8,
      group: 'specifications'
    },
    {
      name: 'pciExpressSlots',
      type: 'multiselect',
      label: 'PCIe Slots',
      required: true,
      options: ['PCIe 5.0 x16', 'PCIe 4.0 x16', 'PCIe 3.0 x16', 'PCIe x1'],
      group: 'specifications'
    },
    {
      name: 'storage',
      type: 'multiselect',
      label: 'Storage Interfaces',
      required: true,
      options: ['SATA III', 'M.2 PCIe 4.0', 'M.2 PCIe 5.0'],
      group: 'specifications'
    },
    {
      name: 'networking',
      type: 'multiselect',
      label: 'Networking',
      required: true,
      options: ['2.5G LAN', '10G LAN', 'Wi-Fi 6', 'Wi-Fi 6E', 'Bluetooth 5.2'],
      group: 'features'
    },
    {
      name: 'audioCodec',
      type: 'text',
      label: 'Audio Codec',
      group: 'specifications'
    },
    {
      name: 'usbPorts',
      type: 'multiselect',
      label: 'USB Ports',
      required: true,
      options: ['USB 3.2 Gen 2x2', 'USB 3.2 Gen 2', 'USB 3.2 Gen 1', 'USB 2.0'],
      group: 'specifications'
    }
  ]
};
