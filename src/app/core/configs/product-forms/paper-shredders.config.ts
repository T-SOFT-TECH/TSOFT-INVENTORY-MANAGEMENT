import {CategoryFormConfig} from './product-form.types';

export const paperShreddersConfig: CategoryFormConfig = {
  id: 'paper_shredders',
  name: 'Paper Shredders',
  fields: [
    {
      name: 'shredderType',
      type: 'select',
      label: 'Shredder Type',
      required: true,
      options: [
        'Strip-Cut',
        'Cross-Cut',
        'Micro-Cut',
        'High-Security'
      ],
      group: 'specifications'
    },
    {
      name: 'securityLevel',
      type: 'select',
      label: 'Security Level (DIN)',
      required: true,
      options: [
        'P-2',
        'P-3',
        'P-4',
        'P-5',
        'P-6',
        'P-7'
      ],
      group: 'specifications'
    },
    {
      name: 'sheetCapacity',
      type: 'number',
      label: 'Sheet Capacity',
      required: true,
      unit: 'sheets',
      group: 'specifications'
    },
    {
      name: 'binCapacity',
      type: 'number',
      label: 'Bin Capacity',
      required: true,
      unit: 'liters',
      group: 'specifications'
    },
    {
      name: 'runTime',
      type: 'number',
      label: 'Continuous Run Time',
      required: true,
      unit: 'minutes',
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Auto Start/Stop',
        'Jam Prevention',
        'Overheat Protection',
        'Safety Lock',
        'Quiet Operation',
        'Casters'
      ],
      group: 'features'
    }
  ]
};
