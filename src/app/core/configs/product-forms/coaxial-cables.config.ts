import {CategoryFormConfig} from './product-form.types';

export const coaxialCablesConfig: CategoryFormConfig = {
  id: 'coaxial_cables',
  name: 'Coaxial Cables',
  fields: [
    {
      name: 'impedance',
      type: 'select',
      label: 'Impedance',
      required: true,
      options: ['50 Ohm', '75 Ohm'],
      group: 'specifications',
    },
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
      options: ['F-Type', 'BNC', 'RCA', 'RG6', 'RG59'],
      group: 'specifications',
    },
    {
      name: 'shieldingType',
      type: 'select',
      label: 'Shielding Type',
      required: false,
      options: ['Single', 'Double', 'Quad'],
      group: 'specifications',
    },
    {
      name: 'signalQuality',
      type: 'select',
      label: 'Signal Quality Rating',
      required: false,
      options: ['Standard', 'High', 'Premium'],
      group: 'specifications',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['Black', 'White', 'Gray', 'Clear'],
      group: 'physical',
    },
    {
      name: 'cableThickness',
      type: 'select',
      label: 'Cable Gauge',
      required: false,
      options: ['RG6', 'RG59', 'RG11', 'RG58'],
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
