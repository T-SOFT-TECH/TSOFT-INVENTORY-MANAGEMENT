export interface AudioSpecs {
    // Common fields should be extended
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;  // Reference to main product
  
    // Audio specific fields
    deviceType: 'Headphones' | 'Speakers' | 'Microphone' | 'Audio Interface' | 'Sound Card';
    connectivity: 'Wired' | 'Wireless' | 'Bluetooth' | 'USB';
    frequency?: string;
    impedance?: number;
    features?: Array<'Noise Cancellation' | 'Surround Sound' | 'RGB Lighting' | 'Volume Control' | 'Detachable Cable'>;
  }