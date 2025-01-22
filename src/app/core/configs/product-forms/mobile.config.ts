import {CategoryFormConfig, commonFields} from './product-form.types';

export const mobileDeviceConfig: CategoryFormConfig = {
  id: 'mobile-devices',
  name: 'Mobile Devices',
  fields: [
    ...commonFields,
    {
      name: 'deviceType',
      type: 'select',
      label: 'Device Type',
      required: true,
      options: ['Smartphone', 'Tablet', 'Smartwatch'],
      group: 'specifications'
    },
    {
      name: 'operatingSystem',
      type: 'select',
      label: 'Operating System',
      required: true,
      options: ['Android', 'iOS'],
      group: 'specifications'
    },
    {
      name: 'screenSize',
      type: 'number',
      label: 'Screen Size',
      required: true,
      unit: 'inches',
      step: 0.1,
      group: 'specifications'
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
      name: 'ram',
      type: 'number',
      label: 'RAM',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'batteryCapacity',
      type: 'number',
      label: 'Battery Capacity',
      required: true,
      unit: 'mAh',
      group: 'specifications'
    },
    {
      name: 'camera',
      type: 'text',
      label: 'Camera Specifications',
      group: 'specifications'
    }
  ]
};
