import {CategoryFormConfig} from './product-form.types';

export const smartwatchesConfig: CategoryFormConfig = {
  id: 'smartwatches',
  name: 'Smartwatches',
  fields: [
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: true,
      options: [
        'AMOLED',
        'Retina',
        'OLED',
        'LCD',
        'E-Paper'
      ],
      group: 'display'
    },
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      group: 'display'
    },
    {
      name: 'resolution',
      type: 'text',
      label: 'Resolution',
      required: true,
      placeholder: 'e.g., 448 x 368',
      group: 'display'
    },
    {
      name: 'caseSize',
      type: 'multiselect',
      label: 'Case Sizes',
      required: true,
      options: [
        '38mm',
        '40mm',
        '41mm',
        '42mm',
        '44mm',
        '45mm',
        '49mm'
      ],
      group: 'specifications'
    },
    {
      name: 'caseMaterial',
      type: 'select',
      label: 'Case Material',
      required: true,
      options: [
        'Aluminum',
        'Stainless Steel',
        'Titanium',
        'Ceramic',
        'Plastic'
      ],
      group: 'specifications'
    },
    {
      name: 'waterResistance',
      type: 'select',
      label: 'Water Resistance Rating',
      required: true,
      options: [
        '3ATM',
        '5ATM',
        'IP67',
        'IP68',
        'WR50',
        'WR100'
      ],
      group: 'specifications'
    },
    {
      name: 'sensors',
      type: 'multiselect',
      label: 'Sensors',
      required: true,
      options: [
        'Heart Rate',
        'ECG',
        'Blood Oxygen',
        'Accelerometer',
        'Gyroscope',
        'Compass',
        'Altimeter',
        'Temperature',
        'GPS'
      ],
      group: 'features'
    },
    {
      name: 'healthFeatures',
      type: 'multiselect',
      label: 'Health Features',
      required: true,
      options: [
        'Heart Rate Monitoring',
        'Sleep Tracking',
        'Stress Monitoring',
        'Activity Tracking',
        'Fall Detection',
        'Irregular Heart Rhythm',
        'Menstrual Tracking'
      ],
      group: 'features'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: true,
      unit: 'hours',
      group: 'power'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity',
      required: true,
      options: [
        'Bluetooth',
        'Wi-Fi',
        'Cellular',
        'NFC',
        'GPS'
      ],
      group: 'connectivity'
    },
    {
      name: 'compatibility',
      type: 'multiselect',
      label: 'OS Compatibility',
      required: true,
      options: [
        'iOS',
        'Android',
        'HarmonyOS'
      ],
      group: 'compatibility'
    },
    {
      name: 'paymentSupport',
      type: 'multiselect',
      label: 'Payment Support',
      options: [
        'Apple Pay',
        'Google Pay',
        'Samsung Pay',
        'Garmin Pay'
      ],
      group: 'features'
    },
    {
      name: 'storageCapacity',
      type: 'number',
      label: 'Storage Capacity',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'speakerMic',
      type: 'checkbox',
      label: 'Built-in Speaker and Microphone',
      group: 'features'
    }
  ]
};
