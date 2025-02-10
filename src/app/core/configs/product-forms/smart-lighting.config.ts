import {CategoryFormConfig} from './product-form.types';

export const smartLightingConfig: CategoryFormConfig = {
  id: 'smart-lighting',
  name: 'Smart Lighting',
  fields: [
    {
      name: 'lightType',
      type: 'select',
      label: 'Light Type',
      required: true,
      options: [
        'Smart Bulb',
        'LED Strip',
        'Light Panel',
        'Smart Switch',
        'Ceiling Light',
        'Outdoor Light'
      ],
      group: 'specifications'
    },
    {
      name: 'bulbType',
      type: 'select',
      label: 'Bulb Type',
      required: false,
      options: [
        'A19',
        'BR30',
        'E26',
        'E12',
        'GU10',
        'Other'
      ],
      group: 'specifications'
    },
    {
      name: 'wattage',
      type: 'number',
      label: 'Wattage',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'brightness',
      type: 'number',
      label: 'Brightness',
      required: true,
      unit: 'lumens',
      group: 'specifications'
    },
    {
      name: 'colorType',
      type: 'select',
      label: 'Color Type',
      required: true,
      options: [
        'White',
        'Tunable White',
        'RGB',
        'RGBW',
        'RGBWW'
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
        'Zigbee',
        'Matter',
        'Thread'
      ],
      group: 'specifications'
    }
  ]
};
