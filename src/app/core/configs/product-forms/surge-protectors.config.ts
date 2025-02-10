import {CategoryFormConfig} from './product-form.types';

export const surgeProtectorsConfig: CategoryFormConfig = {
  id: 'surge-protectors',
  name: 'Surge Protectors',
  fields: [
    {
      name: 'outletCount',
      type: 'number',
      label: 'Number of Outlets',
      required: true,
      group: 'specifications'
    },
    {
      name: 'surgeRating',
      type: 'number',
      label: 'Surge Protection Rating',
      required: true,
      unit: 'Joules',
      group: 'specifications'
    },
    {
      name: 'cordLength',
      type: 'number',
      label: 'Cord Length',
      required: true,
      unit: 'feet',
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'USB Ports',
        'Circuit Breaker',
        'LED Indicators',
        'EMI/RFI Filtering',
        'Rotating Outlets',
        'Right-angle Plug'
      ],
      group: 'features'
    },
    {
      name: 'protection',
      type: 'multiselect',
      label: 'Protection Types',
      required: true,
      options: [
        'Surge Protection',
        'Lightning Protection',
        'EMI/RFI Protection',
        'Phone Line Protection',
        'Coaxial Protection'
      ],
      group: 'specifications'
    }
  ]
};
