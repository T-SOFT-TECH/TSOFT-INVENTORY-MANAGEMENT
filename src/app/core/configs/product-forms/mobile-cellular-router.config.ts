import {CategoryFormConfig} from './product-form.types';

export const mobileCellularRoutersConfig: CategoryFormConfig = {
  id: 'mobile_cellular_routers',
  name: 'Mobile/Cellular Routers',
  fields: [
    {
      name: 'networkType',
      type: 'checkbox-group',
      label: 'Network Technologies',
      required: true,
      options: ['4G LTE', '5G', '3G', 'LTE-Advanced', 'LTE Cat 6', 'LTE Cat 4', 'LTE Cat 12'],
      group: 'connectivity'
    },
    {
      name: 'simType',
      type: 'select',
      label: 'SIM Card Type',
      required: true,
      options: ['Standard SIM', 'Micro SIM', 'Nano SIM', 'eSIM', 'Dual SIM'],
      group: 'specifications'
    },
    {
      name: 'maxDataSpeed',
      type: 'select',
      label: 'Maximum Download Speed',
      required: false,
      options: ['Up to 150 Mbps', 'Up to 300 Mbps', 'Up to 600 Mbps', 'Up to 1 Gbps', 'Up to 2 Gbps'],
      group: 'performance'
    },
    {
      name: 'wifiStandard',
      type: 'select',
      label: 'WiFi Standard',
      required: true,
      options: ['WiFi 4 (802.11n)', 'WiFi 5 (802.11ac)', 'WiFi 6 (802.11ax)', 'WiFi 6E'],
      group: 'connectivity'
    },
    {
      name: 'wifiBands',
      type: 'checkbox-group',
      label: 'WiFi Bands',
      required: true,
      options: ['2.4 GHz', '5 GHz'],
      group: 'connectivity'
    },
    {
      name: 'maxConnections',
      type: 'number',
      label: 'Maximum Connected Devices',
      required: false,
      group: 'performance'
    },
    {
      name: 'ethernetPorts',
      type: 'number',
      label: 'Ethernet Ports',
      required: false,
      group: 'connectivity'
    },
    {
      name: 'usbPorts',
      type: 'checkbox-group',
      label: 'USB Ports',
      required: false,
      options: ['USB-A', 'USB-C', 'Micro USB'],
      group: 'connectivity'
    },
    {
      name: 'batteryCapacity',
      type: 'number',
      label: 'Battery Capacity',
      required: false,
      unit: 'mAh',
      group: 'power'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      required: false,
      unit: 'hours',
      group: 'power'
    },
    {
      name: 'security',
      type: 'checkbox-group',
      label: 'Security Features',
      required: false,
      options: ['WPA2', 'WPA3', 'Guest Network', 'MAC Filtering', 'Firewall'],
      group: 'security'
    },
    {
      name: 'managementOptions',
      type: 'checkbox-group',
      label: 'Management Options',
      required: false,
      options: ['Mobile App', 'Web Interface', 'SMS Control', 'Touch Screen'],
      group: 'features'
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'Dimensions',
      required: false,
      placeholder: 'e.g., 100 × 60 × 15 mm',
      group: 'physical'
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Weight',
      required: false,
      unit: 'g',
      group: 'physical'
    },
    {
      name: 'externalAntennas',
      type: 'checkbox',
      label: 'External Antennas',
      required: false,
      group: 'physical'
    },
    {
      name: 'antennaConnectors',
      type: 'select',
      label: 'Antenna Connectors',
      required: false,
      options: ['None', 'TS-9', 'SMA', 'CRC9'],
      group: 'physical'
    },
    {
      name: 'carriers',
      type: 'checkbox-group',
      label: 'Compatible Carriers',
      required: false,
      options: ['All Carriers', 'Airtel', 'Jio', 'Vodafone', 'BSNL', 'Other (See Description)'],
      group: 'compatibility'
    },
    {
      name: 'bandSupport',
      type: 'text',
      label: 'Supported Frequency Bands',
      required: false,
      placeholder: 'e.g., B1, B3, B5, B8, B40, B41',
      group: 'specifications'
    }
  ]
};
