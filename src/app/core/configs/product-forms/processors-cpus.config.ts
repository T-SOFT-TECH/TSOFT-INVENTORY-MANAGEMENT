// processors-cpus.config.ts
import { CategoryFormConfig } from './product-form.types';

export const processorsCpusConfig: CategoryFormConfig = {
  id: 'processors_cpus',
  name: 'Processors (CPUs)',
  fields: [
    {
      name: 'series',
      type: 'text',
      label: 'Processor Series',
      required: true,
      placeholder: 'e.g., Ryzen 7, Core i7',
      group: 'basic'
    },
    {
      name: 'generation',
      type: 'text',
      label: 'Generation',
      required: true,
      placeholder: 'e.g., 13th Gen, 7000 Series',
      group: 'basic'
    },
    {
      name: 'cores',
      type: 'number',
      label: 'Core Count',
      required: true,
      min: 1,
      group: 'performance'
    },
    {
      name: 'threads',
      type: 'number',
      label: 'Thread Count',
      required: true,
      min: 1,
      group: 'performance'
    },
    {
      name: 'baseFrequency',
      type: 'number',
      label: 'Base Frequency',
      required: true,
      unit: 'GHz',
      step: 0.1,
      group: 'performance'
    },
    {
      name: 'boostFrequency',
      type: 'number',
      label: 'Boost Frequency',
      unit: 'GHz',
      step: 0.1,
      group: 'performance'
    },
    {
      name: 'socket',
      type: 'select',
      label: 'CPU Socket',
      required: true,
      options: [
        'AM5',
        'AM4',
        'LGA 1700',
        'LGA 1200',
        'TR4'
      ],
      group: 'compatibility'
    },
    {
      name: 'tdp',
      type: 'number',
      label: 'TDP',
      required: true,
      unit: 'W',
      group: 'power'
    },
    {
      name: 'lithography',
      type: 'number',
      label: 'Manufacturing Process',
      required: true,
      unit: 'nm',
      group: 'specifications'
    },
    {
      name: 'integratedGraphics',
      type: 'checkbox',
      label: 'Integrated Graphics',
      group: 'features'
    },
    {
      name: 'igpuModel',
      type: 'text',
      label: 'iGPU Model',
      group: 'features'
    },
    {
      name: 'l1Cache',
      type: 'number',
      label: 'L1 Cache',
      unit: 'KB',
      group: 'specifications'
    },
    {
      name: 'l2Cache',
      type: 'number',
      label: 'L2 Cache',
      unit: 'MB',
      group: 'specifications'
    },
    {
      name: 'l3Cache',
      type: 'number',
      label: 'L3 Cache',
      unit: 'MB',
      group: 'specifications'
    },
    {
      name: 'memorySupport',
      type: 'multiselect',
      label: 'Memory Support',
      required: true,
      options: [
        'DDR4',
        'DDR5',
        'ECC Support'
      ],
      group: 'compatibility'
    },
    {
      name: 'maxMemorySpeed',
      type: 'number',
      label: 'Max Memory Speed',
      required: true,
      unit: 'MHz',
      group: 'specifications'
    },
    {
      name: 'pcieLanes',
      type: 'number',
      label: 'PCIe Lanes',
      required: true,
      group: 'specifications'
    },
    {
      name: 'pcieVersion',
      type: 'select',
      label: 'PCIe Version',
      required: true,
      options: [
        'PCIe 3.0',
        'PCIe 4.0',
        'PCIe 5.0'
      ],
      group: 'specifications'
    }
  ]
};
