export interface MemorySpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    memoryType: 'DDR4' | 'DDR5';
    capacity: number;
    speed: number;
    formFactor: string;
    latency: string;
    voltage: number;
    features?: Array<'RGB' | 'XMP' | 'ECC'>;
  }