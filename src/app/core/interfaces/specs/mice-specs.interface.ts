export interface MiceSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    sensorType: string;
    maxDpi: number;
    pollingRate: string;
    buttons: number;
    connectivity: string;
    gripType: string;
    weight: number;
    adjustableWeight?: boolean;
    rgb?: boolean;
    programmableButtons?: boolean;
    onboardMemory?: boolean;
    cableLength?: number;
    batteryLife?: number;
    chargingType?: string;
  }