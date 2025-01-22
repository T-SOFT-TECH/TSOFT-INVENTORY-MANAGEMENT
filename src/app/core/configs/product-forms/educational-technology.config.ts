import { CategoryFormConfig, commonFields } from './product-form.types';

export const educationalTechnologyConfig: CategoryFormConfig = {
  id: 'educational-technology', // Matches the category name from initial-categories.ts
  name: 'Educational Technology',
  fields: [
    ...commonFields,
    {
      name: 'deviceType',
      type: 'select',
      label: 'Device Type',
      required: true,
      options: [
        'Educational Tablet',
        'E-Reader',
        'Learning Computer',
        'Interactive Display',
        'Document Camera',
        'Student Response System',
        'Learning Robot',
        'Virtual Reality Headset'
      ],
      group: 'specifications'
    },
    {
      name: 'targetAgeGroup',
      type: 'multiselect',
      label: 'Target Age Group',
      required: true,
      options: [
        'Preschool (3-5)',
        'Elementary (6-11)',
        'Middle School (12-14)',
        'High School (15-18)',
        'Higher Education',
        'Adult Learning'
      ],
      group: 'specifications'
    },
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: false,
      unit: 'inches',
      group: 'specifications'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Display Resolution',
      required: false,
      options: [
        'HD (1280x720)',
        'Full HD (1920x1080)',
        '2K (2560x1440)',
        '4K (3840x2160)',
        'Not Applicable'
      ],
      group: 'specifications'
    },
    {
      name: 'touchPoints',
      type: 'number',
      label: 'Touch Points',
      required: false,
      group: 'specifications'
    },
    {
      name: 'storage',
      type: 'number',
      label: 'Storage Capacity',
      required: false,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'ram',
      type: 'number',
      label: 'RAM',
      required: false,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'operatingSystem',
      type: 'select',
      label: 'Operating System',
      required: false,
      options: [
        'Android',
        'iOS',
        'Windows',
        'Chrome OS',
        'Linux',
        'Proprietary OS',
        'Not Applicable'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'Wi-Fi',
        'Bluetooth',
        'USB',
        'HDMI',
        'Ethernet',
        'NFC'
      ],
      group: 'specifications'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: false,
      unit: 'hours',
      group: 'specifications'
    },
    {
      name: 'durability',
      type: 'multiselect',
      label: 'Durability Features',
      required: false,
      options: [
        'Drop Resistant',
        'Water Resistant',
        'Scratch Resistant',
        'Kid-Proof Case',
        'Gorilla Glass'
      ],
      group: 'specifications'
    },
    {
      name: 'contentSupport',
      type: 'multiselect',
      label: 'Content Support',
      required: true,
      options: [
        'Educational Apps',
        'E-Books',
        'Interactive Content',
        'AR/VR Content',
        'Video Learning',
        'Assessment Tools'
      ],
      group: 'specifications'
    },
    {
      name: 'accessControl',
      type: 'multiselect',
      label: 'Access Control Features',
      required: false,
      options: [
        'Parental Controls',
        'Content Filtering',
        'Screen Time Management',
        'Multi-User Support',
        'Remote Management'
      ],
      group: 'specifications'
    },
    {
      name: 'audioFeatures',
      type: 'multiselect',
      label: 'Audio Features',
      required: false,
      options: [
        'Built-in Speakers',
        'Microphone',
        'Audio Jack',
        'Bluetooth Audio',
        'Voice Control'
      ],
      group: 'specifications'
    },
    {
      name: 'warranty',
      type: 'number',
      label: 'Warranty Period',
      required: true,
      unit: 'months',
      group: 'specifications'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: true,
      placeholder: 'e.g., 250 x 180 x 10 mm',
      group: 'specifications'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'kg',
      group: 'specifications'
    }
  ]
}; 