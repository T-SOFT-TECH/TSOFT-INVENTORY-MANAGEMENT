export interface TabletSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    platform: string;
    brand: string;
    screenSize: number;
    displayType: string;
    resolution: string;
    processor: string;
    ram: number;
    storage: string;
    expandableStorage?: boolean;
    rearCamera?: string;
    frontCamera?: string;
    battery: number;
    pencilSupport?: boolean;
    keyboardSupport?: boolean;
    connectivity: string[];
    features?: string[];
    dimensions: string;
    weight: number;
  }