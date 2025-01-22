import {CategoryFormConfig, commonFields} from './product-form.types';

export const powerSupplyConfig: CategoryFormConfig = {
  id: 'power-supplies-psus',
  name: 'Power Supplies',
  fields: [
    ...commonFields,
    {
      name: 'wattage',
      type: 'number',
      label: 'Wattage',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'efficiency',
      type: 'select',
      label: 'Efficiency Rating',
      required: true,
      options: [
        '80+ White',
        '80+ Bronze',
        '80+ Silver',
        '80+ Gold',
        '80+ Platinum',
        '80+ Titanium'
      ],
      group: 'specifications'
    },
    {
      name: 'modularity',
      type: 'select',
      label: 'Modularity',
      required: true,
      options: ['Full Modular', 'Semi-Modular', 'Non-Modular'],
      group: 'specifications'
    },
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: ['ATX', 'SFX', 'SFX-L', 'TFX'],
      group: 'specifications'
    },
    {
      name: 'connectors',
      type: 'multiselect',
      label: 'Connectors',
      required: true,
      options: [
        '24-pin ATX',
        '8-pin EPS',
        '8-pin PCIe',
        '6-pin PCIe',
        'SATA',
        'Molex',
        '12VHPWR'
      ],
      group: 'specifications'
    },
    {
      name: 'cooling',
      type: 'select',
      label: 'Cooling',
      required: true,
      options: ['120mm Fan', '135mm Fan', '140mm Fan'],
      group: 'specifications'
    }
  ]
};
