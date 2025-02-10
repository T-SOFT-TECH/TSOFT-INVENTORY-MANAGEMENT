import {CategoryFormConfig} from './product-form.types';

export const soundCardConfig: CategoryFormConfig = {
  id: 'sound-card',
  name: 'Sound Card',
  fields: [
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: [
        'PCIe',
        'USB External',
        'Internal HD Audio'
      ],
      group: 'specifications'
    },
    {
      name: 'channels',
      type: 'select',
      label: 'Audio Channels',
      required: true,
      options: [
        '2.0',
        '2.1',
        '5.1',
        '7.1'
      ],
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
        '96kHz',
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
      name: 'snr',
      type: 'number',
      label: 'Signal-to-Noise Ratio',
      required: true,
      unit: 'dB',
      group: 'specifications'
    },
    {
      name: 'interfaces',
      type: 'multiselect',
      label: 'Audio Interfaces',
      required: true,
      options: [
        '3.5mm Line Out',
        '3.5mm Mic In',
        'Optical Out',
        'Optical In',
        'RCA Out',
        'MIDI'
      ],
      group: 'connectivity'
    },
    {
      name: 'chipset',
      type: 'text',
      label: 'Audio Processor/Chipset',
      required: true,
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      options: [
        'Virtual Surround',
        'EAX Support',
        'RGB Lighting',
        'Replaceable Op-Amps',
        'Shielding'
      ],
      group: 'features'
    },
    {
      name: 'softwareFeatures',
      type: 'multiselect',
      label: 'Software Features',
      options: [
        'EQ',
        'Virtual Surround',
        'Bass Boost',
        'Voice Modification',
        'Audio Profiles'
      ],
      group: 'features'
    },
    {
      name: 'driveSupport',
      type: 'multiselect',
      label: 'Headphone Impedance Support',
      options: [
        '16-32Ω',
        '32-150Ω',
        '150-600Ω',
        '600Ω+'
      ],
      group: 'specifications'
    }
  ]
};
