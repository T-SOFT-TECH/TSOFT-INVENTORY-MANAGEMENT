export interface NetworkingSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    deviceType: string;
    wifiStandard?: string;
    ports: string[];
    features?: string[];
    security?: string[];
  }