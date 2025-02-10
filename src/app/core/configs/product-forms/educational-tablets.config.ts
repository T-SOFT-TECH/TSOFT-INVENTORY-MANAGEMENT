import {CategoryFormConfig} from './product-form.types';

export const educationalTabletsConfig: CategoryFormConfig = {
  id: 'educational-tablets',
  name: 'Educational Tablets',
  fields: [
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      group: 'display'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Display Resolution',
      required: true,
      options: [
        'HD (1280x720)',
        'Full HD (1920x1080)',
        '2K (2560x1440)',
        '4K (3840x2160)'
      ],
      group: 'display'
    },
    {
      name: 'processor',
      type: 'text',
      label: 'Processor',
      required: true,
      placeholder: 'e.g., Snapdragon 865, A14 Bionic',
      group: 'performance'
    },
    {
      name: 'ram',
      type: 'number',
      label: 'RAM',
      required: true,
      unit: 'GB',
      group: 'performance'
    },
    {
      name: 'storage',
      type: 'number',
      label: 'Storage Capacity',
      required: true,
      unit: 'GB',
      group: 'storage'
    },
    {
      name: 'expandableStorage',
      type: 'checkbox',
      label: 'Expandable Storage',
      group: 'storage'
    },
    {
      name: 'batteryCapacity',
      type: 'number',
      label: 'Battery Capacity',
      required: true,
      unit: 'mAh',
      group: 'power'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: true,
      unit: 'hours',
      group: 'power'
    },
    {
      name: 'operatingSystem',
      type: 'select',
      label: 'Operating System',
      required: true,
      options: ['Android', 'iPadOS', 'Chrome OS', 'Windows'],
      group: 'software'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'Wi-Fi',
        'Bluetooth',
        'USB-C',
        'Mobile Data',
        'GPS'
      ],
      group: 'connectivity'
    },
    {
      name: 'durabilityFeatures',
      type: 'multiselect',
      label: 'Durability Features',
      required: true,
      options: [
        'Drop Protection',
        'Water Resistant',
        'Scratch Resistant Screen',
        'Kid-Proof Case',
        'Gorilla Glass'
      ],
      group: 'durability'
    },
    {
      name: 'educationalFeatures',
      type: 'multiselect',
      label: 'Educational Features',
      required: true,
      options: [
        'Parental Controls',
        'Educational Apps',
        'Content Filtering',
        'Multi-User Support',
        'Screen Time Management',
        'Learning Progress Tracking'
      ],
      group: 'education'
    },
    {
      name: 'accessibilityFeatures',
      type: 'multiselect',
      label: 'Accessibility Features',
      options: [
        'Screen Reader',
        'Voice Control',
        'High Contrast Mode',
        'Closed Captioning',
        'Text-to-Speech'
      ],
      group: 'accessibility'
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
        'High School (15-18)'
      ],
      group: 'education'
    }
  ]
};
