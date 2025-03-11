const sdk = require("node-appwrite");
require('dotenv').config();

const DELAY_BETWEEN_OPERATIONS = 1000; // 1 second delay between operations
const DELAY_BETWEEN_COLLECTIONS = 2000; // 2 seconds delay between collections


// Cable category collections with their attributes
const cableCollections = {
  coaxialCables: {
    name: 'coaxial_cables_specs',
    attributes: [
      { key: 'impedance', type: 'string', required: true, size: 50 },
      { key: 'length', type: 'double', required: true },
      { key: 'connectorType', type: 'string', required: true, size: 50 },
      { key: 'shieldingType', type: 'string', required: false, size: 50 },
      { key: 'signalQuality', type: 'string', required: false, size: 50 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'cableThickness', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  auxiliaryCables: {
    name: 'auxiliary_cables_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'goldPlated', type: 'boolean', required: false },
      { key: 'cableMaterial', type: 'string', required: false, size: 50 },
      { key: 'connectorStyle', type: 'string', required: false, size: 50 },
      { key: 'audioQuality', type: 'string', required: false, size: 50 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  dcPowerCables: {
    name: 'dc_power_cables_specs',
    attributes: [
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'length', type: 'double', required: true },
      { key: 'maxCurrent', type: 'double', required: true },
      { key: 'voltageRating', type: 'string', required: true, size: 50 },
      { key: 'barrelDimensions', type: 'string', required: false, size: 50 },
      { key: 'wireGauge', type: 'string', required: false, size: 50 },
      { key: 'polarity', type: 'string', required: false, size: 50 },
      { key: 'compatibleDevices', type: 'string', required: false, size: 500 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  extensionCords: {
    name: 'extension_cords_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'surgeProtection', type: 'boolean', required: true },
      { key: 'socketCount', type: 'integer', required: true },
      { key: 'powerRating', type: 'integer', required: true },
      { key: 'jouleRating', type: 'integer', required: false },
      { key: 'usbPorts', type: 'integer', required: false },
      { key: 'usbPowerOutput', type: 'string', required: false, size: 50 },
      { key: 'socketType', type: 'string', required: true, size: 100 },
      { key: 'circuitBreaker', type: 'boolean', required: false },
      { key: 'usageRating', type: 'string', required: true, size: 50 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  laptopPowerCables: {
    name: 'laptop_power_cables_specs',
    attributes: [
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'length', type: 'double', required: true },
      { key: 'wattageRating', type: 'string', required: true, size: 50 },
      { key: 'voltageOutput', type: 'string', required: true, size: 50 },
      { key: 'compatibleBrands', type: 'string', required: false, size: 100 },
      { key: 'compatibleModels', type: 'string', required: false, size: 500 },
      { key: 'barrelDimensions', type: 'string', required: false, size: 50 },
      { key: 'originalPart', type: 'boolean', required: false },
      { key: 'adapterIncluded', type: 'boolean', required: true },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  magsafeCables: {
    name: 'magsafe_cables_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'maxWattage', type: 'string', required: true, size: 50 },
      { key: 'magsafeGeneration', type: 'string', required: true, size: 100 },
      { key: 'compatibleDevices', type: 'string', required: true, size: 100 },
      { key: 'compatibleModels', type: 'string', required: false, size: 500 },
      { key: 'sourceConnector', type: 'string', required: true, size: 50 },
      { key: 'originalApple', type: 'boolean', required: false },
      { key: 'mfiCertified', type: 'boolean', required: false },
      { key: 'passThroughCharging', type: 'boolean', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  microUSBCables: {
    name: 'micro_usb_cables_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'chargingSupport', type: 'boolean', required: false },
      { key: 'dataTransferSpeed', type: 'string', required: false, size: 100 },
      { key: 'sourceConnector', type: 'string', required: true, size: 50 },
      { key: 'cableMaterial', type: 'string', required: false, size: 50 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'connectorStyle', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  opticalAudioCables: {
    name: 'optical_audio_cables_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'audioFormatSupport', type: 'string', required: false, size: 100 },
      { key: 'cableMaterial', type: 'string', required: false, size: 50 },
      { key: 'shielding', type: 'string', required: false, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'maximumResolution', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  rcaCables: {
    name: 'rca_cables_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'goldPlated', type: 'boolean', required: false },
      { key: 'shielding', type: 'string', required: false, size: 100 },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'colorCoded', type: 'boolean', required: false },
      { key: 'connectorStyle', type: 'string', required: false, size: 50 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'compatibleDevices', type: 'string', required: false, size: 100 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  thunderboltCables: {
    name: 'thunderbolt_cables_specs',
    attributes: [
      { key: 'version', type: 'string', required: true, size: 50 },
      { key: 'length', type: 'double', required: true },
      { key: 'maxSpeed', type: 'string', required: true, size: 50 },
      { key: 'powerDelivery', type: 'boolean', required: false },
      { key: 'maxPowerWattage', type: 'string', required: false, size: 50 },
      { key: 'cableType', type: 'string', required: false, size: 50 },
      { key: 'intelCertified', type: 'boolean', required: false },
      { key: 'displaySupport', type: 'string', required: false, size: 100 },
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  vgaCables: {
    name: 'vga_cables_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'maxResolution', type: 'string', required: false, size: 50 },
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'ferriteCores', type: 'string', required: false, size: 50 },
      { key: 'goldPlated', type: 'boolean', required: false },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'screwLocks', type: 'boolean', required: false },
      { key: 'cableGauge', type: 'string', required: false, size: 50 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  xlrCables: {
    name: 'xlr_cables_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'cableGauge', type: 'string', required: false, size: 50 },
      { key: 'balancedAudio', type: 'boolean', required: false },
      { key: 'goldPlated', type: 'boolean', required: false },
      { key: 'xlrPinCount', type: 'string', required: false, size: 50 },
      { key: 'oxygenFreeCable', type: 'boolean', required: false },
      { key: 'shielding', type: 'string', required: false, size: 100 },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  trsCables: {
    name: 'trs_cables_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'connectorSize', type: 'string', required: true, size: 50 },
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'signalType', type: 'string', required: true, size: 100 },
      { key: 'goldPlated', type: 'boolean', required: false },
      { key: 'connectorStyle', type: 'string', required: false, size: 100 },
      { key: 'conductorMaterial', type: 'string', required: false, size: 100 },
      { key: 'shielding', type: 'string', required: false, size: 100 },
      { key: 'application', type: 'string', required: false, size: 100 },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'lowCapacitance', type: 'boolean', required: false },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  tsCables: {
    name: 'ts_cables_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'connectorSize', type: 'string', required: true, size: 50 },
      { key: 'connectorType', type: 'string', required: true, size: 100 },
      { key: 'instrumentType', type: 'string', required: false, size: 100 },
      { key: 'goldPlated', type: 'boolean', required: false },
      { key: 'connectorStyle', type: 'string', required: false, size: 100 },
      { key: 'cableGauge', type: 'string', required: false, size: 50 },
      { key: 'shielding', type: 'string', required: false, size: 100 },
      { key: 'conductorMaterial', type: 'string', required: false, size: 100 },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'noiseReduction', type: 'boolean', required: false },
      { key: 'lowCapacitance', type: 'boolean', required: false },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'warranty', type: 'string', required: false, size: 50 }
    ]
  },

  acPowerCables: {
    name: 'ac_power_cables_specs',
    attributes: [
      { key: 'length', type: 'double', required: true },
      { key: 'deviceConnectorType', type: 'string', required: true, size: 100 },
      { key: 'wallPlugType', type: 'string', required: true, size: 100 },
      { key: 'applicationCategory', type: 'string', required: false, size: 100 },
      { key: 'voltageRating', type: 'string', required: true, size: 50 },
      { key: 'currentRating', type: 'string', required: true, size: 50 },
      { key: 'powerRating', type: 'string', required: false, size: 100 },
      { key: 'wireGauge', type: 'string', required: false, size: 50 },
      { key: 'conductorCount', type: 'string', required: false, size: 50 },
      { key: 'grounded', type: 'boolean', required: false },
      { key: 'jacketing', type: 'string', required: false, size: 100 },
      { key: 'heavyDuty', type: 'boolean', required: false },
      { key: 'temperatureRating', type: 'string', required: false, size: 100 },
      { key: 'angledPlug', type: 'string', required: false, size: 100 },
      { key: 'compatibleDevices', type: 'string', required: false, size: 500 },
      { key: 'cableMaterial', type: 'string', required: false, size: 100 },
      { key: 'includesFuse', type: 'boolean', required: false },
      { key: 'fuseRating', type: 'string', required: false, size: 50 },
      { key: 'color', type: 'string', required: false, size: 50 },
      { key: 'certifications', type: 'string', required: false, size: 100 },
      { key: 'hospitalGrade', type: 'boolean', required: false },
      { key: 'originalPart', type: 'boolean', required: false },
      { key: 'polarized', type: 'string', required: false, size: 50 }, // Using string for "Not Applicable" option
      { key: 'lockingConnector', type: 'boolean', required: false },
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
async function setupCableCollections() {
  try {
    console.log('Starting cable collections database setup...');

    // Collections needing manual relationship creation
    const needManualRelationships = [];



    // Phase 1: Create all cable collections and attributes
    for (const [category, config] of Object.entries(cableCollections)) {
      console.log(`Creating collection for ${category}`);
      await createCollection(config.name, `Cable - ${category}`);
      await createAttributes(config.name, config.attributes);
      await delay(2000);
    }

    // Phase 2: Create relationships
    console.log("Starting relationship creation phase...");
    await delay(5000);

    for (const [category, config] of Object.entries(cableCollections)) {
      const success = await createRelationship(config.name, false);
      if (!success) {
        needManualRelationships.push(config.name);
      }
      await delay(3000);
    }

    // Report any collections needing manual relationship creation
    if (needManualRelationships.length > 0) {
      console.log("The following collections need manual relationship creation:");
      needManualRelationships.forEach(name => console.log(`- ${name}`));
      console.log("Please create these relationships via the Appwrite console using TWO-WAY relationships.");
    }

    console.log('Cable collections setup completed');
  } catch (error) {
    console.error('Cable collections setup failed:', error.message);
    throw error;
  }
}

// Execute the setup function
setupCableCollections()
  .then(() => {
    console.log('Cable collections initialization completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Cable collections initialization failed:', error);
    process.exit(1);
  });
