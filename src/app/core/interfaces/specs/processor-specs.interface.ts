export interface ProcessorSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    processorType: string;
    series: string;
    generation: string;
    cores: number;
    threads: number;
    baseFrequency: number;
    boostFrequency?: number;
    socket: string;
    tdp: number;
    integratedGraphics?: boolean;
  }