
import { CategoryFormConfig } from './product-form.types';

export const graphicsCardsConfig: CategoryFormConfig = {
  id: 'graphics-cards-gpus',
  name: 'Graphics Cards',
  fields: [
    {
      name: 'chipsetManufacturer',
      type: 'select',
      label: 'Chipset Manufacturer',
      required: true,
      options: ['NVIDIA', 'AMD', 'Intel'],
      group: 'basic'
    },
    {
      name: 'gpuModel',
      type: 'text',
      label: 'GPU Model',
      required: true,
      placeholder: 'e.g., RTX 4080, RX 7900 XT',
      group: 'basic'
    },
    {
      name: 'memorySize',
      type: 'number',
      label: 'Memory Size',
      required: true,
      unit: 'GB',
      group: 'memory'
    },
    {
      name: 'memoryType',
      type: 'select',
      label: 'Memory Type',
      required: true,
      options: ['GDDR6X', 'GDDR6', 'GDDR5', 'HBM2', 'HBM3'],
      group: 'memory'
    },
    {
      name: 'memoryBus',
      type: 'number',
      label: 'Memory Bus Width',
      required: true,
      unit: 'bit',
      group: 'memory'
    },
    {
      name: 'baseClock',
      type: 'number',
      label: 'Base Clock',
      required: true,
      unit: 'MHz',
      group: 'performance'
    },
    {
      name: 'boostClock',
      type: 'number',
      label: 'Boost Clock',
      required: true,
      unit: 'MHz',
      group: 'performance'
    },
    {
      name: 'rtCores',
      type: 'number',
      label: 'RT Cores',
      group: 'specifications'
    },
    {
      name: 'tensorCores',
      type: 'number',
      label: 'Tensor Cores',
      group: 'specifications'
    },
    {
      name: 'displayOutputs',
      type: 'multiselect',
      label: 'Display Outputs',
      required: true,
      options: [
        'HDMI 2.1',
        'HDMI 2.0',
        'DisplayPort 1.4a',
        'DisplayPort 2.1',
        'USB Type-C'
      ],
      group: 'connectivity'
    },
    {
      name: 'powerConnectors',
      type: 'multiselect',
      label: 'Power Connectors',
      required: true,
      options: [
        '8-pin',
        '6-pin',
        '12VHPWR',
        '16-pin'
      ],
      group: 'power'
    },
    {
      name: 'tdp',
      type: 'number',
      label: 'TDP',
      required: true,
      unit: 'W',
      group: 'power'
    },
    {
      name: 'recommendedPsu',
      type: 'number',
      label: 'Recommended PSU',
      required: true,
      unit: 'W',
      group: 'power'
    },
    {
      name: 'length',
      type: 'number',
      label: 'Card Length',
      required: true,
      unit: 'mm',
      group: 'physical'
    },
    {
      name: 'width',
      type: 'number',
      label: 'Card Width',
      required: true,
      unit: 'slots',
      group: 'physical'
    },
    {
      name: 'cooling',
      type: 'select',
      label: 'Cooling Solution',
      required: true,
      options: [
        'Air Cooling',
        'Water Cooling',
        'Hybrid',
        'Passive'
      ],
      group: 'thermal'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Ray Tracing',
        'DLSS',
        'FSR',
        'XeSS',
        'RGB Lighting',
        'Metal Backplate',
        'Zero RPM Mode'
      ],
      group: 'features'
    },
    {
      name: 'directX',
      type: 'select',
      label: 'DirectX Support',
      required: true,
      options: [
        'DirectX 11',
        'DirectX 12',
        'DirectX 12 Ultimate'
      ],
      group: 'specifications'
    },
    {
      name: 'openGL',
      type: 'text',
      label: 'OpenGL Support',
      required: true,
      group: 'specifications'
    }
  ]
};
