import {CategoryFormConfig, commonFields} from './product-form.types';

export const caseConfig: CategoryFormConfig = {
  id: 'pc-cases',
  name: 'PC Cases',
  fields: [
    ...commonFields,
    {
      name: 'formFactor',
      type: 'multiselect',
      label: 'Supported Form Factors',
      required: true,
      options: ['ATX', 'Micro-ATX', 'Mini-ITX', 'E-ATX'],
      group: 'specifications'
    },
    {
      name: 'caseType',
      type: 'select',
      label: 'Case Type',
      required: true,
      options: ['Mid Tower', 'Full Tower', 'Mini Tower', 'Small Form Factor'],
      group: 'specifications'
    },
    {
      name: 'dimensions',
      type: 'multiselect',
      label: 'Dimensions',
      required: true,
      options: ['Length', 'Width', 'Height'],
      group: 'specifications'
    },
    {
      name: 'maxGpuLength',
      type: 'number',
      label: 'Maximum GPU Length',
      required: true,
      unit: 'mm',
      group: 'specifications'
    },
    {
      name: 'radiatorSupport',
      type: 'multiselect',
      label: 'Radiator Support',
      options: ['120mm', '240mm', '280mm', '360mm'],
      group: 'specifications'
    },
    {
      name: 'includedFans',
      type: 'number',
      label: 'Included Fans',
      required: true,
      min: 0,
      group: 'specifications'
    },
    {
      name: 'materials',
      type: 'multiselect',
      label: 'Materials',
      required: true,
      options: ['Steel', 'Aluminum', 'Tempered Glass', 'Plastic'],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'RGB Support',
        'USB-C Front Panel',
        'Tool-less Design',
        'Dust Filters',
        'PSU Shroud'
      ],
      group: 'features'
    }
  ]
};
