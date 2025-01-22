import { CategoryFormConfig, commonFields } from './product-form.types';

export const officeEquipmentConfig: CategoryFormConfig = {
  id: 'office-equipment', // Matches the category name from initial-categories.ts
  name: 'Office Equipment',
  fields: [
    ...commonFields,
    {
      name: 'equipmentType',
      type: 'select',
      label: 'Equipment Type',
      required: true,
      options: [
        'Paper Shredder',
        'Laminator',
        'Binding Machine',
        'Calculator',
        'Time Clock',
        'Label Maker',
        'Paper Cutter',
        'Cash Register'
      ],
      group: 'specifications'
    },
    {
      name: 'usage',
      type: 'select',
      label: 'Intended Usage',
      required: true,
      options: [
        'Personal',
        'Small Office',
        'Medium Office',
        'Large Office',
        'Commercial'
      ],
      group: 'specifications'
    },
    {
      name: 'sheetCapacity',
      type: 'number',
      label: 'Sheet Capacity',
      required: false,
      unit: 'sheets',
      group: 'specifications'
    },
    {
      name: 'shreddingType',
      type: 'select',
      label: 'Shredding Type',
      required: false,
      options: [
        'Strip-Cut',
        'Cross-Cut',
        'Micro-Cut',
        'Not Applicable'
      ],
      group: 'specifications'
    },
    {
      name: 'securityLevel',
      type: 'select',
      label: 'Security Level (P-Rating)',
      required: false,
      options: [
        'P-1',
        'P-2',
        'P-3',
        'P-4',
        'P-5',
        'P-6',
        'P-7',
        'Not Applicable'
      ],
      group: 'specifications'
    },
    {
      name: 'maxLaminationWidth',
      type: 'number',
      label: 'Maximum Lamination Width',
      required: false,
      unit: 'mm',
      group: 'specifications'
    },
    {
      name: 'bindingCapacity',
      type: 'number',
      label: 'Binding Capacity',
      required: false,
      unit: 'sheets',
      group: 'specifications'
    },
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: false,
      options: [
        'LCD',
        'LED',
        'Digital',
        'None'
      ],
      group: 'specifications'
    },
    {
      name: 'powerSource',
      type: 'select',
      label: 'Power Source',
      required: true,
      options: [
        'AC Powered',
        'Battery Powered',
        'Both',
        'Manual'
      ],
      group: 'specifications'
    },
    {
      name: 'continuousRunTime',
      type: 'number',
      label: 'Continuous Run Time',
      required: false,
      unit: 'minutes',
      group: 'specifications'
    },
    {
      name: 'coolDownPeriod',
      type: 'number',
      label: 'Cool Down Period',
      required: false,
      unit: 'minutes',
      group: 'specifications'
    },
    {
      name: 'noiseLevel',
      type: 'number',
      label: 'Noise Level',
      required: false,
      unit: 'dB',
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      required: false,
      options: [
        'Auto Start/Stop',
        'Overheat Protection',
        'Jam Prevention',
        'Safety Lock',
        'Wheels/Casters',
        'Energy Saving Mode',
        'Counter/Timer'
      ],
      group: 'specifications'
    },
    {
      name: 'wasteBasketCapacity',
      type: 'number',
      label: 'Waste Basket Capacity',
      required: false,
      unit: 'L',
      group: 'specifications'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: true,
      placeholder: 'e.g., 350 x 250 x 400 mm',
      group: 'specifications'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'kg',
      group: 'specifications'
    }
  ]
}; 