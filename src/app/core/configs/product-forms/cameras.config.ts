import { CategoryFormConfig, commonFields } from './product-form.types';

export const camerasConfig: CategoryFormConfig = {
  id: 'camera-photo', // Matches the category name from initial-categories.ts
  name: 'Camera & Photo',
  fields: [
    ...commonFields,
    {
      name: 'cameraType',
      type: 'select',
      label: 'Camera Type',
      required: true,
      options: [
        'DSLR',
        'Mirrorless',
        'Point & Shoot',
        'Action Camera',
        'Security Camera',
        'Webcam',
        'Video Camera'
      ],
      group: 'specifications'
    },
    {
      name: 'sensorType',
      type: 'select',
      label: 'Sensor Type',
      required: true,
      options: [
        'Full Frame',
        'APS-C',
        'Micro Four Thirds',
        '1-inch',
        '1/2.3-inch'
      ],
      group: 'specifications'
    },
    {
      name: 'resolution',
      type: 'number',
      label: 'Resolution',
      required: true,
      unit: 'MP',
      group: 'specifications'
    },
    {
      name: 'videoResolution',
      type: 'multiselect',
      label: 'Video Resolution',
      required: true,
      options: [
        '720p',
        '1080p',
        '4K',
        '5.7K',
        '6K',
        '8K'
      ],
      group: 'specifications'
    },
    {
      name: 'lensMount',
      type: 'select',
      label: 'Lens Mount',
      required: false,
      options: [
        'Canon EF',
        'Canon RF',
        'Nikon F',
        'Nikon Z',
        'Sony E',
        'Micro Four Thirds',
        'Fixed Lens'
      ],
      group: 'specifications'
    },
    {
      name: 'focalLength',
      type: 'text',
      label: 'Focal Length',
      required: false,
      placeholder: 'e.g., 18-55mm',
      group: 'specifications'
    },
    {
      name: 'aperture',
      type: 'text',
      label: 'Maximum Aperture',
      required: false,
      placeholder: 'e.g., f/1.8',
      group: 'specifications'
    },
    {
      name: 'stabilization',
      type: 'multiselect',
      label: 'Stabilization',
      required: true,
      options: [
        'In-Body (IBIS)',
        'Lens-Based',
        'Digital',
        'None'
      ],
      group: 'specifications'
    },
    {
      name: 'displaySize',
      type: 'number',
      label: 'Display Size',
      required: true,
      unit: 'inches',
      group: 'specifications'
    },
    {
      name: 'touchscreen',
      type: 'checkbox',
      label: 'Touchscreen Display',
      required: false,
      group: 'specifications'
    },
    {
      name: 'viewfinder',
      type: 'select',
      label: 'Viewfinder Type',
      required: false,
      options: [
        'Electronic (EVF)',
        'Optical (OVF)',
        'None'
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
        'NFC',
        'USB-C',
        'Micro HDMI',
        'GPS'
      ],
      group: 'specifications'
    },
    {
      name: 'storageType',
      type: 'multiselect',
      label: 'Storage Type',
      required: true,
      options: [
        'SD',
        'SDHC',
        'SDXC',
        'CFexpress',
        'XQD',
        'Internal Storage'
      ],
      group: 'specifications'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life (CIPA)',
      required: true,
      unit: 'shots',
      group: 'specifications'
    },
    {
      name: 'weatherSealing',
      type: 'checkbox',
      label: 'Weather Sealed',
      required: false,
      group: 'specifications'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'g',
      group: 'specifications'
    }
  ]
}; 