import {CategoryFormConfig} from './product-form.types';

export const enterpriseSwitchesConfig: CategoryFormConfig = {
  id: 'enterprise_switches',
  name: 'Enterprise Switches',
  fields: [
    {
      name: 'switchType',
      type: 'select',
      label: 'Switch Type',
      required: true,
      options: [
        'Layer 2',
        'Layer 3',
        'Layer 4-7',
        'Data Center Switch',
        'Core Switch',
        'Distribution Switch',
        'Access Switch'
      ],
      group: 'specifications'
    },
    {
      name: 'portConfiguration',
      type: 'text',
      label: 'Port Configuration',
      required: true,
      placeholder: 'e.g., 48x 1GbE + 4x 10GbE SFP+',
      group: 'specifications'
    },
    {
      name: 'throughput',
      type: 'number',
      label: 'Maximum Throughput',
      required: true,
      unit: 'Gbps',
      group: 'specifications'
    },
    {
      name: 'stackingCapability',
      type: 'checkbox',
      label: 'Stacking Capability',
      required: true,
      group: 'specifications'
    },
    {
      name: 'redundancy',
      type: 'multiselect',
      label: 'Redundancy Features',
      required: true,
      options: [
        'Redundant Power Supply',
        'Hot-Swappable PSU',
        'Hot-Swappable Fans',
        'Redundant Management'
      ],
      group: 'specifications'
    },
    {
      name: 'managementFeatures',
      type: 'multiselect',
      label: 'Management Features',
      required: true,
      options: [
        'CLI',
        'GUI',
        'SNMP',
        'REST API',
        'Cloud Management',
        'Out-of-band Management'
      ],
      group: 'specifications'
    }
  ]
};

// enterprise-routers.config.ts
export const enterpriseRoutersConfig: CategoryFormConfig = {
  id: 'enterprise-routers',
  name: 'Enterprise Routers',
  fields: [
    {
      name: 'routerType',
      type: 'select',
      label: 'Router Type',
      required: true,
      options: [
        'Core Router',
        'Edge Router',
        'Branch Router',
        'Security Router',
        'Cloud Router'
      ],
      group: 'specifications'
    },
    {
      name: 'throughput',
      type: 'number',
      label: 'Maximum Throughput',
      required: true,
      unit: 'Gbps',
      group: 'specifications'
    },
    {
      name: 'interfaces',
      type: 'multiselect',
      label: 'Interface Types',
      required: true,
      options: [
        'Gigabit Ethernet',
        '10 Gigabit Ethernet',
        'Serial',
        'VDSL',
        'Fiber',
        'T1/E1'
      ],
      group: 'specifications'
    },
    {
      name: 'memorySize',
      type: 'number',
      label: 'Memory Size',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'flashStorage',
      type: 'number',
      label: 'Flash Storage',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'redundancy',
      type: 'multiselect',
      label: 'Redundancy Features',
      required: true,
      options: [
        'Dual Power Supply',
        'VRRP Support',
        'Failover Clustering',
        'Hot-Swappable Components'
      ],
      group: 'specifications'
    },
    {
      name: 'securityFeatures',
      type: 'multiselect',
      label: 'Security Features',
      required: true,
      options: [
        'Firewall',
        'IPSec VPN',
        'SSL VPN',
        'IPS/IDS',
        'URL Filtering',
        'Application Control'
      ],
      group: 'specifications'
    },
    {
      name: 'networkProtocols',
      type: 'multiselect',
      label: 'Supported Protocols',
      required: true,
      options: [
        'BGP',
        'OSPF',
        'EIGRP',
        'IS-IS',
        'MPLS',
        'IPv6'
      ],
      group: 'specifications'
    }
  ]
};


