export interface SmartApplianceSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    applianceType: string;
    connectivity: string[];
    smartFeatures: string[];
    displayType: string;
    energyRating: string;
    powerConsumption: number;
    capacity: string;
    smartIntegration: string[];
    automationFeatures?: string[];
    noiselevel?: number;
    installation: string;
    warranty: number;
    certifications?: string[];
    dimensions: string;
    weight: number;
  }