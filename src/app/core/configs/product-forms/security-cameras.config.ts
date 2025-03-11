import {CategoryFormConfig} from './product-form.types';

export const securityCamerasConfig: CategoryFormConfig = {
  id: 'security_cameras',
  name: 'Security Cameras',
  fields: [
    {
      name: 'cameraType',
      type: 'select',
      label: 'Camera Type',
      required: true,
      options: [
        'Indoor Camera',
        'Outdoor Camera',
        'Pan-Tilt-Zoom (PTZ)',
        'Doorbell Camera',
        'Floodlight Camera'
      ],
      group: 'specifications'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Video Resolution',
      required: true,
      options: [
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
        'Cellular',
        'PoE'
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
        'Solar',
        'Power over Ethernet'
      ],
      group: 'specifications'
    },
    {
      name: 'nightVision',
      type: 'select',
      label: 'Night Vision',
      required: true,
      options: [
        'Infrared',
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
      options: [
        'IP65',
        'IP66',
        'IP67',
        'None'
      ],
      group: 'specifications'
    },
    {
      name: 'storage',
      type: 'multiselect',
      label: 'Storage Options',
      required: true,
      options: [
        'Cloud Storage',
        'Local Storage (SD Card)',
        'NVR Compatible',
        'Built-in Storage'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Smart Features',
      options: [
        'Motion Detection',
        'Person Detection',
        'Face Recognition',
        'Package Detection',
        'Two-way Audio',
        'Siren',
        'Spotlight'
      ],
      group: 'features'
    }
  ]
};
