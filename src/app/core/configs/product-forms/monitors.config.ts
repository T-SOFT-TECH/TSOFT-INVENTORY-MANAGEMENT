import { CategoryFormConfig } from './product-form.types';

export const monitorsConfig: CategoryFormConfig = {
  id: 'monitors',
  name: 'Monitors',
  fields: [
    {
      name: 'displaySize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      step: 0.1,
      group: 'physical'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Resolution',
      required: true,
      options: [
        '1920x1080 (FHD)',
        '2560x1440 (QHD)',
        '3440x1440 (UWQHD)',
        '3840x2160 (4K)',
        '5120x1440 (DQHD)',
        '7680×4320 (8K)'
      ],
      group: 'display'
    },
    {
      name: 'panelType',
      type: 'select',
      label: 'Panel Type',
      required: true,
      options: [
        'IPS',
        'VA',
        'TN',
        'OLED',
        'Mini-LED'
      ],
      group: 'display'
    },
    {
      name: 'refreshRate',
      type: 'number',
      label: 'Refresh Rate',
      required: true,
      unit: 'Hz',
      group: 'display'
    },
    {
      name: 'responseTime',
      type: 'number',
      label: 'Response Time',
      required: true,
      unit: 'ms',
      step: 0.1,
      group: 'display'
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      required: true,
      options: [
        '16:9',
        '21:9',
        '32:9',
        '16:10'
      ],
      group: 'display'
    },
    {
      name: 'brightness',
      type: 'number',
      label: 'Brightness',
      required: true,
      unit: 'nits',
      group: 'display'
    },
    {
      name: 'contrast',
      type: 'text',
      label: 'Contrast Ratio',
      required: true,
      placeholder: '1000:1',
      group: 'display'
    },
    {
      name: 'hdrSupport',
      type: 'select',
      label: 'HDR Support',
      options: [
        'None',
        'HDR400',
        'HDR600',
        'HDR1000',
        'HDR1400',
        'Dolby Vision'
      ],
      group: 'features'
    },
    {
      name: 'colorGamut',
      type: 'multiselect',
      label: 'Color Gamut',
      options: [
        'sRGB',
        'Adobe RGB',
        'DCI-P3',
        'NTSC'
      ],
      group: 'display'
    },
    {
      name: 'ports',
      type: 'multiselect',
      label: 'Display Ports',
      required: true,
      options: [
        'HDMI 2.1',
        'HDMI 2.0',
        'DisplayPort 1.4',
        'DisplayPort 2.1',
        'USB-C',
        'VGA'
      ],
      group: 'connectivity'
    },
    {
      name: 'usbHub',
      type: 'multiselect',
      label: 'USB Hub',
      options: [
        'USB 3.0',
        'USB 2.0',
        'USB-C'
      ],
      group: 'connectivity'
    },
    {
      name: 'speakers',
      type: 'checkbox',
      label: 'Built-in Speakers',
      group: 'audio'
    },
    {
      name: 'speakerPower',
      type: 'number',
      label: 'Speaker Power',
      unit: 'W',
      group: 'audio'
    },
    {
      name: 'mountingSupport',
      type: 'select',
      label: 'VESA Mount',
      options: [
        '75x75',
        '100x100',
        '200x200',
        'None'
      ],
      group: 'physical'
    },
    {
      name: 'adjustments',
      type: 'multiselect',
      label: 'Stand Adjustments',
      options: [
        'Height',
        'Tilt',
        'Swivel',
        'Pivot'
      ],
      group: 'physical'
    },
    {
      name: 'gamingFeatures',
      type: 'multiselect',
      label: 'Gaming Features',
      options: [
        'G-Sync',
        'FreeSync',
        'Low Motion Blur',
        'Black Frame Insertion',
        'Crosshair Overlay'
      ],
      group: 'features'
    },
    {
      name: 'powerConsumption',
      type: 'number',
      label: 'Typical Power Consumption',
      unit: 'W',
      group: 'power'
    }
  ]
};
