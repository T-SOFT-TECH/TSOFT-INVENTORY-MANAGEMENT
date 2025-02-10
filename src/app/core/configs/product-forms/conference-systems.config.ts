import {CategoryFormConfig} from './product-form.types';

export const conferenceSystemsConfig: CategoryFormConfig = {
  id: 'conference-systems',
  name: 'Conference Systems',
  fields: [
    {
      name: 'systemType',
      type: 'select',
      label: 'System Type',
      required: true,
      options: [
        'Video Conferencing System',
        'Audio Conference Phone',
        'Wireless Presentation System',
        'All-in-One Conference Solution',
        'PTZ Camera System'
      ],
      group: 'specifications'
    },
    {
      name: 'maxParticipants',
      type: 'number',
      label: 'Maximum Participants',
      required: true,
      group: 'specifications'
    },
    {
      name: 'videoQuality',
      type: 'select',
      label: 'Video Quality',
      required: true,
      options: [
        'HD (720p)',
        'Full HD (1080p)',
        '4K UHD',
        '8K'
      ],
      group: 'specifications'
    },
    {
      name: 'audioFeatures',
      type: 'multiselect',
      label: 'Audio Features',
      required: true,
      options: [
        'Noise Cancellation',
        'Echo Cancellation',
        'Beamforming Microphones',
        'Full Duplex Audio',
        'Voice Optimization'
      ],
      group: 'specifications'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity Options',
      required: true,
      options: [
        'Wi-Fi',
        'Ethernet',
        'Bluetooth',
        'USB',
        'HDMI',
        'DisplayPort'
      ],
      group: 'connectivity'
    },
    {
      name: 'compatibility',
      type: 'multiselect',
      label: 'Software Compatibility',
      required: true,
      options: [
        'Zoom',
        'Microsoft Teams',
        'Google Meet',
        'Webex',
        'GoToMeeting',
        'Skype for Business'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Additional Features',
      options: [
        'Screen Sharing',
        'Recording Capability',
        'Cloud Integration',
        'Remote Management',
        'Auto Framing',
        'Gesture Control'
      ],
      group: 'features'
    }
  ]
};
