import {CategoryFormConfig} from './product-form.types';

export const hybridUsbHubsConfig: CategoryFormConfig = {
  id: 'hybrid_usb_a_usb_c_hubs',
  name: 'Hybrid USB-A & USB-C Hubs',
  fields: [
    {
      name: 'totalPorts',
      type: 'number',
      label: 'Total Number of Ports',
      required: true,
      group: 'specifications',
    },
    {
      name: 'usbCPorts',
      type: 'number',
      label: 'USB-C Ports',
      required: true,
      group: 'specifications',
    },
    {
      name: 'usbAPorts',
      type: 'number',
      label: 'USB-A Ports',
      required: true,
      group: 'specifications',
    },
    {
      name: 'connectionType',
      type: 'select',
      label: 'Host Connection Type',
      required: true,
      options: ['USB-C', 'USB-A', 'Both'],
      group: 'specifications',
    },
    {
      name: 'usbVersion',
      type: 'select',
      label: 'USB Version',
      required: true,
      options: ['USB 2.0', 'USB 3.0', 'USB 3.1', 'USB 3.2 Gen 1', 'USB 3.2 Gen 2'],
      group: 'specifications',
    },
    {
      name: 'dataTransferSpeed',
      type: 'select',
      label: 'Data Transfer Speed',
      required: false,
      options: ['Up to 480 Mbps', 'Up to 5 Gbps', 'Up to 10 Gbps', 'Up to 20 Gbps'],
      group: 'specifications',
    },
    {
      name: 'additionalPorts',
      type: 'checkbox-group',
      label: 'Additional Ports',
      required: false,
      options: ['None', 'HDMI', 'Ethernet', 'Card Reader', 'Audio', 'Multiple'],
      group: 'specifications',
    },
    {
      name: 'powerDelivery',
      type: 'radio',
      label: 'Power Delivery Passthrough',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'maxPowerDelivery',
      type: 'select',
      label: 'Maximum Power Delivery',
      required: false,
      options: ['Not Applicable', '30W', '45W', '60W', '87W', '100W'],
      group: 'specifications',
    },
    {
      name: 'powerSupply',
      type: 'select',
      label: 'Power Supply',
      required: false,
      options: ['Bus-Powered', 'Self-Powered', 'Both Options'],
      group: 'specifications',
    },
    {
      name: 'ledIndicators',
      type: 'radio',
      label: 'LED Indicators',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'portArrangement',
      type: 'select',
      label: 'Port Arrangement',
      required: false,
      options: ['In-line', 'Clustered', 'Both Sides', 'Stacked'],
      group: 'physical',
    },
    {
      name: 'cableLength',
      type: 'number',
      label: 'Cable Length',
      required: false,
      unit: 'cm',
      group: 'physical',
    },
    {
      name: 'compatibleSystems',
      type: 'checkbox-group',
      label: 'Compatible Operating Systems',
      required: false,
      options: ['Windows', 'macOS', 'Linux', 'Chrome OS', 'All Major OS'],
      group: 'compatibility',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['Black', 'White', 'Silver', 'Gray', 'Other'],
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
