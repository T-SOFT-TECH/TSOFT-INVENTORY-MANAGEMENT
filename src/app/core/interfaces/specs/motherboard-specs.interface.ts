export interface MotherboardSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    formFactor: string;
    socket: string;
    chipset: string;
    memorySpecs: string[];
    maxMemory: number;
    memorySlots: number;
    pciExpressSlots: string[];
    storage: string[];
    networking: string[];
    audioCodec?: string;
    usbPorts: string[];
  }