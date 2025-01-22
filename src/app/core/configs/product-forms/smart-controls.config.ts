import { CategoryFormConfig, commonFields } from './product-form.types';

export const smartControlsConfig: CategoryFormConfig = {
  id: 'smart-controls',
  name: 'Smart Controls',
  fields: [
    ...commonFields,
    {
      name: 'deviceType',
      type: 'select',
      label: 'Device Type',
      required: true,
      options: [
        'Smart Thermostat',
        'Smart Switch',
        'Smart Plug',
        'Smart Button',
        'Smart Remote',
        'Smart Controller',
        'Smart Curtain Control'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'Wi-Fi',
        'Bluetooth',
        'Z-Wave',
        'Zigbee',
        'Matter',
        'Thread',
        'IR (Infrared)'
      ],
      group: 'specifications'
    },
    {
      name: 'powerSource',
      type: 'select',
      label: 'Power Source',
      required: true,
      options: [
        'Battery Powered',
        'Wired (AC)',
        'USB Powered',
        'Hardwired',
        'Solar'
      ],
      group: 'specifications'
    },
    {
      name: 'smartIntegration',
      type: 'multiselect',
      label: 'Smart Home Integration',
      required: true,
      options: [
        'Amazon Alexa',
        'Google Assistant',
        'Apple HomeKit',
        'Samsung SmartThings',
        'IFTTT'
      ],
      group: 'specifications'
    },
    {
      name: 'display',
      type: 'select',
      label: 'Display Type',
      required: false,
      options: [
        'LCD',
        'LED',
        'OLED',
        'E-ink',
        'No Display'
      ],
      group: 'specifications'
    },
    {
      name: 'sensors',
      type: 'multiselect',
      label: 'Built-in Sensors',
      required: false,
      options: [
        'Temperature',
        'Humidity',
        'Motion',
        'Light',
        'Occupancy',
        'Air Quality'
      ],
      group: 'specifications'
    },
    {
      name: 'automationFeatures',
      type: 'multiselect',
      label: 'Automation Features',
      required: false,
      options: [
        'Scheduling',
        'Geofencing',
        'Scene Control',
        'Energy Monitoring',
        'Learning Capability',
        'Voice Control'
      ],
      group: 'specifications'
    },
    {
      name: 'maxLoad',
      type: 'number',
      label: 'Maximum Load',
      required: false,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'voltage',
      type: 'select',
      label: 'Operating Voltage',
      required: false,
      options: [
        '110-120V',
        '220-240V',
        '12V DC',
        '24V DC',
        'Universal'
      ],
      group: 'specifications'
    },
    {
      name: 'batteryType',
      type: 'select',
      label: 'Battery Type',
      required: false,
      options: [
        'AA',
        'AAA',
        'CR2032',
        'Rechargeable Li-ion',
        'Not Applicable'
      ],
      group: 'specifications'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: false,
      unit: 'months',
      group: 'specifications'
    },
    {
      name: 'installation',
      type: 'select',
      label: 'Installation Type',
      required: true,
      options: [
        'DIY',
        'Professional Required',
        'Plug and Play'
      ],
      group: 'specifications'
    },
    {
      name: 'certifications',
      type: 'multiselect',
      label: 'Certifications',
      required: false,
      options: [
        'CE',
        'FCC',
        'UL Listed',
        'Energy Star',
        'RoHS'
      ],
      group: 'specifications'
    }
  ]
}; 