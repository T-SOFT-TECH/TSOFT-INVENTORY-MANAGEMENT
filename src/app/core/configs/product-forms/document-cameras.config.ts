import {CategoryFormConfig} from './product-form.types';

export const documentCamerasConfig: CategoryFormConfig = {
  id: 'document_cameras',
  name: 'Document Cameras',
  fields: [
    {
      name: 'resolution',
      type: 'select',
      label: 'Camera Resolution',
      required: true,
      options: [
        'HD (1280x720)',
        'Full HD (1920x1080)',
        '4K UHD (3840x2160)',
        '8K UHD (7680x4320)'
      ],
      group: 'camera'
    },
    {
      name: 'sensorType',
      type: 'select',
      label: 'Sensor Type',
      required: true,
      options: [
        'CMOS',
        'CCD'
      ],
      group: 'camera'
    },
    {
      name: 'zoom',
      type: 'multiselect',
      label: 'Zoom Capabilities',
      required: true,
      options: [
        'Digital Zoom',
        'Optical Zoom',
        'AutoFocus'
      ],
      group: 'camera'
    },
    {
      name: 'frameRate',
      type: 'number',
      label: 'Frame Rate',
      required: true,
      unit: 'fps',
      group: 'camera'
    },
    {
      name: 'shootingArea',
      type: 'text',
      label: 'Maximum Shooting Area',
      required: true,
      placeholder: 'e.g., 11.7" x 16.5"',
      group: 'specifications'
    },
    {
      name: 'connectivityOptions',
      type: 'multiselect',
      label: 'Connectivity Options',
      required: true,
      options: [
        'USB',
        'HDMI',
        'VGA',
        'Wi-Fi',
        'LAN'
      ],
      group: 'connectivity'
    },
    {
      name: 'lightingSystem',
      type: 'multiselect',
      label: 'Lighting System',
      required: true,
      options: [
        'LED Side Lights',
        'LED Top Light',
        'Adjustable Brightness',
        'Anti-glare'
      ],
      group: 'features'
    },
    {
      name: 'imagingFeatures',
      type: 'multiselect',
      label: 'Imaging Features',
      required: true,
      options: [
        'Image Rotation',
        'Image Freeze',
        'Split Screen',
        'Picture-in-Picture',
        'Image Recording'
      ],
      group: 'features'
    },
    {
      name: 'software',
      type: 'multiselect',
      label: 'Software Features',
      required: true,
      options: [
        'Image Capture',
        'Video Recording',
        'Time-lapse',
        'OCR Support',
        'Live Streaming',
        'Annotation Tools'
      ],
      group: 'software'
    },
    {
      name: 'headPosition',
      type: 'select',
      label: 'Head Position',
      required: true,
      options: [
        'Gooseneck',
        'Fixed',
        'Adjustable Arm',
        'Rotatable'
      ],
      group: 'design'
    },
    {
      name: 'microphoneSystem',
      type: 'select',
      label: 'Microphone System',
      options: [
        'Built-in Microphone',
        'External Microphone Support',
        'None'
      ],
      group: 'audio'
    },
    {
      name: 'portability',
      type: 'select',
      label: 'Portability',
      required: true,
      options: [
        'Foldable',
        'Fixed',
        'Portable'
      ],
      group: 'design'
    },
    {
      name: 'powerSource',
      type: 'select',
      label: 'Power Source',
      required: true,
      options: [
        'USB Powered',
        'AC Adapter',
        'Battery'
      ],
      group: 'power'
    }
  ]
};
