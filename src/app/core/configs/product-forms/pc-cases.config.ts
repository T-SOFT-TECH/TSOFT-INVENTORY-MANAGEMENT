import { CategoryFormConfig } from './product-form.types';

export const pcCasesConfig: CategoryFormConfig = {
  id: 'pc-cases',
  name: 'PC Cases',
  fields: [
    {
      name: 'formFactor',
      type: 'multiselect',
      label: 'Supported Form Factors',
      required: true,
      options: [
        'ATX',
        'Micro-ATX',
        'Mini-ITX',
        'E-ATX',
        'XL-ATX'
      ],
      group: 'compatibility'
    },
    {
      name: 'caseType',
      type: 'select',
      label: 'Case Type',
      required: true,
      options: [
        'Full Tower',
        'Mid Tower',
        'Mini Tower',
        'Small Form Factor',
        'Test Bench'
      ],
      group: 'physical'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions (LxWxH)',
      required: true,
      placeholder: '450x210x480mm',
      group: 'physical'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'kg',
      group: 'physical'
    },
    {
      name: 'maxGpuLength',
      type: 'number',
      label: 'Maximum GPU Length',
      required: true,
      unit: 'mm',
      group: 'clearance'
    },
    {
      name: 'maxCpuCoolerHeight',
      type: 'number',
      label: 'Maximum CPU Cooler Height',
      required: true,
      unit: 'mm',
      group: 'clearance'
    },
    {
      name: 'maxPsuLength',
      type: 'number',
      label: 'Maximum PSU Length',
      required: true,
      unit: 'mm',
      group: 'clearance'
    },
    {
      name: 'materials',
      type: 'multiselect',
      label: 'Materials',
      required: true,
      options: [
        'Steel',
        'Aluminum',
        'Tempered Glass',
        'Acrylic',
        'Plastic'
      ],
      group: 'construction'
    },
    {
      name: 'fanSupport',
      type: 'multiselect',
      label: 'Fan Support',
      required: true,
      options: [
        '120mm',
        '140mm',
        '200mm'
      ],
      group: 'cooling'
    },
    {
      name: 'frontFans',
      type: 'number',
      label: 'Front Fan Slots',
      required: true,
      min: 0,
      group: 'cooling'
    },
    {
      name: 'topFans',
      type: 'number',
      label: 'Top Fan Slots',
      required: true,
      min: 0,
      group: 'cooling'
    },
    {
      name: 'rearFans',
      type: 'number',
      label: 'Rear Fan Slots',
      required: true,
      min: 0,
      group: 'cooling'
    },
    {
      name: 'includedFans',
      type: 'number',
      label: 'Included Fans',
      required: true,
      min: 0,
      group: 'cooling'
    },
    {
      name: 'radiatorSupport',
      type: 'multiselect',
      label: 'Radiator Support',
      options: [
        '120mm',
        '240mm',
        '280mm',
        '360mm',
        '420mm'
      ],
      group: 'cooling'
    },
    {
      name: 'driveBays35',
      type: 'number',
      label: '3.5" Drive Bays',
      required: true,
      min: 0,
      group: 'storage'
    },
    {
      name: 'driveBays25',
      type: 'number',
      label: '2.5" Drive Bays',
      required: true,
      min: 0,
      group: 'storage'
    },
    {
      name: 'expansionSlots',
      type: 'number',
      label: 'Expansion Slots',
      required: true,
      min: 0,
      group: 'specifications'
    },
    {
      name: 'frontPorts',
      type: 'multiselect',
      label: 'Front I/O Ports',
      required: true,
      options: [
        'USB 3.2 Gen 2 Type-C',
        'USB 3.2 Gen 1 Type-A',
        'USB 2.0',
        'Audio In/Out',
        'Fan Controller',
        'LED Controller'
      ],
      group: 'connectivity'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'PSU Shroud',
        'Cable Management',
        'Removable Filters',
        'Tempered Glass Panel',
        'RGB Support',
        'Vertical GPU Mount'
      ],
      group: 'features'
    },
    {
      name: 'dustFilters',
      type: 'multiselect',
      label: 'Dust Filters',
      options: [
        'Front',
        'Top',
        'Bottom',
        'Side'
      ],
      group: 'features'
    }
  ]
};
