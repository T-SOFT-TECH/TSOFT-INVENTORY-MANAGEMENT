import { CategoryFormConfig} from './product-form.types';
export const routersConfig: CategoryFormConfig = {
  id: 'routers',
  name: 'Routers',
  fields: [
    {
      name: 'routerType',
      type: 'select',
      label: 'Router Type',
      required: true,
      options: [
        'Wireless Router',
        'Gaming Router',
        'Mesh Router',
        'VPN Router',
        'Enterprise Router'
      ],
      group: 'specifications'
    },
    {
      name: 'wifiStandard',
      type: 'select',
      label: 'WiFi Standard',
      required: true,
      options: [
        'WiFi 4 (802.11n)',
        'WiFi 5 (802.11ac)',
        'WiFi 6 (802.11ax)',
        'WiFi 6E',
        'WiFi 7'
      ],
      group: 'specifications'
    },
    {
      name: 'frequency',
      type: 'multiselect',
      label: 'Frequency Bands',
      required: true,
      options: [
        '2.4 GHz',
        '5 GHz',
        '6 GHz'
      ],
      group: 'specifications'
    },
    {
      name: 'maxSpeed',
      type: 'text',
      label: 'Maximum Speed',
      required: true,
      placeholder: 'e.g., AX6000',
      group: 'specifications'
    },
    {
      name: 'ports',
      type: 'number',
      label: 'Number of LAN Ports',
      required: true,
      group: 'specifications'
    },
    {
      name: 'security',
      type: 'multiselect',
      label: 'Security Features',
      required: true,
      options: [
        'WPA3',
        'WPA2',
        'Firewall',
        'VPN Support',
        'Parental Controls'
      ],
      group: 'specifications'
    },
    {
      name: 'coverage',
      type: 'number',
      label: 'Coverage Area',
      required: true,
      unit: 'sq ft',
      group: 'specifications'
    },
    {
      name: 'antennas',
      type: 'number',
      label: 'Number of Antennas',
      required: true,
      group: 'specifications'
    },
    {
      name: 'processor',
      type: 'text',
      label: 'Processor',
      required: true,
      group: 'specifications'
    },
    {
      name: 'memory',
      type: 'text',
      label: 'Memory (RAM)',
      required: true,
      group: 'specifications'
    }
  ]
};
