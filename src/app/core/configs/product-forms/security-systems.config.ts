import { CategoryFormConfig, commonFields } from './product-form.types';

export const securitySystemsConfig: CategoryFormConfig = {
  id: 'security-systems', // Matches the category name from initial-categories.ts
  name: 'Security Systems',
  fields: [
    ...commonFields,
    {
      name: 'deviceType',
      type: 'select',
      label: 'Device Type',
      required: true,
      options: [
        'Security Camera',
        'Video Doorbell',
        'Alarm System',
        'Motion Sensor',
        'Door/Window Sensor',
        'Smart Lock',
        'Security Hub',
        'NVR/DVR'
      ],
      group: 'specifications'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Video Resolution',
      required: false,
      options: [
        '720p',
        '1080p',
        '2K',
        '4K'
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
        'Ethernet',
        'Bluetooth',
        'Z-Wave',
        'Zigbee',
        'Cellular Backup'
      ],
      group: 'specifications'
    },
    {
      name: 'powerSource',
      type: 'select',
      label: 'Power Source',
      required: true,
      options: [
        'Wired (AC)',
        'Battery Powered',
        'Solar Powered',
        'PoE (Power over Ethernet)',
        'Hybrid'
      ],
      group: 'specifications'
    },
    {
      name: 'storageType',
      type: 'multiselect',
      label: 'Storage Options',
      required: true,
      options: [
        'Cloud Storage',
        'Local Storage (SD Card)',
        'NVR/DVR Storage',
        'Built-in Storage'
      ],
      group: 'specifications'
    },
    {
      name: 'nightVision',
      type: 'select',
      label: 'Night Vision',
      required: false,
      options: [
        'Standard IR',
        'Color Night Vision',
        'Starlight',
        'None'
      ],
      group: 'specifications'
    },
    {
      name: 'weatherResistance',
      type: 'select',
      label: 'Weather Resistance',
      required: false,
      options: [
        'Indoor Only',
        'Weather Resistant',
        'IP65',
        'IP66',
        'IP67'
      ],
      group: 'specifications'
    },
    {
      name: 'smartIntegration',
      type: 'multiselect',
      label: 'Smart Home Integration',
      required: false,
      options: [
        'Amazon Alexa',
        'Google Assistant',
        'Apple HomeKit',
        'IFTTT',
        'Samsung SmartThings'
      ],
      group: 'specifications'
    },
    {
      name: 'fieldOfView',
      type: 'number',
      label: 'Field of View',
      required: false,
      unit: 'degrees',
      group: 'specifications'
    },
    {
      name: 'motionDetection',
      type: 'checkbox',
      label: 'Motion Detection',
      required: false,
      group: 'specifications'
    },
    {
      name: 'audioFeatures',
      type: 'multiselect',
      label: 'Audio Features',
      required: false,
      options: [
        'Two-way Audio',
        'Noise Cancellation',
        'Siren',
        'Audio Recording'
      ],
      group: 'specifications'
    },
    {
      name: 'aiFeatures',
      type: 'multiselect',
      label: 'AI Features',
      required: false,
      options: [
        'Person Detection',
        'Face Recognition',
        'Vehicle Detection',
        'Package Detection',
        'Pet Detection'
      ],
      group: 'specifications'
    },
    {
      name: 'subscriptionRequired',
      type: 'checkbox',
      label: 'Subscription Required',
      required: true,
      group: 'specifications'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: false,
      unit: 'months',
      group: 'specifications'
    },
    {
      name: 'operatingTemperature',
      type: 'text',
      label: 'Operating Temperature Range',
      required: false,
      placeholder: 'e.g., -20°C to 50°C',
      group: 'specifications'
    }
  ]
}; 