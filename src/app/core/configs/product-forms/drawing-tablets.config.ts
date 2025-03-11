import { CategoryFormConfig } from './product-form.types';

export const drawingTabletsConfig: CategoryFormConfig = {
  id: 'drawing_tablets',
  name: 'Drawing Tablets',
  fields: [
    {
      name: 'tabletType',
      type: 'select',
      label: 'Tablet Type',
      required: true,
      options: [
        'Screen Tablet',
        'Pen Tablet',
        'Pen Display',
        'Graphics Tablet'
      ],
      group: 'basic'
    },
    {
      name: 'activeArea',
      type: 'text',
      label: 'Active Area',
      required: true,
      placeholder: '220x132mm',
      group: 'specifications'
    },
    {
      name: 'resolution',
      type: 'number',
      label: 'Resolution',
      required: true,
      unit: 'LPI',
      group: 'specifications'
    },
    {
      name: 'pressureLevels',
      type: 'number',
      label: 'Pressure Levels',
      required: true,
      group: 'specifications'
    },
    {
      name: 'displayResolution',
      type: 'text',
      label: 'Display Resolution',
      placeholder: '1920x1080',
      group: 'display'
    },
    {
      name: 'displaySize',
      type: 'number',
      label: 'Display Size',
      unit: 'inches',
      group: 'display'
    },
    {
      name: 'colorGamut',
      type: 'number',
      label: 'Color Gamut',
      unit: '%sRGB',
      group: 'display'
    },
    {
      name: 'tiltSupport',
      type: 'checkbox',
      label: 'Tilt Support',
      group: 'features'
    },
    {
      name: 'tiltRange',
      type: 'number',
      label: 'Tilt Range',
      unit: 'degrees',
      group: 'features'
    },
    {
      name: 'expressKeys',
      type: 'number',
      label: 'Express Keys',
      group: 'features'
    },
    {
      name: 'touchRing',
      type: 'checkbox',
      label: 'Touch Ring',
      group: 'features'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'USB-C',
        'USB-A',
        'Bluetooth',
        'Wireless'
      ],
      group: 'connectivity'
    },
    {
      name: 'penType',
      type: 'select',
      label: 'Pen Type',
      required: true,
      options: [
        'Battery-free',
        'Rechargeable',
        'Battery-powered'
      ],
      group: 'pen'
    },
    {
      name: 'replacementNibs',
      type: 'number',
      label: 'Included Replacement Nibs',
      group: 'pen'
    },
    {
      name: 'reportingRate',
      type: 'number',
      label: 'Report Rate',
      unit: 'RPS',
      group: 'performance'
    },
    {
      name: 'softwareCompatibility',
      type: 'multiselect',
      label: 'Software Compatibility',
      options: [
        'Photoshop',
        'Illustrator',
        'Clip Studio Paint',
        'Krita',
        'GIMP'
      ],
      group: 'compatibility'
    },
    {
      name: 'operatingSystems',
      type: 'multiselect',
      label: 'Operating Systems',
      required: true,
      options: [
        'Windows 11',
        'Windows 10',
        'macOS',
        'Linux'
      ],
      group: 'compatibility'
    },
    {
      name: 'powerSupply',
      type: 'select',
      label: 'Power Supply',
      required: true,
      options: [
        'USB Powered',
        'AC Adapter',
        'Battery'
      ],
      group: 'power'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: true,
      placeholder: '380x251x12mm',
      group: 'physical'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'g',
      group: 'physical'
    }
  ]
};
