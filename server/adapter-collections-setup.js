const sdk = require("node-appwrite");
require('dotenv').config();

const DELAY_BETWEEN_OPERATIONS = 1000; // 1 second delay between operations
const DELAY_BETWEEN_COLLECTIONS = 2000; // 2 seconds delay between collections


// Adapter and Converter collections with their attributes
const adapterCollections = {
  // Original categories
  usbToEthernetAdapters: {
    name: 'usb_to_ethernet_adapters_specs',
    attributes: [
      { key: 'usbVersion', type: 'string', required: true, size: 50 },
      { key: 'ethernetSpeed', type: 'string', required: true, size: 100 },
      { key: 'chipset', type: 'string', required: false, size: 50 },
      { key: 'powerDeliveryPassthrough', type: 'boolean', required: false },
      { key: 'additionalPorts', type: 'string', required: false, size: 100 },
      { key: 'compatibleOs', type: 'string', required: true, size: 100 },
      { key: 'driverRequired', type: 'boolean', required: false },
      { key: 'cableLength', type: 'double', required: false },
      { key: 'compactDesign', type: 'boolean', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'ledIndicator', type: 'boolean', required: false },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  usbcToHdmiAdapters: {
    name: 'usbc_to_hdmi_adapters_specs',
    attributes: [
      { key: 'hdmiVersion', type: 'string', required: true, size: 50 },
      { key: 'maxResolution', type: 'string', required: true, size: 100 },
      { key: 'refreshRate', type: 'string', required: true, size: 50 },
      { key: 'altModeSupport', type: 'boolean', required: true },
      { key: 'thunderboltCompatible', type: 'boolean', required: false },
      { key: 'powerDeliveryPassthrough', type: 'boolean', required: false },
      { key: 'pdWattage', type: 'string', required: false, size: 50 },
      { key: 'additionalPorts', type: 'string', required: false, size: 100 },
      { key: 'hdrSupport', type: 'boolean', required: false },
      { key: 'hdcpSupport', type: 'string', required: false, size: 50 },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'cableLength', type: 'double', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  hdmiToVgaAdapters: {
    name: 'hdmi_to_vga_adapters_specs',
    attributes: [
      { key: 'maxResolution', type: 'string', required: true, size: 100 },
      { key: 'refreshRate', type: 'string', required: false, size: 50 },
      { key: 'signalConversion', type: 'string', required: false, size: 50 },
      { key: 'audioSupport', type: 'boolean', required: false },
      { key: 'audioOutput', type: 'string', required: false, size: 100 },
      { key: 'powerRequired', type: 'boolean', required: false },
      { key: 'powerSource', type: 'string', required: false, size: 100 },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'chipset', type: 'string', required: false, size: 50 },
      { key: 'cableLength', type: 'double', required: false },
      { key: 'connectorType', type: 'string', required: false, size: 50 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  otgCables: {
    name: 'otg_cables_specs',
    attributes: [
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'usbVersion', type: 'string', required: true, size: 50 },
      { key: 'dataTransferRate', type: 'string', required: false, size: 100 },
      { key: 'powerDelivery', type: 'boolean', required: false },
      { key: 'length', type: 'double', required: true },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'deviceSupport', type: 'string', required: false, size: 100 },
      { key: 'peripheralSupport', type: 'string', required: false, size: 100 },
      { key: 'powerRequired', type: 'boolean', required: false },
      { key: 'hubFeature', type: 'boolean', required: false },
      { key: 'chargingSupport', type: 'boolean', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  microUsbToUsbA: {
    name: 'micro_usb_to_usb_a_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'usbVersion', type: 'string', required: true, size: 50 },
      { key: 'dataTransferRate', type: 'string', required: false, size: 100 },
      { key: 'fastCharging', type: 'boolean', required: false },
      { key: 'chargingProtocol', type: 'string', required: false, size: 100 },
      { key: 'maxCurrent', type: 'string', required: false, size: 50 },
      { key: 'connectorStyle', type: 'string', required: false, size: 100 },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'shielding', type: 'string', required: false, size: 100 },
      { key: 'deviceSupport', type: 'string', required: false, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  microUsbToUsbC: {
    name: 'micro_usb_to_usb_c_specs',
    attributes: [
      { key: 'direction', type: 'string', required: true, size: 100 },
      { key: 'length', type: 'double', required: false },
      { key: 'adapterType', type: 'string', required: false, size: 50 },
      { key: 'usbVersion', type: 'string', required: true, size: 50 },
      { key: 'dataTransferRate', type: 'string', required: false, size: 100 },
      { key: 'chargingSupport', type: 'boolean', required: false },
      { key: 'maxCurrent', type: 'string', required: false, size: 50 },
      { key: 'powerDelivery', type: 'boolean', required: false },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  usbCToUsbA: {
    name: 'usb_c_to_usb_a_specs',
    attributes: [
      { key: 'direction', type: 'string', required: true, size: 100 },
      { key: 'length', type: 'double', required: false },
      { key: 'adapterType', type: 'string', required: false, size: 50 },
      { key: 'usbVersion', type: 'string', required: true, size: 50 },
      { key: 'dataTransferRate', type: 'string', required: false, size: 100 },
      { key: 'chargingSupport', type: 'boolean', required: false },
      { key: 'maxCurrent', type: 'string', required: false, size: 50 },
      { key: 'powerDelivery', type: 'boolean', required: false },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'connectorFinish', type: 'string', required: false, size: 100 },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  lightningTo35mm: {
    name: 'lightning_to_35mm_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'audioQuality', type: 'string', required: false, size: 50 },
      { key: 'dacType', type: 'string', required: false, size: 100 },
      { key: 'impedanceSupport', type: 'string', required: false, size: 100 },
      { key: 'remoteControl', type: 'boolean', required: false },
      { key: 'micSupport', type: 'boolean', required: false },
      { key: 'mfiCertified', type: 'boolean', required: true },
      { key: 'originalApple', type: 'boolean', required: false },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'chargingSupport', type: 'boolean', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  usbCTo35mm: {
    name: 'usb_c_to_35mm_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'audioQuality', type: 'string', required: false, size: 50 },
      { key: 'dacType', type: 'string', required: false, size: 50 },
      { key: 'sampleRate', type: 'string', required: false, size: 50 },
      { key: 'impedanceSupport', type: 'string', required: false, size: 100 },
      { key: 'remoteControl', type: 'boolean', required: false },
      { key: 'micSupport', type: 'boolean', required: false },
      { key: 'powerDeliveryPassthrough', type: 'boolean', required: false },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'connectorMaterial', type: 'string', required: false, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  dviToHdmiAdapters: {
    name: 'dvi_to_hdmi_adapters_specs',
    attributes: [
      { key: 'dviType', type: 'string', required: true, size: 100 },
      { key: 'direction', type: 'string', required: true, size: 100 },
      { key: 'maxResolution', type: 'string', required: true, size: 100 },
      { key: 'adapterType', type: 'string', required: true, size: 50 },
      { key: 'length', type: 'double', required: false },
      { key: 'audioSupport', type: 'boolean', required: false },
      { key: 'signalConversion', type: 'string', required: false, size: 50 },
      { key: 'connectorFinish', type: 'string', required: false, size: 100 },
      { key: 'hdcpSupport', type: 'boolean', required: false },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  lightningToUsbA: {
    name: 'lightning_to_usb_a_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'dataTransferRate', type: 'string', required: false, size: 100 },
      { key: 'chargingSpeed', type: 'string', required: false, size: 50 },
      { key: 'connectorStyle', type: 'string', required: false, size: 100 },
      { key: 'mfiCertified', type: 'boolean', required: true },
      { key: 'originalApple', type: 'boolean', required: false },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'connectorFinish', type: 'string', required: false, size: 100 },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'reinforcedConnector', type: 'boolean', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  // New categories
  memoryCardReaders: {
    name: 'memory_card_readers_specs',
    attributes: [
      { key: 'readerType', type: 'string', required: true, size: 50 },
      { key: 'connectionInterface', type: 'string', required: true, size: 50 },
      { key: 'usbVersion', type: 'string', required: true, size: 50 },
      { key: 'supportedCardFormats', type: 'string', required: true, array: true, size: 50 },
      { key: 'transferSpeed', type: 'string', required: false, size: 100 },
      { key: 'simultaneousReadWrite', type: 'boolean', required: false },
      { key: 'compactDesign', type: 'boolean', required: false },
      { key: 'ledIndicator', type: 'boolean', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  usbcDockingStations: {
    name: 'usbc_docking_stations_specs',
    attributes: [
      { key: 'totalPorts', type: 'integer', required: true },
      { key: 'usbCPorts', type: 'integer', required: true },
      { key: 'usbAPorts', type: 'integer', required: true },
      { key: 'displayPorts', type: 'string', required: false, array: true, size: 100 },
      { key: 'maxDisplays', type: 'string', required: false, size: 50 },
      { key: 'maxResolution', type: 'string', required: false, size: 100 },
      { key: 'ethernetPort', type: 'boolean', required: false },
      { key: 'ethernetSpeed', type: 'string', required: false, size: 50 },
      { key: 'cardReader', type: 'boolean', required: false },
      { key: 'supportedCardFormats', type: 'string', required: false, array: true, size: 50 },
      { key: 'audioJacks', type: 'string', required: false, size: 100 },
      { key: 'powerDelivery', type: 'boolean', required: true },
      { key: 'maxPowerDelivery', type: 'string', required: false, size: 50 },
      { key: 'dataTransferSpeed', type: 'string', required: false, size: 50 },
      { key: 'compatibleSystems', type: 'string', required: false, array: true, size: 50 },
      { key: 'additionalFeatures', type: 'string', required: false, array: true, size: 100 },
      { key: 'powerSource', type: 'string', required: false, size: 50 },
      { key: 'mountingOptions', type: 'string', required: false, array: true, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  usbcHubs: {
    name: 'usbc_hubs_specs',
    attributes: [
      { key: 'totalPorts', type: 'integer', required: true },
      { key: 'usbCPorts', type: 'integer', required: true },
      { key: 'usbAPorts', type: 'integer', required: true },
      { key: 'usbVersion', type: 'string', required: false, size: 50 },
      { key: 'displayPorts', type: 'string', required: false, array: true, size: 100 },
      { key: 'ethernetPort', type: 'boolean', required: false },
      { key: 'cardReader', type: 'boolean', required: false },
      { key: 'audioJack', type: 'boolean', required: false },
      { key: 'powerDelivery', type: 'boolean', required: false },
      { key: 'maxPowerDelivery', type: 'string', required: false, size: 50 },
      { key: 'portArrangement', type: 'string', required: false, size: 100 },
      { key: 'cableLength', type: 'double', required: false },
      { key: 'cableFixed', type: 'boolean', required: false },
      { key: 'compactDesign', type: 'boolean', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  usbAHubs: {
    name: 'usba_hubs_specs',
    attributes: [
      { key: 'totalPorts', type: 'integer', required: true },
      { key: 'usbVersion', type: 'string', required: true, size: 50 },
      { key: 'dataTransferSpeed', type: 'string', required: false, size: 100 },
      { key: 'portArrangement', type: 'string', required: false, size: 50 },
      { key: 'powerSupply', type: 'string', required: false, size: 50 },
      { key: 'ledIndicators', type: 'boolean', required: false },
      { key: 'individualSwitches', type: 'boolean', required: false },
      { key: 'cableLength', type: 'double', required: false },
      { key: 'cableFixed', type: 'boolean', required: false },
      { key: 'compatibleSystems', type: 'string', required: false, array: true, size: 50 },
      { key: 'mountingOptions', type: 'string', required: false, array: true, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  hybridUsbHubs: {
    name: 'hybrid_usb_hubs_specs',
    attributes: [
      { key: 'totalPorts', type: 'integer', required: true },
      { key: 'usbCPorts', type: 'integer', required: true },
      { key: 'usbAPorts', type: 'integer', required: true },
      { key: 'connectionType', type: 'string', required: true, size: 50 },
      { key: 'usbVersion', type: 'string', required: true, size: 50 },
      { key: 'dataTransferSpeed', type: 'string', required: false, size: 100 },
      { key: 'additionalPorts', type: 'string', required: false, array: true, size: 100 },
      { key: 'powerDelivery', type: 'boolean', required: false },
      { key: 'maxPowerDelivery', type: 'string', required: false, size: 50 },
      { key: 'powerSupply', type: 'string', required: false, size: 50 },
      { key: 'ledIndicators', type: 'boolean', required: false },
      { key: 'portArrangement', type: 'string', required: false, size: 100 },
      { key: 'cableLength', type: 'double', required: false },
      { key: 'compatibleSystems', type: 'string', required: false, array: true, size: 50 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  lightningDockingStations: {
    name: 'lightning_docking_stations_specs',
    attributes: [
      { key: 'compatibleDevices', type: 'string', required: true, array: true, size: 100 },
      { key: 'audioOutput', type: 'string', required: false, array: true, size: 100 },
      { key: 'additionalPorts', type: 'string', required: false, array: true, size: 100 },
      { key: 'chargingCapabilities', type: 'string', required: true, size: 100 },
      { key: 'mfiCertified', type: 'boolean', required: true },
      { key: 'caseFriendly', type: 'string', required: false, size: 50 },
      { key: 'adjustableConnector', type: 'boolean', required: false },
      { key: 'originalApple', type: 'boolean', required: false },
      { key: 'standType', type: 'string', required: false, size: 100 },
      { key: 'material', type: 'string', required: false, size: 100 },
      { key: 'powerSource', type: 'string', required: false, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  surfaceDockingStations: {
    name: 'surface_docking_stations_specs',
    attributes: [
      { key: 'compatibleSurfaceModels', type: 'string', required: true, array: true, size: 100 },
      { key: 'connectionType', type: 'string', required: true, size: 100 },
      { key: 'totalPorts', type: 'integer', required: true },
      { key: 'usbCPorts', type: 'integer', required: false },
      { key: 'usbAPorts', type: 'integer', required: false },
      { key: 'displayPorts', type: 'string', required: false, array: true, size: 100 },
      { key: 'maxDisplays', type: 'string', required: false, size: 50 },
      { key: 'ethernetPort', type: 'boolean', required: false },
      { key: 'audioJacks', type: 'string', required: false, size: 100 },
      { key: 'powerDelivery', type: 'boolean', required: true },
      { key: 'originalMicrosoft', type: 'boolean', required: false },
      { key: 'securityFeatures', type: 'string', required: false, array: true, size: 100 },
      { key: 'powerAdapter', type: 'boolean', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  hardDiskEnclosures: {
    name: 'hard_disk_enclosures_specs',
    attributes: [
      { key: 'compatibleDriveTypes', type: 'string', required: true, size: 100 },
      { key: 'driveCapacity', type: 'string', required: false, size: 100 },
      { key: 'driveBays', type: 'integer', required: true },
      { key: 'interfaceType', type: 'string', required: true, array: true, size: 100 },
      { key: 'dataTransferRate', type: 'string', required: false, size: 100 },
      { key: 'raidSupport', type: 'boolean', required: false },
      { key: 'raidModes', type: 'string', required: false, array: true, size: 100 },
      { key: 'toollessInstallation', type: 'boolean', required: false },
      { key: 'coolingSystem', type: 'string', required: false, size: 100 },
      { key: 'powerSupply', type: 'string', required: false, size: 100 },
      { key: 'hotSwappable', type: 'boolean', required: false },
      { key: 'material', type: 'string', required: false, size: 100 },
      { key: 'ledIndicator', type: 'boolean', required: false },
      { key: 'compatibleSystems', type: 'string', required: false, array: true, size: 100 },
      { key: 'cableIncluded', type: 'boolean', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  ssdEnclosures: {
    name: 'ssd_enclosures_specs',
    attributes: [
      { key: 'compatibleDriveTypes', type: 'string', required: true, array: true, size: 100 },
      { key: 'formFactorsSupported', type: 'string', required: false, array: true, size: 100 },
      { key: 'interfaceType', type: 'string', required: true, array: true, size: 100 },
      { key: 'dataTransferRate', type: 'string', required: false, size: 100 },
      { key: 'trimSupport', type: 'boolean', required: false },
      { key: 'toollessInstallation', type: 'boolean', required: false },
      { key: 'enclosureMaterial', type: 'string', required: false, size: 100 },
      { key: 'thermalSolution', type: 'string', required: false, size: 100 },
      { key: 'cableIncluded', type: 'boolean', required: false },
      { key: 'cableType', type: 'string', required: false, size: 100 },
      { key: 'portableDesign', type: 'boolean', required: false },
      { key: 'shockResistant', type: 'boolean', required: false },
      { key: 'ledIndicator', type: 'boolean', required: false },
      { key: 'busOrAdapterPowered', type: 'string', required: false, size: 100 },
      { key: 'compatibleSystems', type: 'string', required: false, array: true, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  }
};

// Initialize Appwrite client
const client = new sdk.Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

// Create a Databases service
const database = new sdk.Databases(client);
const databaseId = process.env.APPWRITE_DATABASE_ID || 'inventory-invoice-db';
const baseCollectionId = 'products';

// Function to introduce a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to validate collection ID format
async function validateCollectionId(collectionId) {
  if (!collectionId.match(/^[a-zA-Z0-9_]+$/)) {
    throw new Error(`Invalid collection ID: ${collectionId}`);
  }
}

// Async function to create a collection in Appwrite with permissions
async function createCollection(collectionId, name) {
  try {
    await validateCollectionId(collectionId);

    console.log(`Creating collection: ${collectionId} with permissions`);

    const permissions = [
      sdk.Permission.read(sdk.Role.users()),
      sdk.Permission.create(sdk.Role.users()),
      sdk.Permission.update(sdk.Role.users()),
      sdk.Permission.delete(sdk.Role.users()),
    ];

    await database.createCollection(
      databaseId,
      collectionId,
      name,
      permissions
    );

    console.log(`Created collection: ${collectionId} with permissions set`);
    await delay(DELAY_BETWEEN_OPERATIONS);
  } catch (error) {
    if (error.code === 409) {
      console.log(`Collection ${collectionId} already exists`);
    } else {
      console.error(`Failed to create collection ${collectionId}:`, error.message);
      throw error;
    }
  }
}

// Async function to create attributes within a collection
async function createAttributes(collectionId, attributes) {
  for (const attr of attributes) {
    try {
      console.log(`Creating attribute: ${attr.key} in ${collectionId}`);

      if (!attr.type) {
        throw new Error(`Missing type for attribute ${attr.key}`);
      }

      switch (attr.type) {
        case 'string':
          await database.createStringAttribute(
            databaseId,
            collectionId,
            attr.key,
            attr.size || 255,
            attr.required,
            attr.default,
            attr.array || false
          );
          break;

        case 'double':
          await database.createFloatAttribute(
            databaseId,
            collectionId,
            attr.key,
            attr.required,
            attr.min || -999999999,
            attr.max || 999999999,
            attr.default,
            attr.array || false
          );
          break;

        case 'integer':
          await database.createIntegerAttribute(
            databaseId,
            collectionId,
            attr.key,
            attr.required,
            attr.min || -999999999,
            attr.max || 999999999,
            attr.default,
            attr.array || false
          );
          break;

        case 'boolean':
          await database.createBooleanAttribute(
            databaseId,
            collectionId,
            attr.key,
            attr.required,
            attr.default,
            attr.array || false
          );
          break;

        default:
          throw new Error(`Unsupported attribute type: ${attr.type}`);
      }

      console.log(`Created attribute: ${attr.key} in ${collectionId}`);
      await delay(DELAY_BETWEEN_OPERATIONS);
    } catch (error) {
      if (error.code === 409) {
        console.log(`Attribute ${attr.key} already exists in ${collectionId}`);
      } else {
        console.error(`Failed to create attribute ${attr.key}:`, error.message);
        console.error('Full error:', error);
      }
    }
  }
}

// Async function to create a relationship attribute between collections
async function createRelationship(categoryCollectionId, forceTwoWay = false) {
  try {
    console.log(`Creating relationship for ${categoryCollectionId}`);
    await delay(2000);

    const shortName = categoryCollectionId.replace('_specs', '');
    const twoWayKey = `${shortName}_pid`.substring(0, 30);

    const isTwoWay = forceTwoWay;

    await database.createRelationshipAttribute(
      databaseId,
      categoryCollectionId,
      baseCollectionId,
      'oneToOne',
      isTwoWay,
      'product',
      twoWayKey,
      'cascade'
    );

    console.log(`Created ${isTwoWay ? 'two-way' : 'one-way'} relationship for ${categoryCollectionId}`);
    await delay(3000);
    return true;
  } catch (error) {
    if (error.code === 409) {
      console.log(`Relationship for ${categoryCollectionId} already exists`);
      return true;
    } else {
      console.error(`Failed to create relationship for ${categoryCollectionId}:`, error.message);

      if (!forceTwoWay) {
        console.log(`Trying two-way relationship instead for ${categoryCollectionId}`);
        return await createRelationship(categoryCollectionId, true);
      } else {
        console.error(`Both relationship types failed for ${categoryCollectionId}. Marking for manual creation.`);
        return false;
      }
    }
  }
}

// Main function to set up database
async function setupAdapterCollections() {
  try {
    console.log('Starting adapter collections database setup...');

    // Collections needing manual relationship creation
    const needManualRelationships = [];

    // Phase 1: Create all adapter collections and attributes
    let collectionCount = 0;
    for (const [category, config] of Object.entries(adapterCollections)) {
      console.log(`Creating collection for ${category} (${++collectionCount}/${Object.keys(adapterCollections).length})`);
      await createCollection(config.name, `Adapter - ${category}`);
      await createAttributes(config.name, config.attributes);
      await delay(DELAY_BETWEEN_COLLECTIONS);
    }

    // Phase 2: Create relationships
    console.log("Starting relationship creation phase...");
    await delay(5000);

    let relationshipCount = 0;
    for (const [category, config] of Object.entries(adapterCollections)) {
      console.log(`Creating relationship for ${category} (${++relationshipCount}/${Object.keys(adapterCollections).length})`);
      const success = await createRelationship(config.name, false);
      if (!success) {
        needManualRelationships.push(config.name);
      }
      await delay(DELAY_BETWEEN_COLLECTIONS);
    }

    // Report any collections needing manual relationship creation
    if (needManualRelationships.length > 0) {
      console.log("\n===========================================");
      console.log("MANUAL ACTION REQUIRED:");
      console.log("The following collections need manual relationship creation:");
      needManualRelationships.forEach(name => console.log(`- ${name}`));
      console.log("Please create these relationships via the Appwrite console using TWO-WAY relationships.");
      console.log("===========================================\n");
    }

    console.log('Adapter collections setup completed successfully!');
    console.log(`Created ${collectionCount} collections with attributes`);
    console.log(`Created ${relationshipCount - needManualRelationships.length} relationships automatically`);
    console.log(`${needManualRelationships.length} relationships need manual creation`);
  } catch (error) {
    console.error('Adapter collections setup failed:', error.message);
    throw error;
  }
}

// Execute the setup function
setupAdapterCollections()
  .then(() => {
    console.log('Adapter collections initialization completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Adapter collections initialization failed:', error);
    process.exit(1);
  });
