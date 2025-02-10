import {CategoryFormConfig} from './product-form.types';

export const smartLocksConfig: CategoryFormConfig = {
  id: 'smart-locks',
  name: 'Smart Locks',
  fields: [
    {
      name: 'lockType',
      type: 'select',
      label: 'Lock Type',
      required: true,
      options: [
        'Deadbolt',
        'Lever Handle',
        'Door Handle Set',
        'Padlock'
      ],
      group: 'specifications'
    },
    {
      name: 'unlockMethods',
      type: 'multiselect',
      label: 'Unlock Methods',
      required: true,
      options: [
        'Keypad',
        'Fingerprint',
        'App Control',
        'Key Card/Fob',
        'Traditional Key',
        'Voice Control'
      ],
      group: 'specifications'
    },
    {
      name: 'powerSource',
      type: 'select',
      label: 'Power Source',
      required: true,
      options: [
        'AA Batteries',
        'Rechargeable Battery',
        'Hardwired'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'Bluetooth',
        'Wi-Fi',
        'Z-Wave',
        'Zigbee'
      ],
      group: 'specifications'
    },
    {
      name: 'smartIntegration',
      type: 'multiselect',
      label: 'Smart Home Integration',
      options: [
        'Alexa',
        'Google Assistant',
        'HomeKit',
        'SmartThings'
      ],
      group: 'features'
    }
  ]
};