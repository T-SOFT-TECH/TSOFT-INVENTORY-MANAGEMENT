
import { CategoryFormConfig, commonFields } from './product-form.types';

export const storageDevicesConfig: CategoryFormConfig = {
  id: 'storage-devices',
  name: 'Storage Devices',
  fields: [
    ...commonFields,
    {
      name: 'storageType',
      type: 'select',
      label: 'Storage Type',
      required: true,
      options: ['SSD', 'HDD', 'Flash Drive', 'Memory Card'],
      group: 'specifications'
    },
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: ['2.5"', '3.5"', 'M.2', 'PCIe Card', 'USB', 'SD', 'microSD'],
      group: 'specifications'
    },
    {
      name: 'capacity',
      type: 'number',
      label: 'Capacity',
      required: true,
      unit: 'GB',
      min: 0,
      group: 'specifications'
    },
    {
      name: 'interface',
      type: 'select',
      label: 'Interface',
      required: true,
      options: ['SATA III', 'PCIe 3.0 x4', 'PCIe 4.0 x4', 'USB 3.0', 'USB 3.1', 'USB-C'],
      group: 'specifications'
    },
    {
      name: 'readSpeed',
      type: 'number',
      label: 'Read Speed',
      required: true,
      unit: 'MB/s',
      min: 0,
      group: 'specifications'
    },
    {
      name: 'writeSpeed',
      type: 'number',
      label: 'Write Speed',
      required: true,
      unit: 'MB/s',
      min: 0,
      group: 'specifications'
    },
    // Optional fields that appear based on storage type
    {
      name: 'rpm',
      type: 'select',
      label: 'RPM (for HDDs)',
      options: ['5400', '7200', '10000'],
      group: 'specifications'
    },
    {
      name: 'nandType',
      type: 'select',
      label: 'NAND Type (for SSDs)',
      options: ['TLC', 'QLC', 'MLC'],
      group: 'specifications'
    }
  ]
};
