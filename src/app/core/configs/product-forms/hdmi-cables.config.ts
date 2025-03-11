import {CategoryFormConfig} from './product-form.types';

export const hdmiCablesConfig: CategoryFormConfig = {
  id: 'hdmi_cables',
  name: 'HDMI Cables',
  fields: [
    {
      name: 'version',
      type: 'select',
      label: 'HDMI Version',
      required: true,
      options: [
        'HDMI 1.4',
        'HDMI 2.0',
        'HDMI 2.1'
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
      name: 'maxResolution',
      type: 'select',
      label: 'Maximum Resolution',
      required: true,
      options: [
        '1080p',
        '4K (60Hz)',
        '4K (120Hz)',
        '8K (60Hz)'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'HDR Support',
        'ARC/eARC',
        'Ethernet Channel',
        'CEC',
        'Variable Refresh Rate'
      ],
      group: 'features'
    },
    {
      name: 'shielding',
      type: 'select',
      label: 'Shielding Type',
      required: true,
      options: [
        'Double Shielded',
        'Triple Shielded',
        'Braided Shield'
      ],
      group: 'specifications'
    }
  ]
};
