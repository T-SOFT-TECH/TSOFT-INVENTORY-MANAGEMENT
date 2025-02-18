import { ProductStatus, BaseDocument } from "../base/base.interfaces";
import { AudioSpecs } from "../specs/audio-specs.interface";
import { CableSpecs } from "../specs/cable-specs.interface";
import { CameraSpecs } from "../specs/camera-specs.interface";
import { CaseSpecs } from "../specs/case-specs.interface";
import { ChargerSpecs } from "../specs/charger-specs.interface";
import { CoolingSpecs } from "../specs/cooling-specs.interface";
import { DesktopSpecs } from "../specs/desktop-specs.interface";
import { EducationalTechnologySpecs } from "../specs/educational-technology-specs.interface";
import { GamingAccessoriesSpecs } from "../specs/gaming-accessories-specs.interface";
import { GraphicsCardSpecs } from "../specs/graphics-card-specs.interface";
import { KeyboardSpecs } from "../specs/keyboard-specs.interface";
import { LaptopSpecs } from "../specs/laptop-specs.interface";
import { MemorySpecs } from "../specs/memory-specs.interface";
import { MiceSpecs } from "../specs/mice-specs.interface";
import { MobileDeviceSpecs } from "../specs/mobile-device-specs.interface";
import { MonitorSpecs } from "../specs/monitor-specs.interface";
import { MotherboardSpecs } from "../specs/motherboard-specs.interface";
import { NetworkCardSpecs } from "../specs/network-card-specs.interface";
import { NetworkSwitchSpecs } from "../specs/network-switch-specs.interface";
import { NetworkingSpecs } from "../specs/networking-specs.interface";
import { OfficeEquipmentSpecs } from "../specs/office-equipment-specs.interface";
import { PowerSupplySpecs } from "../specs/power-supply-specs.interface";
import { PrinterSpecs } from "../specs/printer-specs.interface";
import { ProcessorSpecs } from "../specs/processor-specs.interface";
import { RouterSpecs } from "../specs/router-specs.interface";
import { SecuritySystemSpecs } from "../specs/security-system-specs.interface";
import { SmartApplianceSpecs } from "../specs/smart-appliance-specs.interface";
import { SmartControlSpecs } from "../specs/smart-control-specs.interface";
import { SmartHomeSpecs } from "../specs/smart-home-specs.interface";
import { SmartSecuritySpecs } from "../specs/smart-security-specs.interface";
import { SmartphoneSpecs } from "../specs/smartphone-specs.interface";
import { SoftwareSpecs } from "../specs/software-specs.interface";
import { StorageDeviceSpecs } from "../specs/storage-device-specs.interface";
import { TabletSpecs } from "../specs/tablet-specs.interface";
import { WearableSpecs } from "../specs/wearable-specs.interface";
import {Category} from '../category/category.interfaces';
import {Brand} from '../brand/brand.interfaces';


export interface BaseProductFields {
  name: string;
  sku: string;
  brand: Brand;
  price: number;
  cost?: number;
  stockQuantity: number;
  lowStockThreshold: number;
  description: string;
  imageId?: string;
  status: ProductStatus;
}

export interface ProductSpecifications {
  [key: string]: any;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface Product extends BaseDocument, BaseProductFields {

  totalQuantitySold: number;
  totalRevenue: number;
  category: Category;
  specifications?: ProductSpecifications;
  audioSpecs?: AudioSpecs;
  cableSpecs?: CableSpecs;
  cameraSpecs?: CameraSpecs;
  caseSpecs?: CaseSpecs;
  chargerSpecs?: ChargerSpecs;
  coolingSpecs?: CoolingSpecs;
  desktopSpecs?: DesktopSpecs;
  educationalTechnologySpecs?: EducationalTechnologySpecs;
  gamingAccessoriesSpecs?: GamingAccessoriesSpecs;
  graphicsCardSpecs?: GraphicsCardSpecs;
  keyboardSpecs?: KeyboardSpecs;
  laptopSpecs?: LaptopSpecs;
  memorySpecs?: MemorySpecs;
  miceSpecs?: MiceSpecs;
  mobileDeviceSpecs?: MobileDeviceSpecs;
  monitorSpecs?: MonitorSpecs;
  motherboardSpecs?: MotherboardSpecs;
  networkCardSpecs?: NetworkCardSpecs;
  networkingSpecs?: NetworkingSpecs;
  networkSwitchSpecs?: NetworkSwitchSpecs;
  officeEquipmentSpecs?: OfficeEquipmentSpecs;
  powerSupplySpecs?: PowerSupplySpecs;
  printerSpecs?: PrinterSpecs;
  processorSpecs?: ProcessorSpecs;
  routerSpecs?: RouterSpecs;
  securitySystemSpecs?: SecuritySystemSpecs;
  smartApplianceSpecs?: SmartApplianceSpecs;
  smartControlSpecs?: SmartControlSpecs;
  smartHomeSpecs?: SmartHomeSpecs;
  smartphoneSpecs?: SmartphoneSpecs;
  smartSecuritySpecs?: SmartSecuritySpecs;
  softwareSpecs?: SoftwareSpecs;
  storageDeviceSpecs?: StorageDeviceSpecs;
  tabletSpecs?: TabletSpecs;
  wearableSpecs?: WearableSpecs;
}

export interface ProductInput {
  name: string;
  description: string;
  category: string;
  sku: string;
  price: number;
  cost: number;
  stockQuantity: number;
  lowStockThreshold: number;
  status: ProductStatus;
  imageId?: string;
  brand?: string;
  specifications?: Record<string, any>;
}

export interface StorageDeviceFields extends BaseProductFields {
  capacity: number;
  readSpeed: number;
  writeSpeed: number;
  storageType: 'SSD' | 'HDD' | 'Flash Drive' | 'Memory Card';
  interface?: 'SATA' | 'NVMe' | 'USB' | 'SD';
  formFactor?: string;
}

export interface ChargerFields extends BaseProductFields {
  outputWattage: number;
  inputVoltage: string;
  outputVoltage: string;
  compatibleDevices: string[];
  cableLength?: number;
  connectorType: string;
}

export interface ModemFields extends BaseProductFields {
  wifiStandard: string;
  maxSpeed: number;
  bands: string[];
  ports: {
    ethernet: number;
    usb: number;
  };
  antennas: number;
  features: string[];
}

/*export interface BaseProduct extends BaseDocument {
  name: string;
  category: Category;
  brand: string;
  description: string;
  price: number;
  stockQuantity: number;
  lowStockThreshold: number;
  sku: string;
  status: ProductStatus;
  imageId?: string;
  specifications?: Record<string, any>;
}*/

export type ProductFields = BaseProductFields | StorageDeviceFields | ChargerFields | ModemFields;
export type BaseProduct = Product;
