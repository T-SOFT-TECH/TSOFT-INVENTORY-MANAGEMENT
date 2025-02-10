export interface CaseSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
   
    formFactor: string[];
    caseType: string;
    dimensions: string[];
    maxGpuLength: number;
    radiatorSupport?: string[];
    includedFans: number;
    materials: string[];
    features?: string[];
   }