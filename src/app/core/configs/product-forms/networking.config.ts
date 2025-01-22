import {CategoryFormConfig, commonFields} from './product-form.types';

export const networkingConfig: CategoryFormConfig = {
  id: 'networking',
  name: 'Networking Equipment',
  fields: [
    ...commonFields,
    {
      name: 'deviceType',
      type: 'select',
      label: 'Device Type',
      required: true,
      options: ['Router', 'Switch', 'Access Point', 'Network Card', 'Modem'],
      group: 'specifications'
    },
    {
      name: 'wifiStandard',
      type: 'select',
      label: 'WiFi Standard',
      options: ['WiFi 6E', 'WiFi 6', 'WiFi 5', 'WiFi 4'],
      group: 'specifications'
    },
    {
      name: 'ports',
      type: 'multiselect',
      label: 'Ports',
      required: true,
      options: [
        'Gigabit Ethernet',
        '2.5G Ethernet',
        '10G Ethernet',
        'USB 3.0',
        'USB-C'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'MU-MIMO',
        'OFDMA',
        'Beamforming',
        'VPN Support',
        'QoS',
        'Parental Controls'
      ],
      group: 'features'
    },
    {
      name: 'security',
      type: 'multiselect',
      label: 'Security Features',
      options: ['WPA3', 'Firewall', 'Guest Network', 'MAC Filtering'],
      group: 'features'
    }
  ]
};
