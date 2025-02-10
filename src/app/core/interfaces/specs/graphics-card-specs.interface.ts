export interface GraphicsCardSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    gpuType: 'Gaming' | 'Workstation' | 'Mining';
    chipset: string;
    memorySize: number;
    memoryType: string;
    memoryBus: number;
    baseClock: number;
    boostClock: number;
    rtCores?: number;
    displayOutputs: string[];
    powerConnectors: string[];
    recommendedPsu: number;
    length: number;
    cooling: string;
  }