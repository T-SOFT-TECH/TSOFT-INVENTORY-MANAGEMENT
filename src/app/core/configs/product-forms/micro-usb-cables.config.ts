import {CategoryFormConfig} from './product-form.types';

export const microUSBCablesConfig: CategoryFormConfig = {
  id: 'micro_usb_cables',
  name: 'Micro-USB Cables',
  fields: [
    {
      name: 'length',
      type: 'number',
      label: 'Cable Length',
      required: true,
      unit: 'm',
      group: 'specifications',
    },
    {
      name: 'chargingSupport',
      type: 'checkbox',
      label: 'Supports Fast Charging',
      required: false,

      group: 'features',
    },
    {
      name: 'dataTransferSpeed',
      type: 'select',
      label: 'Data Transfer Speed',
      required: false,
      options: ['USB 1.1 (12 Mbps)', 'USB 2.0 (480 Mbps)', 'USB 3.0 (5 Gbps)', 'Charging Only (No Data)'],
      group: 'specifications',
    },
    {
      name: 'sourceConnector',
      type: 'select',
      label: 'Source Connector',
      required: true,
      options: ['USB-A', 'USB-C', 'Lightning', 'Micro USB'],
      group: 'specifications',
    },
    {
      name: 'cableMaterial',
      type: 'select',
      label: 'Cable Material',
      required: false,
      options: ['Standard PVC', 'Braided Nylon', 'TPE', 'Premium'],
      group: 'physical',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['Black', 'White', 'Red', 'Blue', 'Green', 'Gold'],
      group: 'physical',
    },
    {
      name: 'compatibleDevices',
      type: 'select',
      label: 'Primary Device Type',
      required: false,
      options: ['Smartphones', 'Tablets', 'Cameras', 'Portable Speakers', 'Gaming Controllers', 'Multiple Devices'],
      group: 'compatibility',
    },
    {
      name: 'connectorStyle',
      type: 'select',
      label: 'Connector Style',
      required: false,
      options: ['Straight', 'Right Angle', 'L-Shaped'],
      group: 'specifications',
    },
    {
      name: 'warranty',
      type: 'select',
      label: 'Warranty',
      required: false,
      options: ['1 Year', '2 Years', '5 Years', 'Lifetime'],
      group: 'additional',
    }
  ],
};
