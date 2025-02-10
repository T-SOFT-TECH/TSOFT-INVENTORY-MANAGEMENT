import { CategoryFormConfig } from './product-form.types';

export const webcamsConfig: CategoryFormConfig = {
  id: 'webcams',
  name: 'Webcams',
  fields: [
    {
      name: 'resolution',
      type: 'select',
      label: 'Video Resolution',
      required: true,
      options: [
        '720p (HD)',
        '1080p (Full HD)',
        '2K',
        '4K'
      ],
      group: 'specifications'
    },
    {
      name: 'frameRate',
      type: 'number',
      label: 'Maximum Frame Rate',
      required: true,
      unit: 'fps',
      group: 'specifications'
    },
    {
      name: 'sensorType',
      type: 'text',
      label: 'Image Sensor',
      required: true,
      group: 'specifications'
    },
    {
      name: 'focalLength',
      type: 'text',
      label: 'Focal Length',
      group: 'specifications'
    },
    {
      name: 'focusType',
      type: 'select',
      label: 'Focus Type',
      required: true,
      options: [
        'Fixed Focus',
        'Autofocus',
        'Manual Focus'
      ],
      group: 'features'
    },
    {
      name: 'fieldOfView',
      type: 'number',
      label: 'Field of View',
      required: true,
      unit: 'degrees',
      group: 'specifications'
    },
    {
      name: 'microphone',
      type: 'checkbox',
      label: 'Built-in Microphone',
      group: 'features'
    },
    {
      name: 'microphoneType',
      type: 'select',
      label: 'Microphone Type',
      options: [
        'Mono',
        'Stereo',
        'Dual Array',
        'Omnidirectional'
      ],
      group: 'audio'
    },
    {
      name: 'noiseReduction',
      type: 'checkbox',
      label: 'Noise Reduction',
      group: 'audio'
    },
    {
      name: 'connectivity',
      type: 'select',
      label: 'Connection Type',
      required: true,
      options: [
        'USB-A',
        'USB-C',
        'Wireless'
      ],
      group: 'connectivity'
    },
    {
      name: 'cableLength',
      type: 'number',
      label: 'Cable Length',
      unit: 'm',
      group: 'physical'
    },
    {
      name: 'mounting',
      type: 'multiselect',
      label: 'Mounting Options',
      options: [
        'Monitor Mount',
        'Tripod Mount',
        'Desktop Stand'
      ],
      group: 'features'
    },
    {
      name: 'privacyFeatures',
      type: 'multiselect',
      label: 'Privacy Features',
      options: [
        'Privacy Shutter',
        'LED Indicator',
        'Physical Cover'
      ],
      group: 'features'
    },
    {
      name: 'smartFeatures',
      type: 'multiselect',
      label: 'Smart Features',
      options: [
        'Face Tracking',
        'Auto Light Correction',
        'Background Replacement',
        'Motion Detection'
      ],
      group: 'features'
    },
    {
      name: 'operatingSystems',
      type: 'multiselect',
      label: 'Compatible Operating Systems',
      required: true,
      options: [
        'Windows 11',
        'Windows 10',
        'macOS',
        'Linux',
        'Chrome OS'
      ],
      group: 'compatibility'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: true,
      placeholder: '80x40x50mm',
      group: 'physical'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'g',
      group: 'physical'
    },
    {
      name: 'warranty',
      type: 'number',
      label: 'Warranty',
      required: true,
      unit: 'years',
      group: 'support'
    }
  ]
};
