export interface SmartphoneSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    platform: string;
    brand: string;
    screenSize: number;
    resolution: string;
    processor: string;
    ram: number;
    storage: string;
    mainCamera: string;
    frontCamera: string;
    battery: number;
    chargingSpeed?: number;
    biometrics?: string[];
    connectivity: string[];
    waterResistance?: string;
    dimensions: string;
    weight: number;
  }