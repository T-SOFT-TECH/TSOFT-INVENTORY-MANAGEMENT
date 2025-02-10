export interface OfficeEquipmentSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    equipmentType: string;
    usage: string;
    sheetCapacity?: number;
    shreddingType?: string;
    securityLevel?: string;
    maxLaminationWidth?: number;
    bindingCapacity?: number;
    displayType?: string;
    powerSource: string;
    continuousRunTime?: number;
    coolDownPeriod?: number;
    noiseLevel?: number;
    features?: string[];
    wasteBasketCapacity?: number;
    dimensions: string;
    weight: number;
  }