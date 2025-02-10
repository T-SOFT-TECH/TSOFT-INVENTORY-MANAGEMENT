import {CategoryFormConfig} from './product-form.types';

export const operatingSystemsConfig: CategoryFormConfig = {
  id: 'operating-systems',
  name: 'Operating Systems',
  fields: [
    {
      name: 'osType',
      type: 'select',
      label: 'OS Type',
      required: true,
      options: [
        'Windows',
        'macOS',
        'Linux',
        'Chrome OS',
        'Server OS'
      ],
      group: 'specifications'
    },
    {
      name: 'version',
      type: 'text',
      label: 'Version',
      required: true,
      placeholder: 'e.g., Windows 11 Pro, macOS Sonoma',
      group: 'specifications'
    },
    {
      name: 'licenseType',
      type: 'select',
      label: 'License Type',
      required: true,
      options: [
        'OEM',
        'Retail',
        'Volume',
        'Subscription',
        'Open Source'
      ],
      group: 'specifications'
    },
    {
      name: 'architecture',
      type: 'multiselect',
      label: 'Supported Architecture',
      required: true,
      options: [
        'x86',
        'x64',
        'ARM',
        'ARM64'
      ],
      group: 'specifications'
    },
    {
      name: 'systemRequirements',
      type: 'multiselect',
      label: 'Minimum System Requirements',
      required: true,
      options: [
        'CPU Speed',
        'RAM',
        'Storage Space',
        'Graphics Capability',
        'Internet Connection'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Key Features',
      options: [
        'Security Updates',
        'App Store',
        'Virtual Desktop',
        'Touch Support',
        'Voice Assistant',
        'Encryption'
      ],
      group: 'features'
    }
  ]
};
