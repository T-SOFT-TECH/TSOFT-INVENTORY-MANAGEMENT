import {CategoryFormConfig} from './product-form.types';

export const opticalAudioCablesConfig: CategoryFormConfig = {
  id: 'optical_audio_cables',
  name: 'Optical Audio (TOSLINK) Cables',
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
      options: ['TOSLINK to TOSLINK', 'TOSLINK to Mini-TOSLINK', 'TOSLINK to 3.5mm Optical'],
      group: 'specifications',
    },
    {
      name: 'audioFormatSupport',
      type: 'select',
      label: 'Audio Format Support',
      required: false,
      options: ['PCM', 'Dolby Digital', 'DTS', 'Dolby Digital Plus', 'DTS-HD', 'Dolby TrueHD'],
      group: 'specifications',
    },
    {
      name: 'cableMaterial',
      type: 'select',
      label: 'Cable Material Quality',
      required: false,
      options: ['Standard', 'Premium', 'Professional Grade'],
      group: 'physical',
    },
    {
      name: 'shielding',
      type: 'select',
      label: 'Shielding',
      required: false,
      options: ['Standard', 'Enhanced', 'Premium Interference Protection'],
      group: 'specifications',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['Black', 'White', 'Blue', 'Clear'],
      group: 'physical',
    },
    {
      name: 'compatibleDevices',
      type: 'select',
      label: 'Compatible Devices',
      required: false,
      options: ['TV', 'Soundbar', 'AV Receiver', 'Game Console', 'Blu-ray Player', 'Multiple Devices'],
      group: 'compatibility',
    },
    {
      name: 'maximumResolution',
      type: 'select',
      label: 'Maximum Audio Resolution',
      required: false,
      options: ['48kHz/16-bit', '96kHz/24-bit', '192kHz/24-bit'],
      group: 'specifications',
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
