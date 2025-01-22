import { CategoryFormConfig, commonFields } from './product-form.types';

export const processorsConfig: CategoryFormConfig = {
  id: 'processors-cpus',
  name: 'Processors (CPUs)',
  fields: [
    ...commonFields,
    {
      name: 'processorType',
      type: 'select',
      label: 'Processor Type',
      required: true,
      options: ['Desktop', 'Mobile', 'Server'],
      group: 'specifications'
    },
    {
      name: 'series',
      type: 'text',
      label: 'Processor Series',
      required: true,
      placeholder: 'e.g., Ryzen 7, Core i7',
      group: 'specifications'
    },
    {
      name: 'generation',
      type: 'text',
      label: 'Generation',
      required: true,
      placeholder: 'e.g., 13th Gen, 7000 Series',
      group: 'specifications'
    },
    {
      name: 'cores',
      type: 'number',
      label: 'Core Count',
      required: true,
      min: 1,
      group: 'specifications'
    },
    {
      name: 'threads',
      type: 'number',
      label: 'Thread Count',
      required: true,
      min: 1,
      group: 'specifications'
    },
    {
      name: 'baseFrequency',
      type: 'number',
      label: 'Base Frequency',
      required: true,
      unit: 'GHz',
      step: 0.1,
      group: 'specifications'
    },
    {
      name: 'boostFrequency',
      type: 'number',
      label: 'Boost Frequency',
      unit: 'GHz',
      step: 0.1,
      group: 'specifications'
    },
    {
      name: 'socket',
      type: 'select',
      label: 'CPU Socket',
      required: true,
      options: ['AM5', 'AM4', 'LGA 1700', 'LGA 1200'],
      group: 'specifications'
    },
    {
      name: 'tdp',
      type: 'number',
      label: 'TDP',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'integratedGraphics',
      type: 'checkbox',
      label: 'Integrated Graphics',
      group: 'specifications'
    }
  ]
};
