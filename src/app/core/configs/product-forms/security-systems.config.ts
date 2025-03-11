import {CategoryFormConfig} from './product-form.types';

export const securitySystemsConfig: CategoryFormConfig = {
  id: 'security_systems',
  name: 'Security Systems',
  fields: [
    {
      name: 'systemType',
      type: 'select',
      label: 'System Type',
      required: true,
      options: [
        'Video Surveillance',
        'Access Control',
        'Burglar Alarm',
        'Fire Detection',
        'Integrated Security System'
      ],
      group: 'specifications'
    },
    {
      name: 'monitoringType',
      type: 'select',
      label: 'Monitoring Type',
      required: true,
      options: [
        'Self-Monitored',
        'Professional Monitoring',
        'Hybrid Monitoring',
        'Cloud-Based Monitoring'
      ],
      group: 'specifications'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Camera Resolution',
      required: false,
      options: [
        '720p',
        '1080p',
        '2K',
        '4K',
        '8K'
      ],
      group: 'specifications'
    },
    {
      name: 'storageType',
      type: 'multiselect',
      label: 'Storage Options',
      required: true,
      options: [
        'Local Storage (HDD/SSD)',
        'NVR',
        'DVR',
        'Cloud Storage',
        'Edge Storage'
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
        'Z-Wave',
        'Zigbee',
        'RF'
      ],
      group: 'connectivity'
    },
    {
      name: 'sensors',
      type: 'multiselect',
      label: 'Included Sensors',
      options: [
        'Motion Sensors',
        'Door/Window Sensors',
        'Glass Break Sensors',
        'Smoke Detectors',
        'Carbon Monoxide Detectors',
        'Water Leak Sensors'
      ],
      group: 'specifications'
    },
    {
      name: 'accessControl',
      type: 'multiselect',
      label: 'Access Control Methods',
      options: [
        'Key Card',
        'Biometric',
        'PIN Code',
        'Mobile Access',
        'RFID',
        'Face Recognition'
      ],
      group: 'features'
    },
    {
      name: 'smartFeatures',
      type: 'multiselect',
      label: 'Smart Features',
      options: [
        'Mobile App Control',
        'AI Detection',
        'Two-way Audio',
        'Remote Arming/Disarming',
        'Automated Responses',
        'Geofencing'
      ],
      group: 'features'
    },
    {
      name: 'certification',
      type: 'multiselect',
      label: 'Security Certifications',
      options: [
        'UL Listed',
        'CE',
        'FCC',
        'IP Rating',
        'EN Grade',
        'NDAA Compliant'
      ],
      group: 'specifications'
    },
    {
      name: 'backupSystem',
      type: 'multiselect',
      label: 'Backup Systems',
      required: true,
      options: [
        'Battery Backup',
        'Cellular Backup',
        'Generator Backup',
        'Redundant Storage',
        'Failover System'
      ],
      group: 'specifications'
    }
  ]
};
