import { CategoryFormConfig } from './product-form.types';

export const coolingSystemsConfig: CategoryFormConfig = {
  id: 'cooling_systems',
  name: 'Cooling Systems',
  fields: [
    {
      name: 'coolingType',
      type: 'select',
      label: 'Cooling Type',
      required: true,
      options: [
        'Air Cooler',
        'AIO Liquid Cooler',
        'Custom Loop Component',
        'Case Fan'
      ],
      group: 'basic'
    },
    {
      name: 'socketSupport',
      type: 'multiselect',
      label: 'CPU Socket Support',
      required: true,
      options: [
        'LGA 1700',
        'LGA 1200',
        'AM5',
        'AM4',
        'TR4'
      ],
      group: 'compatibility'
    },
    {
      name: 'fanSize',
      type: 'select',
      label: 'Fan Size',
      required: true,
      options: [
        '80mm',
        '92mm',
        '120mm',
        '140mm',
        '200mm'
      ],
      group: 'specifications'
    },
    {
      name: 'fanCount',
      type: 'number',
      label: 'Number of Fans',
      required: true,
      min: 1,
      group: 'specifications'
    },
    {
      name: 'fanSpeed',
      type: 'number',
      label: 'Fan Speed',
      required: true,
      unit: 'RPM',
      group: 'performance'
    },
    {
      name: 'fanSpeedRange',
      type: 'text',
      label: 'Fan Speed Range',
      placeholder: '800-2000 RPM',
      group: 'performance'
    },
    {
      name: 'airflow',
      type: 'number',
      label: 'Air Flow',
      unit: 'CFM',
      group: 'performance'
    },
    {
      name: 'staticPressure',
      type: 'number',
      label: 'Static Pressure',
      unit: 'mmH₂O',
      group: 'performance'
    },
    {
      name: 'noiseLevel',
      type: 'number',
      label: 'Noise Level',
      unit: 'dBA',
      group: 'performance'
    },
    {
      name: 'radiatorSize',
      type: 'select',
      label: 'Radiator Size',
      options: [
        '120mm',
        '240mm',
        '280mm',
        '360mm',
        '420mm'
      ],
      group: 'specifications'
    },
    {
      name: 'radiatorThickness',
      type: 'number',
      label: 'Radiator Thickness',
      unit: 'mm',
      group: 'specifications'
    },
    {
      name: 'tubingLength',
      type: 'number',
      label: 'Tubing Length',
      unit: 'mm',
      group: 'specifications'
    },
    {
      name: 'pumpSpeed',
      type: 'number',
      label: 'Pump Speed',
      unit: 'RPM',
      group: 'performance'
    },
    {
      name: 'tdp',
      type: 'number',
      label: 'TDP Support',
      required: true,
      unit: 'W',
      group: 'performance'
    },
    {
      name: 'height',
      type: 'number',
      label: 'Cooler Height',
      required: true,
      unit: 'mm',
      group: 'physical'
    },
    {
      name: 'pwmSupport',
      type: 'checkbox',
      label: 'PWM Support',
      group: 'features'
    },
    {
      name: 'bearingType',
      type: 'select',
      label: 'Bearing Type',
      options: [
        'Fluid Dynamic',
        'Ball Bearing',
        'Sleeve Bearing',
        'Magnetic Levitation'
      ],
      group: 'specifications'
    },
    {
      name: 'connector',
      type: 'select',
      label: 'Fan Connector',
      required: true,
      options: [
        '3-pin',
        '4-pin PWM',
        'RGB 3-pin 5V',
        'RGB 4-pin 12V'
      ],
      group: 'connectivity'
    },
    {
      name: 'rgbSupport',
      type: 'checkbox',
      label: 'RGB Support',
      group: 'features'
    },
    {
      name: 'rgbSoftware',
      type: 'multiselect',
      label: 'RGB Software Compatibility',
      options: [
        'Asus Aura Sync',
        'MSI Mystic Light',
        'Gigabyte RGB Fusion',
        'Corsair iCUE',
        'Razer Chroma'
      ],
      group: 'features'
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
