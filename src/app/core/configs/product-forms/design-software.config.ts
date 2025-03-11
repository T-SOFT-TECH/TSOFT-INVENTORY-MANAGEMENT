import {CategoryFormConfig} from './product-form.types';

export const designSoftwareConfig: CategoryFormConfig = {
  id: 'design_software',
  name: 'Design Software',
  fields: [
    {
      name: 'softwareType',
      type: 'select',
      label: 'Software Type',
      required: true,
      options: [
        'Photo Editing',
        'Vector Graphics',
        'CAD',
        '3D Modeling',
        'UI/UX Design',
        'Video Editing'
      ],
      group: 'specifications'
    },
    {
      name: 'licenseModel',
      type: 'select',
      label: 'License Model',
      required: true,
      options: [
        'Subscription',
        'Perpetual License',
        'Freemium',
        'Open Source'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Key Features',
      required: true,
      options: [
        'Layer Support',
        'Plugin Support',
        'Cloud Storage',
        'Real-time Collaboration',
        'Version Control',
        'Asset Library'
      ],
      group: 'features'
    },
    {
      name: 'fileFormats',
      type: 'multiselect',
      label: 'Supported File Formats',
      required: true,
      options: [
        'PSD',
        'AI',
        'PDF',
        'SVG',
        'DWG',
        'SKP'
      ],
      group: 'specifications'
    }
  ]
};
