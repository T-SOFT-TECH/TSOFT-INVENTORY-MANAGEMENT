import { CategoryFormConfig } from './product-form.types';

export const powerSuppliesConfig: CategoryFormConfig = {
  id: 'power_supplies',
  name: 'Power Supplies',
  fields: [
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
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: [
        'ATX',
        'SFX',
        'SFX-L',
        'TFX',
        'Flex ATX'
      ],
      group: 'physical'
    },
    {
      name: 'modularity',
      type: 'select',
      label: 'Modularity',
      required: true,
      options: [
        'Full Modular',
        'Semi-Modular',
        'Non-Modular'
      ],
      group: 'features'
    },
    {
      name: 'mainConnector',
      type: 'select',
      label: 'Main Power Connector',
      required: true,
      options: [
        '20+4 Pin',
        '24 Pin'
      ],
      group: 'connectivity'
    },
    {
      name: 'cpuConnectors',
      type: 'multiselect',
      label: 'CPU Power Connectors',
      required: true,
      options: [
        '4+4 Pin',
        '8 Pin',
        '8+4 Pin',
        '8+8 Pin'
      ],
      group: 'connectivity'
    },
    {
      name: 'pciePowerConnectors',
      type: 'multiselect',
      label: 'PCIe Power Connectors',
      required: true,
      options: [
        '6 Pin',
        '6+2 Pin',
        '12VHPWR',
        '16 Pin'
      ],
      group: 'connectivity'
    },
    {
      name: 'sataConnectors',
      type: 'number',
      label: 'SATA Connectors',
      required: true,
      min: 0,
      group: 'connectivity'
    },
    {
      name: 'molex4Pin',
      type: 'number',
      label: 'Molex 4-Pin Connectors',
      required: true,
      min: 0,
      group: 'connectivity'
    },
    {
      name: 'fanSize',
      type: 'number',
      label: 'Fan Size',
      required: true,
      unit: 'mm',
      group: 'cooling'
    },
    {
      name: 'fanBearing',
      type: 'select',
      label: 'Fan Bearing Type',
      options: [
        'Fluid Dynamic',
        'Ball Bearing',
        'Rifle Bearing',
        'Sleeve Bearing'
      ],
      group: 'cooling'
    },
    {
      name: 'fanControl',
      type: 'select',
      label: 'Fan Control',
      options: [
        'PWM',
        'Semi-Passive',
        'Always On'
      ],
      group: 'cooling'
    },
    {
      name: 'protectionFeatures',
      type: 'multiselect',
      label: 'Protection Features',
      required: true,
      options: [
        'OVP (Over Voltage)',
        'UVP (Under Voltage)',
        'OCP (Over Current)',
        'OPP (Over Power)',
        'SCP (Short Circuit)',
        'OTP (Over Temperature)'
      ],
      group: 'protection'
    },
    {
      name: 'dcOutput',
      type: 'number',
      label: 'DC Output (+12V)',
      required: true,
      unit: 'A',
      group: 'specifications'
    },
    {
      name: 'railDesign',
      type: 'select',
      label: '+12V Rail Design',
      required: true,
      options: [
        'Single Rail',
        'Multi Rail'
      ],
      group: 'specifications'
    },
    {
      name: 'certification',
      type: 'multiselect',
      label: 'Certifications',
      options: [
        'CE',
        'UL',
        'TUV',
        'FCC',
        'RoHS'
      ],
      group: 'certifications'
    },
    {
      name: 'warranty',
      type: 'number',
      label: 'Warranty',
      required: true,
      unit: 'years',
      group: 'support'
    },
    {
      name: 'depth',
      type: 'number',
      label: 'PSU Length',
      required: true,
      unit: 'mm',
      group: 'physical'
    }
  ]
};
