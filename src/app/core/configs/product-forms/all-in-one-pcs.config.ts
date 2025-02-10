import { CategoryFormConfig } from './product-form.types';

export const allInOnePcsConfig: CategoryFormConfig = {
  id: 'all-in-one-pcs',
  name: 'All-in-One PCs',
  fields: [
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      min: 21,
      max: 34,
      group: 'display'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Display Resolution',
      required: true,
      options: [
        '1920x1080 (FHD)',
        '2560x1440 (QHD)',
        '3440x1440 (UWQHD)',
        '3840x2160 (4K)'
      ],
      group: 'display'
    },
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: true,
      options: [
        'IPS',
        'VA',
        'OLED',
        'Mini-LED'
      ],
      group: 'display'
    },
    {
      name: 'touchscreen',
      type: 'checkbox',
      label: 'Touchscreen Support',
      group: 'display'
    },
    {
      name: 'processorModel',
      type: 'text',
      label: 'Processor Model',
      required: true,
      group: 'performance'
    },
    {
      name: 'graphicsType',
      type: 'select',
      label: 'Graphics Type',
      required: true,
      options: [
        'Integrated Graphics',
        'Discrete Graphics'
      ],
      group: 'performance'
    },
    {
      name: 'graphicsModel',
      type: 'text',
      label: 'Graphics Model',
      required: true,
      group: 'performance'
    },
    {
      name: 'ramSize',
      type: 'number',
      label: 'RAM Size',
      required: true,
      unit: 'GB',
      min: 4,
      max: 128,
      group: 'performance'
    },
    {
      name: 'storageType',
      type: 'select',
      label: 'Storage Type',
      required: true,
      options: [
        'SSD',
        'HDD',
        'Hybrid (SSD + HDD)'
      ],
      group: 'storage'
    },
    {
      name: 'storageCapacity',
      type: 'number',
      label: 'Storage Capacity',
      required: true,
      unit: 'GB',
      min: 128,
      group: 'storage'
    },
    {
      name: 'webcam',
      type: 'select',
      label: 'Webcam Resolution',
      required: true,
      options: [
        'HD (720p)',
        'Full HD (1080p)',
        'Pop-up Camera',
        'No Webcam'
      ],
      group: 'multimedia'
    },
    {
      name: 'speakerSystem',
      type: 'text',
      label: 'Speaker System',
      required: true,
      group: 'multimedia'
    },
    {
      name: 'ports',
      type: 'multiselect',
      label: 'Available Ports',
      required: true,
      options: [
        'USB-C',
        'USB-A 3.0',
        'HDMI In',
        'HDMI Out',
        'DisplayPort',
        'Ethernet',
        'Audio Jack',
        'SD Card Reader'
      ],
      group: 'connectivity'
    },
    {
      name: 'wireless',
      type: 'multiselect',
      label: 'Wireless Connectivity',
      required: true,
      options: [
        'WiFi 6',
        'WiFi 6E',
        'Bluetooth 5.0',
        'Bluetooth 5.2'
      ],
      group: 'connectivity'
    },
    {
      name: 'peripheralsIncluded',
      type: 'multiselect',
      label: 'Included Peripherals',
      options: [
        'Wireless Keyboard',
        'Wireless Mouse',
        'Stylus Pen'
      ],
      group: 'accessories'
    },
    {
      name: 'standAdjustment',
      type: 'multiselect',
      label: 'Stand Adjustments',
      options: [
        'Height Adjustable',
        'Tilt',
        'Swivel',
        'VESA Mount Compatible'
      ],
      group: 'physical'
    },
    {
      name: 'operatingSystem',
      type: 'select',
      label: 'Operating System',
      required: true,
      options: [
        'Windows 11 Home',
        'Windows 11 Pro',
        'macOS',
        'No OS'
      ],
      group: 'software'
    },
    {
      name: 'securityFeatures',
      type: 'multiselect',
      label: 'Security Features',
      options: [
        'Webcam Privacy Cover',
        'TPM 2.0',
        'Fingerprint Reader',
        'IR Camera'
      ],
      group: 'security'
    }
  ]
};
