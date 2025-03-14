import { CategoryFormConfig } from './product-form.types';

export const miceConfig: CategoryFormConfig = {
  id: 'mouse',
  name: 'Mouse',
  fields: [
    {
      name: 'mouseType',
      type: 'select',
      label: 'Mouse Type',
      required: true,
      options: [
        'Gaming',
        'Office',
        'Ergonomic',
        'Travel'
      ],
      group: 'basic'
    },
    {
      name: 'sensorType',
      type: 'select',
      label: 'Sensor Type',
      required: true,
      options: [
        'Optical',
        'Laser',
        'HERO',
        'PAW3395'
      ],
      group: 'specifications'
    },
    {
      name: 'dpi',
      type: 'number',
      label: 'Maximum DPI',
      required: false,
      group: 'performance'
    },
    {
      name: 'dpiAdjustable',
      type: 'checkbox',
      label: 'Adjustable DPI',
      group: 'features'
    },
    {
      name: 'connectivity',
      type: 'select',
      label: 'Connectivity',
      required: true,
      options: [
        'Wired',
        'Wireless 2.4GHz',
        'Bluetooth',
        'Multi-connection'
      ],
      group: 'connectivity'
    },
    {
      name: 'pollingRate',
      type: 'select',
      label: 'Polling Rate',
      required: false,
      options: [
        '125Hz',
        '500Hz',
        '1000Hz',
        '4000Hz',
        '8000Hz'
      ],
      group: 'performance'
    },
    {
      name: 'buttons',
      type: 'number',
      label: 'Number of Buttons',
      required: false,
      min: 2,
      group: 'specifications'
    },
    {
      name: 'programmableButtons',
      type: 'checkbox',
      label: 'Programmable Buttons',
      group: 'features'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: false,
      unit: 'g',
      group: 'physical'
    },
    {
      name: 'adjustableWeight',
      type: 'checkbox',
      label: 'Adjustable Weight System',
      group: 'features'
    },
    {
      name: 'rgbLighting',
      type: 'checkbox',
      label: 'RGB Lighting',
      group: 'features'
    },
    {
      name: 'rgbZones',
      type: 'checkbox-group',
      label: 'RGB Zones',
      options: [
        'Logo',
        'Scroll Wheel',
        'Side Strips',
        'Bottom'
      ],
      group: 'lighting'
    },
    {
      name: 'gripStyle',
      type: 'select',
      label: 'Grip Style',
      required: true,
      options: [
        'Palm Grip',
        'Claw Grip',
        'Fingertip Grip',
        'Universal'
      ],
      group: 'ergonomics'
    },
    {
      name: 'handOrientation',
      type: 'select',
      label: 'Hand Orientation',
      required: true,
      options: [
        'Right-Handed',
        'Left-Handed',
        'Ambidextrous'
      ],
      group: 'ergonomics'
    },
    {
      name: 'onboardMemory',
      type: 'checkbox',
      label: 'Onboard Memory',
      group: 'features'
    },
    {
      name: 'onboardProfiles',
      type: 'number',
      label: 'Onboard Profiles',
      group: 'features'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      unit: 'hours',
      group: 'power'
    },
    {
      name: 'chargingType',
      type: 'select',
      label: 'Charging Type',
      options: [
        'USB-C',
        'Micro USB',
        'Wireless Charging',
        'AA/AAA Battery'
      ],
      group: 'power'
    },
    {
      name: 'cableType',
      type: 'select',
      label: 'Cable Type',
      options: [
        'Braided',
        'Rubber',
        'Paracord',
        'None'
      ],
      group: 'physical'
    },
    {
      name: 'cableLength',
      type: 'number',
      label: 'Cable Length',
      unit: 'm',
      group: 'physical'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions (LxWxH)',
      placeholder: '120x60x40mm',
      group: 'physical'
    }
  ]
};
