import {CategoryFormConfig, commonFields} from './product-form.types';

export const graphicsCardsConfig: CategoryFormConfig = {
  id: 'graphics-cards-gpus',
  name: 'Graphics Cards',
  fields: [
    ...commonFields,
    {
      name: 'gpuType',
      type: 'select',
      label: 'GPU Type',
      required: true,
      options: ['Gaming', 'Workstation', 'Mining'],
      group: 'specifications'
    },
    {
      name: 'chipset',
      type: 'text',
      label: 'GPU Chipset',
      required: true,
      placeholder: 'e.g., RTX 4080, RX 7900 XT',
      group: 'specifications'
    },
    {
      name: 'memorySize',
      type: 'number',
      label: 'Memory Size',
      required: true,
      unit: 'GB',
      group: 'specifications'
    },
    {
      name: 'memoryType',
      type: 'select',
      label: 'Memory Type',
      required: true,
      options: ['GDDR6X', 'GDDR6', 'GDDR5', 'HBM2', 'HBM3'],
      group: 'specifications'
    },
    {
      name: 'memoryBus',
      type: 'number',
      label: 'Memory Bus',
      required: true,
      unit: 'bit',
      group: 'specifications'
    },
    {
      name: 'baseClock',
      type: 'number',
      label: 'Base Clock',
      required: true,
      unit: 'MHz',
      group: 'specifications'
    },
    {
      name: 'boostClock',
      type: 'number',
      label: 'Boost Clock',
      required: true,
      unit: 'MHz',
      group: 'specifications'
    },
    {
      name: 'rtCores',
      type: 'number',
      label: 'RT Cores',
      group: 'specifications'
    },
    {
      name: 'displayOutputs',
      type: 'multiselect',
      label: 'Display Outputs',
      required: true,
      options: ['HDMI 2.1', 'DisplayPort 1.4', 'DisplayPort 2.1', 'USB Type-C'],
      group: 'specifications'
    },
    {
      name: 'powerConnectors',
      type: 'multiselect',
      label: 'Power Connectors',
      required: true,
      options: ['8-pin', '6-pin', '12VHPWR', 'None'],
      group: 'specifications'
    },
    {
      name: 'recommendedPsu',
      type: 'number',
      label: 'Recommended PSU',
      required: true,
      unit: 'W',
      group: 'specifications'
    },
    {
      name: 'length',
      type: 'number',
      label: 'Card Length',
      required: true,
      unit: 'mm',
      group: 'specifications'
    },
    {
      name: 'cooling',
      type: 'select',
      label: 'Cooling Solution',
      required: true,
      options: ['Air Cooling', 'Water Cooling', 'Hybrid'],
      group: 'specifications'
    }
  ]
};
