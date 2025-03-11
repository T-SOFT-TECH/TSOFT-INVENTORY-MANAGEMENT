import {CategoryFormConfig} from './product-form.types';

export const antivirusConfig: CategoryFormConfig = {
  id: 'antivirus_software',
  name: 'Antivirus Software',
  fields: [
    {
      name: 'softwareType',
      type: 'select',
      label: 'Software Type',
      required: true,
      options: [
        'Antivirus',
        'Internet Security',
        'Total Security',
        'Endpoint Protection'
      ],
      group: 'specifications'
    },
    {
      name: 'licenseLength',
      type: 'select',
      label: 'License Duration',
      required: true,
      options: [
        '1 Year',
        '2 Years',
        '3 Years',
        'Lifetime'
      ],
      group: 'specifications'
    },
    {
      name: 'deviceCount',
      type: 'number',
      label: 'Number of Devices',
      required: true,
      min: 1,
      group: 'specifications'
    },
    {
      name: 'compatibleOS',
      type: 'multiselect',
      label: 'Compatible Operating Systems',
      required: true,
      options: [
        'Windows',
        'macOS',
        'Android',
        'iOS',
        'Linux'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Security Features',
      required: true,
      options: [
        'Real-time Protection',
        'Firewall',
        'VPN',
        'Password Manager',
        'Parental Controls',
        'Ransomware Protection',
        'Safe Banking'
      ],
      group: 'features'
    }
  ]
};
