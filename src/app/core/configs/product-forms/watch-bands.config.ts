import {CategoryFormConfig} from './product-form.types';

export const watchBandsConfig: CategoryFormConfig = {
  id: 'watch-bands',
  name: 'Watch Bands',
  fields: [
    {
      name: 'compatibleDevices',
      type: 'multiselect',
      label: 'Compatible Devices',
      required: true,
      options: [
        'Apple Watch',
        'Samsung Galaxy Watch',
        'Garmin',
        'Fitbit',
        'Universal'
      ],
      group: 'compatibility'
    },
    {
      name: 'material',
      type: 'select',
      label: 'Material',
      required: true,
      options: [
        'Silicone',
        'Leather',
        'Metal',
        'Nylon',
        'Fabric',
        'Ceramic'
      ],
      group: 'specifications'
    },
    {
      name: 'bandWidth',
      type: 'multiselect',
      label: 'Band Width',
      required: true,
      options: [
        '38/40/41mm',
        '42/44/45mm',
        '20mm',
        '22mm'
      ],
      group: 'specifications'
    },
    {
      name: 'closureType',
      type: 'select',
      label: 'Closure Type',
      required: true,
      options: [
        'Buckle',
        'Magnetic',
        'Loop',
        'Pin and Tuck',
        'Deployant Clasp'
      ],
      group: 'specifications'
    },
    {
      name: 'adjustableLength',
      type: 'checkbox',
      label: 'Adjustable Length',
      group: 'features'
    },
    {
      name: 'waterResistant',
      type: 'checkbox',
      label: 'Water Resistant',
      group: 'features'
    },
    {
      name: 'colorOptions',
      type: 'multiselect',
      label: 'Color Options',
      required: true,
      options: [
        'Black',
        'Silver',
        'Gold',
        'Blue',
        'Red',
        'Pink',
        'Green'
      ],
      group: 'appearance'
    }
  ]
};
