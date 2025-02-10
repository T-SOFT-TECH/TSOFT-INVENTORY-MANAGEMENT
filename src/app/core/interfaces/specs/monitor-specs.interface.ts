export interface MonitorSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    displayType: string;
    screenSize: number;
    resolution: string;
    refreshRate: number;
    responseTime: number;
    aspectRatio: string;
    brightness: number;
    hdrSupport?: string;
  }