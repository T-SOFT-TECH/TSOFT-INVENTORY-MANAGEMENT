import {CategoryFormConfig} from './product-form.types';

export const smartBandsConfig: CategoryFormConfig = {
  id: 'smart_bands',
  name: 'Smart Bands',
  fields: [
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: true,
      options: [
        'AMOLED',
        'OLED',
        'LCD',
        'LED'
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
      name: 'sensors',
      type: 'multiselect',
      label: 'Sensors',
      required: true,
      options: [
        'Heart Rate',
        'Accelerometer',
        'SpO2',
        'Sleep Sensor',
        'Temperature',
        'Pedometer'
      ],
      group: 'features'
    },
    {
      name: 'waterResistance',
      type: 'select',
      label: 'Water Resistance',
      required: true,
      options: [
        'IP67',
        'IP68',
        '3ATM',
        '5ATM'
      ],
      group: 'specifications'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: true,
      unit: 'days',
      group: 'power'
    },
    {
      name: 'chargingTime',
      type: 'number',
      label: 'Charging Time',
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
        'NFC'
      ],
      group: 'connectivity'
    },
    {
      name: 'compatibility',
      type: 'multiselect',
      label: 'Compatible With',
      required: true,
      options: [
        'Android',
        'iOS'
      ],
      group: 'compatibility'
    },
    {
      name: 'bandMaterial',
      type: 'select',
      label: 'Band Material',
      required: true,
      options: [
        'Silicone',
        'TPU',
        'Nylon',
        'Metal'
      ],
      group: 'specifications'
    },
    {
      name: 'activityTracking',
      type: 'multiselect',
      label: 'Activity Tracking',
      required: true,
      options: [
        'Steps',
        'Distance',
        'Calories',
        'Sleep',
        'Heart Rate',
        'Sports Modes'
      ],
      group: 'features'
    }
  ]
};
