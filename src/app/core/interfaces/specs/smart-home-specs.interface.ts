export interface SmartHomeSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    deviceType: string;
    connectivity: string[];
    powerSource: string;
    compatibility: string[];
    features?: string[];
    resolution?: string;
  }