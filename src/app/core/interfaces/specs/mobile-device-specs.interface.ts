export interface MobileDeviceSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    deviceType: 'Smartphone' | 'Tablet' | 'Smartwatch';
    operatingSystem: 'Android' | 'iOS';
    screenSize: number;
    storageCapacity: number;
    ram: number;
    batteryCapacity: number;
    camera?: string;
  }