import {CategoryFormConfig} from './product-form.types';

export const lightningDockingStationsConfig: CategoryFormConfig = {
  id: 'lightning_docking_stations',
  name: 'Lightning Docking Stations',
  fields: [
    {
      name: 'compatibleDevices',
      type: 'checkbox-group',
      label: 'Compatible Apple Devices',
      required: true,
      options: [
        'iPhone 5/SE (1st gen)',
        'iPhone 6/6s/7/8',
        'iPhone 6 Plus/6s Plus/7 Plus/8 Plus',
        'iPhone X/XS/11 Pro',
        'iPhone XR/11',
        'iPhone XS Max/11 Pro Max',
        'iPhone 12/13/14/15 Series',
        'iPad (Lightning)',
        'iPod Touch',
        'Multiple Device Types'
      ],
      group: 'compatibility',
    },
    {
      name: 'audioOutput',
      type: 'checkbox-group',
      label: 'Audio Output',
      required: false,
      options: ['None', 'Built-in Speaker', '3.5mm Jack', 'Bluetooth', 'Multiple'],
      group: 'features',
    },
    {
      name: 'additionalPorts',
      type: 'checkbox-group',
      label: 'Additional Ports',
      required: false,
      options: ['None', 'USB-A', 'USB-C', 'HDMI', 'Multiple'],
      group: 'specifications',
    },
    {
      name: 'chargingCapabilities',
      type: 'select',
      label: 'Charging Capabilities',
      required: true,
      options: ['Device Only', 'Device + Additional Devices', 'Fast Charging Support'],
      group: 'features',
    },
    {
      name: 'mfiCertified',
      type: 'radio',
      label: 'MFi Certified',
      required: true,
      options: ['Yes', 'No'],
      group: 'certification',
    },
    {
      name: 'caseFriendly',
      type: 'radio',
      label: 'Works with Cases',
      required: false,
      options: ['Yes', 'No', 'Most Cases'],
      group: 'features',
    },
    {
      name: 'adjustableConnector',
      type: 'radio',
      label: 'Adjustable Connector',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'originalApple',
      type: 'radio',
      label: 'Original Apple Product',
      required: false,
      options: ['Yes', 'No'],
      group: 'additional',
    },
    {
      name: 'standType',
      type: 'select',
      label: 'Stand Type',
      required: false,
      options: ['Upright', 'Angled', 'Adjustable', 'Weighted Base', 'Foldable'],
      group: 'physical',
    },
    {
      name: 'material',
      type: 'select',
      label: 'Primary Material',
      required: false,
      options: ['Plastic', 'Aluminum', 'Wood', 'Silicone', 'Multiple Materials'],
      group: 'physical',
    },
    {
      name: 'powerSource',
      type: 'select',
      label: 'Power Source',
      required: false,
      options: ['AC Adapter', 'USB Powered', 'Battery', 'Multiple'],
      group: 'specifications',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['White', 'Black', 'Silver', 'Gold', 'Rose Gold', 'Other'],
      group: 'physical',
    },
    {
      name: 'warranty',
      type: 'select',
      label: 'Warranty',
      required: false,
      options: ['1 Year', '2 Years', '3 Years', '5 Years', 'Lifetime'],
      group: 'additional',
    }
  ],
};
