import {CategoryFormConfig} from './product-form.types';

export const displayPortCablesConfig: CategoryFormConfig = {
  id: 'displayport-cables',
  name: 'DisplayPort Cables',
  fields: [
    {
      name: 'version',
      type: 'select',
      label: 'DisplayPort Version',
      required: true,
      options: [
        'DisplayPort 1.2',
        'DisplayPort 1.4',
        'DisplayPort 2.0'
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
        '4K (60Hz)',
        '4K (144Hz)',
        '8K (60Hz)',
        '16K (60Hz)'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'HDR Support',
        'FreeSync',
        'G-Sync',
        'MST Support',
        'Audio Support'
      ],
      group: 'features'
    }
  ]
};