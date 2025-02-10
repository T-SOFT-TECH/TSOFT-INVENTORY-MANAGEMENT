import {CategoryFormConfig} from './product-form.types';

export const networkSecurityConfig: CategoryFormConfig = {
  id: 'network-security',
  name: 'Network Security',
  fields: [
    {
      name: 'deviceType',
      type: 'select',
      label: 'Device Type',
      required: true,
      options: [
        'Firewall',
        'UTM',
        'IPS/IDS',
        'VPN Concentrator',
        'WAF',
        'NAC'
      ],
      group: 'specifications'
    },
    {
      name: 'throughput',
      type: 'number',
      label: 'Firewall Throughput',
      required: true,
      unit: 'Gbps',
      group: 'specifications'
    },
    {
      name: 'vpnThroughput',
      type: 'number',
      label: 'VPN Throughput',
      required: true,
      unit: 'Gbps',
      group: 'specifications'
    },
    {
      name: 'concurrentSessions',
      type: 'number',
      label: 'Maximum Concurrent Sessions',
      required: true,
      unit: 'K',
      group: 'specifications'
    },
    {
      name: 'ports',
      type: 'text',
      label: 'Network Interfaces',
      required: true,
      placeholder: 'e.g., 8x 1GbE, 2x 10GbE SFP+',
      group: 'specifications'
    },
    {
      name: 'securityFeatures',
      type: 'multiselect',
      label: 'Security Features',
      required: true,
      options: [
        'Application Control',
        'IPS',
        'Antivirus',
        'Web Filtering',
        'DLP',
        'Zero-Day Protection'
      ],
      group: 'specifications'
    },
    {
      name: 'vpnSupport',
      type: 'multiselect',
      label: 'VPN Support',
      required: true,
      options: [
        'IPSec',
        'SSL',
        'L2TP',
        'PPTP',
        'Site-to-Site',
        'Remote Access'
      ],
      group: 'specifications'
    },
    {
      name: 'authentication',
      type: 'multiselect',
      label: 'Authentication Methods',
      required: true,
      options: [
        'Local Database',
        'RADIUS',
        'TACACS+',
        'LDAP',
        'Active Directory',
        'Two-Factor Authentication'
      ],
      group: 'specifications'
    }
  ]
};
