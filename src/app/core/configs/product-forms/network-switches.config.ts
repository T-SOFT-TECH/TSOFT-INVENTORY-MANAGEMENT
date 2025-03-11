import {CategoryFormConfig} from './product-form.types';

export const networkSwitchesConfig: CategoryFormConfig = {
  id: 'network_switches',
  name: 'Network Switches',
  fields: [
    {
      name: 'switchType',
      type: 'select',
      label: 'Switch Type',
      required: true,
      options: [
        'Unmanaged',
        'Smart Managed',
        'Fully Managed',
        'Layer 2',
        'Layer 3'
      ],
      group: 'specifications'
    },
    {
      name: 'portCount',
      type: 'select',
      label: 'Number of Ports',
      required: true,
      options: [
        '4',
        '5',
        '8',
        '16',
        '24',
        '48'
      ],
      group: 'specifications'
    },
    {
      name: 'portSpeed',
      type: 'select',
      label: 'Port Speed',
      required: true,
      options: [
        '10/100 Mbps',
        '10/100/1000 Mbps',
        '2.5 Gbps',
        '5 Gbps',
        '10 Gbps'
      ],
      group: 'specifications'
    },
    {
      name: 'poeSupport',
      type: 'select',
      label: 'PoE Support',
      required: true,
      options: [
        'No PoE',
        'PoE',
        'PoE+',
        'PoE++'
      ],
      group: 'specifications'
    },
    {
      name: 'poePower',
      type: 'number',
      label: 'PoE Power Budget',
      required: false,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'rackMountable',
      type: 'checkbox',
      label: 'Rack Mountable',
      required: false,
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      required: false,
      options: [
        'VLAN Support',
        'QoS',
        'Link Aggregation',
        'Jumbo Frame',
        'Port Mirroring',
        'IGMP Snooping'
      ],
      group: 'specifications'
    },
    {
      name: 'switching',
      type: 'number',
      label: 'Switching Capacity',
      required: true,
      unit: 'Gbps',
      group: 'specifications'
    },
    {
      name: 'macAddresses',
      type: 'number',
      label: 'MAC Address Table Size',
      required: true,
      unit: 'K',
      group: 'specifications'
    },
    {
      name: 'powerSupply',
      type: 'select',
      label: 'Power Supply',
      required: true,
      options: [
        'Internal',
        'External',
        'Redundant',
        'Hot-Swappable'
      ],
      group: 'specifications'
    }
  ]
};
