export interface CoolingSpecs {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  productId: string;

  coolingType: string;
  socketSupport: string[];
  size: string;
  tdp: number;
  fanSpeed: number;
  noiseLevel?: number;
  features?: string[];
}  