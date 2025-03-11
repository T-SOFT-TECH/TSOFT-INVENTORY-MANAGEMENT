import {CategoryFormConfig} from './product-form.types';

export const fiberOpticCablesConfig: CategoryFormConfig = {
  id: 'fiber_optic_cables',
  name: 'Fiber Optic Cables',
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Fiber Type',
      required: true,
      options: [
        'Single-mode',
        'Multi-mode OM3',
        'Multi-mode OM4',
        'Multi-mode OM5'
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
      name: 'connectorType',
      type: 'multiselect',
      label: 'Connector Type',
      required: true,
      options: [
        'LC',
        'SC',
        'ST',
        'FC',
        'MTP/MPO'
      ],
      group: 'specifications'
    },
    {
      name: 'speed',
      type: 'select',
      label: 'Maximum Speed',
      required: true,
      options: [
        '10 Gbps',
        '40 Gbps',
        '100 Gbps',
        '400 Gbps'
      ],
      group: 'specifications'
    },
    {
      name: 'jacketRating',
      type: 'select',
      label: 'Jacket Rating',
      required: true,
      options: [
        'Plenum',
        'Riser',
        'LSZH',
        'Outdoor'
      ],
      group: 'specifications'
    }
  ]
};
