import {CategoryFormConfig} from './product-form.types';

export const vgaCablesConfig: CategoryFormConfig = {
  id: 'vga_cables',
  name: 'VGA Cables',
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
      name: 'maxResolution',
      type: 'select',
      label: 'Maximum Resolution',
      required: false,
      options: ['800x600', '1024x768', '1280x1024', '1920x1080', '2048x1536'],
      group: 'specifications',
    },
    {
      name: 'connectorType',
      type: 'select',
      label: 'Connector Type',
      required: true,
      options: ['Standard VGA', 'Mini VGA', 'VGA to DVI', 'VGA to HDMI'],
      group: 'specifications',
    },
    {
      name: 'ferriteCores',
      type: 'select',
      label: 'Ferrite Cores',
      required: false,
      options: ['None', 'One End', 'Both Ends'],
      group: 'features',
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
      label: 'Cable Material/Quality',
      required: false,
      options: ['Standard', 'Premium', 'Professional Grade'],
      group: 'physical',
    },
    {
      name: 'screwLocks',
      type: 'radio',
      label: 'Screw-Lock Security',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'cableGauge',
      type: 'select',
      label: 'Cable Gauge',
      required: false,
      options: ['28 AWG', '26 AWG', '24 AWG'],
      group: 'specifications',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['Black', 'White', 'Blue', 'Gray'],
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
