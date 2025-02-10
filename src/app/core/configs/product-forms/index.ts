import { CategoryFormConfig } from './product-form.types';

// Computer & Components
import { twoInOneLaptopsConfig } from './2-in-1-laptops.config';
import { allInOnePcsConfig } from './all-in-one-pcs.config';
import { businessLaptopsConfig } from './business-laptops.config';
import { gamingDesktopsConfig } from './gaming-desktops.config';
import { gamingLaptopsConfig } from './gaming-laptops.config';
import { miniPcsConfig } from './mini-pcs.config';
import { ultrabooksConfig } from './ultrabooks.config';
import { workstationsConfig } from './workstations.config';
import { processorsCpusConfig } from './processors-cpus.config';
import { graphicsCardsConfig } from './graphics-cards.config';
import { motherboardsConfig } from './motherboards.config';
import { ramMemoryConfig } from './ram-memory.config';
import { storageDevicesConfig } from './storage-devices.config';
import { powerSuppliesConfig } from './power-supplies.config';
import { pcCasesConfig } from './pc-cases.config';
import { coolingSystemsConfig } from './cooling-systems.config';

// Peripherals
import { monitorsConfig } from './monitors.config';
import { keyboardsConfig } from './keyboards.config';
import { miceConfig } from './mice.config';
import { printersConfig } from './printers.config';
import { scannersConfig } from './scanners.config';
import { projectorsConfig } from './projectors.config';
import { interactiveDisplaysConfig } from './interactive-displays.config';
import { documentCamerasConfig } from './document-cameras.config';
import { documentScannersConfig } from './document-scanners.config';
import { labelPrintersConfig } from './label-printers.config';
import { paperShreddersConfig } from './paper-shredders.config';

// Networking
import { routersConfig } from './routers.config';
import { networkSwitchesConfig } from './network-switches.config';
import { enterpriseSwitchesConfig } from './enterprise-switches.config';
import { networkCardsConfig } from './network-cards.config';
import { networkSecurityConfig } from './network-security.config';
import { ethernetCablesConfig } from './ethernet-cables.config';
import { fiberOpticCablesConfig } from './fiber-optic-cables.config';
import { hdmiCablesConfig } from './hdmi-cables.config';
import { displayPortCablesConfig } from './displayport-cables.config';
import { usbCCablesConfig } from './usb-c-cables.config';
import { lightningCablesConfig } from './lightning-cables.config';

// Audio/Video
import { audioInterfaceConfig } from './audio-interface.config';
import { speakersConfig } from './speakers.config';
import { headphonesConfig } from './headphones.config';
import { microphonesConfig } from './microphones.config';
import { webcamsConfig } from './webcams.config';
import { securityCamerasConfig } from './security-cameras.config';
import { conferenceSystemsConfig } from './conference-systems.config';
import { studentResponseSystemsConfig } from './student-response-systems.config';

// Mobile & Wearables
import { smartphonesConfig } from './smartphones.config';
import { tabletsConfig } from './tablets.config';
import { educationalTabletsConfig } from './educational-tablets.config';
import { eReadersConfig } from './e-readers.config';
import { smartwatchesConfig } from './smartwatches.config';
import { smartBandsConfig } from './smart-bands.config';
import { watchBandsConfig } from './watch-bands.config';
import { watchChargersConfig } from './watch-chargers.config';
import { watchProtectorsConfig } from './watch-protectors.config';

// Smart Home
import { smartAppliancesConfig } from './smart-appliances.config';
import { smartDoorbellsConfig } from './smart-doorbells.config';
import { smartLightingConfig } from './smart-lighting.config';
import { smartLocksConfig } from './smart-locks.config';
import { smartPlugsConfig } from './smart-plugs.config';
import { smartSpeakersConfig } from './smart-speakers.config';

// Gaming


// Others

import { chargersConfig } from './chargers.config';
import { powerBanksConfig } from './power-banks.config';
import { surgeProtectorsConfig } from './surge-protectors.config';
import { upsSystemsConfig } from './ups-systems.config';
import { antivirusConfig } from './antivirus-software.config';
import { designSoftwareConfig } from './design-software.config';
import { developmentToolsConfig } from './development-tools.config';
import { officeSoftwareConfig } from './office-software.config';
import { operatingSystemsConfig } from './operating-systems.config';
import { phoneAccessoriesConfig } from './phone-accessories.config';
import { drawingTabletsConfig } from './drawing-tablets.config';
import { soundCardConfig } from './sound-card.config';

export const productFormConfigs: Map<string, CategoryFormConfig> = new Map([
  // Computer & Components
  [twoInOneLaptopsConfig.id, twoInOneLaptopsConfig],
  [allInOnePcsConfig.id, allInOnePcsConfig],
  [businessLaptopsConfig.id, businessLaptopsConfig],
  [gamingDesktopsConfig.id, gamingDesktopsConfig],
  [gamingLaptopsConfig.id, gamingLaptopsConfig],
  [miniPcsConfig.id, miniPcsConfig],
  [ultrabooksConfig.id, ultrabooksConfig],
  [workstationsConfig.id, workstationsConfig],
  [processorsCpusConfig.id, processorsCpusConfig],
  [graphicsCardsConfig.id, graphicsCardsConfig],
  [motherboardsConfig.id, motherboardsConfig],
  [ramMemoryConfig.id, ramMemoryConfig],
  [storageDevicesConfig.id, storageDevicesConfig],
  [powerSuppliesConfig.id, powerSuppliesConfig],
  [pcCasesConfig.id, pcCasesConfig],
  [coolingSystemsConfig.id, coolingSystemsConfig],

  // Peripherals
  [monitorsConfig.id, monitorsConfig],
  [keyboardsConfig.id, keyboardsConfig],
  [miceConfig.id, miceConfig],
  [printersConfig.id, printersConfig],
  [scannersConfig.id, scannersConfig],
  [projectorsConfig.id, projectorsConfig],
  [interactiveDisplaysConfig.id, interactiveDisplaysConfig],
  [documentCamerasConfig.id, documentCamerasConfig],
  [documentScannersConfig.id, documentScannersConfig],
  [labelPrintersConfig.id, labelPrintersConfig],
  [paperShreddersConfig.id, paperShreddersConfig],

  // Networking
  [routersConfig.id, routersConfig],
  [networkSwitchesConfig.id, networkSwitchesConfig],
  [enterpriseSwitchesConfig.id, enterpriseSwitchesConfig],
  [networkCardsConfig.id, networkCardsConfig],
  [networkSecurityConfig.id, networkSecurityConfig],
  [ethernetCablesConfig.id, ethernetCablesConfig],
  [fiberOpticCablesConfig.id, fiberOpticCablesConfig],
  [hdmiCablesConfig.id, hdmiCablesConfig],
  [displayPortCablesConfig.id, displayPortCablesConfig],
  [usbCCablesConfig.id, usbCCablesConfig],
  [lightningCablesConfig.id, lightningCablesConfig],

  // Audio/Video
  [audioInterfaceConfig.id, audioInterfaceConfig],
  [speakersConfig.id, speakersConfig],
  [headphonesConfig.id, headphonesConfig],
  [microphonesConfig.id, microphonesConfig],
  [webcamsConfig.id, webcamsConfig],
  [securityCamerasConfig.id, securityCamerasConfig],
  [conferenceSystemsConfig.id, conferenceSystemsConfig],
  [studentResponseSystemsConfig.id, studentResponseSystemsConfig],

  // Mobile & Wearables
  [smartphonesConfig.id, smartphonesConfig],
  [tabletsConfig.id, tabletsConfig],
  [educationalTabletsConfig.id, educationalTabletsConfig],
  [eReadersConfig.id, eReadersConfig],
  [smartwatchesConfig.id, smartwatchesConfig],
  [smartBandsConfig.id, smartBandsConfig],
  [watchBandsConfig.id, watchBandsConfig],
  [watchChargersConfig.id, watchChargersConfig],
  [watchProtectorsConfig.id, watchProtectorsConfig],

  // Smart Home

  [smartAppliancesConfig.id, smartAppliancesConfig],
  [smartDoorbellsConfig.id, smartDoorbellsConfig],
  [smartLightingConfig.id, smartLightingConfig],
  [smartLocksConfig.id, smartLocksConfig],
  [smartPlugsConfig.id, smartPlugsConfig],
  [smartSpeakersConfig.id, smartSpeakersConfig],

  // Gaming


  // Others
  [usbCCablesConfig.id, usbCCablesConfig],
  [chargersConfig.id, chargersConfig],
  [powerBanksConfig.id, powerBanksConfig],
  [surgeProtectorsConfig.id, surgeProtectorsConfig],
  [upsSystemsConfig.id, upsSystemsConfig],
  [antivirusConfig.id, antivirusConfig],
  [designSoftwareConfig.id, designSoftwareConfig],
  [developmentToolsConfig.id, developmentToolsConfig],
  [officeSoftwareConfig.id, officeSoftwareConfig],
  [operatingSystemsConfig.id, operatingSystemsConfig],
  [phoneAccessoriesConfig.id, phoneAccessoriesConfig],
  [drawingTabletsConfig.id, drawingTabletsConfig],
  [soundCardConfig.id, soundCardConfig],
]);

// Export all configs individually
export {
  // Computer & Components
  twoInOneLaptopsConfig,
  allInOnePcsConfig,
  businessLaptopsConfig,
  gamingDesktopsConfig,
  gamingLaptopsConfig,
  miniPcsConfig,
  ultrabooksConfig,
  workstationsConfig,
  processorsCpusConfig,
  graphicsCardsConfig,
  motherboardsConfig,
  ramMemoryConfig,
  storageDevicesConfig,
  powerSuppliesConfig,
  pcCasesConfig,
  coolingSystemsConfig,

  // Peripherals
  monitorsConfig,
  keyboardsConfig,
  miceConfig,
  printersConfig,
  scannersConfig,
  projectorsConfig,
  interactiveDisplaysConfig,
  documentCamerasConfig,
  documentScannersConfig,
  labelPrintersConfig,
  paperShreddersConfig,

  // Networking
  routersConfig,
  networkSwitchesConfig,
  enterpriseSwitchesConfig,
  networkCardsConfig,
  networkSecurityConfig,
  ethernetCablesConfig,
  fiberOpticCablesConfig,
  hdmiCablesConfig,
  displayPortCablesConfig,
  usbCCablesConfig,
  lightningCablesConfig,

  // Audio/Video
  audioInterfaceConfig,
  speakersConfig,
  headphonesConfig,
  microphonesConfig,
  webcamsConfig,
  securityCamerasConfig,
  conferenceSystemsConfig,
  studentResponseSystemsConfig,

  // Mobile & Wearables
  smartphonesConfig,
  tabletsConfig,
  educationalTabletsConfig,
  eReadersConfig,
  smartwatchesConfig,
  smartBandsConfig,
  watchBandsConfig,
  watchChargersConfig,
  watchProtectorsConfig,

  // Smart Home
  smartAppliancesConfig,
  smartDoorbellsConfig,
  smartLightingConfig,
  smartLocksConfig,
  smartPlugsConfig,
  smartSpeakersConfig,

  // Gaming


  // Others
  chargersConfig,
  powerBanksConfig,
  surgeProtectorsConfig,
  upsSystemsConfig,
  antivirusConfig,
  designSoftwareConfig,
  developmentToolsConfig,
  officeSoftwareConfig,
  operatingSystemsConfig,
  phoneAccessoriesConfig,
  drawingTabletsConfig,
  soundCardConfig,
};

// Export types
export * from './product-form.types';

// Export all config files
export * from './2-in-1-laptops.config';
export * from './all-in-one-pcs.config';
export * from './business-laptops.config';
export * from './gaming-desktops.config';
export * from './gaming-laptops.config';
export * from './mini-pcs.config';
export * from './ultrabooks.config';
export * from './workstations.config';
export * from './processors-cpus.config';
export * from './graphics-cards.config';
export * from './motherboards.config';
export * from './ram-memory.config';
export * from './storage-devices.config';
export * from './power-supplies.config';
export * from './pc-cases.config';
export * from './cooling-systems.config';

export * from './monitors.config';
export * from './keyboards.config';
export * from './mice.config';
export * from './printers.config';
export * from './scanners.config';
export * from './projectors.config';
export * from './interactive-displays.config';
export * from './document-cameras.config';
export * from './document-scanners.config';
export * from './label-printers.config';
export * from './paper-shredders.config';

export * from './routers.config';
export * from './network-switches.config';
export * from './enterprise-switches.config';
export * from './network-cards.config';
export * from './network-security.config';
export * from './ethernet-cables.config';
export * from './fiber-optic-cables.config';
export * from './hdmi-cables.config';
export * from './displayport-cables.config';
export * from './usb-c-cables.config';
export * from './lightning-cables.config';

export * from './speakers.config';
export * from './headphones.config';
export * from './microphones.config';
export * from './webcams.config';
export * from './security-cameras.config';
export * from './conference-systems.config';
export * from './student-response-systems.config';

export * from './smartphones.config';
export * from './tablets.config';
export * from './educational-tablets.config';
export * from './e-readers.config';
export * from './smartwatches.config';
export * from './smart-bands.config';
export * from './watch-bands.config';
export * from './watch-chargers.config';
export * from './watch-protectors.config';

export * from './smart-appliances.config';
export * from './smart-doorbells.config';
export * from './smart-lighting.config';
export * from './smart-locks.config';
export * from './smart-plugs.config';
export * from './smart-speakers.config';



export * from './chargers.config';
export * from './power-banks.config';
export * from './surge-protectors.config';
export * from './ups-systems.config';
export * from './antivirus-software.config';
export * from './design-software.config';
export * from './development-tools.config';
export * from './office-software.config';
export * from './operating-systems.config';
export * from './phone-accessories.config';
export * from './drawing-tablets.config';
export * from './sound-card.config';

// Helper functions
export function getFormConfigById(id: string): CategoryFormConfig | undefined {
  return productFormConfigs.get(id);
}

export function getAllCategoryIds(): string[] {
  return Array.from(productFormConfigs.keys());
}

export function getAllConfigs(): CategoryFormConfig[] {
  return Array.from(productFormConfigs.values());
}

export function updateBrandOptionsForAllConfigs(brands: string[]): void {
  productFormConfigs.forEach(config => {
    const brandField = config.fields.find(field => field.name === 'brandId');
    if (brandField) {
      brandField.options = brands;
    }
  });
}
