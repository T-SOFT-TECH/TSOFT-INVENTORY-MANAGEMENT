import {CategoryFormConfig} from './product-form.types';

export const networkCardsConfig: CategoryFormConfig = {
  id: 'network-cards',
  name: 'Network Cards',
  fields: [
    {
      name: 'interfaceType',
      type: 'select',
      label: 'Interface Type',
      required: true,
      options: [
        'PCIe x1',
        'PCIe x4',
        'PCIe x8',
        'PCIe x16',
        'USB',
        'M.2'
      ],
      group: 'specifications'
    },
    {
      name: 'networkType',
      type: 'select',
      label: 'Network Type',
      required: true,
      options: [
        'Ethernet',
        'Wi-Fi',
        'Bluetooth',
        'Combo (Wi-Fi + Bluetooth)'
      ],
      group: 'specifications'
    },
    {
      name: 'ethernetSpeed',
      type: 'select',
      label: 'Ethernet Speed',
      required: false,
      options: [
        '10/100 Mbps',
        '10/100/1000 Mbps',
        '2.5 Gbps',
        '5 Gbps',
        '10 Gbps'
      ],
      group: 'specifications'
    },
    {
      name: 'wifiStandard',
      type: 'select',
      label: 'Wi-Fi Standard',
      required: false,
      options: [
        'WiFi 4 (802.11n)',
        'WiFi 5 (802.11ac)',
        'WiFi 6 (802.11ax)',
        'WiFi 6E',
        'WiFi 7'
      ],
      group: 'specifications'
    },
    {
      name: 'bluetoothVersion',
      type: 'select',
      label: 'Bluetooth Version',
      required: false,
      options: [
        'Bluetooth 4.0',
        'Bluetooth 4.2',
        'Bluetooth 5.0',
        'Bluetooth 5.1',
        'Bluetooth 5.2',
        'Bluetooth 5.3'
      ],
      group: 'specifications'
    },
    {
      name: 'antennas',
      type: 'number',
      label: 'Number of Antennas',
      required: false,
      group: 'specifications'
    },
    {
      name: 'ports',
      type: 'number',
      label: 'Number of Ports',
      required: false,
      group: 'specifications'
    },
    {
      name: 'features',
      type: 'multiselect',
      label: 'Features',
      required: false,
      options: [
        'Wake-on-LAN',
        'PXE Boot',
        'MIMO',
        'MU-MIMO',
        'Beamforming'
      ],
      group: 'specifications'
    },
    {
      name: 'formFactor',
      type: 'select',
      label: 'Form Factor',
      required: true,
      options: [
        'Low Profile',
        'Full Height',
        'M.2 2230',
        'M.2 2242',
        'M.2 2260',
        'M.2 2280'
      ],
      group: 'specifications'
    },
    {
      name: 'chipset',
      type: 'text',
      label: 'Chipset',
      required: true,
      placeholder: 'e.g., Intel AX210, Realtek 8125',
      group: 'specifications'
    }
  ]
};
