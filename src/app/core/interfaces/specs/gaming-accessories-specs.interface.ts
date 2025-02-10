export interface GamingAccessoriesSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    accessoryType: string;
    compatibility: string[];
    connectivity: string;
    rgb?: boolean;
    batteryLife?: number;
    chargingType?: string;
    material: string;
    features?: string[];
    cableLength?: number;
    weight: number;
    dimensions: string;
    warranty: number;
  }