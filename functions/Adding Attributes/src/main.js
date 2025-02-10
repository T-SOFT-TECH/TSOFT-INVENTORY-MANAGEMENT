import { Client, Databases } from 'node-appwrite';

// Base attributes (common for all products)
const baseAttributes = [
  {
    "key": "fullName",
    "type": "string",
    "status": "available",
    "error": "string",
    "required": true,
    "array": false,
    "size": 128,
    "default": "default"
  },

  { key: 'name', type: 'string', required: true, size: 200, array: false },
  { key: 'description', type: 'string', required: true },
  { key: 'price', type: 'double', required: true },
  { key: 'cost', type: 'double', required: true },
  { key: 'stockQuantity', type: 'integer', required: true },
  { key: 'lowStockThreshold', type: 'integer', required: true },
  { key: 'categoryId', type: 'string', required: true },
  { key: 'brandId', type: 'string', required: true },
  { key: 'imageUrl', type: 'string', required: false },
  { key: 'status', type: 'string', required: true },
  { key: 'sku', type: 'string', required: true }
];

// Specification attributes for all categories
const specificationAttributes = [
  // Audio Devices
  { key: 'spec_deviceType', type: 'string', required: false },
  { key: 'spec_connectivity', type: 'string', required: false },
  { key: 'spec_frequency', type: 'string', required: false },
  { key: 'spec_impedance', type: 'integer', required: false },
  { key: 'spec_features', type: 'string', required: false, array: true },

  // Cables
  { key: 'spec_cableType', type: 'string', required: false },
  { key: 'spec_length', type: 'double', required: false },
  { key: 'spec_certification', type: 'string', required: false, array: true },

  // Cameras
  { key: 'spec_cameraType', type: 'string', required: false },
  { key: 'spec_sensorType', type: 'string', required: false },
  { key: 'spec_resolution', type: 'integer', required: false },
  { key: 'spec_stabilization', type: 'string', required: false, array: true },
  { key: 'spec_touchscreen', type: 'boolean', required: false },
  { key: 'spec_viewfinder', type: 'string', required: false },
  { key: 'spec_weatherSealing', type: 'boolean', required: false },

  // Cases
  { key: 'spec_formFactor', type: 'string', required: false },
  { key: 'spec_motherboardSupport', type: 'string', required: false, array: true },
  { key: 'spec_maxGPULength', type: 'integer', required: false },
  { key: 'spec_maxCPUCoolerHeight', type: 'integer', required: false },
  { key: 'spec_psuSupport', type: 'string', required: false },
  { key: 'spec_driveBays', type: 'string', required: false, array: true },
  { key: 'spec_fanSupport', type: 'string', required: false, array: true },
  { key: 'spec_radiatorSupport', type: 'string', required: false, array: true },
  { key: 'spec_sidePanelType', type: 'string', required: false },
  { key: 'spec_frontPorts', type: 'string', required: false, array: true },

  // Common measurements
  { key: 'spec_dimensions', type: 'string', required: false },
  { key: 'spec_weight', type: 'double', required: false },

  // Chargers
  { key: 'spec_chargerType', type: 'string', required: false },
  { key: 'spec_outputPorts', type: 'integer', required: false },
  { key: 'spec_totalWattage', type: 'integer', required: false },
  { key: 'spec_portTypes', type: 'string', required: false, array: true },
  { key: 'spec_protocols', type: 'string', required: false, array: true },

  // Cooling
  { key: 'spec_coolingType', type: 'string', required: false },
  { key: 'spec_socketSupport', type: 'string', required: false, array: true },
  { key: 'spec_radiatorSize', type: 'integer', required: false },
  { key: 'spec_fanSize', type: 'integer', required: false },
  { key: 'spec_fanSpeed', type: 'string', required: false },
  { key: 'spec_noise', type: 'string', required: false },

  // Computing Devices (Desktops, Laptops, Tablets)
  { key: 'spec_processor', type: 'string', required: false },
  { key: 'spec_ram', type: 'string', required: false },
  { key: 'spec_storage', type: 'string', required: false, array: true },
  { key: 'spec_graphics', type: 'string', required: false },
  { key: 'spec_os', type: 'string', required: false },
  { key: 'spec_battery', type: 'string', required: false },
  { key: 'spec_ports', type: 'string', required: false, array: true },

  // Display specifications
  { key: 'spec_displaySize', type: 'double', required: false },
  { key: 'spec_resolution', type: 'string', required: false },
  { key: 'spec_refreshRate', type: 'integer', required: false },
  { key: 'spec_panelType', type: 'string', required: false },
  { key: 'spec_brightness', type: 'integer', required: false },
  { key: 'spec_contrast', type: 'string', required: false },
  { key: 'spec_colorGamut', type: 'string', required: false },
  { key: 'spec_hdr', type: 'boolean', required: false },

  // Input Devices (Keyboards, Mice)
  { key: 'spec_keyboardType', type: 'string', required: false },
  { key: 'spec_switchType', type: 'string', required: false },
  { key: 'spec_layout', type: 'string', required: false },
  { key: 'spec_backlight', type: 'string', required: false },
  { key: 'spec_numpad', type: 'boolean', required: false },
  { key: 'spec_multimedia', type: 'boolean', required: false },
  { key: 'spec_palmRest', type: 'boolean', required: false },
  { key: 'spec_mouseType', type: 'string', required: false },
  { key: 'spec_sensor', type: 'string', required: false },
  { key: 'spec_dpi', type: 'integer', required: false },
  { key: 'spec_buttons', type: 'integer', required: false },
  { key: 'spec_ergonomics', type: 'string', required: false },

  // Memory (RAM)
  { key: 'spec_memoryType', type: 'string', required: false },
  { key: 'spec_capacity', type: 'integer', required: false },
  { key: 'spec_speed', type: 'integer', required: false },
  { key: 'spec_modules', type: 'integer', required: false },
  { key: 'spec_timing', type: 'string', required: false },
  { key: 'spec_voltage', type: 'double', required: false },
  { key: 'spec_heatspreader', type: 'boolean', required: false },

  // Motherboards
  { key: 'spec_socket', type: 'string', required: false },
  { key: 'spec_chipset', type: 'string', required: false },
  { key: 'spec_memorySlots', type: 'integer', required: false },
  { key: 'spec_maxMemory', type: 'integer', required: false },
  { key: 'spec_pciSlots', type: 'string', required: false, array: true },
  { key: 'spec_sataConnectors', type: 'integer', required: false },
  { key: 'spec_m2Slots', type: 'integer', required: false },
  { key: 'spec_wifi', type: 'boolean', required: false },
  { key: 'spec_bluetooth', type: 'boolean', required: false },
  { key: 'spec_lan', type: 'string', required: false },
  { key: 'spec_usb', type: 'string', required: false, array: true },

  // Networking
  { key: 'spec_wifiStandard', type: 'string', required: false },
  { key: 'spec_frequency', type: 'string', required: false, array: true },
  { key: 'spec_speed', type: 'string', required: false },
  { key: 'spec_security', type: 'string', required: false, array: true },
  { key: 'spec_antennas', type: 'integer', required: false },
  { key: 'spec_coverage', type: 'string', required: false },

  // Power Supplies
  { key: 'spec_wattage', type: 'integer', required: false },
  { key: 'spec_efficiency', type: 'string', required: false },
  { key: 'spec_modular', type: 'string', required: false },
  { key: 'spec_protection', type: 'string', required: false, array: true },
  { key: 'spec_fanSize', type: 'integer', required: false },
  { key: 'spec_certification', type: 'string', required: false },

  // Processors
  { key: 'spec_cores', type: 'integer', required: false },
  { key: 'spec_threads', type: 'integer', required: false },
  { key: 'spec_baseFrequency', type: 'double', required: false },
  { key: 'spec_boostFrequency', type: 'double', required: false },
  { key: 'spec_cache', type: 'string', required: false },
  { key: 'spec_tdp', type: 'integer', required: false },
  { key: 'spec_architecture', type: 'string', required: false },
  { key: 'spec_integratedGraphics', type: 'string', required: false },

  // Smart Home
  { key: 'spec_powerSource', type: 'string', required: false },
  { key: 'spec_voiceControl', type: 'string', required: false, array: true },
  { key: 'spec_automation', type: 'boolean', required: false },
  { key: 'spec_sensors', type: 'string', required: false, array: true },

  // Storage Devices
  { key: 'spec_storageType', type: 'string', required: false },
  { key: 'spec_interface', type: 'string', required: false },
  { key: 'spec_readSpeed', type: 'integer', required: false },
  { key: 'spec_writeSpeed', type: 'integer', required: false },
  { key: 'spec_cache', type: 'integer', required: false },
  { key: 'spec_tbw', type: 'integer', required: false },
  { key: 'spec_encryption', type: 'boolean', required: false },

  // Tablets (specific fields not covered by computing devices)
  { key: 'spec_stylus', type: 'boolean', required: false },
  { key: 'spec_cameras', type: 'string', required: false, array: true },

  // Wearables
  { key: 'spec_displayType', type: 'string', required: false },
  { key: 'spec_sensors', type: 'string', required: false, array: true },
  { key: 'spec_batteryLife', type: 'integer', required: false },
  { key: 'spec_waterResistance', type: 'string', required: false },

  // Common Features and Connectivity fields
  { key: 'spec_rgb', type: 'boolean', required: false },
  { key: 'spec_connectivity', type: 'string', required: false, array: true },
  { key: 'spec_compatibility', type: 'string', required: false, array: true },
  { key: 'spec_features', type: 'string', required: false, array: true },
  { key: 'spec_speakers', type: 'boolean', required: false },
  { key: 'spec_vesa', type: 'boolean', required: false }
];

export default async ({ req, res, log, error }) => {
  try {


    const client = new Client()
      .setEndpoint('http://172.30.128.1/v1')
      .setProject('tsoftmart-inventory-invoice-system')
      .setKey('standard_44341605fac817a215dfe3cd962993c99d2d5819d586e4c85667ad1ec4a4980df32fc1a6e33d1e0ed2c1851c64e1e4265153847c5d652c91c9523443f3b34fee0b4f804da5f40e9791f0bfc933901b42c60627fb77117f7c41f2d7a6ef37130eac6e65c362bf52a54f7e81fbe1812f9499ed18b7951202aa0b7b3e593511c38b');

    const databases = new Databases(client);
    const databaseId = 'inventory-invoice-db';
    const collectionId = 'products';

    const allAttributes = [...baseAttributes, ...specificationAttributes];
    const createdAttributes = [];
    const failedAttributes = [];

    for (const attr of allAttributes) {
      try {
        log(`Creating attribute: ${attr.key}`);

        switch (attr.type) {
          case 'string':
            await databases.createStringAttribute(
              databaseId,
              collectionId,
              attr.key,
              attr.required,
              attr.array || false
            );
            break;

          case 'integer':
            await databases.createIntegerAttribute(
              databaseId,
              collectionId,
              attr.key,
              attr.required,
              attr.array || false
            );
            break;

          case 'double':
            await databases.createFloatAttribute(
              databaseId,
              collectionId,
              attr.key,
              attr.required,
              attr.array || false
            );
            break;

          case 'boolean':
            await databases.createBooleanAttribute(
              databaseId,
              collectionId,
              attr.key,
              attr.required
            );
            break;
        }

        createdAttributes.push(attr.key);
        log(`Successfully created attribute: ${attr.key}`);

        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (err) {
        failedAttributes.push({
          key: attr.key,
          error: err.message
        });
        error(`Error creating attribute ${attr.key}: ${err.message}`);
      }
    }

    return res.json({
      success: true,
      message: 'Attribute creation process completed',
      summary: {
        total: allAttributes.length,
        created: createdAttributes.length,
        failed: failedAttributes.length
      },
      createdAttributes,
      failedAttributes
    });

  } catch (err) {
    error(`Fatal error: ${err.message}`);
    return res.json({
      success: false,
      message: 'Failed to create attributes',
      error: err.message
    }, 500);
  }
};
