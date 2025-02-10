export interface CameraSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    cameraType: string;
    sensorType: string;
    resolution: number;
    videoResolution: string[];
    lensMount?: string;
    focalLength?: string;
    aperture?: string;
    stabilization: string[];
    displaySize: number;
    touchscreen?: boolean;
    viewfinder?: string;
    connectivity: string[];
    storageType: string[];
    batteryLife: number;
    weatherSealing?: boolean;
    weight: number;
  }