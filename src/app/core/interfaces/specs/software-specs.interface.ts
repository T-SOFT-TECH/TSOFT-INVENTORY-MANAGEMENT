export interface SoftwareSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    softwareType: string;
    licenseType: string;
    deliveryMethod: string;
    platform: string[];
    version: string;
    userLimit: number;
    subscriptionPeriod?: string;
    systemRequirements: string;
    languages: string[];
    features: string[];
    updatePolicy: string;
    supportPeriod?: number;
    activationType: string;
  }