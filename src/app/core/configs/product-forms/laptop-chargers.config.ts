import {CategoryFormConfig} from './product-form.types';

export const laptopChargersConfig: CategoryFormConfig = {
  id: 'laptop_chargers',
  name: 'Laptop Chargers',
  fields: [
    {
      name: 'chargerType',
      type: 'select',
      label: 'Charger Type',
      required: true,
      options: [
        'Universal/Multi-tip',
        'Brand-specific',
        'USB-C PD (Power Delivery)',
        'Car/Travel',
        'Wireless'
      ],
      group: 'specifications'
    },
    {
      name: 'compatibility',
      type: 'checkbox-group',
      label: 'Compatible Brands',
      required: true,
      options: [
        'Dell',
        'HP',
        'Lenovo',
        'Apple',
        'Asus',
        'Acer',
        'Microsoft Surface',
        'Toshiba',
        'Samsung',
        'MSI',
        'Razer',
        'Other (See Description)'
      ],
      group: 'compatibility'
    },
    {
      name: 'connectorType',
      type: 'select',
      label: 'Connector Type',
      required: true,
      options: [
        'Barrel Connector',
        'USB-C',
        'MagSafe',
        'MagSafe 2',
        'Surface Connect',
        'Dell 7.4mm',
        'Dell 4.5mm',
        'Lenovo Square Tip',
        'Lenovo USB-C',
        'HP Blue/Yellow Tip',
        'Multi-tip',
        'Other (See Description)'
      ],
      group: 'specifications'
    },
    {
      name: 'wattage',
      type: 'number',
      label: 'Power Output',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'voltageOutput',
      type: 'number',
      label: 'Output Voltage',
      required: true,
      unit: 'V',
      group: 'specifications'
    },
    {
      name: 'currentOutput',
      type: 'number',
      label: 'Output Current',
      required: true,
      unit: 'A',
      group: 'specifications'
    },
    {
      name: 'inputVoltage',
      type: 'checkbox-group',
      label: 'Input Voltage',
      required: true,
      options: [
        '100-240V (Universal)',
        '100-127V',
        '220-240V',
        '12V (Car)'
      ],
      group: 'specifications'
    },
    {
      name: 'pdSupport',
      type: 'checkbox',
      label: 'USB Power Delivery Support',
      required: false,
      group: 'features'
    },
    {
      name: 'pdWattage',
      type: 'checkbox-group',
      label: 'PD Power Profiles',
      required: false,
      options: [
        '20W',
        '27W',
        '45W',
        '60W',
        '65W',
        '87W',
        '96W',
        '100W',
        '140W'
      ],
      group: 'features',
      helpText: 'For USB-C PD chargers only'
    },
    {
      name: 'additionalPorts',
      type: 'checkbox-group',
      label: 'Additional Charging Ports',
      required: false,
      options: [
        'USB-A',
        'USB-C',
        'Wireless Charging Pad'
      ],
      group: 'features'
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
      name: 'cableDetachable',
      type: 'checkbox',
      label: 'Detachable Cable',
      required: false,
      group: 'features'
    },
    {
      name: 'ganinTechnology',
      type: 'checkbox',
      label: 'GaN Technology',
      required: false,
      group: 'features',
      helpText: 'Gallium Nitride technology for smaller, more efficient chargers'
    },
    {
      name: 'smartFeatures',
      type: 'checkbox-group',
      label: 'Smart Features',
      required: false,
      options: [
        'Auto-Voltage Detection',
        'Short Circuit Protection',
        'Overheat Protection',
        'Surge Protection',
        'LED Indicators'
      ],
      group: 'features'
    },
    {
      name: 'compactDesign',
      type: 'checkbox',
      label: 'Compact/Travel Design',
      required: false,
      group: 'physical'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: false,
      placeholder: 'e.g., 100 × 60 × 30 mm',
      group: 'physical'
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
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: [
        'Black',
        'White',
        'Gray',
        'Silver',
        'Other'
      ],
      group: 'physical'
    },
    {
      name: 'certifications',
      type: 'checkbox-group',
      label: 'Safety Certifications',
      required: false,
      options: [
        'CE',
        'UL',
        'FCC',
        'RoHS',
        'Energy Star'
      ],
      group: 'compliance'
    },
    {
      name: 'warranty',
      type: 'select',
      label: 'Warranty',
      required: false,
      options: [
        '6 Months',
        '1 Year',
        '2 Years',
        '3 Years',
        'Lifetime'
      ],
      group: 'additional'
    }
  ]
};
