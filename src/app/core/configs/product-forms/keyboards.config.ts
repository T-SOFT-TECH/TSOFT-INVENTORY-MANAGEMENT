import { CategoryFormConfig } from './product-form.types';

export const keyboardsConfig: CategoryFormConfig = {
  id: 'keyboards',
  name: 'Keyboards',
  fields: [
    {
      name: 'keyboardType',
      type: 'select',
      label: 'Keyboard Type',
      required: true,
      options: [
        'Mechanical',
        'Membrane',
        'Optical',
        'Topre'
      ],
      group: 'basic'
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Keyboard Layout',
      required: true,
      options: [
        'Full Size (100%)',
        'TKL (80%)',
        '75%',
        '65%',
        '60%'
      ],
      group: 'specifications'
    },
    {
      name: 'switchType',
      type: 'select',
      label: 'Switch Type',
      required: true,
      options: [
        'Cherry MX Red',
        'Cherry MX Blue',
        'Cherry MX Brown',
        'Cherry MX Black',
        'Gateron Red',
        'Gateron Blue',
        'Gateron Brown',
        'Kailh Box',
        'Optical'
      ],
      group: 'specifications'
    },
    {
      name: 'hotSwappable',
      type: 'checkbox',
      label: 'Hot-Swappable Switches',
      group: 'features'
    },
    {
      name: 'connectivity',
      type: 'select',
      label: 'Connectivity',
      required: true,
      options: [
        'Wired USB',
        'Wireless 2.4GHz',
        'Bluetooth',
        'Multi-connection'
      ],
      group: 'connectivity'
    },
    {
      name: 'keycapMaterial',
      type: 'select',
      label: 'Keycap Material',
      required: true,
      options: [
        'PBT',
        'ABS',
        'Double-shot PBT',
        'Double-shot ABS'
      ],
      group: 'materials'
    },
    {
      name: 'backlighting',
      type: 'select',
      label: 'Backlighting',
      required: true,
      options: [
        'None',
        'Single Color',
        'RGB'
      ],
      group: 'lighting'
    },
    {
      name: 'rgbFeatures',
      type: 'multiselect',
      label: 'RGB Features',
      options: [
        'Per-key RGB',
        'Zone RGB',
        'RGB Underglow',
        'RGB Side Lighting'
      ],
      group: 'lighting'
    },
    {
      name: 'pollingRate',
      type: 'select',
      label: 'Polling Rate',
      options: [
        '125Hz',
        '250Hz',
        '500Hz',
        '1000Hz',
        '8000Hz'
      ],
      group: 'performance'
    },
    {
      name: 'antiGhosting',
      type: 'checkbox',
      label: 'Anti-Ghosting',
      group: 'features'
    },
    {
      name: 'nKeyRollover',
      type: 'checkbox',
      label: 'N-Key Rollover',
      group: 'features'
    },
    {
      name: 'mediaKeys',
      type: 'checkbox',
      label: 'Dedicated Media Keys',
      group: 'features'
    },
    {
      name: 'macroKeys',
      type: 'checkbox',
      label: 'Programmable Macro Keys',
      group: 'features'
    },
    {
      name: 'palmRest',
      type: 'checkbox',
      label: 'Included Palm Rest',
      group: 'features'
    },
    {
      name: 'passthrough',
      type: 'multiselect',
      label: 'Passthrough Ports',
      options: [
        'USB 2.0',
        'USB 3.0',
        'Audio'
      ],
      group: 'connectivity'
    },
    {
      name: 'onboardMemory',
      type: 'checkbox',
      label: 'Onboard Memory',
      group: 'features'
    },
    {
      name: 'operatingSystem',
      type: 'multiselect',
      label: 'Compatible Operating Systems',
      required: true,
      options: [
        'Windows',
        'macOS',
        'Linux'
      ],
      group: 'compatibility'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      unit: 'g',
      group: 'physical'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      placeholder: '440x140x40mm',
      group: 'physical'
    }
  ]
};
