export interface KeyboardSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    keyboardType: 'Mechanical' | 'Membrane' | 'Optical';
    switchType?: string;
    layout: string;
    connectivity: string;
    features?: Array<'RGB' | 'Hot-swappable' | 'USB Passthrough' | 'Macro Keys' | 'Palm Rest'>;
  }