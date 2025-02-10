import {CategoryFormConfig} from './product-form.types';

export const ethernetCablesConfig: CategoryFormConfig = {
  id: 'ethernet-cables',
  name: 'Ethernet Cables',
  fields: [
    {
      name: 'category',
      type: 'select',
      label: 'Cable Category',
      required: true,
      options: [
        'Cat 5e',
        'Cat 6',
        'Cat 6a',
        'Cat 7',
        'Cat 8'
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
      name: 'speed',
      type: 'select',
      label: 'Maximum Speed',
      required: true,
      options: [
        '1 Gbps',
        '10 Gbps',
        '25 Gbps',
        '40 Gbps'
      ],
      group: 'specifications'
    },
    {
      name: 'shielding',
      type: 'select',
      label: 'Shielding Type',
      required: true,
      options: [
        'UTP (Unshielded)',
        'STP (Shielded)',
        'FTP (Foiled)',
        'SFTP (Shielded Foiled)'
      ],
      group: 'specifications'
    }
  ]
};
