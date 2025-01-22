import {CategoryFormConfig, commonFields} from './product-form.types';

export const coolingConfig: CategoryFormConfig = {
  id: 'cooling-systems',
  name: 'Cooling Systems',
  fields: [
    ...commonFields,
    {
      name: 'coolingType',
      type: 'select',
      label: 'Cooling Type',
      required: true,
      options: ['Air Cooler', 'AIO Liquid Cooler', 'Custom Loop Component'],
      group: 'specifications'
    },
    {
      name: 'socketSupport',
      type: 'multiselect',
      label: 'Socket Support',
      required: true,
      options: ['AM5', 'AM4', 'LGA 1700', 'LGA 1200'],
      group: 'specifications'
    },
    {
      name: 'size',
      type: 'select',
      label: 'Size',
      required: true,
      options: ['120mm', '240mm', '280mm', '360mm'],
      group: 'specifications'
    },
    {
      name: 'tdp',
      type: 'number',
      label: 'TDP Support',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'fanSpeed',
      type: 'number',
      label: 'Fan Speed',
      required: true,
      unit: 'RPM',
      group: 'specifications'
    },
    {
      name: 'noiseLevel',
      type: 'number',
      label: 'Noise Level',
      unit: 'dBA',
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: ['RGB', 'Fan Control', 'Temperature Display', 'Anti-Vibration'],
      group: 'features'
    }
  ]
};
