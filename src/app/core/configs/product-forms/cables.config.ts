import {CategoryFormConfig, commonFields} from './product-form.types';

export const cablesConfig: CategoryFormConfig = {
  id: 'cables-connectivity',
  name: 'Cables & Connectivity',
  fields: [
    ...commonFields,
    {
      name: 'cableType',
      type: 'select',
      label: 'Cable Type',
      required: true,
      options: [
        'USB-C to USB-C',
        'USB-C to USB-A',
        'Lightning to USB-C',
        'Lightning to USB-A',
        'HDMI',
        'DisplayPort',
        'Ethernet'
      ],
      group: 'specifications'
    },
    {
      name: 'length',
      type: 'number',
      label: 'Cable Length',
      required: true,
      unit: 'm',
      step: 0.1,
      min: 0.1,
      group: 'specifications'
    },
    {
      name: 'dataTransferSpeed',
      type: 'select',
      label: 'Data Transfer Speed',
      required: true,
      options: [
        'USB 2.0 (480 Mbps)',
        'USB 3.0 (5 Gbps)',
        'USB 3.1 (10 Gbps)',
        'USB 3.2 (20 Gbps)',
        'USB4 (40 Gbps)',
        'Thunderbolt 3',
        'Thunderbolt 4'
      ],
      group: 'specifications'
    },
    {
      name: 'powerDelivery',
      type: 'number',
      label: 'Power Delivery',
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Braided',
        'Right Angle Connector',
        'LED Indicator',
        'Quick Charge Support',
        'E-Marker Chip'
      ],
      group: 'features'
    },
    {
      name: 'certification',
      type: 'multiselect',
      label: 'Certifications',
      options: [
        'MFi Certified',
        'USB-IF Certified',
        'HDMI Certified',
        'DisplayPort Certified'
      ],
      group: 'specifications'
    }
  ]
};
