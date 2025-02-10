import { CategoryFormConfig } from './product-form.types';

export const motherboardsConfig: CategoryFormConfig = {
  id: 'motherboards',
  name: 'Motherboards',
  fields: [
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: ['ATX', 'Micro-ATX', 'Mini-ITX', 'E-ATX', 'XL-ATX'],
      group: 'physical'
    },
    {
      name: 'socket',
      type: 'select',
      label: 'CPU Socket',
      required: true,
      options: ['AM5', 'AM4', 'LGA 1700', 'LGA 1200', 'TR4'],
      group: 'compatibility'
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
      name: 'memoryType',
      type: 'select',
      label: 'Memory Type',
      required: true,
      options: ['DDR4', 'DDR5'],
      group: 'memory'
    },
    {
      name: 'memorySlots',
      type: 'number',
      label: 'Memory Slots',
      required: true,
      min: 2,
      max: 8,
      group: 'memory'
    },
    {
      name: 'maxMemory',
      type: 'number',
      label: 'Maximum Memory',
      required: true,
      unit: 'GB',
      group: 'memory'
    },
    {
      name: 'memorySpeed',
      type: 'multiselect',
      label: 'Supported Memory Speeds',
      required: true,
      options: [
        'DDR4-2133',
        'DDR4-3200',
        'DDR4-3600',
        'DDR5-4800',
        'DDR5-6000'
      ],
      group: 'memory'
    },
    {
      name: 'pciSlots',
      type: 'multiselect',
      label: 'PCI Express Slots',
      required: true,
      options: [
        'PCIe 5.0 x16',
        'PCIe 4.0 x16',
        'PCIe 3.0 x16',
        'PCIe x8',
        'PCIe x4',
        'PCIe x1'
      ],
      group: 'expansion'
    },
    {
      name: 'm2Slots',
      type: 'number',
      label: 'M.2 Slots',
      required: true,
      min: 0,
      max: 5,
      group: 'storage'
    },
    {
      name: 'sataConnectors',
      type: 'number',
      label: 'SATA Connectors',
      required: true,
      min: 0,
      max: 12,
      group: 'storage'
    },
    {
      name: 'raidSupport',
      type: 'multiselect',
      label: 'RAID Support',
      options: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 10'],
      group: 'storage'
    },
    {
      name: 'lanPorts',
      type: 'multiselect',
      label: 'LAN Ports',
      required: true,
      options: [
        '1G LAN',
        '2.5G LAN',
        '5G LAN',
        '10G LAN'
      ],
      group: 'networking'
    },
    {
      name: 'wirelessNetworking',
      type: 'multiselect',
      label: 'Wireless Networking',
      options: [
        'WiFi 6E',
        'WiFi 6',
        'Bluetooth 5.2'
      ],
      group: 'networking'
    },
    {
      name: 'audioCodec',
      type: 'text',
      label: 'Audio Codec',
      required: true,
      group: 'audio'
    },
    {
      name: 'audioChannels',
      type: 'select',
      label: 'Audio Channels',
      required: true,
      options: ['5.1', '7.1', '7.1+4'],
      group: 'audio'
    },
    {
      name: 'usbPorts',
      type: 'multiselect',
      label: 'USB Ports',
      required: true,
      options: [
        'USB 3.2 Gen 2x2',
        'USB 3.2 Gen 2',
        'USB 3.2 Gen 1',
        'USB 2.0'
      ],
      group: 'connectivity'
    },
    {
      name: 'powerPhases',
      type: 'text',
      label: 'Power Phase Design',
      required: true,
      group: 'power'
    },
    {
      name: 'powerConnectors',
      type: 'multiselect',
      label: 'Power Connectors',
      required: true,
      options: [
        '24-pin ATX',
        '8-pin CPU',
        '4-pin CPU',
        '6-pin PCIe'
      ],
      group: 'power'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Special Features',
      options: [
        'RGB Headers',
        'Debug LED',
        'BIOS Flashback',
        'Clear CMOS Button',
        'Q-Code Display',
        'Thunderbolt Support'
      ],
      group: 'features'
    }
  ]
};
