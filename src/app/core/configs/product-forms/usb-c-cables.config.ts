import {CategoryFormConfig} from './product-form.types';

export const usbCCablesConfig: CategoryFormConfig = {
  id: 'usb_c_cables',
  name: 'USB-C Cables',
  fields: [
    {
      name: 'specification',
      type: 'select',
      label: 'USB Specification',
      required: true,
      options: [
        'USB 2.0',
        'USB 3.2 Gen 1',
        'USB 3.2 Gen 2',
        'USB4'
      ],
      group: 'specifications'
    },
    {
      name: 'length',
      type: 'number',
      label: 'Cable Length',
      required: true,
      unit: 'm',
      group: 'specifications'
    },
    {
      name: 'powerDelivery',
      type: 'number',
      label: 'Power Delivery',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'dataTransferSpeed',
      type: 'select',
      label: 'Data Transfer Speed',
      required: true,
      options: [
        '480 Mbps',
        '5 Gbps',
        '10 Gbps',
        '20 Gbps',
        '40 Gbps'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Thunderbolt Compatible',
        'DisplayPort Alt Mode',
        'E-Marker Chip',
        'Braided Cable'
      ],
      group: 'features'
    }
  ]
};
