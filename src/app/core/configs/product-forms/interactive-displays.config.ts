import {CategoryFormConfig} from './product-form.types';

export const interactiveDisplaysConfig: CategoryFormConfig = {
  id: 'interactive-displays',
  name: 'Interactive Displays',
  fields: [
    {
      name: 'displaySize',
      type: 'number',
      label: 'Display Size',
      required: true,
      unit: 'inches',
      group: 'display'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Resolution',
      required: true,
      options: [
        'Full HD (1920x1080)',
        '4K UHD (3840x2160)',
        '8K UHD (7680x4320)'
      ],
      group: 'display'
    },
    {
      name: 'touchPoints',
      type: 'number',
      label: 'Touch Points',
      required: true,
      group: 'touch'
    },
    {
      name: 'touchTechnology',
      type: 'select',
      label: 'Touch Technology',
      required: true,
      options: [
        'Infrared',
        'Capacitive',
        'Optical',
        'PCAP'
      ],
      group: 'touch'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'HDMI',
        'USB',
        'VGA',
        'DisplayPort',
        'Wi-Fi',
        'Bluetooth',
        'Ethernet'
      ],
      group: 'connectivity'
    },
    {
      name: 'operatingSystem',
      type: 'select',
      label: 'Operating System',
      required: true,
      options: [
        'Android',
        'Windows',
        'Proprietary OS'
      ],
      group: 'software'
    },
    {
      name: 'processor',
      type: 'text',
      label: 'Processor',
      required: true,
      group: 'performance'
    },
    {
      name: 'ram',
      type: 'number',
      label: 'RAM',
      required: true,
      unit: 'GB',
      group: 'performance'
    },
    {
      name: 'storage',
      type: 'number',
      label: 'Storage',
      required: true,
      unit: 'GB',
      group: 'storage'
    },
    {
      name: 'speakers',
      type: 'text',
      label: 'Built-in Speakers',
      required: true,
      group: 'audio'
    },
    {
      name: 'mountingOptions',
      type: 'multiselect',
      label: 'Mounting Options',
      required: true,
      options: [
        'Wall Mount',
        'Mobile Stand',
        'Fixed Stand',
        'Table Mount'
      ],
      group: 'installation'
    },
    {
      name: 'collaborativeFeatures',
      type: 'multiselect',
      label: 'Collaborative Features',
      required: true,
      options: [
        'Screen Sharing',
        'Multi-Device Connection',
        'Split Screen',
        'Wireless Presentation',
        'Cloud Integration'
      ],
      group: 'features'
    },
    {
      name: 'includedSoftware',
      type: 'multiselect',
      label: 'Included Software',
      options: [
        'Whiteboard',
        'Screen Recording',
        'Document Viewer',
        'Browser',
        'Educational Apps'
      ],
      group: 'software'
    }
  ]
};
