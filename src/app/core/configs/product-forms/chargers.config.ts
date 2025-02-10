import {CategoryFormConfig} from './product-form.types';

export const chargersConfig: CategoryFormConfig = {
  id: 'chargers-power-adapters',
  name: 'Chargers & Power Adapters',
  fields: [
    {
      name: 'chargerType',
      type: 'select',
      label: 'Charger Type',
      required: true,
      options: ['Wall Charger', 'Car Charger', 'Power Bank', 'Wireless Charger', 'Multi-Port Charger'],
      group: 'specifications'
    },
    {
      name: 'outputWattage',
      type: 'number',
      label: 'Output Power',
      required: true,
      unit: 'W',
      min: 0,
      group: 'specifications'
    },
    {
      name: 'inputVoltage',
      type: 'text',
      label: 'Input Voltage',
      required: true,
      placeholder: 'e.g., 100-240V',
      group: 'specifications'
    },
    {
      name: 'outputVoltage',
      type: 'text',
      label: 'Output Voltage',
      required: true,
      placeholder: 'e.g., 5V/9V/12V',
      group: 'specifications'
    },
    {
      name: 'compatibleDevices',
      type: 'multiselect',
      label: 'Compatible Devices',
      required: true,
      options: [
        'iPhone',
        'iPad',
        'MacBook',
        'Android Phones',
        'Tablets',
        'Laptops',
        'USB Devices'
      ],
      group: 'compatibility'
    },
    {
      name: 'connectorType',
      type: 'multiselect',
      label: 'Connector Type',
      required: true,
      options: [
        'USB-C',
        'Lightning',
        'Micro USB',
        'USB-A',
        '12VHPWR',
        'Laptop Connector'
      ],
      group: 'specifications'
    },
    {
      name: 'chargingProtocols',
      type: 'multiselect',
      label: 'Charging Protocols',
      options: [
        'USB Power Delivery (PD)',
        'Quick Charge',
        'GaN Technology',
        'VOOC',
        'SuperVOOC',
        'SuperDart',
        'SuperCharge'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Fast Charging',
        'GaN Technology',
        'Foldable Pins',
        'LED Indicator',
        'Over-voltage Protection',
        'Short-circuit Protection',
        'Temperature Control'
      ],
      group: 'features'
    },
    {
      name: 'cableIncluded',
      type: 'checkbox',
      label: 'Cable Included',
      group: 'specifications'
    },
    {
      name: 'cableLength',
      type: 'number',
      label: 'Cable Length',
      unit: 'm',
      step: 0.1,
      min: 0,
      group: 'specifications'
    },
    {
      name: 'portCount',
      type: 'number',
      label: 'Number of Ports',
      required: true,
      min: 1,
      group: 'specifications'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      placeholder: 'e.g., 65 x 45 x 30mm',
      group: 'specifications'
    }
  ]
};
