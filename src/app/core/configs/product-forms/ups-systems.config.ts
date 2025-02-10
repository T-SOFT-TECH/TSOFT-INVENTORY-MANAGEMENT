import {CategoryFormConfig} from './product-form.types';

export const upsSystemsConfig: CategoryFormConfig = {
  id: 'ups-systems',
  name: 'UPS Systems',
  fields: [
    {
      name: 'capacity',
      type: 'number',
      label: 'Capacity',
      required: true,
      unit: 'VA',
      group: 'specifications'
    },
    {
      name: 'wattage',
      type: 'number',
      label: 'Wattage',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'topology',
      type: 'select',
      label: 'UPS Topology',
      required: true,
      options: [
        'Standby',
        'Line Interactive',
        'Online/Double-Conversion'
      ],
      group: 'specifications'
    },
    {
      name: 'outlets',
      type: 'number',
      label: 'Number of Outlets',
      required: true,
      group: 'specifications'
    },
    {
      name: 'backupTime',
      type: 'number',
      label: 'Typical Backup Time',
      required: true,
      unit: 'minutes',
      group: 'specifications'
    },
    {
      name: 'batteryType',
      type: 'text',
      label: 'Battery Type',
      required: true,
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'LCD Display',
        'AVR',
        'USB Port',
        'Network Port',
        'Surge Protection',
        'Software Management'
      ],
      group: 'features'
    }
  ]
};
