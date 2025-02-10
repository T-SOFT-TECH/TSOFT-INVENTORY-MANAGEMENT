const sdk = require("node-appwrite");
require('dotenv').config();

const DELAY_BETWEEN_OPERATIONS = 1000; // Increase to 1 second
const DELAY_BETWEEN_COLLECTIONS = 2000; // Increase to 2 seconds

// Base Product Collection Attributes
const baseAttributes = [
    { key: 'name', type: 'string', required: true, size: 200 },
    { key: 'description', type: 'string', required: true, size: 1000 },
    { key: 'price', type: 'double', required: true },
    { key: 'cost', type: 'double', required: true },
    { key: 'stockQuantity', type: 'integer', required: true },
    { key: 'lowStockThreshold', type: 'integer', required: true },
    { key: 'category', type: 'string', required: true },
    { key: 'brand', type: 'string', required: true },
    { key: 'imageUrl', type: 'string', required: false, size: 255 },
    { key: 'status', type: 'string', required: true, size: 20 },
    { key: 'sku', type: 'string', required: true, size: 50 }
];

// Category-specific attributes
const categoryCollections = {
    allInOnePcs: {
        name: 'all_in_one_pcs_specs',
        attributes: [
            { key: 'screenSize', type: 'double', required: true, min: 21, max: 34 },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'displayType', type: 'string', required: true, size: 50 },
            { key: 'touchscreen', type: 'boolean', required: true },
            { key: 'processorModel', type: 'string', required: true, size: 100 },
            { key: 'graphicsType', type: 'string', required: true, size: 50 },
            { key: 'graphicsModel', type: 'string', required: true, size: 100 },
            { key: 'ramSize', type: 'integer', required: true, min: 4, max: 128 },
            { key: 'storageType', type: 'string', required: true, size: 50 },
            { key: 'storageCapacity', type: 'integer', required: true, min: 128 },
            { key: 'webcam', type: 'string', required: true, size: 50 },
            { key: 'speakerSystem', type: 'string', required: true, size: 100 },
            { key: 'ports', type: 'string', required: true, array: true },
            { key: 'wireless', type: 'string', required: true, array: true },
            { key: 'peripheralsIncluded', type: 'string', array: true, required: false  },
            { key: 'standAdjustment', type: 'string', array: true, required: false  },
            { key: 'operatingSystem', type: 'string', required: true, size: 50 },
            { key: 'securityFeatures', type: 'string', array: true, required: false }
        ]
    },

    antivirusSoftware: {
        name: 'antivirus_software_specs',
        attributes: [
            { key: 'softwareType', type: 'string', required: true, size: 50 },
            { key: 'licenseLength', type: 'string', required: true, size: 50 },
            { key: 'deviceCount', type: 'integer', required: true, min: 1 },
            { key: 'compatibleOS', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', required: true, array: true }
        ]
    },

    audioInterface: {
        name: 'audio_interface_specs',
        attributes: [
            { key: 'interfaceType', type: 'string', required: true, size: 50 },
            { key: 'inputChannels', type: 'integer', required: true },
            { key: 'outputChannels', type: 'integer', required: true },
            { key: 'micPreamps', type: 'integer', required: true },
            { key: 'sampleRate', type: 'string', required: true, array: true },
            { key: 'bitDepth', type: 'string', required: true, size: 50 },
            { key: 'inputTypes', type: 'string', required: true, array: true },
            { key: 'outputTypes', type: 'string', required: true, array: true },
            { key: 'phantomPower', type: 'boolean', required: true },
            { key: 'midiSupport', type: 'boolean', required: true },
            { key: 'dspFeatures', type: 'string', array: true, required: false }
        ]
    },


businessLaptops: {
        name: 'business_laptops_specs',
        attributes: [
            { key: 'screenSize', type: 'double', required: true, min: 12, max: 17 },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'displayType', type: 'string', required: true, size: 50 },
            { key: 'processorModel', type: 'string', required: true, size: 100 },
            { key: 'vPro', type: 'boolean', required: false },
            { key: 'ramSize', type: 'integer', required: true, min: 4, max: 64 },
            { key: 'storageType', type: 'string', required: true, size: 50 },
            { key: 'storageCapacity', type: 'integer', required: true, min: 128 },
            { key: 'securityFeatures', type: 'string', required: true, array: true },
            { key: 'dockingSupport', type: 'string', required: true, size: 50 },
            { key: 'portSelection', type: 'string', required: true, array: true },
            { key: 'batteryLife', type: 'integer', required: true, min: 4, max: 24 },
            { key: 'durabilityStandards', type: 'string', array: true, required: false },
            { key: 'managementFeatures', type: 'string', array: true, required: false },
            { key: 'warranty', type: 'string', required: true, size: 50 }
        ]
    },

    chargers: {
        name: 'chargersAndAdapters_specs',
        attributes: [
            { key: 'chargerType', type: 'string', required: true, size: 50 },
            { key: 'outputWattage', type: 'integer', required: true, min: 0 },
            { key: 'inputVoltage', type: 'string', required: true, size: 50 },
            { key: 'outputVoltage', type: 'string', required: true, size: 50 },
            { key: 'compatibleDevices', type: 'string', required: true, array: true },
            { key: 'connectorType', type: 'string', required: true, array: true },
            { key: 'chargingProtocols', type: 'string', array: true, required: false },
            { key: 'features', type: 'string', array: true, required: false },
            { key: 'cableIncluded', type: 'boolean', required: false },
            { key: 'cableLength', type: 'double', unit: 'm', step: 0.1, min: 0 , required: false},
            { key: 'portCount', type: 'integer', required: true, min: 1 },
            { key: 'dimensions', type: 'string', size: 50, required: false }
        ]
    },

    conferenceSystems: {
        name: 'conference_systems_specs',
        attributes: [
            { key: 'systemType', type: 'string', required: true, size: 50 },
            { key: 'maxParticipants', type: 'integer', required: true },
            { key: 'videoQuality', type: 'string', required: true, size: 50 },
            { key: 'audioFeatures', type: 'string', required: true, array: true },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'compatibility', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', array: true, required: false }
        ]
    },

    coolingSystems: {
        name: 'cooling_systems_specs',
        attributes: [
            { key: 'coolingType', type: 'string', required: true, size: 50 },
            { key: 'socketSupport', type: 'string', required: true, array: true },
            { key: 'fanSize', type: 'integer', required: true },
            { key: 'fanCount', type: 'integer', required: true, min: 1 },
            { key: 'fanSpeed', type: 'integer', required: true },
            { key: 'fanSpeedRange', type: 'string', size: 50, required: false },
            { key: 'airflow', type: 'integer', unit: 'CFM', required: false },
            { key: 'staticPressure', type: 'double', unit: 'mmH₂O', required: false },
            { key: 'noiseLevel', type: 'integer', unit: 'dBA', required: false },
            { key: 'radiatorSize', type: 'string', size: 50, required: false },
            { key: 'radiatorThickness', type: 'integer', unit: 'mm', required: false },
            { key: 'tubingLength', type: 'integer', unit: 'mm', required: false },
            { key: 'pumpSpeed', type: 'integer', unit: 'RPM', required: false },
            { key: 'tdp', type: 'integer', required: true, unit: 'W' },
            { key: 'height', type: 'integer', required: true, unit: 'mm' },
            { key: 'pwmSupport', type: 'boolean', required: false },
            { key: 'bearingType', type: 'string', size: 50, required: false },
            { key: 'connector', type: 'string', required: true, size: 50 },
            { key: 'rgbSupport', type: 'boolean', required: false },
            { key: 'rgbSoftware', type: 'string', required: false, array: true },
            { key: 'warranty', type: 'integer', required: true, unit: 'years' }
        ]
    },

    designSoftware: {
        name: 'design_software_specs',
        attributes: [
            { key: 'softwareType', type: 'string', required: true, size: 50 },
            { key: 'licenseModel', type: 'string', required: true, size: 50 },
            { key: 'features', type: 'string', required: true, array: true },
            { key: 'fileFormats', type: 'string', required: true, array: true }
        ]
    },

    developmentTools: {
        name: 'development_tools_specs',
        attributes: [
            { key: 'toolType', type: 'string', required: true, size: 50 },
            { key: 'programmingLanguages', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', required: true, array: true },
            { key: 'collaboration', type: 'string', array: true, required: false }
        ]
    },

    displayPortCables: {
        name: 'displayport_cables_specs',
        attributes: [
            { key: 'version', type: 'string', required: true, size: 50 },
            { key: 'length', type: 'integer', required: true, unit: 'm' },
            { key: 'maxResolution', type: 'string', required: true, size: 50 },
            { key: 'features', type: 'string', array: true, required: false }
        ]
    },

    documentCameras: {
        name: 'document_cameras_specs',
        attributes: [
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'sensorType', type: 'string', required: true, size: 50 },
            { key: 'zoom', type: 'string', required: true, array: true },
            { key: 'frameRate', type: 'integer', required: true, unit: 'fps' },
            { key: 'shootingArea', type: 'string', required: true, size: 50 },
            { key: 'connectivityOptions', type: 'string', required: true, array: true },
            { key: 'lightingSystem', type: 'string', required: true, array: true },
            { key: 'imagingFeatures', type: 'string', required: true, array: true },
            { key: 'software', type: 'string', required: true, array: true },
            { key: 'headPosition', type: 'string', required: true, size: 50 },
            { key: 'microphoneSystem', type: 'string', required: false, size: 50 },
            { key: 'portability', type: 'string', required: true, size: 50 },
            { key: 'powerSource', type: 'string', required: true, size: 50 }
        ]
    },

    documentScanners: {
        name: 'document_scanners_specs',
        attributes: [
            { key: 'scannerType', type: 'string', required: true, size: 50 },
            { key: 'resolution', type: 'integer', required: true, unit: 'dpi' },
            { key: 'scanSpeed', type: 'integer', required: true, unit: 'ppm' },
            { key: 'adfCapacity', type: 'integer', unit: 'sheets', required: false },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'documentSize', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', required: false,  array: true }
        ]
    },

    drawingTablets: {
        name: 'drawing_tablets_specs',
        attributes: [
            { key: 'tabletType', type: 'string', required: true, size: 50 },
            { key: 'activeArea', type: 'string', required: true, size: 50 },
            { key: 'resolution', type: 'integer', required: true, unit: 'LPI' },
            { key: 'pressureLevels', type: 'integer', required: true },
            { key: 'displayResolution', type: 'string', required: false, size: 50 },
            { key: 'displaySize', type: 'double', required: false, unit: 'inches' },
            { key: 'colorGamut', type: 'integer', required: false, unit: '%sRGB' },
            { key: 'tiltSupport', type: 'boolean', required: false },
            { key: 'tiltRange', type: 'integer', unit: 'degrees', required: false },
            { key: 'expressKeys', type: 'integer', required: false },
            { key: 'touchRing', type: 'boolean', required: false },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'penType', type: 'string', required: true, size: 50 },
            { key: 'replacementNibs', type: 'integer', required: false },
            { key: 'reportingRate', type: 'integer', unit: 'RPS', required: false },
            { key: 'softwareCompatibility', type: 'string', required: false, array: true },
            { key: 'operatingSystems', type: 'string', required: true, array: true },
            { key: 'powerSupply', type: 'string', required: true, size: 50 },
            { key: 'dimensions', type: 'string', required: true, size: 50 },
            { key: 'weight', type: 'double', required: true }
        ]
    },

    educationalTablets: {
        name: 'educational_tablets_specs',
        attributes: [
            { key: 'screenSize', type: 'double', required: true, unit: 'inches' },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'processor', type: 'string', required: true, size: 100 },
            { key: 'ram', type: 'integer', required: true, unit: 'GB' },
            { key: 'storage', type: 'integer', required: true, unit: 'GB' },
            { key: 'expandableStorage', type: 'boolean', required: false },
            { key: 'batteryCapacity', type: 'integer', required: true, unit: 'mAh' },
            { key: 'batteryLife', type: 'integer', required: true, unit: 'hours' },
            { key: 'operatingSystem', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'durabilityFeatures', type: 'string', required: true, array: true },
            { key: 'educationalFeatures', type: 'string', required: true, array: true },
            { key: 'accessibilityFeatures', type: 'string', required: false, array: true },
            { key: 'targetAgeGroup', type: 'string', required: true, array: true }
        ]
    },

    eReaders: {
        name: 'ereaders_specs',
        attributes: [
            { key: 'screenSize', type: 'double', required: true, unit: 'inches' },
            { key: 'screenTechnology', type: 'string', required: true, size: 50 },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'frontLight', type: 'string', required: true, size: 50 },
            { key: 'storage', type: 'integer', required: true, unit: 'GB' },
            { key: 'batteryLife', type: 'integer', required: true, unit: 'weeks' },
            { key: 'waterproofRating', type: 'string', size: 50, required: false },
            { key: 'supportedFormats', type: 'string', required: true, array: true },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'audioSupport', type: 'boolean', required: false },
            { key: 'accessibilityFeatures', type: 'string', required: false, array: true },
            { key: 'educationalFeatures', type: 'string', required: false, array: true },
            { key: 'weight', type: 'integer', required: true, unit: 'g' }
        ]
    },

    enterpriseSwitches: {
        name: 'enterprise_switches_specs',
        attributes: [
            { key: 'switchType', type: 'string', required: true, size: 50 },
            { key: 'portConfiguration', type: 'string', required: true, size: 100 },
            { key: 'throughput', type: 'integer', required: true, unit: 'Gbps' },
            { key: 'stackingCapability', type: 'boolean', required: true },
            { key: 'redundancy', type: 'string', required: true, array: true },
            { key: 'managementFeatures', type: 'string', required: true, array: true }
        ]
    },

    ethernetCables: {
        name: 'ethernet_cables_specs',
        attributes: [
            { key: 'category', type: 'string', required: true, size: 50 },
            { key: 'length', type: 'double', required: true, unit: 'm' },
            { key: 'speed', type: 'string', required: true, size: 50 },
            { key: 'shielding', type: 'string', required: true, size: 50 }
        ]
    },

    fiberOpticCables: {
        name: 'fiber_optic_cables_specs',
        attributes: [
            { key: 'type', type: 'string', required: true, size: 50 },
            { key: 'length', type: 'double', required: true, unit: 'm' },
            { key: 'connectorType', type: 'string', required: true, array: true },
            { key: 'speed', type: 'string', required: true, size: 50 },
            { key: 'jacketRating', type: 'string', required: true, size: 50 }
        ]
    },

    gamingDesktops: {
        name: 'gaming_desktops_specs',
        attributes: [
            { key: 'processorModel', type: 'string', required: true, size: 100 },
            { key: 'processorCores', type: 'integer', required: true, min: 4, max: 64 },
            { key: 'gpuModel', type: 'string', required: true, size: 100 },
            { key: 'gpuVram', type: 'integer', required: true, unit: 'GB', min: 4, max: 24 },
            { key: 'ramSize', type: 'integer', required: true, unit: 'GB', min: 8, max: 256 },
            { key: 'ramType', type: 'string', required: true, size: 50 },
            { key: 'primaryStorage', type: 'string', required: true, size: 50 },
            { key: 'primaryStorageCapacity', type: 'integer', required: true, unit: 'GB', min: 256 },
            { key: 'secondaryStorage', type: 'string', required: false, size: 50 },
            { key: 'secondaryStorageCapacity', type: 'integer', required: false, unit: 'GB' },
            { key: 'coolingSystem', type: 'string', required: true, array: true },
            { key: 'caseType', type: 'string', required: true, size: 50 },
            { key: 'powerSupply', type: 'integer', required: true, unit: 'W', min: 500, max: 1600 },
            { key: 'motherboardType', type: 'string', required: true, size: 50 },
            { key: 'rgbFeatures', type: 'string', required: false, array: true },
            { key: 'ports', type: 'string', required: true, array: true },
            { key: 'networkingFeatures', type: 'string', required: true, array: true },
            { key: 'expansionSlots', type: 'string', required: true, array: true }
        ]
    },

    gamingLaptops: {
        name: 'gaming_laptops_specs',
        attributes: [
            { key: 'screenSize', type: 'double', required: true, unit: 'inches', min: 13, max: 18 },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'refreshRate', type: 'string', required: true, size: 20 },
            { key: 'processorModel', type: 'string', required: true, size: 100 },
            { key: 'gpuModel', type: 'string', required: true, size: 100 },
            { key: 'gpuVram', type: 'integer', required: true, unit: 'GB', min: 4, max: 16 },
            { key: 'ramSize', type: 'integer', required: true, unit: 'GB', min: 8, max: 128 },
            { key: 'ramType', type: 'string', required: true, size: 50 },
            { key: 'storageType', type: 'string', required: true, size: 50 },
            { key: 'storageCapacity', type: 'integer', required: true, unit: 'GB', min: 256 },
            { key: 'coolingSystem', type: 'string', required: true, array: true },
            { key: 'rgbFeatures', type: 'string', required: false, array: true },
            { key: 'ports', type: 'string', required: true, array: true },
            { key: 'weight', type: 'double', required: true, unit: 'kg', min: 2, max: 4.5 },
            { key: 'batteryCapacity', type: 'integer', required: true, unit: 'Wh', min: 50, max: 100 },
            { key: 'powerSupply', type: 'integer', required: true, unit: 'W', min: 180, max: 330 },
            { key: 'features', type: 'string', required: false, array: true }
        ]
    },

    graphicsCards: {
        name: 'graphics_cards_specs',
        attributes: [
            { key: 'chipsetManufacturer', type: 'string', required: true, size: 50 },
            { key: 'gpuModel', type: 'string', required: true, size: 100 },
            { key: 'memorySize', type: 'integer', required: true, unit: 'GB' },
            { key: 'memoryType', type: 'string', required: true, size: 50 },
            { key: 'memoryBus', type: 'integer', required: true, unit: 'bit' },
            { key: 'baseClock', type: 'integer', required: true, unit: 'MHz' },
            { key: 'boostClock', type: 'integer', required: true, unit: 'MHz' },
            { key: 'rtCores', type: 'integer', required: false },
            { key: 'tensorCores', type: 'integer', required: false },
            { key: 'displayOutputs', type: 'string', required: true, array: true },
            { key: 'powerConnectors', type: 'string', required: true, array: true },
            { key: 'tdp', type: 'integer', required: true, unit: 'W' },
            { key: 'recommendedPsu', type: 'integer', required: true, unit: 'W' },
            { key: 'length', type: 'integer', required: true, unit: 'mm' },
            { key: 'width', type: 'integer', required: true, unit: 'slots' },
            { key: 'cooling', type: 'string', required: true, size: 50 },
            { key: 'features', type: 'string', array: true, required: false },
            { key: 'directX', type: 'string', required: true, size: 50 },
            { key: 'openGL', type: 'string', required: true, size: 50 }
        ]
    },

    hdmiCables: {
        name: 'hdmi_cables_specs',
        attributes: [
            { key: 'version', type: 'string', required: true, size: 50 },
            { key: 'length', type: 'double', required: true, unit: 'm' },
            { key: 'maxResolution', type: 'string', required: true, size: 50 },
            { key: 'features', type: 'string', required: false, array: true },
            { key: 'shielding', type: 'string', required: true, size: 50 }
        ]
    },

    headphones: {
        name: 'headphones_specs',
        attributes: [
            { key: 'headphoneType', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, size: 50 },
            { key: 'driver', type: 'string', required: true, size: 50 },
            { key: 'frequency', type: 'string', required: true, size: 50 },
            { key: 'impedance', type: 'integer', required: true, unit: 'Ω' },
            { key: 'sensitivity', type: 'integer', required: true, unit: 'dB' },
            { key: 'noiseControl', type: 'string', required: false, array: true },
            { key: 'batteryLife', type: 'integer', required: false, unit: 'hours' },
            { key: 'waterResistance', type: 'string', required: false, size: 50 },
            { key: 'features', type: 'string', required: false, array: true }
        ]
    },

    interactiveDisplays: {
        name: 'interactive_displays_specs',
        attributes: [
            { key: 'displaySize', type: 'integer', required: true, unit: 'inches' },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'touchPoints', type: 'integer', required: true },
            { key: 'touchTechnology', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'operatingSystem', type: 'string', required: true, size: 50 },
            { key: 'processor', type: 'string', required: true, size: 100 },
            { key: 'ram', type: 'integer', required: true, unit: 'GB' },
            { key: 'storage', type: 'integer', required: true, unit: 'GB' },
            { key: 'speakers', type: 'string', required: true, size: 100 },
            { key: 'mountingOptions', type: 'string', required: true, array: true },
            { key: 'collaborativeFeatures', type: 'string', required: true, array: true },
            { key: 'includedSoftware', type: 'string', required: false, array: true }
        ]
    },

    keyboards: {
        name: 'keyboards_specs',
        attributes: [
            { key: 'keyboardType', type: 'string', required: true, size: 50 },
            { key: 'layout', type: 'string', required: true, size: 50 },
            { key: 'switchType', type: 'string', required: true, size: 50 },
            { key: 'hotSwappable', type: 'boolean', required: false },
            { key: 'connectivity', type: 'string', required: true, size: 50 },
            { key: 'keycapMaterial', type: 'string', required: true, size: 50 },
            { key: 'backlighting', type: 'string', required: true, size: 50 },
            { key: 'rgbFeatures', type: 'string', array: true, required: false },
            { key: 'pollingRate', type: 'string', size: 50, required: false },
            { key: 'antiGhosting', type: 'boolean', required: false },
            { key: 'nKeyRollover', type: 'boolean', required: false },
            { key: 'mediaKeys', type: 'boolean', required: false },
            { key: 'macroKeys', type: 'boolean', required: false },
            { key: 'palmRest', type: 'boolean', required: false },
            { key: 'passthrough', type: 'string', required: false, array: true },
            { key: 'onboardMemory', type: 'boolean', required: false },
            { key: 'operatingSystem', type: 'string', required: true, array: true },
            { key: 'weight', type: 'integer', required: false, unit: 'g' },
            { key: 'dimensions', type: 'string', required: false, size: 50 }
        ]
    },

    labelPrinters: {
        name: 'label_printers_specs',
        attributes: [
            { key: 'printerType', type: 'string', required: true, size: 50 },
            { key: 'printResolution', type: 'integer', required: true, unit: 'dpi' },
            { key: 'printSpeed', type: 'integer', required: true, unit: 'labels/min' },
            { key: 'maxLabelWidth', type: 'integer', required: true, unit: 'mm' },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'mediaTypes', type: 'string', required: true, array: true }
        ]
    },

    lightningCables: {
        name: 'lightning_cables_specs',
        attributes: [
            { key: 'certification', type: 'string', required: true, size: 50 },
            { key: 'length', type: 'double', required: true, unit: 'm' },
            { key: 'chargingSpeed', type: 'integer', required: true, unit: 'W' },
            { key: 'features', type: 'string', array: true , required: false}
        ]
    },

    mice: {
        name: 'mice_specs',
        attributes: [
            { key: 'mouseType', type: 'string', required: true, size: 50 },
            { key: 'sensorType', type: 'string', required: true, size: 50 },
            { key: 'dpi', type: 'integer', required: true },
            { key: 'dpiAdjustable', type: 'boolean', required: false },
            { key: 'connectivity', type: 'string', required: true, size: 50 },
            { key: 'pollingRate', type: 'string', required: true, size: 50 },
            { key: 'buttons', type: 'integer', required: true, min: 2 },
            { key: 'programmableButtons', type: 'boolean', required: false },
            { key: 'weight', type: 'integer', required: true, unit: 'g' },
            { key: 'adjustableWeight', type: 'boolean', required: false },
            { key: 'rgbLighting', type: 'boolean', required: false },
            { key: 'rgbZones', type: 'string', array: true , required: false},
            { key: 'gripStyle', type: 'string', required: true, size: 50 },
            { key: 'handOrientation', type: 'string', required: true, size: 50 },
            { key: 'onboardMemory', type: 'boolean', required: false },
            { key: 'onboardProfiles', type: 'integer', required: false },
            { key: 'batteryLife', type: 'integer', unit: 'hours', required: false },
            { key: 'chargingType', type: 'string', size: 50 , required: false},
            { key: 'cableType', type: 'string', size: 50, required: false },
            { key: 'cableLength', type: 'double', unit: 'm', required: false },
            { key: 'dimensions', type: 'string', size: 50, required: false }
        ]
    },

    microphones: {
        name: 'microphones_specs',
        attributes: [
            { key: 'micType', type: 'string', required: true, size: 50 },
            { key: 'polarPattern', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, size: 50 },
            { key: 'frequency', type: 'string', required: true, size: 50 },
            { key: 'maxSPL', type: 'integer', required: true, unit: 'dB' },
            { key: 'sampleRate', type: 'string', size: 50 , required: false},
            { key: 'bitDepth', type: 'string', size: 50 , required: false},
            { key: 'includes', type: 'string', array: true, required: false}
        ]
    },

    miniPcs: {
        name: 'mini_pcs_specs',
        attributes: [
            { key: 'processorModel', type: 'string', required: true, size: 100 },
            { key: 'processorType', type: 'string', required: true, size: 50 },
            { key: 'integratedGraphics', type: 'string', required: true, size: 100 },
            { key: 'discreteGpu', type: 'string', size: 100, required: false },
            { key: 'ramSize', type: 'integer', required: true, unit: 'GB', min: 4, max: 64 },
            { key: 'ramType', type: 'string', required: true, size: 50 },
            { key: 'storageType', type: 'string', required: true, size: 50 },
            { key: 'storageCapacity', type: 'integer', required: true, unit: 'GB', min: 64 },
            { key: 'dimensions', type: 'string', required: true, size: 50 },
            { key: 'volume', type: 'double', required: true, unit: 'L', step: 0.1 },
            { key: 'mountingOptions', type: 'string', array: true, required: false },
            { key: 'ports', type: 'string', required: true, array: true },
            { key: 'displaySupport', type: 'string', required: true, array: true },
            { key: 'networking', type: 'string', required: true, array: true },
            { key: 'powerConsumption', type: 'integer', required: true, unit: 'W', min: 10, max: 150 },
            { key: 'coolingSystem', type: 'string', required: true, size: 50 },
            { key: 'operatingSystem', type: 'string', required: true, size: 50 },
            { key: 'useCase', type: 'string', array: true, required: false }
        ]
    },

    monitors: {
        name: 'monitors_specs',
        attributes: [
            { key: 'displaySize', type: 'double', required: true, unit: 'inches', step: 0.1 },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'panelType', type: 'string', required: true, size: 50 },
            { key: 'refreshRate', type: 'integer', required: true, unit: 'Hz' },
            { key: 'responseTime', type: 'double', required: true, unit: 'ms', step: 0.1 },
            { key: 'aspectRatio', type: 'string', required: true, size: 50 },
            { key: 'brightness', type: 'integer', required: true, unit: 'nits' },
            { key: 'contrast', type: 'string', required: true, size: 50 },
            { key: 'hdrSupport', type: 'string', size: 50, required: false },
            { key: 'colorGamut', type: 'string', array: true , required: false},
            { key: 'ports', type: 'string', required: true, array: true },
            { key: 'usbHub', type: 'string', array: true , required: false},
            { key: 'speakers', type: 'boolean', required: false },
            { key: 'speakerPower', type: 'integer', unit: 'W', required: false },
            { key: 'mountingSupport', type: 'string', size: 50 , required: false},
            { key: 'adjustments', type: 'string', array: true, required: false },
            { key: 'gamingFeatures', type: 'string', array: true , required: false},
            { key: 'powerConsumption', type: 'integer', unit: 'W' , required: false}
        ]
    },

    motherboards: {
        name: 'motherboards_specs',
        attributes: [
            { key: 'formFactor', type: 'string', required: true, size: 50 },
            { key: 'socket', type: 'string', required: true, size: 50 },
            { key: 'chipset', type: 'string', required: true, size: 100 },
            { key: 'memoryType', type: 'string', required: true, size: 50 },
            { key: 'memorySlots', type: 'integer', required: true, min: 2, max: 8 },
            { key: 'maxMemory', type: 'integer', required: true, unit: 'GB' },
            { key: 'memorySpeed', type: 'string', required: true, array: true },
            { key: 'pciSlots', type: 'string', required: true, array: true },
            { key: 'm2Slots', type: 'integer', required: true, min: 0, max: 5 },
            { key: 'sataConnectors', type: 'integer', required: true, min: 0, max: 12 },
            { key: 'raidSupport', type: 'string', array: true, required: false },
            { key: 'lanPorts', type: 'string', required: true, array: true },
            { key: 'wirelessNetworking', type: 'string', array: true, required: false },
            { key: 'audioCodec', type: 'string', required: true, size: 100 },
            { key: 'audioChannels', type: 'string', required: true, size: 50 },
            { key: 'usbPorts', type: 'string', required: true, array: true },
            { key: 'powerPhases', type: 'string', required: true, size: 50 },
            { key: 'powerConnectors', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', array: true, required: false }
        ]
    },

    networkCards: {
        name: 'network_cards_specs',
        attributes: [
            { key: 'interfaceType', type: 'string', required: true, size: 50 },
            { key: 'networkType', type: 'string', required: true, size: 50 },
            { key: 'ethernetSpeed', type: 'string', size: 50, required: false },
            { key: 'wifiStandard', type: 'string', size: 50, required: false },
            { key: 'bluetoothVersion', type: 'string', size: 50, required: false },
            { key: 'antennas', type: 'integer', required: false },
            { key: 'ports', type: 'integer', required: false },
            { key: 'features', type: 'string', array: true, required: false },
            { key: 'formFactor', type: 'string', required: true, size: 50 },
            { key: 'chipset', type: 'string', required: true, size: 100 }
        ]
    },

    networkSecurity: {
        name: 'network_security_specs',
        attributes: [
            { key: 'deviceType', type: 'string', required: true, size: 50 },
            { key: 'throughput', type: 'integer', required: true, unit: 'Gbps' },
            { key: 'vpnThroughput', type: 'integer', required: true, unit: 'Gbps' },
            { key: 'concurrentSessions', type: 'integer', required: true, unit: 'K' },
            { key: 'ports', type: 'string', required: true, size: 100 },
            { key: 'securityFeatures', type: 'string', required: true, array: true },
            { key: 'vpnSupport', type: 'string', required: true, array: true },
            { key: 'authentication', type: 'string', required: true, array: true }
        ]
    },

    officeSoftware: {
        name: 'office_software_specs',
        attributes: [
            { key: 'suiteType', type: 'string', required: true, size: 50 },
            { key: 'licenseType', type: 'string', required: true, size: 50 },
            { key: 'platform', type: 'string', required: true, array: true },
            { key: 'cloudFeatures', type: 'string', array: true , required: false}
        ]
    },

    operatingSystems: {
        name: 'operating_systems_specs',
        attributes: [
            { key: 'osType', type: 'string', required: true, size: 50 },
            { key: 'version', type: 'string', required: true, size: 100 },
            { key: 'licenseType', type: 'string', required: true, size: 50 },
            { key: 'architecture', type: 'string', required: true, array: true },
            { key: 'systemRequirements', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', array: true , required: false}
        ]
    },

    paperShredders: {
        name: 'paper_shredders_specs',
        attributes: [
            { key: 'shredderType', type: 'string', required: true, size: 50 },
            { key: 'securityLevel', type: 'string', required: true, size: 50 },
            { key: 'sheetCapacity', type: 'integer', required: true, unit: 'sheets' },
            { key: 'binCapacity', type: 'integer', required: true, unit: 'liters' },
            { key: 'runTime', type: 'integer', required: true, unit: 'minutes' },
            { key: 'features', type: 'string', array: true, required: false }
        ]
    },

    pcCases: {
        name: 'pc_cases_specs',
        attributes: [
            { key: 'formFactor', type: 'string', required: true, array: true },
            { key: 'caseType', type: 'string', required: true, size: 50 },
            { key: 'dimensions', type: 'string', required: true, size: 50 },
            { key: 'weight', type: 'double', required: true, unit: 'kg' },
            { key: 'maxGpuLength', type: 'integer', required: true, unit: 'mm' },
            { key: 'maxCpuCoolerHeight', type: 'integer', required: true, unit: 'mm' },
            { key: 'maxPsuLength', type: 'integer', required: true, unit: 'mm' },
            { key: 'materials', type: 'string', required: true, array: true },
            { key: 'fanSupport', type: 'string', required: true, array: true },
            { key: 'frontFans', type: 'integer', required: true, min: 0 },
            { key: 'topFans', type: 'integer', required: true, min: 0 },
            { key: 'rearFans', type: 'integer', required: true, min: 0 },
            { key: 'includedFans', type: 'integer', required: true, min: 0 },
            { key: 'radiatorSupport', type: 'string', array: true, required: false },
            { key: 'driveBays35', type: 'integer', required: true, min: 0 },
            { key: 'driveBays25', type: 'integer', required: true, min: 0 },
            { key: 'expansionSlots', type: 'integer', required: true, min: 0 },
            { key: 'frontPorts', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', array: true , required: false},
            { key: 'dustFilters', type: 'string', array: true, required: false }
        ]
    },

    phoneAccessories: {
        name: 'phone_accessories_specs',
        attributes: [
            { key: 'accessoryType', type: 'string', required: true, size: 50 },
            { key: 'compatibility', type: 'string', required: true, array: true },
            { key: 'material', type: 'string', size: 50, required: false },
            { key: 'color', type: 'string', required: true, size: 50 },
            { key: 'dimensions', type: 'string', size: 50, required: false },
            { key: 'features', type: 'string', array: true, required: false },
            { key: 'warranty', type: 'integer', unit: 'months' , required: false}
        ]
    },

    powerBanks: {
        name: 'power_banks_specs',
        attributes: [
            { key: 'capacity', type: 'integer', required: true, unit: 'mAh' },
            { key: 'outputPorts', type: 'string', required: true, array: true },
            { key: 'inputPorts', type: 'string', required: true, array: true },
            { key: 'fastCharging', type: 'string', array: true, required: false },
            { key: 'maxOutput', type: 'integer', required: true, unit: 'W' },
            { key: 'features', type: 'string', array: true, required: false }
        ]
    },

    powerSupplies: {
        name: 'power_supplies_specs',
        attributes: [
            { key: 'wattage', type: 'integer', required: true, unit: 'W' },
            { key: 'efficiency', type: 'string', required: true, size: 50 },
            { key: 'formFactor', type: 'string', required: true, size: 50 },
            { key: 'modularity', type: 'string', required: true, size: 50 },
            { key: 'mainConnector', type: 'string', required: true, size: 50 },
            { key: 'cpuConnectors', type: 'string', required: true, array: true },
            { key: 'pciePowerConnectors', type: 'string', required: true, array: true },
            { key: 'sataConnectors', type: 'integer', required: true, min: 0 },
            { key: 'molex4Pin', type: 'integer', required: true, min: 0 },
            { key: 'fanSize', type: 'integer', required: true, unit: 'mm' },
            { key: 'fanBearing', type: 'string', size: 50, required: false},
            { key: 'fanControl', type: 'string', size: 50 , required: false},
            { key: 'protectionFeatures', type: 'string', required: true, array: true },
            { key: 'dcOutput', type: 'integer', required: true, unit: 'A' },
            { key: 'railDesign', type: 'string', required: true, size: 50 },
            { key: 'certification', type: 'string', array: true , required: false},
            { key: 'warranty', type: 'integer', required: true, unit: 'years' },
            { key: 'depth', type: 'integer', required: true, unit: 'mm' }
        ]
    },

    printers: {
        name: 'printers_specs',
        attributes: [
            { key: 'printerType', type: 'string', required: true, size: 50 },
            { key: 'functionality', type: 'string', required: true, array: true },
            { key: 'printTechnology', type: 'string', required: true, size: 50 },
            { key: 'colorPrinting', type: 'boolean', required: true },
            { key: 'printResolution', type: 'string', required: true, size: 50 },
            { key: 'printSpeedBlackAndWhite', type: 'integer', required: true, unit: 'ppm' },
            { key: 'printSpeedColor', type: 'integer', unit: 'ppm' , required: false},
            { key: 'duplexPrinting', type: 'boolean', required: false },
            { key: 'paperHandling', type: 'string', required: true, array: true },
            { key: 'paperTrayCapacity', type: 'integer', required: true, unit: 'sheets' },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'mobilePrinting', type: 'string', array: true, required: false },
            { key: 'memory', type: 'integer', unit: 'MB', required: false },
            { key: 'processorSpeed', type: 'integer', unit: 'MHz' , required: false},
            { key: 'monthlyDutyCycle', type: 'integer', required: true, unit: 'pages' },
            { key: 'scannerFeatures', type: 'string', array: true , required: false},
            { key: 'scanResolution', type: 'string', size: 50, required: false },
            { key: 'displayScreen', type: 'string', size: 50, required: false },
            { key: 'dimensions', type: 'string', required: true, size: 50 },
            { key: 'weight', type: 'double', required: true, unit: 'kg' },
            { key: 'powerConsumption', type: 'integer', unit: 'W', required: false }
        ]
    },

    processors: {
        name: 'processors_cpus_specs',
        attributes: [
            { key: 'series', type: 'string', required: true, size: 100 },
            { key: 'generation', type: 'string', required: true, size: 50 },
            { key: 'cores', type: 'integer', required: true, min: 1 },
            { key: 'threads', type: 'integer', required: true, min: 1 },
            { key: 'baseFrequency', type: 'double', required: true, unit: 'GHz', step: 0.1 },
            { key: 'boostFrequency', type: 'double', unit: 'GHz', step: 0.1, required: false },
            { key: 'socket', type: 'string', required: true, size: 50 },
            { key: 'tdp', type: 'integer', required: true, unit: 'W' },
            { key: 'lithography', type: 'integer', required: true, unit: 'nm' },
            { key: 'integratedGraphics', type: 'boolean', required: false },
            { key: 'igpuModel', type: 'string', size: 100 , required: false},
            { key: 'l1Cache', type: 'integer', unit: 'KB', required: false },
            { key: 'l2Cache', type: 'integer', unit: 'MB', required: false },
            { key: 'l3Cache', type: 'integer', unit: 'MB', required: false },
            { key: 'memorySupport', type: 'string', required: true, array: true },
            { key: 'maxMemorySpeed', type: 'integer', required: true, unit: 'MHz' },
            { key: 'pcieLanes', type: 'integer', required: true },
            { key: 'pcieVersion', type: 'string', required: true, size: 50 }
        ]
    },

    projectors: {
        name: 'projectors_specs',
        attributes: [
            { key: 'projectorType', type: 'string', required: true, size: 50 },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'brightness', type: 'integer', required: true, unit: 'lumens' },
            { key: 'contrastRatio', type: 'string', required: true, size: 50 },
            { key: 'lampLife', type: 'integer', required: true, unit: 'hours' },
            { key: 'connectivity', type: 'string', required: true, array: true }
        ]
    },

    ramMemory: {
        name: 'ram_memory_specs',
        attributes: [
            { key: 'memoryType', type: 'string', required: true, size: 50 },
            { key: 'capacity', type: 'integer', required: true, unit: 'GB' },
            { key: 'moduleCount', type: 'integer', required: true, min: 1, max: 8 },
            { key: 'speed', type: 'integer', required: true, unit: 'MHz' },
            { key: 'timing', type: 'string', required: true, size: 50 },
            { key: 'voltage', type: 'double', required: true, unit: 'V', step: 0.01 },
            { key: 'formFactor', type: 'string', required: true, size: 50 },
            { key: 'height', type: 'integer', required: true, unit: 'mm' },
            { key: 'heatspreader', type: 'boolean', required: false },
            { key: 'xmpSupport', type: 'boolean', required: false },
            { key: 'xmpProfiles', type: 'string', array: true , required: false},
            { key: 'eccSupport', type: 'boolean', required: false },
            { key: 'rgbLighting', type: 'boolean', required: false },
            { key: 'rgbSoftware', type: 'string', array: true, required: false },
            { key: 'color', type: 'string', size: 50, required: false },
            { key: 'warranty', type: 'integer', required: true, unit: 'years' }
        ]
    },

    routers: {
        name: 'routers_specs',
        attributes: [
            { key: 'routerType', type: 'string', required: true, size: 50 },
            { key: 'wifiStandard', type: 'string', required: true, size: 50 },
            { key: 'frequency', type: 'string', required: true, array: true },
            { key: 'maxSpeed', type: 'string', required: true, size: 50 },
            { key: 'ports', type: 'integer', required: true },
            { key: 'security', type: 'string', required: true, array: true },
            { key: 'coverage', type: 'integer', required: true, unit: 'sq ft' },
            { key: 'antennas', type: 'integer', required: true },
            { key: 'processor', type: 'string', required: true, size: 100 },
            { key: 'memory', type: 'string', required: true, size: 50 }
        ]
    },

    scanners: {
        name: 'scanners_specs',
        attributes: [
            { key: 'scannerType', type: 'string', required: true, size: 50 },
            { key: 'opticalResolution', type: 'string', required: true, size: 50 },
            { key: 'interpolatedResolution', type: 'string', size: 50, required: false },
            { key: 'colorDepth', type: 'string', required: true, size: 50 },
            { key: 'scanSpeed', type: 'integer', required: true, unit: 'ppm' },
            { key: 'adfCapacity', type: 'integer', unit: 'sheets', required: false },
            { key: 'duplexScanning', type: 'boolean' , required: false},
            { key: 'maximumScanSize', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'fileFormats', type: 'string', required: true, array: true },
            { key: 'ocrSupport', type: 'boolean', required: false },
            { key: 'documentFeeder', type: 'string', size: 50 , required: false},
            { key: 'scannerButtons', type: 'string', array: true, required: false },
            { key: 'operatingSystems', type: 'string', required: true, array: true },
            { key: 'dimensions', type: 'string', required: true, size: 50 },
            { key: 'weight', type: 'double', required: true, unit: 'kg' },
            { key: 'operatingPowerConsumption', type: 'integer', unit: 'W' , required: false},
            { key: 'standbyPowerConsumption', type: 'integer', unit: 'W', required: false },
            { key: 'warranty', type: 'integer', required: true, unit: 'years' }
        ]
    },

    securityCameras: {
        name: 'security_cameras_specs',
        attributes: [
            { key: 'cameraType', type: 'string', required: true, size: 50 },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'powerSource', type: 'string', required: true, size: 50 },
            { key: 'nightVision', type: 'string', required: true, size: 50 },
            { key: 'weatherResistance', type: 'string', size: 50, required: false },
            { key: 'storage', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', array: true, required: false }
        ]
    },

    smartAppliances: {
        name: 'smart_appliances_specs',
        attributes: [
            { key: 'applianceType', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'smartFeatures', type: 'string', required: true, array: true },
            { key: 'displayType', type: 'string', required: true, size: 50 },
            { key: 'energyRating', type: 'string', required: true, size: 50 },
            { key: 'powerConsumption', type: 'integer', required: true, unit: 'W' }
        ]
    },

    smartBands: {
        name: 'smart_bands_specs',
        attributes: [
            { key: 'displayType', type: 'string', required: true, size: 50 },
            { key: 'screenSize', type: 'double', required: true, unit: 'inches' },
            { key: 'sensors', type: 'string', required: true, array: true },
            { key: 'waterResistance', type: 'string', required: true, size: 50 },
            { key: 'batteryLife', type: 'integer', required: true, unit: 'days' },
            { key: 'chargingTime', type: 'integer', required: true, unit: 'hours' },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'compatibility', type: 'string', required: true, array: true },
            { key: 'bandMaterial', type: 'string', required: true, size: 50 },
            { key: 'activityTracking', type: 'string', required: true, array: true }
        ]
    },

    smartDoorbells: {
        name: 'smart_doorbells_specs',
        attributes: [
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'fieldOfView', type: 'integer', required: true, unit: 'degrees' },
            { key: 'powerSource', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'smartIntegration', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', array: true, required: false }
        ]
    },

    smartLighting: {
        name: 'smart_lighting_specs',
        attributes: [
            { key: 'lightType', type: 'string', required: true, size: 50 },
            { key: 'bulbType', type: 'string', size: 50, required: false },
            { key: 'wattage', type: 'integer', required: true, unit: 'W' },
            { key: 'brightness', type: 'integer', required: true, unit: 'lumens' },
            { key: 'colorType', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, array: true }
        ]
    },

    smartLocks: {
        name: 'smart_locks_specs',
        attributes: [
            { key: 'lockType', type: 'string', required: true, size: 50 },
            { key: 'unlockMethods', type: 'string', required: true, array: true },
            { key: 'powerSource', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'smartIntegration', type: 'string', array: true, required: false }
        ]
    },

    smartPlugs: {
        name: 'smart_plugs_specs',
        attributes: [
            { key: 'plugType', type: 'string', required: true, size: 50 },
            { key: 'maxPower', type: 'integer', required: true, unit: 'W' },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', array: true, required: false }
        ]
    },

    smartSpeakers: {
        name: 'smart_speakers_specs',
        attributes: [
            { key: 'speakerType', type: 'string', required: true, size: 50 },
            { key: 'audioChannels', type: 'string', required: true, size: 50 },
            { key: 'voiceAssistants', type: 'string', required: true, array: true },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'audioFeatures', type: 'string', array: true, required: false },
            { key: 'smartFeatures', type: 'string', array: true, required: false }
        ]
    },

    smartphones: {
        name: 'smartphones_specs',
        attributes: [
            { key: 'platform', type: 'string', required: true, size: 50 },
            { key: 'brand', type: 'string', required: true, size: 50 },
            { key: 'screenSize', type: 'double', required: true, unit: 'inches' },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'processor', type: 'string', required: true, size: 100 },
            { key: 'ram', type: 'integer', required: true, unit: 'GB' },
            { key: 'storage', type: 'string', required: true, size: 50 },
            { key: 'mainCamera', type: 'string', required: true, size: 100 },
            { key: 'frontCamera', type: 'string', required: true, size: 100 },
            { key: 'battery', type: 'integer', required: true, unit: 'mAh' },
            { key: 'chargingSpeed', type: 'integer', unit: 'W', required: false},
            { key: 'biometrics', type: 'string', array: true, required: false },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'waterResistance', type: 'string', size: 50, required: false },
            { key: 'dimensions', type: 'string', required: true, size: 50 },
            { key: 'weight', type: 'integer', required: true, unit: 'g' }
        ]
    },

    speakers: {
        name: 'speakers_specs',
        attributes: [
            { key: 'speakerType', type: 'string', required: true, size: 50 },
            { key: 'configuration', type: 'string', required: true, size: 50 },
            { key: 'powerOutput', type: 'integer', required: true, unit: 'W' },
            { key: 'frequency', type: 'string', required: true, size: 50 },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'wirelessFeatures', type: 'string', array: true, required: false },
            { key: 'mountingOptions', type: 'string', array: true, required: false }
        ]
    },

    storageDevices: {
        name: 'storage_devices_specs',
        attributes: [
            { key: 'storageType', type: 'string', required: true, size: 50 },
            { key: 'capacity', type: 'integer', required: true, unit: 'GB' },
            { key: 'formFactor', type: 'string', required: true, size: 50 },
            { key: 'interface', type: 'string', required: true, size: 50 },
            { key: 'readSpeed', type: 'integer', required: true, unit: 'MB/s' },
            { key: 'writeSpeed', type: 'integer', required: true, unit: 'MB/s' },
            { key: 'randomRead', type: 'integer', unit: 'K', required: false },
            { key: 'randomWrite', type: 'integer', unit: 'K', required: false },
            { key: 'nandType', type: 'string', size: 50, required: false },
            { key: 'dramCache', type: 'boolean', required: false },
            { key: 'dramSize', type: 'integer', unit: 'MB', required: false },
            { key: 'tbw', type: 'integer', required: false },
            { key: 'mtbf', type: 'integer', unit: 'hours', required: false },
            { key: 'encryption', type: 'string', array: true, required: false },
            { key: 'idlePowerConsumption', type: 'double', unit: 'W', required: false },
            { key: 'activePowerConsumption', type: 'double', unit: 'W' , required: false},
            { key: 'features', type: 'string', array: true , required: false},
            { key: 'includedSoftware', type: 'string', array: true, required: false }
        ]
    },

    surgeProtectors: {
        name: 'surge_protectors_specs',
        attributes: [
            { key: 'outletCount', type: 'integer', required: true },
            { key: 'surgeRating', type: 'integer', required: true, unit: 'Joules' },
            { key: 'cordLength', type: 'integer', required: true, unit: 'feet' },
            { key: 'features', type: 'string', array: true, required: false },
            { key: 'protection', type: 'string', required: true, array: true }
        ]
    },

    tablets: {
        name: 'tablets_specs',
        attributes: [
            { key: 'platform', type: 'string', required: true, size: 50 },
            { key: 'brand', type: 'string', required: true, size: 50 },
            { key: 'screenSize', type: 'double', required: true, unit: 'inches' },
            { key: 'displayType', type: 'string', required: true, size: 50 },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'processor', type: 'string', required: true, size: 100 },
            { key: 'ram', type: 'integer', required: true, unit: 'GB' },
            { key: 'storage', type: 'string', required: true, size: 50 },
            { key: 'expandableStorage', type: 'boolean', required: false },
            { key: 'rearCamera', type: 'string', size: 100 , required: false},
            { key: 'frontCamera', type: 'string', size: 100, required: false },
            { key: 'battery', type: 'integer', required: true, unit: 'mAh' },
            { key: 'pencilSupport', type: 'boolean', required: false },
            { key: 'keyboardSupport', type: 'boolean', required: false },
            { key: 'connectivity', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', array: true, required: false },
            { key: 'dimensions', type: 'string', required: true, size: 50 },
            { key: 'weight', type: 'integer', required: true, unit: 'g' }
        ]
    },

    twoInOneLaptops: {
        name: '2_in_1_laptops_specs',
        attributes: [
            { key: 'screenSize', type: 'double', required: true, unit: 'inches', min: 11, max: 17 },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'touchscreen', type: 'boolean', required: true },
            { key: 'convertibleType', type: 'string', required: true, size: 50 },
            { key: 'penSupport', type: 'string', required: true, size: 50 },
            { key: 'processorModel', type: 'string', required: true, size: 100 },
            { key: 'ramSize', type: 'integer', required: true, unit: 'GB', min: 4, max: 32 },
            { key: 'storageType', type: 'string', required: true, size: 50 },
            { key: 'storageCapacity', type: 'integer', required: true, unit: 'GB', min: 128 },
            { key: 'weight', type: 'double', required: true, unit: 'kg', min: 1, max: 2.5 },
            { key: 'batteryLife', type: 'integer', required: true, unit: 'hours', min: 4, max: 24 },
            { key: 'ports', type: 'string', required: true, array: true },
            { key: 'biometricSecurity', type: 'string', array: true, required: false },
            { key: 'screenModes', type: 'string', required: true, array: true }
        ]
    },

    ultrabooks: {
        name: 'ultrabooks_specs',
        attributes: [
            { key: 'screenSize', type: 'double', required: true, unit: 'inches', min: 11, max: 17.3 },
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'displayType', type: 'string', required: true, size: 50 },
            { key: 'processorModel', type: 'string', required: true, size: 100 },
            { key: 'ramSize', type: 'integer', required: true, unit: 'GB', min: 4, max: 64 },
            { key: 'storageType', type: 'string', required: true, size: 50 },
            { key: 'storageCapacity', type: 'integer', required: true, unit: 'GB', min: 128 },
            { key: 'weight', type: 'double', required: true, unit: 'kg', min: 0.8, max: 2 },
            { key: 'thickness', type: 'double', required: true, unit: 'mm', min: 8, max: 20 },
            { key: 'batteryLife', type: 'integer', required: true, unit: 'hours', min: 1, max: 24 },
            { key: 'ports', type: 'string', required: true, array: true },
            { key: 'features', type: 'string', array: true, required: false },
            { key: 'wifi', type: 'string', required: true, size: 50 },
            { key: 'bluetooth', type: 'string', required: true, size: 50 }
        ]
    },

    upsSystems: {
        name: 'ups_systems_specs',
        attributes: [
            { key: 'capacity', type: 'integer', required: true, unit: 'VA' },
            { key: 'wattage', type: 'integer', required: true, unit: 'W' },
            { key: 'topology', type: 'string', required: true, size: 50 },
            { key: 'outlets', type: 'integer', required: true },
            { key: 'backupTime', type: 'integer', required: true, unit: 'minutes' },
            { key: 'batteryType', type: 'string', required: true, size: 100 },
            { key: 'features', type: 'string', array: true, required: false }
        ]
    },

    usbCCables: {
        name: 'usb_c_cables_specs',
        attributes: [
            { key: 'specification', type: 'string', required: true, size: 50 },
            { key: 'length', type: 'double', required: false, required: true, unit: 'm' },
            { key: 'powerDelivery', type: 'integer', required: true, unit: 'W' },
            { key: 'dataTransferSpeed', type: 'string', required: true, size: 50 },
            { key: 'features', type: 'string', required: false, array: true }
        ]
    },

    watchBands: {
        name: 'watch_bands_specs',
        attributes: [
            { key: 'compatibleDevices', type: 'string', required: true, array: true },
            { key: 'material', type: 'string', required: true, size: 50 },
            { key: 'bandWidth', type: 'string', required: true, array: true },
            { key: 'closureType', type: 'string', required: true, size: 50 },
            { key: 'adjustableLength', type: 'boolean', required: false },
            { key: 'waterResistant', type: 'boolean', required: false },
            { key: 'colorOptions', type: 'string', required: true, array: true }
        ]
    },

    watchChargers: {
        name: 'watch_chargers_specs',
        attributes: [
            { key: 'chargerType', type: 'string', required: true, size: 50 },
            { key: 'compatibleDevices', type: 'string', required: true, array: true },
            { key: 'chargingSpeed', type: 'integer', required: true, unit: 'W' },
            { key: 'cableLength', type: 'double', required: true, unit: 'm' },
            { key: 'inputType', type: 'string', required: true, size: 50 },
            { key: 'portability', type: 'string', required: true, size: 50 },
            { key: 'safetyFeatures', type: 'string', required: true, array: true }
        ]
    },

    watchProtectors: {
        name: 'watch_protectors_specs',
        attributes: [
            { key: 'protectorType', type: 'string', required: true, size: 50 },
            { key: 'compatibleDevices', type: 'string', required: true, array: true },
            { key: 'material', type: 'string', required: true, size: 50 },
            { key: 'protectionFeatures', type: 'string', required: true, array: true },
            { key: 'thickness', type: 'double', required: true, unit: 'mm' },
            { key: 'transparency', type: 'string', required: true, size: 50 },
            { key: 'installationType', type: 'string', required: true, size: 50 }
        ]
    },

    webcams: {
        name: 'webcams_specs',
        attributes: [
            { key: 'resolution', type: 'string', required: true, size: 50 },
            { key: 'frameRate', type: 'integer', required: true, unit: 'fps' },
            { key: 'sensorType', type: 'string', required: true, size: 100 },
            { key: 'focalLength', type: 'string', size: 50, required: false },
            { key: 'focusType', type: 'string', required: true, size: 50 },
            { key: 'fieldOfView', type: 'integer', required: true, unit: 'degrees' },
            { key: 'microphone', type: 'boolean', required: false },
            { key: 'microphoneType', type: 'string', size: 50 , required: false},
            { key: 'noiseReduction', type: 'boolean', required: false },
            { key: 'connectivity', type: 'string', required: true, size: 50 },
            { key: 'cableLength', type: 'double', unit: 'm', required: false },
            { key: 'mounting', type: 'string', array: true, required: false },
            { key: 'privacyFeatures', type: 'string', array: true, required: false },
            { key: 'smartFeatures', type: 'string', array: true, required: false },
            { key: 'operatingSystems', type: 'string', required: true, array: true },
            { key: 'dimensions', type: 'string', required: true, size: 50 },
            { key: 'weight', type: 'integer', required: true, unit: 'g' },
            { key: 'warranty', type: 'integer', required: true, unit: 'years' }
        ]
    },

    workstations: {
        name: 'workstations_specs',
        attributes: [
            { key: 'processorModel', type: 'string', required: true, size: 100 },
            { key: 'processorCores', type: 'integer', required: true, min: 4, max: 128 },
            { key: 'professionalGpu', type: 'string', required: true, size: 100 },
            { key: 'gpuMemory', type: 'integer', required: true, unit: 'GB', min: 4, max: 48 },
            { key: 'eccMemorySize', type: 'integer', required: true, unit: 'GB', min: 8, max: 1024 },
            { key: 'memoryType', type: 'string', required: true, size: 50 },
            { key: 'primaryStorage', type: 'string', required: true, size: 50 },
            { key: 'primaryStorageCapacity', type: 'integer', required: true, unit: 'GB', min: 256 },
            { key: 'raidSupport', type: 'string', array: true , required: false},
            { key: 'formFactor', type: 'string', required: true, size: 50 },
            { key: 'powerSupply', type: 'integer', required: true, unit: 'W', min: 650, max: 1800 },
            { key: 'redundantPower', type: 'boolean', required: false },
            { key: 'certifications', type: 'string', array: true, required: false },
            { key: 'operatingSystem', type: 'string', required: true, size: 50 },
            { key: 'networkingFeatures', type: 'string', required: true, array: true },
            { key: 'securityFeatures', type: 'string', array: true, required: false},
            { key: 'remoteManagement', type: 'string', array: true, required: false },
            { key: 'warranty', type: 'string', required: true, size: 50 }
        ]
    },

    }

// Initialize Appwrite client
const client = new sdk.Client();
client
    // Set Appwrite Endpoint - where your Appwrite server is running.
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'http://172.30.128.1/v1')
    // Set Appwrite Project ID -  identifies your project in Appwrite.
    .setProject(process.env.APPWRITE_PROJECT_ID)
    // Set Appwrite API Key - for secure admin operations.
    .setKey(process.env.APPWRITE_API_KEY);

// Create a Databases service - to interact with Appwrite Databases API.
const database = new sdk.Databases(client);
// Database ID - the ID of your Appwrite database.
const databaseId = process.env.APPWRITE_DATABASE_ID || 'inventory-invoice-db';
// Base Collection ID - the main collection for products.
const baseCollectionId = 'products';

// Function to introduce a delay (in milliseconds) - for rate limiting.
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Function to validate collection ID format - ensures IDs are valid Appwrite identifiers.
async function validateCollectionId(collectionId) {
    // Regular expression to check for alphanumeric characters and underscores only.
    if (!collectionId.match(/^[a-zA-Z0-9_]+$/)) {
        throw new Error(`Invalid collection ID: ${collectionId}`);
    }
}

// Async function to create a collection in Appwrite with permissions
async function createCollection(collectionId, name) {
    // Try to create the collection
    try {
        // Validate the collection ID before creation
        await validateCollectionId(collectionId);

        console.log(`Creating collection: ${collectionId} with permissions`);

        // --- DEFINING PERMISSIONS FOR COLLECTION CREATION ---
        const permissions = [
            sdk.Permission.read(sdk.Role.users()),    // Allow read access to any authenticated user
            sdk.Permission.create(sdk.Role.users()),  // Allow create access to any authenticated user
            sdk.Permission.update(sdk.Role.users()),  // Allow update access to any authenticated user
            sdk.Permission.delete(sdk.Role.users()),  // Allow delete access to any authenticated user
        ];

        // Call Appwrite API to create a new collection and set permissions simultaneously
        await database.createCollection(
            databaseId,      // Database ID
            collectionId,    // Collection ID to be created
            name,             // Name of the collection
            permissions       // Permissions to be set during creation - NEW PARAMETER
        );
        console.log(`Created collection: ${collectionId} with permissions set`);
        // --- PERMISSIONS ARE NOW SET DURING CREATION ---

        // Introduce a delay after collection creation (for rate limiting)
        await delay(DELAY_BETWEEN_OPERATIONS);
    } catch (error) {
        // Catch any errors during collection creation
        // Check if the error code is 409 (Collection already exists)
        if (error.code === 409) {
            // Log message if collection already exists, do not throw error
            console.log(`Collection ${collectionId} already exists`);
        } else {
            // If error is not "already exists", log the error message
            console.error(`Failed to create collection ${collectionId}:`, error.message);
            // Re-throw the error to stop the process
            throw error;
        }
    }
}

// Async function to create attributes within a collection.
async function createAttributes(collectionId, attributes) {
    for (const attr of attributes) { // Loop through each attribute definition.
        try {
            console.log(`Creating attribute: ${attr.key} in ${collectionId}`);

            if (!attr.type) {
                throw new Error(`Missing type for attribute ${attr.key}`);
            }

            // Switch based on attribute type to call the correct Appwrite API function.
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
                        attr.min || -999999999,    // Default min value
                        attr.max || 999999999,     // Default max value
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
                        attr.min || -999999999,    // Default min value
                        attr.max || 999999999,     // Default max value
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
            await delay(DELAY_BETWEEN_OPERATIONS); // Delay for rate limiting
        } catch (error) {

          // Handle errors during attribute creation.
            if (error.code === 409) {
                console.log(`Attribute ${attr.key} already exists in ${collectionId}`);
            } else {
                console.error(`Failed to create attribute ${attr.key}:`, error.message);
                console.error('Full error:', error);
            }
        }
    }
}

// Async function to create a relationship attribute between collections.
async function createRelationship(categoryCollectionId) {
  try {
    console.log(`Creating relationship for ${categoryCollectionId}`);

    // Add validation for relationship attribute name length
    const relationshipAttributeName = `${categoryCollectionId}_id`;
    if (relationshipAttributeName.length > 64) { // Appwrite has limits on attribute name length
      console.warn(`Warning: Relationship attribute name ${relationshipAttributeName} might be too long`);
    }

    await database.createRelationshipAttribute(
      databaseId,
      baseCollectionId,
      categoryCollectionId,
      'oneToOne',
      true,
      relationshipAttributeName,
      'product_id',
      'cascade'
    );

    console.log(`Created relationship between ${baseCollectionId} and ${categoryCollectionId}`);
    await delay(DELAY_BETWEEN_OPERATIONS);
  } catch (error) {
    if (error.code === 409) {
      console.log(`Relationship for ${categoryCollectionId} already exists`);
    } else {
      console.error(`Failed to create relationship for ${categoryCollectionId}:`, error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        type: error.type
      });

      // Instead of throwing, we'll log and continue
      console.log('Continuing with next collection...');
    }
  }
}

// Main async function to setup the entire database schema.
async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Create base products collection and its attributes first
    await createCollection(baseCollectionId, 'Products');
    await createAttributes(baseCollectionId, baseAttributes);
    await delay(DELAY_BETWEEN_COLLECTIONS);

    // Process collections in smaller batches
    const categories = Object.entries(categoryCollections);
    const BATCH_SIZE = 5;

    for (let i = 0; i < categories.length; i += BATCH_SIZE) {
      const batch = categories.slice(i, i + BATCH_SIZE);

      console.log(`Processing batch ${i/BATCH_SIZE + 1}`);

      for (const [category, config] of batch) {
        console.log(`Processing category: ${category}`);

        try {
          await createCollection(config.name, `Product ${category} Specifications`);
          await delay(DELAY_BETWEEN_OPERATIONS);
          await createAttributes(config.name, config.attributes);
          await delay(DELAY_BETWEEN_OPERATIONS);
          await createRelationship(config.name);
          await delay(DELAY_BETWEEN_COLLECTIONS);

          console.log(`Completed processing category: ${category}`);
        } catch (error) {
          console.error(`Error processing category ${category}:`, error);
          // Continue with next category instead of stopping
          continue;
        }
      }

      // Add additional delay between batches
      await delay(5000); // 5-second delay between batches
    }

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup failed:', error.message);
    throw error;
  }
}

// Execute the database setup function and handle success/failure.
setupDatabase()
    .then(() => {
        console.log('Database initialization completed successfully');
        process.exit(0); // Exit with success code.
    })
    .catch(error => {
        console.error('Database initialization failed:', error);
        process.exit(1); // Exit with error code on failure.
    });
