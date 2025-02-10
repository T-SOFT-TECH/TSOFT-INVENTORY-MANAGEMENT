import {CategoryFormConfig} from './product-form.types';

export const smartPlugsConfig: CategoryFormConfig = {
  id: 'smart-plugs',
  name: 'Smart Plugs',
  fields: [
    {
      name: 'plugType',
      type: 'select',
      label: 'Plug Type',
      required: true,
      options: [
        'Indoor',
        'Outdoor',
        'Power Strip',
        'Wall Outlet'
      ],
      group: 'specifications'
    },
    {
      name: 'maxPower',
      type: 'number',
      label: 'Maximum Power',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'Wi-Fi',
        'Bluetooth',
        'Zigbee',
        'Z-Wave',
        'Matter'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Energy Monitoring',
        'Timer',
        'Away Mode',
        'Surge Protection',
        'Voice Control',
        'USB Ports'
      ],
      group: 'features'
    }
  ]
};
