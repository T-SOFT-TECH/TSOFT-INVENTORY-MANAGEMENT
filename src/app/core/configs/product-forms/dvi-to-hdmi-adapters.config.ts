import {CategoryFormConfig} from './product-form.types';

export const dviToHdmiAdaptersConfig: CategoryFormConfig = {
  id: 'dvi_to_hdmi_adapters',
  name: 'DVI to HDMI Adapters',
  fields: [
    {
      name: 'dviType',
      type: 'select',
      label: 'DVI Connector Type',
      required: true,
      options: ['DVI-D (Digital Only)', 'DVI-I (Digital & Analog)', 'DVI-A (Analog Only)'],
      group: 'specifications',
    },
    {
      name: 'direction',
      type: 'select',
      label: 'Conversion Direction',
      required: true,
      options: ['DVI to HDMI', 'HDMI to DVI', 'Bi-directional'],
      group: 'specifications',
    },
    {
      name: 'maxResolution',
      type: 'select',
      label: 'Maximum Resolution',
      required: true,
      options: ['1080p (1920×1080)', '1440p (2560×1440)', '4K (3840×2160)'],
      group: 'specifications',
    },
    {
      name: 'adapterType',
      type: 'select',
      label: 'Adapter Type',
      required: true,
      options: ['Cable', 'Dongle/Adapter'],
      group: 'physical',
    },
    {
      name: 'length',
      type: 'number',
      label: 'Cable Length (if applicable)',
      required: false,
      unit: 'cm',
      group: 'specifications',
    },
    {
      name: 'audioSupport',
      type: 'radio',
      label: 'Audio Support',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'signalConversion',
      type: 'select',
      label: 'Signal Conversion',
      required: false,
      options: ['Active', 'Passive'],
      group: 'specifications',
    },
    {
      name: 'connectorFinish',
      type: 'select',
      label: 'Connector Finish',
      required: false,
      options: ['Standard', 'Gold-Plated', 'Nickel-Plated'],
      group: 'specifications',
    },
    {
      name: 'hdcpSupport',
      type: 'radio',
      label: 'HDCP Support',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'compatibleDevices',
      type: 'select',
      label: 'Primary Compatible Devices',
      required: false,
      options: ['PCs/Laptops', 'DVD/Blu-ray Players', 'Gaming Consoles', 'All DVI Sources'],
      group: 'compatibility',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['Black', 'White', 'Silver'],
      group: 'physical',
    },
    {
      name: 'warranty',
      type: 'select',
      label: 'Warranty',
      required: false,
      options: ['1 Year', '2 Years', '3 Years', '5 Years', 'Lifetime'],
      group: 'additional',
    }
  ],
};
