export interface ChargerSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
   
    chargerType: string;
    outputWattage: number;
    inputVoltage: string;
    outputVoltage: string;
    compatibleDevices: string[];
    connectorType: string[];
    chargingProtocols?: string[];
    features?: string[];
    cableIncluded?: boolean;
    cableLength?: number;
    portCount: number;
    dimensions?: string;
   }