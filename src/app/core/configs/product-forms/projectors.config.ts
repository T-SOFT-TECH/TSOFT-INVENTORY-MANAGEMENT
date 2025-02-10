import {CategoryFormConfig} from './product-form.types';

export const projectorsConfig: CategoryFormConfig = {
  id: 'projectors',
  name: 'Projectors',
  fields: [
    {
      name: 'projectorType',
      type: 'select',
      label: 'Projector Type',
      required: true,
      options: [
        'DLP',
        'LCD',
        'LED',
        'Laser',
        'Short Throw',
        'Ultra Short Throw'
      ],
      group: 'specifications'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Native Resolution',
      required: true,
      options: [
        'SVGA (800x600)',
        'XGA (1024x768)',
        'WXGA (1280x800)',
        'Full HD (1920x1080)',
        '4K UHD (3840x2160)'
      ],
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
      name: 'contrastRatio',
      type: 'text',
      label: 'Contrast Ratio',
      required: true,
      placeholder: 'e.g., 20000:1',
      group: 'specifications'
    },
    {
      name: 'lampLife',
      type: 'number',
      label: 'Lamp Life',
      required: true,
      unit: 'hours',
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'HDMI',
        'VGA',
        'USB',
        'Wi-Fi',
        'Bluetooth',
        'Ethernet'
      ],
      group: 'connectivity'
    }
  ]
};
