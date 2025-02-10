export interface EducationalTechnologySpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    deviceType: string;
    targetAgeGroup: string[];
    screenSize?: number;
    resolution?: string;
    touchPoints?: number;
    storage?: number;
    ram?: number;
    operatingSystem?: string;
    connectivity: string[];
    batteryLife?: number;
    durability?: string[];
    contentSupport: string[];
    accessControl?: string[];
    audioFeatures?: string[];
    warranty: number;
    dimensions: string;
    weight: number;
  }