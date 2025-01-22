import {CategoryFormConfig, commonFields} from './product-form.types';

export const keyboardConfig: CategoryFormConfig = {
  id: 'keyboards',
  name: 'Keyboards',
  fields: [
    ...commonFields,
    {
      name: 'keyboardType',
      type: 'select',
      label: 'Keyboard Type',
      required: true,
      options: ['Mechanical', 'Membrane', 'Optical'],
      group: 'specifications'
    },
    {
      name: 'switchType',
      type: 'select',
      label: 'Switch Type',
      options: ['Cherry MX Red', 'Cherry MX Blue', 'Cherry MX Brown', 'Optical'],
      group: 'specifications'
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      required: true,
      options: ['Full Size', 'TKL', '60%', '65%', '75%'],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'select',
      label: 'Connectivity',
      required: true,
      options: ['Wired', 'Wireless', 'Both'],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: ['RGB', 'Hot-swappable', 'USB Passthrough', 'Macro Keys', 'Palm Rest'],
      group: 'features'
    }
  ]
};
