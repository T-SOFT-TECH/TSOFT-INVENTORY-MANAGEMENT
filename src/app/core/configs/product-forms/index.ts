import { CategoryFormConfig } from './product-form.types';

// Computer & Components
import { laptopsConfig } from './laptops.config';
import { desktopsConfig } from './desktops.config';
import { processorsConfig } from './processors.config';
import { graphicsCardsConfig } from './graphics-cards.config';
import { motherboardConfig } from './motherboards.config';
import { memoryConfig } from './memory.config';
import { storageDevicesConfig } from './storage-devices.config';
import { powerSupplyConfig } from './power-supplies.config';
import { caseConfig } from './cases.config';
import { coolingConfig } from './cooling.config';

// Peripherals
import { monitorConfig } from './monitors.config';
import { keyboardConfig } from './keyboards.config';
import { miceConfig } from './mice.config';
import { printersConfig } from './printers.config';


// Networking
import { routersConfig } from './routers.config';
import { networkSwitchesConfig } from './network-switches.config';
import { networkCardsConfig } from './network-cards.config';
import { networkingConfig } from './networking.config';

// Audio/Video
import { audioConfig } from './audio.config';
import { camerasConfig } from './cameras.config';


// Mobile & Wearables
import { smartphonesConfig } from './smartphones.config';
import { tabletsConfig } from './tablets.config';
import { wearablesConfig } from './wearables.config';

// Smart Home
import { smartSecurityConfig } from './smart-security.config';
import { smartControlsConfig } from './smart-controls.config';
import { smartAppliancesConfig } from './smart-appliances.config';

// Gaming
import { gamingAccessoriesConfig } from './gaming-accessories.config';


// Others
import { cablesConfig } from './cables.config';
import { chargersConfig } from './chargers.config';
import { softwareConfig } from './software.config';
import { officeEquipmentConfig } from './office-equipment.config';
import { educationalTechnologyConfig } from './educational-technology.config';

export const productFormConfigs: Map<string, CategoryFormConfig> = new Map([
  // Computer & Components
  [laptopsConfig.id, laptopsConfig],
  [desktopsConfig.id, desktopsConfig],
  [processorsConfig.id, processorsConfig],
  [graphicsCardsConfig.id, graphicsCardsConfig],
  [motherboardConfig.id, motherboardConfig],
  [memoryConfig.id, memoryConfig],
  [storageDevicesConfig.id, storageDevicesConfig],
  [powerSupplyConfig.id, powerSupplyConfig],
  [caseConfig.id, caseConfig],
  [coolingConfig.id, coolingConfig],

  // Peripherals
  [monitorConfig.id, monitorConfig],
  [keyboardConfig.id, keyboardConfig],
  [miceConfig.id, miceConfig],
  [printersConfig.id, printersConfig],


  // Networking
  [routersConfig.id, routersConfig],
  [networkSwitchesConfig.id, networkSwitchesConfig],
  [networkCardsConfig.id, networkCardsConfig],
  [networkingConfig.id, networkingConfig],

  // Audio/Video
  [audioConfig.id, audioConfig],
  [camerasConfig.id, camerasConfig],


  // Mobile & Wearables
  [smartphonesConfig.id, smartphonesConfig],
  [tabletsConfig.id, tabletsConfig],
  [wearablesConfig.id, wearablesConfig],

  // Smart Home
  [smartSecurityConfig.id, smartSecurityConfig],
  [smartControlsConfig.id, smartControlsConfig],
  [smartAppliancesConfig.id, smartAppliancesConfig],

  // Gaming
  [gamingAccessoriesConfig.id, gamingAccessoriesConfig],


  // Others
  [cablesConfig.id, cablesConfig],
  [chargersConfig.id, chargersConfig],
  [softwareConfig.id, softwareConfig],
  [officeEquipmentConfig.id, officeEquipmentConfig],
  [educationalTechnologyConfig.id, educationalTechnologyConfig]
]);

// Export all configs individually
export {
  // Computer & Components
  laptopsConfig,
  desktopsConfig,
  processorsConfig,
  graphicsCardsConfig,
  motherboardConfig,
  memoryConfig,
  storageDevicesConfig,
  powerSupplyConfig,
  caseConfig,
  coolingConfig,

  // Peripherals
  monitorConfig,
  keyboardConfig,
  miceConfig,
  printersConfig,


  // Networking
  routersConfig,
  networkSwitchesConfig,
  networkCardsConfig,
  networkingConfig,

  // Audio/Video
  audioConfig,
  camerasConfig,

  // Mobile & Wearables
  smartphonesConfig,
  tabletsConfig,
  wearablesConfig,

  // Smart Home
  smartSecurityConfig,
  smartControlsConfig,
  smartAppliancesConfig,

  // Gaming
  gamingAccessoriesConfig,


  // Others
  cablesConfig,
  chargersConfig,
  softwareConfig,
  officeEquipmentConfig,
  educationalTechnologyConfig
};

// Export types
export * from './product-form.types';

// Computer & Components
export * from './laptops.config';
export * from './desktops.config';
export * from './processors.config';
export * from './graphics-cards.config';
export * from './motherboards.config';
export * from './memory.config';
export * from './storage-devices.config';
export * from './power-supplies.config';
export * from './cases.config';
export * from './cooling.config';

// Peripherals
export * from './monitors.config';
export * from './keyboards.config';
export * from './mice.config';
export * from './printers.config';

// Networking
export * from './routers.config';
export * from './network-switches.config';
export * from './network-cards.config';
export * from './networking.config';

// Audio/Video
export * from './audio.config';
export * from './cameras.config';

// Mobile & Wearables
export * from './smartphones.config';
export * from './tablets.config';
export * from './wearables.config';

// Smart Home
export * from './smart-security.config';
export * from './smart-controls.config';
export * from './smart-appliances.config';

// Gaming
export * from './gaming-accessories.config';

// Others
export * from './cables.config';
export * from './chargers.config';
export * from './software.config';
export * from './office-equipment.config';
export * from './educational-technology.config';

// Helper function to get configuration by category ID
export function getFormConfigById(id: string): CategoryFormConfig | undefined {
  return productFormConfigs.get(id);
}

// Helper function to get all available category IDs
export function getAllCategoryIds(): string[] {
  return Array.from(productFormConfigs.keys());
}

// Helper function to get all configurations as an array
export function getAllConfigs(): CategoryFormConfig[] {
  return Array.from(productFormConfigs.values());
}

// Helper function to update brand options across all configurations
export function updateBrandOptionsForAllConfigs(brands: string[]): void {
  productFormConfigs.forEach(config => {
    const brandField = config.fields.find(field => field.name === 'brandId');
    if (brandField) {
      brandField.options = brands;
    }
  });
}
