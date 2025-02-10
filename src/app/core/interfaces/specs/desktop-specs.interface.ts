export interface DesktopSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    processorModel: string;
    cores: number;
    ramSize: number;
    ramType: 'DDR4' | 'DDR5';
    gpuModel: string;
    storageType: 'SSD' | 'HDD' | 'NVMe SSD';
    storageCapacity: number;
    caseType: string;
    dimensions: string;
    powerSupply: string;
    powerRating: number;
    frontPorts: string[];
    rearPorts: string[];
    wifi?: string;
    bluetooth?: string;
    opticalDrive?: string;
    cooling: string[];
  }