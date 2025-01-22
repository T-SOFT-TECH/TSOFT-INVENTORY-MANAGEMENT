import { CategoryFormConfig, commonFields } from './product-form.types';

export const miceConfig: CategoryFormConfig = {
  id: 'mice',  // From initial-categories.ts: Input Devices > Mice
  name: 'Mice',
  fields: [
    ...commonFields,
    {
      name: 'sensorType',
      type: 'select',
      label: 'Sensor Type',
      required: true,
      options: ['Optical', 'Laser'],
      group: 'specifications'
    },
    {
      name: 'maxDpi',
      type: 'number',
      label: 'Maximum DPI',
      required: true,
      unit: 'DPI',
      group: 'specifications'
    },
    {
      name: 'pollingRate',
      type: 'select',
      label: 'Polling Rate',
      required: true,
      options: ['125Hz', '250Hz', '500Hz', '1000Hz', '4000Hz', '8000Hz'],
      group: 'specifications'
    },
    {
      name: 'buttons',
      type: 'number',
      label: 'Number of Buttons',
      required: true,
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'select',
      label: 'Connectivity',
      required: true,
      options: ['Wired', 'Wireless', 'Wireless with Wire Option'],
      group: 'specifications'
    },
    {
      name: 'gripType',
      type: 'select',
      label: 'Grip Type',
      required: true,
      options: ['Palm Grip', 'Claw Grip', 'Fingertip Grip', 'Universal'],
      group: 'specifications'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'g',
      group: 'specifications'
    },
    {
      name: 'adjustableWeight',
      type: 'checkbox',
      label: 'Adjustable Weight System',
      required: false,
      group: 'specifications'
    },
    {
      name: 'rgb',
      type: 'checkbox',
      label: 'RGB Lighting',
      required: false,
      group: 'specifications'
    },
    {
      name: 'programmableButtons',
      type: 'checkbox',
      label: 'Programmable Buttons',
      required: false,
      group: 'specifications'
    },
    {
      name: 'onboardMemory',
      type: 'checkbox',
      label: 'Onboard Memory',
      required: false,
      group: 'specifications'
    },
    {
      name: 'cableLength',
      type: 'number',
      label: 'Cable Length',
      required: false,
      unit: 'm',
      group: 'specifications'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: false,
      unit: 'hours',
      group: 'specifications'
    },
    {
      name: 'chargingType',
      type: 'select',
      label: 'Charging Type',
      required: false,
      options: ['USB-C', 'Micro USB', 'Wireless Charging', 'AA/AAA Batteries'],
      group: 'specifications'
    }
  ]
}; 