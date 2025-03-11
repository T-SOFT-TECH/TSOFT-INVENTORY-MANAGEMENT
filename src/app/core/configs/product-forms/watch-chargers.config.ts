import {CategoryFormConfig} from './product-form.types';

export const watchChargersConfig: CategoryFormConfig = {
  id: 'watch_chargers',
  name: 'Watch Chargers',
  fields: [
    {
      name: 'chargerType',
      type: 'select',
      label: 'Charger Type',
      required: true,
      options: [
        'Magnetic',
        'Wireless',
        'USB',
        'Dock'
      ],
      group: 'specifications'
    },
    {
      name: 'compatibleDevices',
      type: 'multiselect',
      label: 'Compatible Devices',
      required: true,
      options: [
        'Apple Watch',
        'Samsung Galaxy Watch',
        'Fitbit',
        'Garmin',
        'Universal'
      ],
      group: 'compatibility'
    },
    {
      name: 'chargingSpeed',
      type: 'number',
      label: 'Charging Speed',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'cableLength',
      type: 'number',
      label: 'Cable Length',
      required: true,
      unit: 'm',
      group: 'specifications'
    },
    {
      name: 'inputType',
      type: 'select',
      label: 'Input Type',
      required: true,
      options: [
        'USB-A',
        'USB-C',
        'Lightning',
        'AC Adapter'
      ],
      group: 'specifications'
    },
    {
      name: 'portability',
      type: 'select',
      label: 'Portability',
      required: true,
      options: [
        'Portable',
        'Desktop',
        'Stand',
        'Travel'
      ],
      group: 'features'
    },
    {
      name: 'safetyFeatures',
      type: 'multiselect',
      label: 'Safety Features',
      required: true,
      options: [
        'Over-voltage Protection',
        'Over-current Protection',
        'Temperature Control',
        'Short Circuit Protection'
      ],
      group: 'safety'
    }
  ]
};
