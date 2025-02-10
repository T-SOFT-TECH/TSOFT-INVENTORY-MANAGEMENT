export interface SmartSecuritySpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    deviceType: string;
    resolution?: string;
    connectivity: string[];
    powerSource: string;
    smartIntegration: string[];
    storageOptions: string[];
    nightVision?: string;
    weatherResistance?: string;
    aiFeatures?: string[];
    audioFeatures?: string[];
    subscriptionRequired: boolean;
    batteryLife?: number;
    fieldOfView?: number;
  }