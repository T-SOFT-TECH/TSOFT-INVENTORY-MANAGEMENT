import { CategoryFormConfig } from './product-form.types';

export const ramMemoryConfig: CategoryFormConfig = {
  id: 'ram_memory',
  name: 'RAM (Memory)',
  fields: [
    {
      name: 'memoryType',
      type: 'select',
      label: 'Memory Type',
      required: true,
      options: [
        'DDR4',
        'DDR5',
        'DDR4 ECC',
        'DDR5 ECC',
        'DDR4 SO-DIMM',
        'DDR5 SO-DIMM'
      ],
      group: 'specifications'
    },
    {
      name: 'capacity',
      type: 'number',
      label: 'Capacity Per Module',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'moduleCount',
      type: 'number',
      label: 'Number of Modules',
      required: true,
      min: 1,
      max: 8,
      group: 'specifications'
    },
    {
      name: 'speed',
      type: 'number',
      label: 'Speed',
      required: true,
      unit: 'MHz',
      group: 'performance'
    },
    {
      name: 'timing',
      type: 'text',
      label: 'Timings',
      required: true,
      placeholder: 'e.g., CL16-18-18-38',
      group: 'performance'
    },
    {
      name: 'voltage',
      type: 'number',
      label: 'Operating Voltage',
      required: true,
      unit: 'V',
      step: 0.01,
      group: 'specifications'
    },
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: [
        'DIMM',
        'SO-DIMM'
      ],
      group: 'physical'
    },
    {
      name: 'height',
      type: 'number',
      label: 'Module Height',
      required: true,
      unit: 'mm',
      group: 'physical'
    },
    {
      name: 'heatspreader',
      type: 'checkbox',
      label: 'Has Heatspreader',
      group: 'physical'
    },
    {
      name: 'xmpSupport',
      type: 'checkbox',
      label: 'XMP/EXPO Support',
      group: 'features'
    },
    {
      name: 'xmpProfiles',
      type: 'multiselect',
      label: 'XMP/EXPO Profiles',
      options: [
        'XMP 2.0',
        'XMP 3.0',
        'AMD EXPO'
      ],
      group: 'features'
    },
    {
      name: 'eccSupport',
      type: 'checkbox',
      label: 'ECC Support',
      group: 'features'
    },
    {
      name: 'rgbLighting',
      type: 'checkbox',
      label: 'RGB Lighting',
      group: 'aesthetics'
    },
    {
      name: 'rgbSoftware',
      type: 'multiselect',
      label: 'RGB Software Compatibility',
      options: [
        'ASUS Aura Sync',
        'MSI Mystic Light',
        'Gigabyte RGB Fusion',
        'Corsair iCUE',
        'G.SKILL Trident Z Lighting'
      ],
      group: 'aesthetics'
    },
    {
      name: 'color',
      type: 'text',
      label: 'Heatspreader Color',
      group: 'aesthetics'
    },
    {
      name: 'warranty',
      type: 'number',
      label: 'Warranty Period',
      required: true,
      unit: 'years',
      group: 'support'
    }
  ]
};
