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
        'Flash Drive',
        'Optane Memory/Storage',
        'Hybrid Drive (SSHD)',
        'Enterprise SSD',
        'NAS Drive'
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
        'M.2 22110',
        '2.5-inch',
        '3.5-inch',
        'Add-in Card (AIC)',
        'U.2 2.5-inch',
        'SD Card',
        'microSD Card',
        'CompactFlash',
        'Flash Drive',
        'External Enclosure'
      ],
      group: 'physical'
    },
    {
      name: 'interface',
      type: 'select',
      label: 'Interface',
      required: false,
      options: [
        'PCIe 5.0 x4',
        'PCIe 4.0 x4',
        'PCIe 3.0 x4',
        'SATA III',
        'SATA II',
        'SAS 12Gb/s',
        'SAS 6Gb/s',
        'USB4 2.0',
        'USB4',
        'USB 3.2 Gen 2',
        'USB 3.2 Gen 1',
        'USB 3.1 Gen 2',
        'USB 3.1 Gen 1',
        'USB 3.0',
        'USB 2.0',
        'Thunderbolt',
        'UHS-I',
        'UHS-II'
      ],
      group: 'connectivity'
    },
    {
      name: 'connectorTypes',
      type: 'checkbox-group',
      label: 'Connector Types',
      options: [
        'USB Type-A',
        'USB Type-C',
        'Lightning',
        'Micro USB',
        'Thunderbolt',
        'SD Card Reader',
        'microSD Card Reader'
      ],
      helpText: 'Select all connector types available on this device',
      group: 'connectivity'
    },
    {
      name: 'multiInterfaceType',
      type: 'select',
      label: 'Multi-Interface Type',
      options: [
        'Single Interface',
        'Dual Interface',
        '3-in-1',
        '4-in-1',
        'OTG (On-The-Go)'
      ],
      helpText: 'For devices with multiple connector types',
      group: 'connectivity'
    },
    {
      name: 'flashDriveFeatures',
      type: 'checkbox-group',
      label: 'Flash Drive Features',
      options: [
        'Swivel Design',
        'Retractable',
        'Capless',
        'Fingerprint Scanner',
        'Hardware Encryption',
        'Password Protection',
        'Keyring Hole',
        'LED Indicator',
        'Rugged/Waterproof',
        'Metal Body'
      ],
      helpText: 'Special features of flash drives',
      group: 'features'
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
      name: 'rpmSpeed',
      type: 'select',
      label: 'RPM Speed',
      options: ['5400', '7200', '10000', '15000'],
      group: 'performance',
      helpText: 'Only applicable for HDDs'
    },
    {
      name: 'cacheSize',
      type: 'number',
      label: 'Cache Size',
      unit: 'MB',
      group: 'specifications',
      helpText: 'Only applicable for HDDs'
    },
    {
      name: 'recordingTechnology',
      type: 'select',
      label: 'Recording Technology',
      options: ['CMR (Conventional)', 'SMR (Shingled)'],
      group: 'specifications',
      helpText: 'Only applicable for HDDs'
    },
    {
      name: 'speedClass',
      type: 'select',
      label: 'Speed Class',
      options: ['Class 10', "Class 6", 'Class 4', 'Class 2', 'UHS-I', 'UHS-II', 'UHS-III', 'V30', 'V60', 'V90'],
      group: 'performance',
      helpText: 'Only applicable for memory cards'
    },
    {
      name: 'appPerformanceClass',
      type: 'select',
      label: 'App Performance Class',
      options: ['A1', 'A2'],
      group: 'performance',
      helpText: 'Only applicable for memory cards'
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
      group: 'specifications',
      helpText: 'Only applicable for SSDs'
    },
    {
      name: 'dramCache',
      type: 'checkbox',
      label: 'DRAM Cache',
      group: 'specifications',
      helpText: 'Only applicable for SSDs'
    },
    {
      name: 'dramSize',
      type: 'number',
      label: 'DRAM Cache Size',
      unit: 'MB',
      group: 'specifications',
      helpText: 'Only applicable for SSDs'
    },
    {
      name: 'tbw',
      type: 'number',
      label: 'Terabytes Written (TBW)',
      group: 'endurance',
      helpText: 'Only applicable for SSDs'
    },
    {
      name: 'mtbf',
      type: 'number',
      label: 'MTBF',
      unit: 'hours',
      group: 'endurance'
    },
    // Changed from multiselect to checkbox-group
    {
      name: 'encryption',
      type: 'checkbox-group',
      label: 'Encryption Support',
      options: [
        'AES 256-bit',
        'TCG Opal',
        'eDrive',
        'Hardware Encryption',
        'Password Protection'
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
    // Changed from multiselect to checkbox-group
    {
      name: 'features',
      type: 'checkbox-group',
      label: 'Features',
      options: [
        'TRIM Support',
        'S.M.A.R.T.',
        'Garbage Collection',
        'DEVSLP',
        'Power Loss Protection',
        'Shock Resistant',
        'Vibration Resistant',
        'Water Resistant',
        'Temperature Resistant'
      ],
      group: 'features'
    },
    // Changed from multiselect to checkbox-group
    {
      name: 'includedSoftware',
      type: 'checkbox-group',
      label: 'Included Software',
      options: [
        'Data Migration',
        'Drive Health Monitor',
        'Drive Toolbox',
        'Backup Software',
        'Encryption Software'
      ],
      group: 'software'
    }
  ]
};
