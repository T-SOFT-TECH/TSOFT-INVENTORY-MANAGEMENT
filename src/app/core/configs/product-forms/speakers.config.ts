import {CategoryFormConfig} from './product-form.types';

export const speakersConfig: CategoryFormConfig = {
  id: 'speakers',
  name: 'Speakers',
  fields: [
    {
      name: 'speakerType',
      type: 'select',
      label: 'Type',
      required: true,
      options: [
        'Bookshelf',
        'Floor Standing',
        'Soundbar',
        'Desktop',
        'Portable',
        'Smart Speaker',
        'Subwoofer'
      ],
      group: 'specifications'
    },
    {
      name: 'configuration',
      type: 'select',
      label: 'Channel Configuration',
      required: true,
      options: [
        '2.0',
        '2.1',
        '3.1',
        '5.1',
        '7.1'
      ],
      group: 'specifications'
    },
    {
      name: 'powerOutput',
      type: 'number',
      label: 'Power Output',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'frequency',
      type: 'text',
      label: 'Frequency Response',
      required: true,
      placeholder: 'e.g., 20Hz-20kHz',
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity Options',
      required: true,
      options: [
        'Bluetooth',
        'Wi-Fi',
        'Aux (3.5mm)',
        'RCA',
        'Optical',
        'HDMI',
        'USB'
      ],
      group: 'connectivity'
    },
    {
      name: 'wirelessFeatures',
      type: 'multiselect',
      label: 'Wireless Features',
      options: [
        'Multi-room Audio',
        'Voice Control',
        'AirPlay',
        'Chromecast',
        'Spotify Connect'
      ],
      group: 'features'
    },
    {
      name: 'mountingOptions',
      type: 'multiselect',
      label: 'Mounting Options',
      options: [
        'Desktop',
        'Wall Mount',
        'Floor Stand',
        'Ceiling Mount'
      ],
      group: 'specifications'
    }
  ]
};
