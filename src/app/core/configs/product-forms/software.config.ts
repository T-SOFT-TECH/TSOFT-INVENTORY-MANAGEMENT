import { CategoryFormConfig, commonFields } from './product-form.types';

export const softwareConfig: CategoryFormConfig = {
  id: 'software', // Matches the category name from initial-categories.ts
  name: 'Software',
  fields: [
    ...commonFields,
    {
      name: 'softwareType',
      type: 'select',
      label: 'Software Type',
      required: true,
      options: [
        'Operating System',
        'Office Suite',
        'Security Software',
        'Design Software',
        'Development Tools',
        'Gaming',
        'Utility Software',
        'Business Software'
      ],
      group: 'specifications'
    },
    {
      name: 'licenseType',
      type: 'select',
      label: 'License Type',
      required: true,
      options: [
        'Perpetual',
        'Subscription',
        'One-Time Purchase',
        'Free with Premium Features'
      ],
      group: 'specifications'
    },
    {
      name: 'deliveryMethod',
      type: 'select',
      label: 'Delivery Method',
      required: true,
      options: [
        'Digital Download',
        'Physical Media',
        'Product Key',
        'Both Digital and Physical'
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
        'Linux',
        'iOS',
        'Android',
        'Web-Based'
      ],
      group: 'specifications'
    },
    {
      name: 'version',
      type: 'text',
      label: 'Version',
      required: true,
      placeholder: 'e.g., 2024 or 365',
      group: 'specifications'
    },
    {
      name: 'userLimit',
      type: 'number',
      label: 'Number of Users/Devices',
      required: true,
      group: 'specifications'
    },
    {
      name: 'subscriptionPeriod',
      type: 'select',
      label: 'Subscription Period',
      required: false,
      options: [
        'Monthly',
        'Annual',
        'Biennial',
        'Lifetime',
        'Not Applicable'
      ],
      group: 'specifications'
    },
    {
      name: 'systemRequirements',
      type: 'textarea',
      label: 'Minimum System Requirements',
      required: true,
      placeholder: 'OS, Processor, RAM, Storage, etc.',
      group: 'specifications'
    },
    {
      name: 'languages',
      type: 'multiselect',
      label: 'Supported Languages',
      required: true,
      options: [
        'English',
        'Spanish',
        'French',
        'German',
        'Chinese',
        'Japanese',
        'Multi-Language'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Key Features',
      required: true,
      options: [
        'Cloud Storage',
        'Mobile Access',
        'Offline Mode',
        'Auto-Updates',
        'Technical Support',
        'Training Resources',
        'Data Backup'
      ],
      group: 'specifications'
    },
    {
      name: 'updatePolicy',
      type: 'select',
      label: 'Update Policy',
      required: true,
      options: [
        'Free Updates',
        'Paid Major Updates',
        'Subscription Updates',
        'No Updates'
      ],
      group: 'specifications'
    },
    {
      name: 'supportPeriod',
      type: 'number',
      label: 'Support Period',
      required: false,
      unit: 'months',
      group: 'specifications'
    },
    {
      name: 'activationType',
      type: 'select',
      label: 'Activation Method',
      required: true,
      options: [
        'Online Activation',
        'Offline Activation',
        'Product Key',
        'Account Based',
        'No Activation Required'
      ],
      group: 'specifications'
    }
  ]
}; 