import {CategoryFormConfig} from './product-form.types';

export const labelPrintersConfig: CategoryFormConfig = {
  id: 'label-printers',
  name: 'Label Printers',
  fields: [
    {
      name: 'printerType',
      type: 'select',
      label: 'Printer Type',
      required: true,
      options: [
        'Thermal',
        'Thermal Transfer',
        'Direct Thermal',
        'Color Label'
      ],
      group: 'specifications'
    },
    {
      name: 'printResolution',
      type: 'number',
      label: 'Print Resolution',
      required: true,
      unit: 'dpi',
      group: 'specifications'
    },
    {
      name: 'printSpeed',
      type: 'number',
      label: 'Print Speed',
      required: true,
      unit: 'labels/min',
      group: 'specifications'
    },
    {
      name: 'maxLabelWidth',
      type: 'number',
      label: 'Maximum Label Width',
      required: true,
      unit: 'mm',
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'USB',
        'Wi-Fi',
        'Ethernet',
        'Bluetooth'
      ],
      group: 'connectivity'
    },
    {
      name: 'mediaTypes',
      type: 'multiselect',
      label: 'Supported Media Types',
      required: true,
      options: [
        'Paper Labels',
        'Plastic Labels',
        'RFID Labels',
        'Continuous Tape',
        'Die-Cut Labels'
      ],
      group: 'specifications'
    }
  ]
};
