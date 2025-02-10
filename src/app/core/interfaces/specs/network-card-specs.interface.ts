export interface NetworkCardSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    interfaceType: string;
    networkType: string;
    ethernetSpeed?: string;
    wifiStandard?: string;
    bluetoothVersion?: string;
    antennas?: number;
    ports?: number;
    features?: string[];
    formFactor: string;
    chipset: string;
  }