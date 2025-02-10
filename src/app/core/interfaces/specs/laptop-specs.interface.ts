export interface LaptopSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    screenSize: number;
    resolution: string;
    refreshRate: string;
    displayType: string;
    touchscreen?: boolean;
    processorModel: string;
    cores: number;
    ramSize: number;
    ramType: string;
    gpuModel: string;
    gpuVram?: number;
    storageType: string;
    storageCapacity: number;
    storageInterface: string;
    weight: number;
    dimensions: string;
    color: string;
    buildMaterial: string;
    batteryCapacity: number;
    batteryLife: number;
    chargingWattage: number;
    webcam?: boolean;
    backlitKeyboard?: boolean;
    fingerprint?: boolean;
    wifi: string;
    bluetooth: string;
  }