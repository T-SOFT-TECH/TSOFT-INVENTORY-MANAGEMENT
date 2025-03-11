import {CategoryFormConfig} from './product-form.types';

export const officeSoftwareConfig: CategoryFormConfig = {
  id: 'office_software',
  name: 'Office Software',
  fields: [
    {
      name: 'suiteType',
      type: 'select',
      label: 'Suite Type',
      required: true,
      options: [
        'Complete Office Suite',
        'Word Processing',
        'Spreadsheet',
        'Presentation',
        'Email Client',
        'Database'
      ],
      group: 'specifications'
    },
    {
      name: 'licenseType',
      type: 'select',
      label: 'License Type',
      required: true,
      options: [
        'Subscription',
        'One-time Purchase',
        'Open Source',
        'Enterprise'
      ],
      group: 'specifications'
    },
    {
      name: 'platform',
      type: 'multiselect',
      label: 'Supported Platforms',
      required: true,
      options: [
        'Windows',
        'macOS',
        'Web Browser',
        'iOS',
        'Android'
      ],
      group: 'specifications'
    },
    {
      name: 'cloudFeatures',
      type: 'multiselect',
      label: 'Cloud Features',
      options: [
        'Cloud Storage',
        'Real-time Collaboration',
        'File Sharing',
        'Version History',
        'Mobile Access'
      ],
      group: 'features'
    }
  ]
};
