import {CategoryFormConfig} from './product-form.types';

export const smartDoorbellsConfig: CategoryFormConfig = {
  id: 'smart-doorbells',
  name: 'Smart Doorbells',
  fields: [
    {
      name: 'resolution',
      type: 'select',
      label: 'Video Resolution',
      required: true,
      options: [
        '1080p',
        '2K',
        '4K'
      ],
      group: 'specifications'
    },
    {
      name: 'fieldOfView',
      type: 'number',
      label: 'Field of View',
      required: true,
      unit: 'degrees',
      group: 'specifications'
    },
    {
      name: 'powerSource',
      type: 'select',
      label: 'Power Source',
      required: true,
      options: [
        'Hardwired',
        'Battery',
        'Solar'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'Wi-Fi',
        'Ethernet',
        'Bluetooth'
      ],
      group: 'specifications'
    },
    {
      name: 'smartIntegration',
      type: 'multiselect',
      label: 'Smart Home Integration',
      required: true,
      options: [
        'Alexa',
        'Google Assistant',
        'HomeKit',
        'IFTTT'
      ],
      group: 'features'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Two-way Audio',
        'Motion Detection',
        'Person Detection',
        'Package Detection',
        'Pre-recorded Messages',
        'Night Vision',
        'HDR'
      ],
      group: 'features'
    }
  ]
};
