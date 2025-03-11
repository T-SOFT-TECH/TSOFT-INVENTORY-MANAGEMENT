import {CategoryFormConfig} from './product-form.types';

export const developmentToolsConfig: CategoryFormConfig = {
  id: 'development_tools',
  name: 'Development Tools',
  fields: [
    {
      name: 'toolType',
      type: 'select',
      label: 'Tool Type',
      required: true,
      options: [
        'IDE',
        'Code Editor',
        'Version Control',
        'Database Management',
        'API Testing',
        'Debugging Tool'
      ],
      group: 'specifications'
    },
    {
      name: 'programmingLanguages',
      type: 'multiselect',
      label: 'Supported Languages',
      required: true,
      options: [
        'JavaScript',
        'Python',
        'Java',
        'C++',
        'C#',
        'PHP',
        'Ruby'
      ],
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      required: true,
      options: [
        'Code Completion',
        'Debugging',
        'Git Integration',
        'Extensions Support',
        'Live Preview',
        'Terminal Integration'
      ],
      group: 'features'
    },
    {
      name: 'collaboration',
      type: 'multiselect',
      label: 'Collaboration Features',
      options: [
        'Live Share',
        'Code Review',
        'Team Chat',
        'Project Management',
        'Cloud Sync'
      ],
      group: 'features'
    }
  ]
};
