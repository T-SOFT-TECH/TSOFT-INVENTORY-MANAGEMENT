export interface CableSpecs {
    // Common fields from Appwrite
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    // Cable specific fields
    cableType: string;
    length: number;  
    dataTransferSpeed: string;
    powerDelivery?: number;  
    features?: string[];
    certification?: string[];
  }