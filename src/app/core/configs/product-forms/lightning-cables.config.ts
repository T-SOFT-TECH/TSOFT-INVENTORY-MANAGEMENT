import {CategoryFormConfig} from './product-form.types';

export const lightningCablesConfig: CategoryFormConfig = {
  id: 'lightning-cables',
  name: 'Lightning Cables',
  fields: [
    {
      name: 'certification',
      type: 'select',
      label: 'Certification',
      required: true,
      options: [
        'MFi Certified',
        'Non-Certified'
      ],
      group: 'specifications'
    },
    {
      name: 'length',
      type: 'number',
      label: 'Cable Length',
      required: true,
      unit: 'm',
      group: 'specifications'
    },
    {
      name: 'chargingSpeed',
      type: 'number',
      label: 'Charging Speed',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Fast Charging',
        'Data Transfer',
        'Braided',
        'LED Indicator'
      ],
      group: 'features'
    }
  ]
};
