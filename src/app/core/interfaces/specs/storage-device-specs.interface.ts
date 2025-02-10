export interface StorageDeviceSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    storageType: string;
    formFactor: string;
    capacity: number;
    interface: string;
    readSpeed: number;
    writeSpeed: number;
    rpm?: string;
    nandType?: string;
  }