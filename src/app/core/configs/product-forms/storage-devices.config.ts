
import { CategoryFormConfig } from './product-form.types';

export const storageDevicesConfig: CategoryFormConfig = {
  id: 'storage_devices',
  name: 'Storage Devices',
  fields: [
    {
      name: 'storageType',
      type: 'select',
      label: 'Storage Type',
      required: true,
      options: [
        'NVMe SSD',
        'SATA SSD',
        'HDD',
        'External SSD',
        'External HDD',
        'Memory Card',
        'Flash Drive'

      ],
      group: 'basic'
    },
    {
      name: 'capacity',
      type: 'number',
      label: 'Capacity',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: [
        'M.2 2280',
        'M.2 2260',
        'M.2 2242',
        '2.5-inch',
        '3.5-inch',
        'External'
      ],
      group: 'physical'
    },
    {
      name: 'interface',
      type: 'select',
      label: 'Interface',
      required: true,
      options: [
        'PCIe 4.0 x4',
        'PCIe 3.0 x4',
        'SATA III',
        'USB 3.2 Gen 2',
        'USB 3.2 Gen 1',
        'Thunderbolt'
      ],
      group: 'connectivity'
    },
    {
      name: 'readSpeed',
      type: 'number',
      label: 'Sequential Read Speed',
      required: true,
      unit: 'MB/s',
      group: 'performance'
    },
    {
      name: 'writeSpeed',
      type: 'number',
      label: 'Sequential Write Speed',
      required: true,
      unit: 'MB/s',
      group: 'performance'
    },
    {
      name: 'randomRead',
      type: 'number',
      label: 'Random Read (IOPS)',
      unit: 'K',
      group: 'performance'
    },
    {
      name: 'randomWrite',
      type: 'number',
      label: 'Random Write (IOPS)',
      unit: 'K',
      group: 'performance'
    },
    {
      name: 'nandType',
      type: 'select',
      label: 'NAND Type',
      options: [
        'TLC',
        'QLC',
        'MLC',
        'SLC'
      ],
      group: 'specifications'
    },
    {
      name: 'dramCache',
      type: 'checkbox',
      label: 'DRAM Cache',
      group: 'specifications'
    },
    {
      name: 'dramSize',
      type: 'number',
      label: 'DRAM Cache Size',
      unit: 'MB',
      group: 'specifications'
    },
    {
      name: 'tbw',
      type: 'number',
      label: 'Terabytes Written (TBW)',
      group: 'endurance'
    },
    {
      name: 'mtbf',
      type: 'number',
      label: 'MTBF',
      unit: 'hours',
      group: 'endurance'
    },
    {
      name: 'encryption',
      type: 'multiselect',
      label: 'Encryption Support',
      options: [
        'AES 256-bit',
        'TCG Opal',
        'eDrive'
      ],
      group: 'security'
    },
    {
      name: 'idlePowerConsumption',
      type: 'number',
      label: 'Idle Power Consumption',
      unit: 'W',
      group: 'power'
    },
    {
      name: 'activePowerConsumption',
      type: 'number',
      label: 'Active Power Consumption',
      unit: 'W',
      group: 'power'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'TRIM Support',
        'S.M.A.R.T.',
        'Garbage Collection',
        'DEVSLP',
        'Power Loss Protection'
      ],
      group: 'features'
    },
    {
      name: 'includedSoftware',
      type: 'multiselect',
      label: 'Included Software',
      options: [
        'Data Migration',
        'Drive Health Monitor',
        'Drive Toolbox'
      ],
      group: 'software'
    }
  ]
};
