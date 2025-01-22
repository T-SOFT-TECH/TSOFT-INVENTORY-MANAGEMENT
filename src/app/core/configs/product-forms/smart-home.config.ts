import {CategoryFormConfig, commonFields} from './product-form.types';

export const smartHomeConfig: CategoryFormConfig = {
  id: 'smart-home',
  name: 'Smart Home Devices',
  fields: [
    ...commonFields,
    {
      name: 'deviceType',
      type: 'select',
      label: 'Device Type',
      required: true,
      options: [
        'Smart Security Camera',
        'Smart Doorbell',
        'Smart Lock',
        'Smart Light',
        'Smart Plug',
        'Smart Speaker',
        'Smart Thermostat'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: ['Wi-Fi', 'Bluetooth', 'Zigbee', 'Z-Wave', 'Thread', 'Matter'],
      group: 'specifications'
    },
    {
      name: 'powerSource',
      type: 'select',
      label: 'Power Source',
      required: true,
      options: ['Battery', 'Wired', 'Solar', 'Hybrid'],
      group: 'specifications'
    },
    {
      name: 'compatibility',
      type: 'multiselect',
      label: 'Smart Home Compatibility',
      required: true,
      options: [
        'Amazon Alexa',
        'Google Assistant',
        'Apple HomeKit',
        'Samsung SmartThings'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Motion Detection',
        'Two-way Audio',
        'Night Vision',
        'Cloud Storage',
        'Local Storage',
        'AI Recognition'
      ],
      group: 'features'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Resolution',
      options: ['720p', '1080p', '2K', '4K'],
      group: 'specifications'
    }
  ]
};
