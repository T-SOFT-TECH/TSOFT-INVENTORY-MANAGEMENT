export interface SmartControlSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    deviceType: string;
    connectivity: string[];
    powerSource: string;
    smartIntegration: string[];
    display?: string;
    sensors?: string[];
    automationFeatures?: string[];
    maxLoad?: number;
    voltage?: string;
    batteryType?: string;
    batteryLife?: number;
    installation: string;
    certifications?: string[];
  }