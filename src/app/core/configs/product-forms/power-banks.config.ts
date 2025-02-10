import {CategoryFormConfig} from './product-form.types';

export const powerBanksConfig: CategoryFormConfig = {
  id: 'power-banks',
  name: 'Power Banks',
  fields: [
    {
      name: 'capacity',
      type: 'number',
      label: 'Battery Capacity',
      required: true,
      unit: 'mAh',
      group: 'specifications'
    },
    {
      name: 'outputPorts',
      type: 'multiselect',
      label: 'Output Ports',
      required: true,
      options: [
        'USB-A',
        'USB-C',
        'Lightning',
        'Micro USB',
        'AC Outlet'
      ],
      group: 'specifications'
    },
    {
      name: 'inputPorts',
      type: 'multiselect',
      label: 'Input Ports',
      required: true,
      options: [
        'USB-C',
        'Micro USB',
        'Lightning',
        'Solar'
      ],
      group: 'specifications'
    },
    {
      name: 'fastCharging',
      type: 'multiselect',
      label: 'Fast Charging Protocols',
      options: [
        'USB PD',
        'Quick Charge',
        'Samsung AFC',
        'Huawei SuperCharge'
      ],
      group: 'specifications'
    },
    {
      name: 'maxOutput',
      type: 'number',
      label: 'Maximum Output',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'LED Display',
        'Wireless Charging',
        'Pass-through Charging',
        'Solar Charging',
        'Multiple Device Charging'
      ],
      group: 'features'
    }
  ]
};
