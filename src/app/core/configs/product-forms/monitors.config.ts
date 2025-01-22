import {CategoryFormConfig, commonFields} from './product-form.types';

export const monitorConfig: CategoryFormConfig = {
  id: 'monitors',
  name: 'Monitors',
  fields: [
    ...commonFields,
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: true,
      options: ['IPS', 'VA', 'TN', 'OLED', 'Mini-LED'],
      group: 'specifications'
    },
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      step: 0.1,
      group: 'specifications'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Resolution',
      required: true,
      options: ['1920x1080', '2560x1440', '3440x1440', '3840x2160'],
      group: 'specifications'
    },
    {
      name: 'refreshRate',
      type: 'number',
      label: 'Refresh Rate',
      required: true,
      unit: 'Hz',
      group: 'specifications'
    },
    {
      name: 'responseTime',
      type: 'number',
      label: 'Response Time',
      required: true,
      unit: 'ms',
      step: 0.1,
      group: 'specifications'
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      required: true,
      options: ['16:9', '21:9', '32:9', '16:10'],
      group: 'specifications'
    },
    {
      name: 'brightness',
      type: 'number',
      label: 'Brightness',
      required: true,
      unit: 'nits',
      group: 'specifications'
    },
    {
      name: 'hdrSupport',
      type: 'select',
      label: 'HDR Support',
      options: ['None', 'HDR400', 'HDR600', 'HDR1000'],
      group: 'specifications'
    }
  ]
};
