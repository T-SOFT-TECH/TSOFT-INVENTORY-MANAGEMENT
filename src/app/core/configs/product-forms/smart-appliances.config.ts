import { CategoryFormConfig, commonFields } from './product-form.types';

export const smartAppliancesConfig: CategoryFormConfig = {
  id: 'smart-appliances',
  name: 'Smart Appliances',
  fields: [
    ...commonFields,
    {
      name: 'applianceType',
      type: 'select',
      label: 'Appliance Type',
      required: true,
      options: [
        'Smart Refrigerator',
        'Smart Washer',
        'Smart Dryer',
        'Smart Dishwasher',
        'Smart Oven',
        'Smart Microwave',
        'Smart Air Conditioner',
        'Smart Air Purifier',
        'Smart Vacuum'
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
        'Matter',
        'SmartThings',
        'HomeKit'
      ],
      group: 'specifications'
    },
    {
      name: 'smartFeatures',
      type: 'multiselect',
      label: 'Smart Features',
      required: true,
      options: [
        'Remote Control',
        'Voice Control',
        'Mobile App Control',
        'Energy Monitoring',
        'Smart Scheduling',
        'Notifications',
        'Auto Programs'
      ],
      group: 'specifications'
    },
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: true,
      options: [
        'LED Display',
        'LCD Display',
        'Touch Screen',
        'Smart Display',
        'No Display'
      ],
      group: 'specifications'
    },
    {
      name: 'energyRating',
      type: 'select',
      label: 'Energy Rating',
      required: true,
      options: [
        'A+++',
        'A++',
        'A+',
        'A',
        'B',
        'C'
      ],
      group: 'specifications'
    },
    {
      name: 'powerConsumption',
      type: 'number',
      label: 'Power Consumption',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'capacity',
      type: 'text',
      label: 'Capacity',
      required: true,
      placeholder: 'e.g., 20 cu. ft., 4.5 cu. ft.',
      group: 'specifications'
    },
    {
      name: 'smartIntegration',
      type: 'multiselect',
      label: 'Smart Home Integration',
      required: true,
      options: [
        'Amazon Alexa',
        'Google Assistant',
        'Apple HomeKit',
        'Samsung SmartThings',
        'IFTTT'
      ],
      group: 'specifications'
    },
    {
      name: 'automationFeatures',
      type: 'multiselect',
      label: 'Automation Features',
      required: false,
      options: [
        'Auto Scheduling',
        'Usage Learning',
        'Energy Optimization',
        'Remote Diagnostics',
        'Predictive Maintenance'
      ],
      group: 'specifications'
    },
    {
      name: 'noiselevel',
      type: 'number',
      label: 'Noise Level',
      required: false,
      unit: 'dB',
      group: 'specifications'
    },
    {
      name: 'installation',
      type: 'select',
      label: 'Installation Type',
      required: true,
      options: [
        'Free Standing',
        'Built-in',
        'Counter Top',
        'Professional Installation Required'
      ],
      group: 'specifications'
    },
    {
      name: 'warranty',
      type: 'number',
      label: 'Warranty Period',
      required: true,
      unit: 'years',
      group: 'specifications'
    },
    {
      name: 'certifications',
      type: 'multiselect',
      label: 'Certifications',
      required: false,
      options: [
        'Energy Star',
        'CE',
        'UL Listed',
        'CSA Certified',
        'RoHS Compliant'
      ],
      group: 'specifications'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: true,
      placeholder: 'e.g., 70 x 35.75 x 36.25 inches',
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