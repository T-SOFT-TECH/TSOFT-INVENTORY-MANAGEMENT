import { CategoryFormConfig, commonFields } from './product-form.types';

export const smartSecurityConfig: CategoryFormConfig = {
  id: 'smart-security',
  name: 'Smart Security',
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
        'Smart Lock',
        'Motion Sensor',
        'Window/Door Sensor',
        'Security Hub',
        'Alarm System'
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
        '4K',
        'Not Applicable'
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
        'Z-Wave',
        'Zigbee',
        'Matter',
        'Thread'
      ],
      group: 'specifications'
    },
    {
      name: 'powerSource',
      type: 'select',
      label: 'Power Source',
      required: true,
      options: [
        'Battery Powered',
        'Wired (AC)',
        'Solar Powered',
        'PoE (Power over Ethernet)',
        'Hybrid'
      ],
      group: 'specifications'
    },
    {
      name: 'smartIntegration',
      type: 'multiselect',
      label: 'Smart Home Integration',
      required: true,
      options: [
        'Amazon Alexa',
        'Google Assistant',
        'Apple HomeKit',
        'Samsung SmartThings',
        'IFTTT'
      ],
      group: 'specifications'
    },
    {
      name: 'storageOptions',
      type: 'multiselect',
      label: 'Storage Options',
      required: true,
      options: [
        'Cloud Storage',
        'Local Storage (SD Card)',
        'Built-in Storage',
        'NVR/DVR Compatible',
        'Not Applicable'
      ],
      group: 'specifications'
    },
    {
      name: 'nightVision',
      type: 'select',
      label: 'Night Vision',
      required: false,
      options: [
        'Infrared',
        'Color Night Vision',
        'Starlight',
        'None',
        'Not Applicable'
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
        'IP65',
        'IP66',
        'IP67',
        'Not Applicable'
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
        'Package Detection',
        'Vehicle Detection',
        'Pet Detection',
        'Activity Zones'
      ],
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
        'Built-in Siren',
        'Voice Control',
        'Not Applicable'
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
      name: 'fieldOfView',
      type: 'number',
      label: 'Field of View',
      required: false,
      unit: 'degrees',
      group: 'specifications'
    }
  ]
}; 