import { CategoryFormConfig } from './product-form.types';

export const ultrabooksConfig: CategoryFormConfig = {
  id: 'ultrabooks',
  name: 'Ultrabooks',
  fields: [
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      min: 11,
      max: 17.3,
      step: 0.1,
      group: 'display'
    },
    {
      name: 'resolution',
      type: 'select',
      label: 'Display Resolution',
      required: true,
      options: [
        '1366x768 (HD)',
        '1920x1080 (FHD)',
        '2560x1440 (QHD)',
        '3840x2160 (4K)'
      ],
      group: 'display'
    },
    {
      name: 'displayType',
      type: 'select',
      label: 'Display Type',
      required: true,
      options: ['IPS', 'OLED', 'VA', 'TN'],
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
      name: 'ramSize',
      type: 'number',
      label: 'RAM Size',
      required: true,
      unit: 'GB',
      min: 4,
      max: 64,
      group: 'performance'
    },
    {
      name: 'storageType',
      type: 'select',
      label: 'Storage Type',
      required: true,
      options: ['SSD', 'NVMe SSD'],
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
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: true,
      unit: 'kg',
      step: 0.01,
      min: 0.8,
      max: 2,
      group: 'physical'
    },
    {
      name: 'thickness',
      type: 'number',
      label: 'Thickness',
      required: true,
      unit: 'mm',
      step: 0.1,
      min: 8,
      max: 20,
      group: 'physical'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: true,
      unit: 'hours',
      min: 1,
      max: 24,
      group: 'battery'
    },
    {
      name: 'ports',
      type: 'checkbox-group', // Changed from multiselect to checkbox-group
      label: 'Ports',
      required: true,
      options: [
        { label: 'USB-C', value: 'USB-C' },
        { label: 'USB-A 3.0', value: 'USB-A 3.0' },
        { label: 'HDMI', value: 'HDMI' },
        { label: 'DisplayPort', value: 'DisplayPort' },
        { label: 'Thunderbolt', value: 'Thunderbolt' },
        { label: 'Audio Jack', value: 'Audio Jack' },
        { label: 'SD Card Reader', value: 'SD Card Reader' }
      ],
      group: 'connectivity'
    },
    {
      name: 'features',
      type: 'checkbox-group', // Changed from multiselect to checkbox-group
      label: 'Features',
      options: [
        { label: 'Backlit Keyboard', value: 'Backlit Keyboard' },
        { label: 'Fingerprint Reader', value: 'Fingerprint Reader' },
        { label: 'Face Recognition', value: 'Face Recognition' },
        { label: 'Touch Screen', value: 'Touch Screen' },
        { label: 'Windows Hello', value: 'Windows Hello' }
      ],
      group: 'features'
    },
    {
      name: 'wifi',
      type: 'select',
      label: 'WiFi Standard',
      required: true,
      options: ['WiFi 5', 'WiFi 6', 'WiFi 6E'],
      group: 'connectivity'
    },
    {
      name: 'bluetooth',
      type: 'select',
      label: 'Bluetooth Version',
      required: true,
      options: ['4.0', '5.0', '5.1', '5.2', '5.3'],
      group: 'connectivity'
    }
  ]
};
