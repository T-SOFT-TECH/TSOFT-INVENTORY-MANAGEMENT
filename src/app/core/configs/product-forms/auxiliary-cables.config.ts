import {CategoryFormConfig} from './product-form.types';

export const auxiliaryCablesConfig: CategoryFormConfig = {
  id: 'auxiliary_cables',
  name: 'Auxiliary (AUX) Cables',
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
      options: ['3.5mm Male to Male', '3.5mm Male to Female', '3.5mm Male to RCA', '2.5mm to 3.5mm'],
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
      name: 'cableMaterial',
      type: 'select',
      label: 'Cable Material',
      required: false,
      options: ['Standard PVC', 'Braided Nylon', 'TPE', 'Premium'],
      group: 'physical',
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
      name: 'audioQuality',
      type: 'select',
      label: 'Audio Quality',
      required: false,
      options: ['Standard', 'Hi-Fi', 'Studio Grade'],
      group: 'specifications',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['Black', 'White', 'Red', 'Blue', 'Green', 'Gold'],
      group: 'physical',
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
