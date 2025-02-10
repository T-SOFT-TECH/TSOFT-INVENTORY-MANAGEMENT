import {CategoryFormConfig} from './product-form.types';

export const smartSpeakersConfig: CategoryFormConfig = {
  id: 'smart-speakers',
  name: 'Smart Speakers',
  fields: [
    {
      name: 'speakerType',
      type: 'select',
      label: 'Speaker Type',
      required: true,
      options: [
        'Smart Assistant Speaker',
        'Smart Sound Bar',
        'Multi-Room Speaker',
        'Portable Smart Speaker'
      ],
      group: 'specifications'
    },
    {
      name: 'audioChannels',
      type: 'select',
      label: 'Audio Channels',
      required: true,
      options: [
        'Mono',
        'Stereo',
        '2.1',
        '5.1',
        '7.1'
      ],
      group: 'specifications'
    },
    {
      name: 'voiceAssistants',
      type: 'multiselect',
      label: 'Voice Assistants',
      required: true,
      options: [
        'Amazon Alexa',
        'Google Assistant',
        'Siri',
        'Bixby'
      ],
      group: 'features'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'Wi-Fi',
        'Bluetooth',
        'AirPlay',
        'Chromecast',
        'Ethernet'
      ],
      group: 'specifications'
    },
    {
      name: 'audioFeatures',
      type: 'multiselect',
      label: 'Audio Features',
      options: [
        'Room Calibration',
        'Multi-Room Audio',
        'Voice Enhancement',
        'Bass Boost',
        'EQ Control'
      ],
      group: 'features'
    },
    {
      name: 'smartFeatures',
      type: 'multiselect',
      label: 'Smart Features',
      options: [
        'Smart Home Control',
        'Intercom',
        'Voice Calling',
        'Broadcasting',
        'Routines'
      ],
      group: 'features'
    }
  ]
};
