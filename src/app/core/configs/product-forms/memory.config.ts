import {CategoryFormConfig, commonFields} from './product-form.types';

export const memoryConfig: CategoryFormConfig = {
  id: 'ram-memory',
  name: 'RAM (Memory)',
  fields: [
    ...commonFields,
    {
      name: 'memoryType',
      type: 'select',
      label: 'Memory Type',
      required: true,
      options: ['DDR4', 'DDR5'],
      group: 'specifications'
    },
    {
      name: 'capacity',
      type: 'number',
      label: 'Capacity',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'speed',
      type: 'number',
      label: 'Speed',
      required: true,
      unit: 'MHz',
      group: 'specifications'
    },
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: ['DIMM', 'SO-DIMM'],
      group: 'specifications'
    },
    {
      name: 'latency',
      type: 'text',
      label: 'Latency',
      required: true,
      placeholder: 'e.g., CL16',
      group: 'specifications'
    },
    {
      name: 'voltage',
      type: 'number',
      label: 'Voltage',
      required: true,
      unit: 'V',
      step: 0.1,
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: ['RGB', 'XMP', 'ECC'],
      group: 'specifications'
    }
  ]
};
