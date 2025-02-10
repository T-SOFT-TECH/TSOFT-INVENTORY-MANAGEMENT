export interface PowerSupplySpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    wattage: number;
    efficiency: string;
    modularity: string;
    formFactor: string;
    connectors: string[];
    cooling: string;
  }