import {CategoryFormConfig} from './product-form.types';

export const watchProtectorsConfig: CategoryFormConfig = {
  id: 'watch_protectors',
  name: 'Watch Protectors',
  fields: [
    {
      name: 'protectorType',
      type: 'select',
      label: 'Protector Type',
      required: true,
      options: [
        'Screen Protector',
        'Case',
        'Full Body Cover',
        'Bumper'
      ],
      group: 'specifications'
    },
    {
      name: 'compatibleDevices',
      type: 'multiselect',
      label: 'Compatible Devices',
      required: true,
      options: [
        'Apple Watch',
        'Samsung Galaxy Watch',
        'Fitbit',
        'Garmin'
      ],
      group: 'compatibility'
    },
    {
      name: 'material',
      type: 'select',
      label: 'Material',
      required: true,
      options: [
        'Tempered Glass',
        'TPU',
        'Polycarbonate',
        'Liquid Screen Protector'
      ],
      group: 'specifications'
    },
    {
      name: 'protectionFeatures',
      type: 'multiselect',
      label: 'Protection Features',
      required: true,
      options: [
        'Scratch Resistant',
        'Shatterproof',
        'Impact Resistant',
        'Anti-Fingerprint',
        'Anti-Glare'
      ],
      group: 'features'
    },
    {
      name: 'thickness',
      type: 'number',
      label: 'Thickness',
      required: true,
      unit: 'mm',
      group: 'specifications'
    },
    {
      name: 'transparency',
      type: 'select',
      label: 'Transparency',
      required: true,
      options: [
        'Clear',
        'Matte',
        'Privacy',
        'Anti-Glare'
      ],
      group: 'features'
    },
    {
      name: 'installationType',
      type: 'select',
      label: 'Installation Type',
      required: true,
      options: [
        'Wet Application',
        'Dry Application',
        'Snap-On',
        'Adhesive'
      ],
      group: 'specifications'
    }
  ]
};
