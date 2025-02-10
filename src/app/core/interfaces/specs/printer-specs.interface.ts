export interface PrinterSpecs {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    productId: string;
  
    deviceType: string;
    printTechnology: string;
    printColor: string;
    printResolution: string;
    printSpeed: number;
    duplexPrinting?: boolean;
    paperSize: string[];
    connectivity: string[];
    mobilePrinting?: string[];
    scannerType?: string;
    scanResolution?: string;
    documentFeeder?: boolean;
    paperTrayCapacity: number;
    monthlyDutyCycle: number;
    displayScreen?: boolean;
    faxFunction?: boolean;
  }