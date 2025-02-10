import {CategoryFormConfig} from './product-form.types';

export const smartAppliancesConfig: CategoryFormConfig = {
  id: 'smart-appliances',
  name: 'Smart Appliances',
  fields: [
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
    }
  ]
};
