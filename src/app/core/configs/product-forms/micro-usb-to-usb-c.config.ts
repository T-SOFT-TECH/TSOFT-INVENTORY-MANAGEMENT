import {CategoryFormConfig} from './product-form.types';

export const microUsbToUsbCConfig: CategoryFormConfig = {
  id: 'micro_usb_to_usb_c',
  name: 'Micro-USB to USB-C',
  fields: [
    {
      name: 'direction',
      type: 'select',
      label: 'Connection Direction',
      required: true,
      options: ['Micro-USB Female to USB-C Male', 'Micro-USB Male to USB-C Female'],
      group: 'specifications',
    },
    {
      name: 'length',
      type: 'number',
      label: 'Cable Length (if applicable)',
      required: false,
      unit: 'cm',
      group: 'specifications',
    },
    {
      name: 'adapterType',
      type: 'select',
      label: 'Adapter Type',
      required: false,
      options: ['Cable', 'Dongle/Adapter'],
      group: 'physical',
    },
    {
      name: 'usbVersion',
      type: 'select',
      label: 'USB Version',
      required: true,
      options: ['USB 2.0', 'USB 3.0', 'USB 3.1'],
      group: 'specifications',
    },
    {
      name: 'dataTransferRate',
      type: 'select',
      label: 'Data Transfer Rate',
      required: false,
      options: ['Up to 480 Mbps', 'Up to 5 Gbps', 'Up to 10 Gbps'],
      group: 'specifications',
    },
    {
      name: 'chargingSupport',
      type: 'radio',
      label: 'Charging Support',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'maxCurrent',
      type: 'select',
      label: 'Maximum Current',
      required: false,
      options: ['0.5A', '1A', '2A', '3A'],
      group: 'specifications',
    },
    {
      name: 'powerDelivery',
      type: 'radio',
      label: 'USB-C Power Delivery Support',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'compatibleDevices',
      type: 'select',
      label: 'Primary Compatible Devices',
      required: false,
      options: ['Android Phones/Tablets', 'Power Banks', 'Charging Accessories', 'All Applicable Devices'],
      group: 'compatibility',
    },
    {
      name: 'cableMaterial',
      type: 'select',
      label: 'Material',
      required: false,
      options: ['Standard Plastic', 'Premium Plastic', 'Metal Housing', 'Alloy'],
      group: 'physical',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['Black', 'White', 'Silver', 'Gold'],
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
