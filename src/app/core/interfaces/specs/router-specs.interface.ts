export interface RouterSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    routerType: string;
    wifiStandard: string;
    frequency: string[];
    maxSpeed: string;
    ports: number;
    security: string[];
    coverage: number;
    antennas: number;
    processor: string;
    memory: string;
  }