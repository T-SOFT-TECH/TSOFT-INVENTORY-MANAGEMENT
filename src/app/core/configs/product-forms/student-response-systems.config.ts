import {CategoryFormConfig} from './product-form.types';

export const studentResponseSystemsConfig: CategoryFormConfig = {
  id: 'student_response_systems',
  name: 'Student Response Systems',
  fields: [
    {
      name: 'systemType',
      type: 'select',
      label: 'System Type',
      required: true,
      options: [
        'Hardware Clickers',
        'Software Based',
        'Hybrid System'
      ],
      group: 'specifications'
    },
    {
      name: 'responseTypes',
      type: 'multiselect',
      label: 'Response Types Supported',
      required: true,
      options: [
        'Multiple Choice',
        'True/False',
        'Numeric',
        'Text Entry',
        'Rating Scale',
        'Open Ended'
      ],
      group: 'features'
    },
    {
      name: 'connectivity',
      type: 'multiselect',
      label: 'Connectivity Methods',
      required: true,
      options: [
        'RF (Radio Frequency)',
        'Wi-Fi',
        'Bluetooth',
        'USB Receiver'
      ],
      group: 'connectivity'
    },
    {
      name: 'deviceSupport',
      type: 'multiselect',
      label: 'Supported Devices',
      required: true,
      options: [
        'Dedicated Clickers',
        'Smartphones',
        'Tablets',
        'Laptops',
        'Desktop Computers'
      ],
      group: 'compatibility'
    },
    {
      name: 'maxUsers',
      type: 'number',
      label: 'Maximum Simultaneous Users',
      required: true,
      group: 'specifications'
    },
    {
      name: 'softwareFeatures',
      type: 'multiselect',
      label: 'Software Features',
      required: true,
      options: [
        'Real-time Results',
        'Data Analytics',
        'Report Generation',
        'Student Tracking',
        'Grade Book Integration',
        'Question Banking'
      ],
      group: 'software'
    },
    {
      name: 'assessmentTools',
      type: 'multiselect',
      label: 'Assessment Tools',
      required: true,
      options: [
        'Quiz Creation',
        'Polling',
        'Surveys',
        'Self-Paced Testing',
        'Team Activities'
      ],
      group: 'features'
    },
    {
      name: 'integrationOptions',
      type: 'multiselect',
      label: 'Integration Options',
      required: true,
      options: [
        'LMS Integration',
        'PowerPoint Integration',
        'Google Classroom',
        'Canvas',
        'Blackboard'
      ],
      group: 'integration'
    },
    {
      name: 'dataExport',
      type: 'multiselect',
      label: 'Data Export Formats',
      required: true,
      options: [
        'CSV',
        'Excel',
        'PDF',
        'HTML',
        'API Access'
      ],
      group: 'data'
    },
    {
      name: 'batteryLife',
      type: 'number',
      label: 'Battery Life',
      unit: 'hours',
      required: true,
      group: 'specifications'
    },
    {
      name: 'securityFeatures',
      type: 'multiselect',
      label: 'Security Features',
      required: true,
      options: [
        'Data Encryption',
        'Secure Login',
        'Anonymous Response Mode',
        'Access Control',
        'Session Protection'
      ],
      group: 'security'
    }
  ]
};
