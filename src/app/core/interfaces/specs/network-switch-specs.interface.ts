export interface NetworkSwitchSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    switchType: string;
    portCount: string;
    portSpeed: string;
    poeSupport: string;
    poePower?: number;
    rackMountable?: boolean;
    features?: string[];
    switching: number;
    macAddresses: number;
    powerSupply: string;
  }