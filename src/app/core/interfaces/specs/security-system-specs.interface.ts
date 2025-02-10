export interface SecuritySystemSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    deviceType: string;
    resolution?: string;
    connectivity: string[];
    powerSource: string;
    storageType: string[];
    nightVision?: string;
    weatherResistance?: string;
    smartIntegration?: string[];
    fieldOfView?: number;
    motionDetection?: boolean;
    audioFeatures?: string[];
    aiFeatures?: string[];
    subscriptionRequired: boolean;
    batteryLife?: number;
    operatingTemperature?: string;
  }