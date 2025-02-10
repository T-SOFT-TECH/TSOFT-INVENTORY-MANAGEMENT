import {CategoryFormConfig} from './product-form.types';

export const audioInterfaceConfig: CategoryFormConfig = {
  id: 'audio-interface',
  name: 'Audio Interface',
  fields: [
    {
      name: 'interfaceType',
      type: 'select',
      label: 'Interface Type',
      required: true,
      options: [
        'USB',
        'Thunderbolt',
        'PCIe',
        'FireWire',
        'Dante'
      ],
      group: 'specifications'
    },
    {
      name: 'inputChannels',
      type: 'number',
      label: 'Input Channels',
      required: true,
      group: 'specifications'
    },
    {
      name: 'outputChannels',
      type: 'number',
      label: 'Output Channels',
      required: true,
      group: 'specifications'
    },
    {
      name: 'micPreamps',
      type: 'number',
      label: 'Microphone Preamps',
      required: true,
      group: 'specifications'
    },
    {
      name: 'sampleRate',
      type: 'multiselect',
      label: 'Supported Sample Rates',
      required: true,
      options: [
        '44.1kHz',
        '48kHz',
        '88.2kHz',
        '96kHz',
        '176.4kHz',
        '192kHz'
      ],
      group: 'specifications'
    },
    {
      name: 'bitDepth',
      type: 'select',
      label: 'Bit Depth',
      required: true,
      options: [
        '16-bit',
        '24-bit',
        '32-bit'
      ],
      group: 'specifications'
    },
    {
      name: 'inputTypes',
      type: 'multiselect',
      label: 'Input Types',
      required: true,
      options: [
        'XLR',
        'TRS',
        'Line',
        'Instrument',
        'MIDI',
        'ADAT',
        'S/PDIF'
      ],
      group: 'connectivity'
    },
    {
      name: 'outputTypes',
      type: 'multiselect',
      label: 'Output Types',
      required: true,
      options: [
        'XLR',
        'TRS',
        'Headphone',
        'MIDI',
        'ADAT',
        'S/PDIF'
      ],
      group: 'connectivity'
    },
    {
      name: 'phantomPower',
      type: 'checkbox',
      label: '48V Phantom Power',
      required: true,
      group: 'features'
    },
    {
      name: 'midiSupport',
      type: 'checkbox',
      label: 'MIDI I/O',
      required: true,
      group: 'features'
    },
    {
      name: 'dspFeatures',
      type: 'multiselect',
      label: 'DSP Features',
      options: [
        'EQ',
        'Compression',
        'Reverb',
        'Delay',
        'Monitoring Mix'
      ],
      group: 'features'
    }
  ]
};
