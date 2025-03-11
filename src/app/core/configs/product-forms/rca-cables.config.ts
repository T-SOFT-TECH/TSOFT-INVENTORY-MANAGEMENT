import {CategoryFormConfig} from './product-form.types';

export const rcaCablesConfig: CategoryFormConfig = {
  id: 'rca_cables',
  name: 'RCA Cables',
  fields: [
    {
      name: 'length',
      type: 'number',
      label: 'Cable Length',
      required: true,
      unit: 'm',
      group: 'specifications',
    },
    {
      name: 'connectorType',
      type: 'select',
      label: 'Connector Type',
      required: true,
      options: [
        'RCA Stereo (Red/White)',
        'RCA Composite (Yellow)',
        'RCA to 3.5mm',
        'Component Video (Red/Green/Blue)',
        'Full A/V Set (Red/White/Yellow)'
      ],
      group: 'specifications',
    },
    {
      name: 'goldPlated',
      type: 'radio',
      label: 'Gold-Plated Connectors',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'shielding',
      type: 'select',
      label: 'Shielding Quality',
      required: false,
      options: ['Standard', 'Double', 'Triple', 'Premium'],
      group: 'specifications',
    },
    {
      name: 'cableMaterial',
      type: 'select',
      label: 'Cable Material',
      required: false,
      options: ['Standard PVC', 'Oxygen-Free Copper', 'Silver-Plated Copper', 'Premium'],
      group: 'physical',
    },
    {
      name: 'colorCoded',
      type: 'radio',
      label: 'Color-Coded Connectors',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'connectorStyle',
      type: 'select',
      label: 'Connector Style',
      required: false,
      options: ['Straight', 'Right Angle', 'L-Shaped'],
      group: 'specifications',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Cable Color',
      required: false,
      options: ['Black', 'White', 'Blue', 'Clear'],
      group: 'physical',
    },
    {
      name: 'compatibleDevices',
      type: 'select',
      label: 'Compatible Devices',
      required: false,
      options: ['TV', 'DVD/Blu-ray Player', 'AV Receiver', 'Game Console', 'Stereo System'],
      group: 'compatibility',
    },
    {
      name: 'warranty',
      type: 'select',
      label: 'Warranty',
      required: false,
      options: ['1 Year', '2 Years', '5 Years', 'Lifetime'],
      group: 'additional',
    }
  ],
};
