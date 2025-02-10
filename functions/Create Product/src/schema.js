export const categorySpecs = {
  'allInOnePcs': {
    collectionName: 'all_in_one_pcs_specs',
    attributes: {
      screenSize: { type: 'double', required: false, min: 21, max: 34 },
      resolution: { type: 'string', required: false, size: 50 },
      displayType: { type: 'string', required: false, size: 50 },
      touchscreen: { type: 'boolean', required: false },
      processorModel: { type: 'string', required: false, size: 100 },
      graphicsType: { type: 'string', required: false, size: 50 },
      graphicsModel: { type: 'string', required: false, size: 100 },
      ramSize: { type: 'integer', required: false, min: 4, max: 128 },
      storageType: { type: 'string', required: false, size: 50 },
      storageCapacity: { type: 'integer', required: false, min: 128 },
      webcam: { type: 'string', required: false, size: 50 },
      speakerSystem: { type: 'string', required: false, size: 100 },
      ports: { type: 'string[]', required: false },
      wireless: { type: 'string[]', required: false },
      peripheralsIncluded: { type: 'string[]', required: false },
      standAdjustment: { type: 'string[]', required: false },
      operatingSystem: { type: 'string', required: false, size: 50 },
      securityFeatures: { type: 'string[]', required: false }
    }
  },

  'antivirusSoftware': {
    collectionName: 'antivirus_software_specs',
    attributes: {
      softwareType: { type: 'string', required: false, size: 50 },
      licenseLength: { type: 'string', required: false, size: 50 },
      deviceCount: { type: 'integer', required: false, min: 1 },
      compatibleOS: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'audioInterface': {
    collectionName: 'audio_interface_specs',
    attributes: {
      interfaceType: { type: 'string', required: false, size: 50 },
      inputChannels: { type: 'integer', required: false },
      outputChannels: { type: 'integer', required: false },
      micPreamps: { type: 'integer', required: false },
      sampleRate: { type: 'string[]', required: false },
      bitDepth: { type: 'string', required: false, size: 50 },
      inputTypes: { type: 'string[]', required: false },
      outputTypes: { type: 'string[]', required: false },
      phantomPower: { type: 'boolean', required: false },
      midiSupport: { type: 'boolean', required: false },
      dspFeatures: { type: 'string[]', required: false }
    }
  },

  'businessLaptops': {
    collectionName: 'business_laptops_specs',
    attributes: {
      screenSize: { type: 'double', required: false, min: 12, max: 17 },
      resolution: { type: 'string', required: false, size: 50 },
      displayType: { type: 'string', required: false, size: 50 },
      processorModel: { type: 'string', required: false, size: 100 },
      vPro: { type: 'boolean', required: false },
      ramSize: { type: 'integer', required: false, min: 4, max: 64 },
      storageType: { type: 'string', required: false, size: 50 },
      storageCapacity: { type: 'integer', required: false, min: 128 },
      securityFeatures: { type: 'string[]', required: false },
      dockingSupport: { type: 'string', required: false, size: 50 },
      portSelection: { type: 'string[]', required: false },
      batteryLife: { type: 'integer', required: false, min: 4, max: 24 },
      durabilityStandards: { type: 'string[]', required: false },
      managementFeatures: { type: 'string[]', required: false },
      warranty: { type: 'string', required: false, size: 50 }
    }
  },

  'chargers': {
    collectionName: 'chargersAndAdapters_specs',
    attributes: {
      chargerType: { type: 'string', required: false, size: 50 },
      outputWattage: { type: 'integer', required: false, min: 0 },
      inputVoltage: { type: 'string', required: false, size: 50 },
      outputVoltage: { type: 'string', required: false, size: 50 },
      compatibleDevices: { type: 'string[]', required: false },
      connectorType: { type: 'string[]', required: false },
      chargingProtocols: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false },
      cableIncluded: { type: 'boolean', required: false },
      cableLength: { type: 'double', required: false, min: 0, step: 0.1 },
      portCount: { type: 'integer', required: false, min: 1 },
      dimensions: { type: 'string', required: false, size: 50 }
    }
  },

  'conferenceSystems': {
    collectionName: 'conference_systems_specs',
    attributes: {
      systemType: { type: 'string', required: false, size: 50 },
      maxParticipants: { type: 'integer', required: false },
      videoQuality: { type: 'string', required: false, size: 50 },
      audioFeatures: { type: 'string[]', required: false },
      connectivity: { type: 'string[]', required: false },
      compatibility: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'coolingSystems': {
    collectionName: 'cooling_systems_specs',
    attributes: {
      coolingType: { type: 'string', required: false, size: 50 },
      socketSupport: { type: 'string[]', required: false },
      fanSize: { type: 'integer', required: false },
      fanCount: { type: 'integer', required: false, min: 1 },
      fanSpeed: { type: 'integer', required: false },
      fanSpeedRange: { type: 'string', required: false, size: 50 },
      airflow: { type: 'integer', required: false },
      staticPressure: { type: 'double', required: false },
      noiseLevel: { type: 'integer', required: false },
      radiatorSize: { type: 'string', required: false, size: 50 },
      radiatorThickness: { type: 'integer', required: false },
      tubingLength: { type: 'integer', required: false },
      pumpSpeed: { type: 'integer', required: false },
      tdp: { type: 'integer', required: false },
      height: { type: 'integer', required: false },
      pwmSupport: { type: 'boolean', required: false },
      bearingType: { type: 'string', required: false, size: 50 },
      connector: { type: 'string', required: false, size: 50 },
      rgbSupport: { type: 'boolean', required: false },
      rgbSoftware: { type: 'string[]', required: false },
      warranty: { type: 'integer', required: false }
    }
  },

  'designSoftware': {
    collectionName: 'design_software_specs',
    attributes: {
      softwareType: { type: 'string', required: false, size: 50 },
      licenseModel: { type: 'string', required: false, size: 50 },
      features: { type: 'string[]', required: false },
      fileFormats: { type: 'string[]', required: false }
    }
  },

  'developmentTools': {
    collectionName: 'development_tools_specs',
    attributes: {
      toolType: { type: 'string', required: false, size: 50 },
      programmingLanguages: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false },
      collaboration: { type: 'string[]', required: false }
    }
  },

  'displayPortCables': {
    collectionName: 'displayport_cables_specs',
    attributes: {
      version: { type: 'string', required: false, size: 50 },
      length: { type: 'integer', required: false },
      maxResolution: { type: 'string', required: false, size: 50 },
      features: { type: 'string[]', required: false }
    }
  },

  'documentCameras': {
    collectionName: 'document_cameras_specs',
    attributes: {
      resolution: { type: 'string', required: false, size: 50 },
      sensorType: { type: 'string', required: false, size: 50 },
      zoom: { type: 'string[]', required: false },
      frameRate: { type: 'integer', required: false },
      shootingArea: { type: 'string', required: false, size: 50 },
      connectivityOptions: { type: 'string[]', required: false },
      lightingSystem: { type: 'string[]', required: false },
      imagingFeatures: { type: 'string[]', required: false },
      software: { type: 'string[]', required: false },
      headPosition: { type: 'string', required: false, size: 50 },
      microphoneSystem: { type: 'string', required: false, size: 50 },
      portability: { type: 'string', required: false, size: 50 },
      powerSource: { type: 'string', required: false, size: 50 }
    }
  },

  'documentScanners': {
    collectionName: 'document_scanners_specs',
    attributes: {
      scannerType: { type: 'string', required: false, size: 50 },
      resolution: { type: 'integer', required: false },
      scanSpeed: { type: 'integer', required: false },
      adfCapacity: { type: 'integer', required: false },
      connectivity: { type: 'string[]', required: false },
      documentSize: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'drawingTablets': {
    collectionName: 'drawing_tablets_specs',
    attributes: {
      tabletType: { type: 'string', required: false, size: 50 },
      activeArea: { type: 'string', required: false, size: 50 },
      resolution: { type: 'integer', required: false },
      pressureLevels: { type: 'integer', required: false },
      displayResolution: { type: 'string', required: false, size: 50 },
      displaySize: { type: 'double', required: false },
      colorGamut: { type: 'integer', required: false },
      tiltSupport: { type: 'boolean', required: false },
      tiltRange: { type: 'integer', required: false },
      expressKeys: { type: 'integer', required: false },
      touchRing: { type: 'boolean', required: false },
      connectivity: { type: 'string[]', required: false },
      penType: { type: 'string', required: false, size: 50 },
      replacementNibs: { type: 'integer', required: false },
      reportingRate: { type: 'integer', required: false },
      softwareCompatibility: { type: 'string[]', required: false },
      operatingSystems: { type: 'string[]', required: false },
      powerSupply: { type: 'string', required: false, size: 50 },
      dimensions: { type: 'string', required: false, size: 50 },
      weight: { type: 'double', required: false }
    }
  },

  'educationalTablets': {
    collectionName: 'educational_tablets_specs',
    attributes: {
      screenSize: { type: 'double', required: false },
      resolution: { type: 'string', required: false, size: 50 },
      processor: { type: 'string', required: false, size: 100 },
      ram: { type: 'integer', required: false },
      storage: { type: 'integer', required: false },
      expandableStorage: { type: 'boolean', required: false },
      batteryCapacity: { type: 'integer', required: false },
      batteryLife: { type: 'integer', required: false },
      operatingSystem: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string[]', required: false },
      durabilityFeatures: { type: 'string[]', required: false },
      educationalFeatures: { type: 'string[]', required: false },
      accessibilityFeatures: { type: 'string[]', required: false },
      targetAgeGroup: { type: 'string[]', required: false }
    }
  },

  'eReaders': {
    collectionName: 'ereaders_specs',
    attributes: {
      screenSize: { type: 'double', required: false },
      screenTechnology: { type: 'string', required: false, size: 50 },
      resolution: { type: 'string', required: false, size: 50 },
      frontLight: { type: 'string', required: false, size: 50 },
      storage: { type: 'integer', required: false },
      batteryLife: { type: 'integer', required: false },
      waterproofRating: { type: 'string', required: false, size: 50 },
      supportedFormats: { type: 'string[]', required: false },
      connectivity: { type: 'string[]', required: false },
      audioSupport: { type: 'boolean', required: false },
      accessibilityFeatures: { type: 'string[]', required: false },
      educationalFeatures: { type: 'string[]', required: false },
      weight: { type: 'integer', required: false }
    }
  },

  'enterpriseSwitches': {
    collectionName: 'enterprise_switches_specs',
    attributes: {
      switchType: { type: 'string', required: false, size: 50 },
      throughput: { type: 'integer', required: false },
      vpnThroughput: { type: 'integer', required: false },
      concurrentSessions: { type: 'integer', required: false },
      ports: { type: 'string', required: false, size: 100 },
      securityFeatures: { type: 'string[]', required: false },
      vpnSupport: { type: 'string[]', required: false },
      authentication: { type: 'string[]', required: false }
    }
  },

  'ethernetCables': {
    collectionName: 'ethernet_cables_specs',
    attributes: {
      category: { type: 'string', required: false, size: 50 },
      length: { type: 'double', required: false },
      speed: { type: 'string', required: false, size: 50 },
      shielding: { type: 'string', required: false, size: 50 }
    }
  },

  'fiberOpticCables': {
    collectionName: 'fiber_optic_cables_specs',
    attributes: {
      type: { type: 'string', required: false, size: 50 },
      length: { type: 'double', required: false },
      connectorType: { type: 'string[]', required: false },
      speed: { type: 'string', required: false, size: 50 },
      jacketRating: { type: 'string', required: false, size: 50 }
    }
  },

  'gamingDesktops': {
    collectionName: 'gaming_desktops_specs',
    attributes: {
      processorModel: { type: 'string', required: false, size: 100 },
      processorCores: { type: 'integer', required: false, min: 4, max: 64 },
      gpuModel: { type: 'string', required: false, size: 100 },
      gpuVram: { type: 'integer', required: false, min: 4, max: 24 },
      ramSize: { type: 'integer', required: false, min: 8, max: 256 },
      ramType: { type: 'string', required: false, size: 50 },
      primaryStorage: { type: 'string', required: false, size: 50 },
      primaryStorageCapacity: { type: 'integer', required: false, min: 256 },
      secondaryStorage: { type: 'string', required: false, size: 50 },
      secondaryStorageCapacity: { type: 'integer', required: false },
      coolingSystem: { type: 'string[]', required: false },
      caseType: { type: 'string', required: false, size: 50 },
      powerSupply: { type: 'integer', required: false, min: 500, max: 1600 },
      motherboardType: { type: 'string', required: false, size: 50 },
      rgbFeatures: { type: 'string[]', required: false },
      ports: { type: 'string[]', required: false },
      networkingFeatures: { type: 'string[]', required: false },
      expansionSlots: { type: 'string[]', required: false }
    }
  },

  'gamingLaptops': {
    collectionName: 'gaming_laptops_specs',
    attributes: {
      screenSize: { type: 'double', required: false, min: 13, max: 18 },
      resolution: { type: 'string', required: false, size: 50 },
      refreshRate: { type: 'string', required: false, size: 20 },
      processorModel: { type: 'string', required: false, size: 100 },
      gpuModel: { type: 'string', required: false, size: 100 },
      gpuVram: { type: 'integer', required: false, min: 4, max: 16 },
      ramSize: { type: 'integer', required: false, min: 8, max: 128 },
      ramType: { type: 'string', required: false, size: 50 },
      storageType: { type: 'string', required: false, size: 50 },
      storageCapacity: { type: 'integer', required: false, min: 256 },
      coolingSystem: { type: 'string[]', required: false },
      rgbFeatures: { type: 'string[]', required: false },
      ports: { type: 'string[]', required: false },
      weight: { type: 'double', required: false, min: 2, max: 4.5 },
      batteryCapacity: { type: 'integer', required: false, min: 50, max: 100 },
      powerSupply: { type: 'integer', required: false, min: 180, max: 330 },
      features: { type: 'string[]', required: false }
    }
  },

  'graphicsCards': {
    collectionName: 'graphics_cards_specs',
    attributes: {
      chipsetManufacturer: { type: 'string', required: false, size: 50 },
      gpuModel: { type: 'string', required: false, size: 100 },
      memorySize: { type: 'integer', required: false },
      memoryType: { type: 'string', required: false, size: 50 },
      memoryBus: { type: 'integer', required: false },
      baseClock: { type: 'integer', required: false },
      boostClock: { type: 'integer', required: false },
      rtCores: { type: 'integer', required: false },
      tensorCores: { type: 'integer', required: false },
      displayOutputs: { type: 'string[]', required: false },
      powerConnectors: { type: 'string[]', required: false },
      tdp: { type: 'integer', required: false },
      recommendedPsu: { type: 'integer', required: false },
      length: { type: 'integer', required: false },
      width: { type: 'integer', required: false },
      cooling: { type: 'string', required: false, size: 50 },
      features: { type: 'string[]', required: false },
      directX: { type: 'string', required: false, size: 50 },
      openGL: { type: 'string', required: false, size: 50 }
    }
  },

  'hdmiCables': {
    collectionName: 'hdmi_cables_specs',
    attributes: {
      version: { type: 'string', required: false, size: 50 },
      length: { type: 'double', required: false },
      maxResolution: { type: 'string', required: false, size: 50 },
      features: { type: 'string[]', required: false },
      shielding: { type: 'string', required: false, size: 50 }
    }
  },

  'headphones': {
    collectionName: 'headphones_specs',
    attributes: {
      headphoneType: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string', required: false, size: 50 },
      driver: { type: 'string', required: false, size: 50 },
      frequency: { type: 'string', required: false, size: 50 },
      impedance: { type: 'integer', required: false },
      sensitivity: { type: 'integer', required: false },
      noiseControl: { type: 'string[]', required: false },
      batteryLife: { type: 'integer', required: false },
      waterResistance: { type: 'string', required: false, size: 50 },
      features: { type: 'string[]', required: false }
    }
  },

  'interactiveDisplays': {
    collectionName: 'interactive_displays_specs',
    attributes: {
      displaySize: { type: 'integer', required: false },
      resolution: { type: 'string', required: false, size: 50 },
      touchPoints: { type: 'integer', required: false },
      touchTechnology: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string[]', required: false },
      operatingSystem: { type: 'string', required: false, size: 50 },
      processor: { type: 'string', required: false, size: 100 },
      ram: { type: 'integer', required: false },
      storage: { type: 'integer', required: false },
      speakers: { type: 'string', required: false, size: 100 },
      mountingOptions: { type: 'string[]', required: false },
      collaborativeFeatures: { type: 'string[]', required: false },
      includedSoftware: { type: 'string[]', required: false }
    }
  },

  'keyboards': {
    collectionName: 'keyboards_specs',
    attributes: {
      keyboardType: { type: 'string', required: false, size: 50 },
      layout: { type: 'string', required: false, size: 50 },
      switchType: { type: 'string', required: false, size: 50 },
      hotSwappable: { type: 'boolean', required: false },
      connectivity: { type: 'string', required: false, size: 50 },
      keycapMaterial: { type: 'string', required: false, size: 50 },
      backlighting: { type: 'string', required: false, size: 50 },
      rgbFeatures: { type: 'string[]', required: false },
      pollingRate: { type: 'string', required: false, size: 50 },
      antiGhosting: { type: 'boolean', required: false },
      nKeyRollover: { type: 'boolean', required: false },
      mediaKeys: { type: 'boolean', required: false },
      macroKeys: { type: 'boolean', required: false },
      palmRest: { type: 'boolean', required: false },
      passthrough: { type: 'string[]', required: false },
      onboardMemory: { type: 'boolean', required: false },
      operatingSystem: { type: 'string[]', required: false },
      weight: { type: 'integer', required: false },
      dimensions: { type: 'string', required: false, size: 50 }
    }
  },

  'labelPrinters': {
    collectionName: 'label_printers_specs',
    attributes: {
      printerType: { type: 'string', required: false, size: 50 },
      printResolution: { type: 'integer', required: false },
      printSpeed: { type: 'integer', required: false },
      maxLabelWidth: { type: 'integer', required: false },
      connectivity: { type: 'string[]', required: false },
      mediaTypes: { type: 'string[]', required: false }
    }
  },

  'lightningCables': {
    collectionName: 'lightning_cables_specs',
    attributes: {
      certification: { type: 'string', required: false, size: 50 },
      length: { type: 'double', required: false },
      chargingSpeed: { type: 'integer', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'mice': {
    collectionName: 'mice_specs',
    attributes: {
      mouseType: { type: 'string', required: false, size: 50 },
      sensorType: { type: 'string', required: false, size: 50 },
      dpi: { type: 'integer', required: false },
      dpiAdjustable: { type: 'boolean', required: false },
      connectivity: { type: 'string', required: false, size: 50 },
      pollingRate: { type: 'string', required: false, size: 50 },
      buttons: { type: 'integer', required: false, min: 2 },
      programmableButtons: { type: 'boolean', required: false },
      weight: { type: 'integer', required: false },
      adjustableWeight: { type: 'boolean', required: false },
      rgbLighting: { type: 'boolean', required: false },
      rgbZones: { type: 'string[]', required: false },
      gripStyle: { type: 'string', required: false, size: 50 },
      handOrientation: { type: 'string', required: false, size: 50 },
      onboardMemory: { type: 'boolean', required: false },
      onboardProfiles: { type: 'integer', required: false },
      batteryLife: { type: 'integer', required: false },
      chargingType: { type: 'string', required: false, size: 50 },
      cableType: { type: 'string', required: false, size: 50 },
      cableLength: { type: 'double', required: false },
      dimensions: { type: 'string', required: false, size: 50 }
    }
  },

  'microphones': {
    collectionName: 'microphones_specs',
    attributes: {
      micType: { type: 'string', required: false, size: 50 },
      polarPattern: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string', required: false, size: 50 },
      frequency: { type: 'string', required: false, size: 50 },
      maxSPL: { type: 'integer', required: false },
      sampleRate: { type: 'string', required: false, size: 50 },
      bitDepth: { type: 'string', required: false, size: 50 },
      includes: { type: 'string[]', required: false }
    }
  },

  'miniPcs': {
    collectionName: 'mini_pcs_specs',
    attributes: {
      processorModel: { type: 'string', required: false, size: 100 },
      processorType: { type: 'string', required: false, size: 50 },
      integratedGraphics: { type: 'string', required: false, size: 100 },
      discreteGpu: { type: 'string', required: false, size: 100 },
      ramSize: { type: 'integer', required: false, min: 4, max: 64 },
      ramType: { type: 'string', required: false, size: 50 },
      storageType: { type: 'string', required: false, size: 50 },
      storageCapacity: { type: 'integer', required: false, min: 64 },
      dimensions: { type: 'string', required: false, size: 50 },
      volume: { type: 'double', required: false, step: 0.1 },
      mountingOptions: { type: 'string[]', required: false },
      ports: { type: 'string[]', required: false },
      displaySupport: { type: 'string[]', required: false },
      networking: { type: 'string[]', required: false },
      powerConsumption: { type: 'integer', required: false, min: 10, max: 150 },
      coolingSystem: { type: 'string', required: false, size: 50 },
      operatingSystem: { type: 'string', required: false, size: 50 },
      useCase: { type: 'string[]', required: false }
    }
  },

  'monitors': {
    collectionName: 'monitors_specs',
    attributes: {
      displaySize: { type: 'double', required: false, step: 0.1 },
      resolution: { type: 'string', required: false, size: 50 },
      panelType: { type: 'string', required: false, size: 50 },
      refreshRate: { type: 'integer', required: false },
      responseTime: { type: 'double', required: false, step: 0.1 },
      aspectRatio: { type: 'string', required: false, size: 50 },
      brightness: { type: 'integer', required: false },
      contrast: { type: 'string', required: false, size: 50 },
      hdrSupport: { type: 'string', required: false, size: 50 },
      colorGamut: { type: 'string[]', required: false },
      ports: { type: 'string[]', required: false },
      usbHub: { type: 'string[]', required: false },
      speakers: { type: 'boolean', required: false },
      speakerPower: { type: 'integer', required: false },
      mountingSupport: { type: 'string', required: false, size: 50 },
      adjustments: { type: 'string[]', required: false },
      gamingFeatures: { type: 'string[]', required: false },
      powerConsumption: { type: 'integer', required: false }
    }
  },

  'motherboards': {
    collectionName: 'motherboards_specs',
    attributes: {
      formFactor: { type: 'string', required: false, size: 50 },
      socket: { type: 'string', required: false, size: 50 },
      chipset: { type: 'string', required: false, size: 100 },
      memoryType: { type: 'string', required: false, size: 50 },
      memorySlots: { type: 'integer', required: false, min: 2, max: 8 },
      maxMemory: { type: 'integer', required: false },
      memorySpeed: { type: 'string[]', required: false },
      pciSlots: { type: 'string[]', required: false },
      m2Slots: { type: 'integer', required: false, min: 0, max: 5 },
      sataConnectors: { type: 'integer', required: false, min: 0, max: 12 },
      raidSupport: { type: 'string[]', required: false },
      lanPorts: { type: 'string[]', required: false },
      wirelessNetworking: { type: 'string[]', required: false },
      audioCodec: { type: 'string', required: false, size: 100 },
      audioChannels: { type: 'string', required: false, size: 50 },
      usbPorts: { type: 'string[]', required: false },
      powerPhases: { type: 'string', required: false, size: 50 },
      powerConnectors: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'networkCards': {
    collectionName: 'network_cards_specs',
    attributes: {
      interfaceType: { type: 'string', required: false, size: 50 },
      networkType: { type: 'string', required: false, size: 50 },
      ethernetSpeed: { type: 'string', required: false, size: 50 },
      wifiStandard: { type: 'string', required: false, size: 50 },
      bluetoothVersion: { type: 'string', required: false, size: 50 },
      antennas: { type: 'integer', required: false },
      ports: { type: 'integer', required: false },
      features: { type: 'string[]', required: false },
      formFactor: { type: 'string', required: false, size: 50 },
      chipset: { type: 'string', required: false, size: 100 }
    }
  },

  'networkSecurity': {
    collectionName: 'network_security_specs',
    attributes: {
      deviceType: { type: 'string', required: false, size: 50 },
      throughput: { type: 'integer', required: false },
      vpnThroughput: { type: 'integer', required: false },
      concurrentSessions: { type: 'integer', required: false },
      ports: { type: 'string', required: false, size: 100 },
      securityFeatures: { type: 'string[]', required: false },
      vpnSupport: { type: 'string[]', required: false },
      authentication: { type: 'string[]', required: false }
    }
  },

  'officeSoftware': {
    collectionName: 'office_software_specs',
    attributes: {
      suiteType: { type: 'string', required: false, size: 50 },
      licenseType: { type: 'string', required: false, size: 50 },
      platform: { type: 'string[]', required: false },
      cloudFeatures: { type: 'string[]', required: false }
    }
  },

  'operatingSystems': {
    collectionName: 'operating_systems_specs',
    attributes: {
      osType: { type: 'string', required: false, size: 50 },
      version: { type: 'string', required: false, size: 100 },
      licenseType: { type: 'string', required: false, size: 50 },
      architecture: { type: 'string[]', required: false },
      systemRequirements: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'paperShredders': {
    collectionName: 'paper_shredders_specs',
    attributes: {
      shredderType: { type: 'string', required: false, size: 50 },
      securityLevel: { type: 'string', required: false, size: 50 },
      sheetCapacity: { type: 'integer', required: false },
      binCapacity: { type: 'integer', required: false },
      runTime: { type: 'integer', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'pcCases': {
    collectionName: 'pc_cases_specs',
    attributes: {
      formFactor: { type: 'string[]', required: false },
      caseType: { type: 'string', required: false, size: 50 },
      dimensions: { type: 'string', required: false, size: 50 },
      weight: { type: 'double', required: false },
      maxGpuLength: { type: 'integer', required: false },
      maxCpuCoolerHeight: { type: 'integer', required: false },
      maxPsuLength: { type: 'integer', required: false },
      materials: { type: 'string[]', required: false },
      fanSupport: { type: 'string[]', required: false },
      frontFans: { type: 'integer', required: false, min: 0 },
      topFans: { type: 'integer', required: false, min: 0 },
      rearFans: { type: 'integer', required: false, min: 0 },
      includedFans: { type: 'integer', required: false, min: 0 },
      radiatorSupport: { type: 'string[]', required: false },
      driveBays35: { type: 'integer', required: false, min: 0 },
      driveBays25: { type: 'integer', required: false, min: 0 },
      expansionSlots: { type: 'integer', required: false, min: 0 },
      frontPorts: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false },
      dustFilters: { type: 'string[]', required: false }
    }
  },

  'phoneAccessories': {
    collectionName: 'phone_accessories_specs',
    attributes: {
      accessoryType: { type: 'string', required: false, size: 50 },
      compatibility: { type: 'string[]', required: false },
      material: { type: 'string', required: false, size: 50 },
      color: { type: 'string', required: false, size: 50 },
      dimensions: { type: 'string', required: false, size: 50 },
      features: { type: 'string[]', required: false },
      warranty: { type: 'integer', required: false }
    }
  },

  'powerBanks': {
    collectionName: 'power_banks_specs',
    attributes: {
      capacity: { type: 'integer', required: false },
      outputPorts: { type: 'string[]', required: false },
      inputPorts: { type: 'string[]', required: false },
      fastCharging: { type: 'string[]', required: false },
      maxOutput: { type: 'integer', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'powerSupplies': {
    collectionName: 'power_supplies_specs',
    attributes: {
      wattage: { type: 'integer', required: false },
      efficiency: { type: 'string', required: false, size: 50 },
      formFactor: { type: 'string', required: false, size: 50 },
      modularity: { type: 'string', required: false, size: 50 },
      mainConnector: { type: 'string', required: false, size: 50 },
      cpuConnectors: { type: 'string[]', required: false },
      pciePowerConnectors: { type: 'string[]', required: false },
      sataConnectors: { type: 'integer', required: false },
      molex4Pin: { type: 'integer', required: false },
      fanSize: { type: 'integer', required: false },
      fanBearing: { type: 'string', required: false, size: 50 },
      fanControl: { type: 'string', required: false, size: 50 },
      protectionFeatures: { type: 'string[]', required: false },
      dcOutput: { type: 'integer', required: false },
      railDesign: { type: 'string', required: false, size: 50 },
      certification: { type: 'string[]', required: false },
      warranty: { type: 'integer', required: false },
      depth: { type: 'integer', required: false }
    }
  },

  'printers': {
    collectionName: 'printers_specs',
    attributes: {
      printerType: { type: 'string', required: false, size: 50 },
      functionality: { type: 'string[]', required: false },
      printTechnology: { type: 'string', required: false, size: 50 },
      colorPrinting: { type: 'boolean', required: false },
      printResolution: { type: 'string', required: false, size: 50 },
      printSpeedBlackAndWhite: { type: 'integer', required: false },
      printSpeedColor: { type: 'integer', required: false },
      duplexPrinting: { type: 'boolean', required: false },
      paperHandling: { type: 'string[]', required: false },
      paperTrayCapacity: { type: 'integer', required: false },
      connectivity: { type: 'string[]', required: false },
      mobilePrinting: { type: 'string[]', required: false },
      memory: { type: 'integer', required: false },
      processorSpeed: { type: 'integer', required: false },
      monthlyDutyCycle: { type: 'integer', required: false },
      scannerFeatures: { type: 'string[]', required: false },
      scanResolution: { type: 'string', required: false, size: 50 },
      displayScreen: { type: 'string', required: false, size: 50 },
      dimensions: { type: 'string', required: false, size: 50 },
      weight: { type: 'double', required: false },
      powerConsumption: { type: 'integer', required: false }
    }
  },

  'processors-cpus': {
    collectionName: 'processors_cpus_specs',
    attributes: {
      series: { type: 'string', required: false, size: 100 },
      generation: { type: 'string', required: false, size: 50 },
      cores: { type: 'integer', required: false, min: 1 },
      threads: { type: 'integer', required: false, min: 1 },
      baseFrequency: { type: 'double', required: false, step: 0.1 },
      boostFrequency: { type: 'double', required: false, step: 0.1 },
      socket: { type: 'string', required: false, size: 50 },
      tdp: { type: 'integer', required: false },
      lithography: { type: 'integer', required: false },
      integratedGraphics: { type: 'boolean', required: false },
      igpuModel: { type: 'string', required: false, size: 100 },
      l1Cache: { type: 'integer', required: false },
      l2Cache: { type: 'integer', required: false },
      l3Cache: { type: 'integer', required: false },
      memorySupport: { type: 'string[]', required: false },
      maxMemorySpeed: { type: 'integer', required: false },
      pcieLanes: { type: 'integer', required: false },
      pcieVersion: { type: 'string', required: false, size: 50 }
    }
  },

  'projectors': {
    collectionName: 'projectors_specs',
    attributes: {
      projectorType: { type: 'string', required: false, size: 50 },
      resolution: { type: 'string', required: false, size: 50 },
      brightness: { type: 'integer', required: false },
      contrastRatio: { type: 'string', required: false, size: 50 },
      lampLife: { type: 'integer', required: false },
      connectivity: { type: 'string[]', required: false }
    }
  },

  'ramMemory': {
    collectionName: 'ram_memory_specs',
    attributes: {
      memoryType: { type: 'string', required: false, size: 50 },
      capacity: { type: 'integer', required: false },
      moduleCount: { type: 'integer', required: false, min: 1, max: 8 },
      speed: { type: 'integer', required: false },
      timing: { type: 'string', required: false, size: 50 },
      voltage: { type: 'double', required: false, step: 0.01 },
      formFactor: { type: 'string', required: false, size: 50 },
      height: { type: 'integer', required: false },
      heatspreader: { type: 'boolean', required: false },
      xmpSupport: { type: 'boolean', required: false },
      xmpProfiles: { type: 'string[]', required: false },
      eccSupport: { type: 'boolean', required: false },
      rgbLighting: { type: 'boolean', required: false },
      rgbSoftware: { type: 'string[]', required: false },
      color: { type: 'string', required: false, size: 50 },
      warranty: { type: 'integer', required: false }
    }
  },

  'routers': {
    collectionName: 'routers_specs',
    attributes: {
      routerType: { type: 'string', required: false, size: 50 },
      wifiStandard: { type: 'string', required: false, size: 50 },
      frequency: { type: 'string[]', required: false },
      maxSpeed: { type: 'string', required: false, size: 50 },
      ports: { type: 'integer', required: false },
      security: { type: 'string[]', required: false },
      coverage: { type: 'integer', required: false },
      antennas: { type: 'integer', required: false },
      processor: { type: 'string', required: false, size: 100 },
      memory: { type: 'string', required: false, size: 50 }
    }
  },

  'scanners': {
    collectionName: 'scanners_specs',
    attributes: {
      scannerType: { type: 'string', required: false, size: 50 },
      opticalResolution: { type: 'string', required: false, size: 50 },
      interpolatedResolution: { type: 'string', required: false, size: 50 },
      colorDepth: { type: 'string', required: false, size: 50 },
      scanSpeed: { type: 'integer', required: false },
      adfCapacity: { type: 'integer', required: false },
      duplexScanning: { type: 'boolean', required: false },
      maximumScanSize: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string[]', required: false },
      fileFormats: { type: 'string[]', required: false },
      ocrSupport: { type: 'boolean', required: false },
      documentFeeder: { type: 'string', required: false, size: 50 },
      scannerButtons: { type: 'string[]', required: false },
      operatingSystems: { type: 'string[]', required: false },
      dimensions: { type: 'string', required: false, size: 50 },
      weight: { type: 'double', required: false },
      operatingPowerConsumption: { type: 'integer', required: false },
      standbyPowerConsumption: { type: 'integer', required: false },
      warranty: { type: 'integer', required: false }
    }
  },

  'securityCameras': {
    collectionName: 'security_cameras_specs',
    attributes: {
      cameraType: { type: 'string', required: false, size: 50 },
      resolution: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string[]', required: false },
      powerSource: { type: 'string', required: false, size: 50 },
      nightVision: { type: 'string', required: false, size: 50 },
      weatherResistance: { type: 'string', required: false, size: 50 },
      storage: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'smartAppliances': {
    collectionName: 'smart_appliances_specs',
    attributes: {
      applianceType: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string[]', required: false },
      smartFeatures: { type: 'string[]', required: false },
      displayType: { type: 'string', required: false, size: 50 },
      energyRating: { type: 'string', required: false, size: 50 },
      powerConsumption: { type: 'integer', required: false }
    }
  },

  'smartBands': {
    collectionName: 'smart_bands_specs',
    attributes: {
      displayType: { type: 'string', required: false, size: 50 },
      screenSize: { type: 'double', required: false },
      sensors: { type: 'string[]', required: false },
      waterResistance: { type: 'string', required: false, size: 50 },
      batteryLife: { type: 'integer', required: false },
      chargingTime: { type: 'integer', required: false },
      connectivity: { type: 'string[]', required: false },
      compatibility: { type: 'string[]', required: false },
      bandMaterial: { type: 'string', required: false, size: 50 },
      activityTracking: { type: 'string[]', required: false }
    }
  },

  'smartDoorbells': {
    collectionName: 'smart_doorbells_specs',
    attributes: {
      resolution: { type: 'string', required: false, size: 50 },
      fieldOfView: { type: 'integer', required: false },
      powerSource: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string[]', required: false },
      smartIntegration: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'smartLighting': {
    collectionName: 'smart_lighting_specs',
    attributes: {
      lightType: { type: 'string', required: false, size: 50 },
      bulbType: { type: 'string', required: false, size: 50 },
      wattage: { type: 'integer', required: false },
      brightness: { type: 'integer', required: false },
      colorType: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string[]', required: false }
    }
  },

  'smartLocks': {
    collectionName: 'smart_locks_specs',
    attributes: {
      lockType: { type: 'string', required: false, size: 50 },
      unlockMethods: { type: 'string[]', required: false },
      powerSource: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string[]', required: false },
      smartIntegration: { type: 'string[]', required: false }
    }
  },

  'smartPlugs': {
    collectionName: 'smart_plugs_specs',
    attributes: {
      plugType: { type: 'string', required: false, size: 50 },
      maxPower: { type: 'integer', required: false },
      connectivity: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false }
    }
  },

  'smartSpeakers': {
    collectionName: 'smart_speakers_specs',
    attributes: {
      speakerType: { type: 'string', required: false, size: 50 },
      audioChannels: { type: 'string', required: false, size: 50 },
      voiceAssistants: { type: 'string[]', required: false },
      connectivity: { type: 'string[]', required: false },
      audioFeatures: { type: 'string[]', required: false },
      smartFeatures: { type: 'string[]', required: false }
    }
  },

  'smartphones': {
    collectionName: 'smartphones_specs',
    attributes: {
      platform: { type: 'string', required: false, size: 50 },
      brand: { type: 'string', required: false, size: 50 },
      screenSize: { type: 'double', required: false },
      resolution: { type: 'string', required: false, size: 50 },
      processor: { type: 'string', required: false, size: 100 },
      ram: { type: 'integer', required: false },
      storage: { type: 'string', required: false, size: 50 },
      mainCamera: { type: 'string', required: false, size: 100 },
      frontCamera: { type: 'string', required: false, size: 100 },
      battery: { type: 'integer', required: false },
      chargingSpeed: { type: 'integer', required: false },
      biometrics: { type: 'string[]', required: false },
      connectivity: { type: 'string[]', required: false },
      waterResistance: { type: 'string', required: false, size: 50 },
      dimensions: { type: 'string', required: false, size: 50 },
      weight: { type: 'integer', required: false }
    }
  },

  'speakers': {
    collectionName: 'speakers_specs',
    attributes: {
      speakerType: { type: 'string', required: false, size: 50 },
      configuration: { type: 'string', required: false, size: 50 },
      powerOutput: { type: 'integer', required: false },
      frequency: { type: 'string', required: false, size: 50 },
      connectivity: { type: 'string[]', required: false },
      wirelessFeatures: { type: 'string[]', required: false },
      mountingOptions: { type: 'string[]', required: false }
    }
  },

  'storage-devices': {
    collectionName: 'storage_devices_specs',
    attributes: {
      storageType: { type: 'string', required: false, size: 50 },
      capacity: { type: 'integer', required: false },
      formFactor: { type: 'string', required: false, size: 50 },
      interface: { type: 'string', required: false, size: 50 },
      readSpeed: { type: 'integer', required: false },
      writeSpeed: { type: 'integer', required: false },
      randomRead: { type: 'integer', required: false },
      randomWrite: { type: 'integer', required: false },
      nandType: { type: 'string', required: false, size: 50 },
      dramCache: { type: 'boolean', required: false },
      dramSize: { type: 'integer', required: false },
      tbw: { type: 'integer', required: false },
      mtbf: { type: 'integer', required: false },
      encryption: { type: 'string[]', required: false },
      idlePowerConsumption: { type: 'double', required: false },
      activePowerConsumption: { type: 'double', required: false },
      features: { type: 'string[]', required: false },
      includedSoftware: { type: 'string[]', required: false }
    }
  },

  'surgeProtectors': {
    collectionName: 'surge_protectors_specs',
    attributes: {
      outletCount: { type: 'integer', required: false },
      surgeRating: { type: 'integer', required: false },
      cordLength: { type: 'integer', required: false },
      features: { type: 'string[]', required: false },
      protection: { type: 'string[]', required: false }
    }
  },

  'tablets': {
    collectionName: 'tablets_specs',
    attributes: {
      platform: { type: 'string', required: false, size: 50 },
      brand: { type: 'string', required: false, size: 50 },
      screenSize: { type: 'double', required: false },
      displayType: { type: 'string', required: false, size: 50 },
      resolution: { type: 'string', required: false, size: 50 },
      processor: { type: 'string', required: false, size: 100 },
      ram: { type: 'integer', required: false },
      storage: { type: 'string', required: false, size: 50 },
      expandableStorage: { type: 'boolean', required: false },
      rearCamera: { type: 'string', required: false, size: 100 },
      frontCamera: { type: 'string', required: false, size: 100 },
      battery: { type: 'integer', required: false },
      pencilSupport: { type: 'boolean', required: false },
      keyboardSupport: { type: 'boolean', required: false },
      connectivity: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false },
      dimensions: { type: 'string', required: false, size: 50 },
      weight: { type: 'integer', required: false }
    }
  },

  'twoInOneLaptops': {
    collectionName: '2_in_1_laptops_specs',
    attributes: {
      screenSize: { type: 'double', required: false, min: 11, max: 17 },
      resolution: { type: 'string', required: false, size: 50 },
      touchscreen: { type: 'boolean', required: false },
      convertibleType: { type: 'string', required: false, size: 50 },
      penSupport: { type: 'string', required: false, size: 50 },
      processorModel: { type: 'string', required: false, size: 100 },
      ramSize: { type: 'integer', required: false, min: 4, max: 32 },
      storageType: { type: 'string', required: false, size: 50 },
      storageCapacity: { type: 'integer', required: false, min: 128 },
      weight: { type: 'double', required: false, min: 1, max: 2.5 },
      batteryLife: { type: 'integer', required: false, min: 4, max: 24 },
      ports: { type: 'string[]', required: false },
      biometricSecurity: { type: 'string[]', required: false },
      screenModes: { type: 'string[]', required: false }
    }
  },

  'ultrabooks': {
    collectionName: 'ultrabooks_specs',
    attributes: {
      screenSize: { type: 'double', required: false, min: 11, max: 17.3 },
      resolution: { type: 'string', required: false, size: 50 },
      displayType: { type: 'string', required: false, size: 50 },
      processorModel: { type: 'string', required: false, size: 100 },
      ramSize: { type: 'integer', required: false, min: 4, max: 64 },
      storageType: { type: 'string', required: false, size: 50 },
      storageCapacity: { type: 'integer', required: false, min: 128 },
      weight: { type: 'double', required: false, min: 0.8, max: 2 },
      thickness: { type: 'double', required: false, min: 8, max: 20 },
      batteryLife: { type: 'integer', required: false, min: 1, max: 24 },
      ports: { type: 'string[]', required: false },
      features: { type: 'string[]', required: false },
      wifi: { type: 'string', required: false, size: 50 },
      bluetooth: { type: 'string', required: false, size: 50 }
    }
  },

  'upsSystems': {
    collectionName: 'ups_systems_specs',
    attributes: {
      capacity: { type: 'integer', required: false },
      wattage: { type: 'integer', required: false },
      topology: { type: 'string', required: false, size: 50 },
      outlets: { type: 'integer', required: false },
      backupTime: { type: 'integer', required: false },
      batteryType: { type: 'string', required: false, size: 100 },
      features: { type: 'string[]', required: false }
    }
  },

  'usbCCables': {
    collectionName: 'usb_c_cables_specs',
    attributes: {
      specification: { type: 'string', required: false, size: 50 },
      length: { type: 'double', required: false },
      powerDelivery: { type: 'integer', required: false },
      dataTransferSpeed: { type: 'string', required: false, size: 50 },
      features: { type: 'string[]', required: false }
    }
  },

  'watchBands': {
    collectionName: 'watch_bands_specs',
    attributes: {
      compatibleDevices: { type: 'string[]', required: false },
      material: { type: 'string', required: false, size: 50 },
      bandWidth: { type: 'string[]', required: false },
      closureType: { type: 'string', required: false, size: 50 },
      adjustableLength: { type: 'boolean', required: false },
      waterResistant: { type: 'boolean', required: false },
      colorOptions: { type: 'string[]', required: false }
    }
  },

  'watchChargers': {
    collectionName: 'watch_chargers_specs',
    attributes: {
      chargerType: { type: 'string', required: false, size: 50 },
      compatibleDevices: { type: 'string[]', required: false },
      chargingSpeed: { type: 'integer', required: false },
      cableLength: { type: 'double', required: false },
      inputType: { type: 'string', required: false, size: 50 },
      portability: { type: 'string', required: false, size: 50 },
      safetyFeatures: { type: 'string[]', required: false }
    }
  },

  'watchProtectors': {
    collectionName: 'watch_protectors_specs',
    attributes: {
      protectorType: { type: 'string', required: false, size: 50 },
      compatibleDevices: { type: 'string[]', required: false },
      material: { type: 'string', required: false, size: 50 },
      protectionFeatures: { type: 'string[]', required: false },
      thickness: { type: 'double', required: false },
      transparency: { type: 'string', required: false, size: 50 },
      installationType: { type: 'string', required: false, size: 50 }
    }
  },

  'webcams': {
    collectionName: 'webcams_specs',
    attributes: {
      resolution: { type: 'string', required: false, size: 50 },
      frameRate: { type: 'integer', required: false },
      sensorType: { type: 'string', required: false, size: 100 },
      focalLength: { type: 'string', required: false, size: 50 },
      focusType: { type: 'string', required: false, size: 50 },
      fieldOfView: { type: 'integer', required: false },
      microphone: { type: 'boolean', required: false },
      microphoneType: { type: 'string', required: false, size: 50 },
      noiseReduction: { type: 'boolean', required: false },
      connectivity: { type: 'string', required: false, size: 50 },
      cableLength: { type: 'double', required: false },
      mounting: { type: 'string[]', required: false },
      privacyFeatures: { type: 'string[]', required: false },
      smartFeatures: { type: 'string[]', required: false },
      operatingSystems: { type: 'string[]', required: false },
      dimensions: { type: 'string', required: false, size: 50 },
      weight: { type: 'integer', required: false },
      warranty: { type: 'integer', required: false }
    }
  },

  'workstations': {
    collectionName: 'workstations_specs',
    attributes: {
      processorModel: { type: 'string', required: false, size: 100 },
      processorCores: { type: 'integer', required: false, min: 4, max: 128 },
      professionalGpu: { type: 'string', required: false, size: 100 },
      gpuMemory: { type: 'integer', required: false, min: 4, max: 48 },
      eccMemorySize: { type: 'integer', required: false, min: 8, max: 1024 },
      memoryType: { type: 'string', required: false, size: 50 },
      primaryStorage: { type: 'string', required: false, size: 50 },
      primaryStorageCapacity: { type: 'integer', required: false, min: 256 },
      raidSupport: { type: 'string[]', required: false },
      formFactor: { type: 'string', required: false, size: 50 },
      powerSupply: { type: 'integer', required: false, min: 650, max: 1800 },
      redundantPower: { type: 'boolean', required: false },
      certifications: { type: 'string[]', required: false },
      operatingSystem: { type: 'string', required: false, size: 50 },
      networkingFeatures: { type: 'string[]', required: false },
      securityFeatures: { type: 'string[]', required: false },
      remoteManagement: { type: 'string[]', required: false },
      warranty: { type: 'string', required: false, size: 50 }
    }
  }
};

