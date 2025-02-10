import { CategoryFormConfig } from './product-form.types';

export const workstationsConfig: CategoryFormConfig = {
  id: 'workstations',
  name: 'Workstations',
  fields: [
    {
      name: 'processorModel',
      type: 'text',
      label: 'Processor Model',
      required: true,
      group: 'performance'
    },
    {
      name: 'processorCores',
      type: 'number',
      label: 'CPU Cores',
      required: true,
      min: 4,
      max: 128,
      group: 'performance'
    },
    {
      name: 'professionalGpu',
      type: 'text',
      label: 'Professional Graphics',
      required: true,
      group: 'performance'
    },
    {
      name: 'gpuMemory',
      type: 'number',
      label: 'GPU Memory',
      required: true,
      unit: 'GB',
      min: 4,
      max: 48,
      group: 'performance'
    },
    {
      name: 'eccMemorySize',
      type: 'number',
      label: 'ECC Memory Size',
      required: true,
      unit: 'GB',
      min: 8,
      max: 1024,
      group: 'performance'
    },
    {
      name: 'memoryType',
      type: 'select',
      label: 'Memory Type',
      required: true,
      options: [
        'ECC DDR4',
        'ECC DDR5',
        'Registered ECC'
      ],
      group: 'performance'
    },
    {
      name: 'primaryStorage',
      type: 'select',
      label: 'Primary Storage Type',
      required: true,
      options: [
        'NVMe SSD',
        'SATA SSD',
        'SAS HDD'
      ],
      group: 'storage'
    },
    {
      name: 'primaryStorageCapacity',
      type: 'number',
      label: 'Primary Storage Capacity',
      required: true,
      unit: 'GB',
      min: 256,
      group: 'storage'
    },
    {
      name: 'raidSupport',
      type: 'multiselect',
      label: 'RAID Support',
      options: [
        'RAID 0',
        'RAID 1',
        'RAID 5',
        'RAID 10'
      ],
      group: 'storage'
    },
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: [
        'Tower',
        'Rack Mount',
        'Small Form Factor'
      ],
      group: 'physical'
    },
    {
      name: 'powerSupply',
      type: 'number',
      label: 'Power Supply',
      required: true,
      unit: 'W',
      min: 650,
      max: 1800,
      group: 'power'
    },
    {
      name: 'redundantPower',
      type: 'checkbox',
      label: 'Redundant Power Supply',
      group: 'power'
    },
    {
      name: 'certifications',
      type: 'multiselect',
      label: 'Professional Certifications',
      options: [
        'AutoCAD',
        'SolidWorks',
        'Adobe',
        'DaVinci Resolve'
      ],
      group: 'certifications'
    },
    {
      name: 'operatingSystem',
      type: 'select',
      label: 'Operating System',
      required: true,
      options: [
        'Windows 10 Pro',
        'Windows 11 Pro',
        'Linux',
        'No OS'
      ],
      group: 'software'
    },
    {
      name: 'networkingFeatures',
      type: 'multiselect',
      label: 'Networking',
      required: true,
      options: [
        '10G LAN',
        'Dual LAN',
        'WiFi 6E',
        'Bluetooth 5.2'
      ],
      group: 'connectivity'
    },
    {
      name: 'securityFeatures',
      type: 'multiselect',
      label: 'Security Features',
      options: [
        'TPM 2.0',
        'Secure Boot',
        'Hardware Encryption',
        'Chassis Intrusion Detection'
      ],
      group: 'security'
    },
    {
      name: 'remoteManagement',
      type: 'multiselect',
      label: 'Remote Management',
      options: [
        'IPMI',
        'iDRAC',
        'iLO',
        'Remote Wake'
      ],
      group: 'management'
    },
    {
      name: 'warranty',
      type: 'select',
      label: 'Warranty Type',
      required: true,
      options: [
        'Standard',
        'ProSupport',
        '24/7 Support',
        'Onsite Support'
      ],
      group: 'support'
    }
  ]
};
