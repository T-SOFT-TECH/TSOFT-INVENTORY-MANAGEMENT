export interface WearableSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    wearableType: string;
    compatibility: string[];
    displayType: string;
    screenSize?: number;
    batteryLife: number;
    sensors?: string[];
    waterResistance?: string;
    features?: string[];
  }