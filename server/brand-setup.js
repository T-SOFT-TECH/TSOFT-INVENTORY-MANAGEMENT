const sdk = require("node-appwrite");
require('dotenv').config();

const DELAY_BETWEEN_OPERATIONS = 500;

// Brand Collection Attributes
const brandAttributes = [
    { key: 'name', type: 'string', required: true, size: 100 },
    { key: 'slug', type: 'string', required: true, size: 100 },
    { key: 'description', type: 'string', required: false, size: 1000 },
    { key: 'websiteUrl', type: 'string', required: false, size: 255 },
    { key: 'logoUrl', type: 'string', required: false, size: 255 },
    {
        key: 'status',
        type: 'string',
        required: false,
        elements: ['active', 'inactive'], // Define enum values
        array: false,
        default: 'active'
    },
    { key: 'productCount', type: 'integer', required: false, min: 0, max: 999999 }
];

// Initial Brands Data
const initialBrands = [
    // Computer & Laptop Manufacturers
    {
        name: 'Dell',
        description: 'Leading manufacturer of computers, laptops, and tech solutions',
        websiteUrl: 'https://www.dell.com',
        status: 'active'
    },
    {
        name: 'HP',
        description: 'Global provider of computers, printers, and IT services',
        websiteUrl: 'https://www.hp.com',
        status: 'active'
    },
    {
        name: 'Lenovo',
        description: "World's largest PC vendor and provider of innovative tech solutions",
        websiteUrl: 'https://www.lenovo.com',
        status: 'active'
    },
    {
        name: 'ASUS',
        description: 'Leader in computers, components, and gaming hardware',
        websiteUrl: 'https://www.asus.com',
        status: 'active'
    },
    {
        name: 'Apple',
        description: 'Innovator in computers, smartphones, and consumer electronics',
        websiteUrl: 'https://www.apple.com',
        status: 'active'
    },
    {
        name: 'Acer',
        description: 'Manufacturer of affordable computers and gaming hardware',
        websiteUrl: 'https://www.acer.com',
        status: 'active'
    },
    {
        name: 'Microsoft',
        description: 'Provider of operating systems, software, and consumer tech',
        websiteUrl: 'https://www.microsoft.com',
        status: 'active'
    },
    {
        name: 'MSI',
        description: 'Leading brand for gaming laptops, desktops, and components',
        websiteUrl: 'https://www.msi.com',
        status: 'active'
    },

    // Smartphone & Mobile Brands
    {
        name: 'Samsung',
        description: 'Global leader in electronics, smartphones, and home appliances',
        websiteUrl: 'https://www.samsung.com',
        status: 'active'
    },
    {
        name: 'Huawei',
        description: 'Global provider of smartphones, networking, and cloud solutions',
        websiteUrl: 'https://www.huawei.com',
        status: 'active'
    },
    {
        name: 'Xiaomi',
        description: 'Innovator in affordable smartphones, smart devices, and accessories',
        websiteUrl: 'https://www.mi.com',
        status: 'active'
    },
    {
        name: 'Remax',
        description: 'Manufacturer of innovative mobile accessories, gadgets, and lifestyle products',
        websiteUrl: '',
        status: 'active'
    },


    // PC Components & Hardware
    {
        name: 'Intel',
        description: 'Leading developer of processors and semiconductor technology',
        websiteUrl: 'https://www.intel.com',
        status: 'active'
    },
    {
        name: 'AMD',
        description: 'Developer of CPUs, GPUs, and advanced computing solutions',
        websiteUrl: 'https://www.amd.com',
        status: 'active'
    },
    {
        name: 'NVIDIA',
        description: 'Innovator in GPUs, AI, and gaming technologies',
        websiteUrl: 'https://www.nvidia.com',
        status: 'active'
    },
    {
        name: 'Gigabyte',
        description: 'Provider of motherboards, GPUs, and gaming solutions',
        websiteUrl: 'https://www.gigabyte.com',
        status: 'active'
    },
    {
        name: 'EVGA',
        description: 'Specializes in GPUs, power supplies, and PC accessories',
        websiteUrl: 'https://www.evga.com',
        status: 'active'
    },
    {
        name: 'Cooler Master',
        description: 'Innovator in PC cooling solutions and gaming peripherals',
        websiteUrl: 'https://www.coolermaster.com',
        status: 'active'
    },
    {
        name: 'NZXT',
        description: 'Specialist in PC cases, coolers, and custom builds',
        websiteUrl: 'https://www.nzxt.com',
        status: 'active'
    },

    // Gaming & Peripherals
    {
        name: 'Razer',
        description: 'Manufacturer of gaming peripherals, laptops, and accessories',
        websiteUrl: 'https://www.razer.com',
        status: 'active'
    },
    {
        name: 'Logitech',
        description: 'Provider of peripherals like keyboards, mice, and webcams',
        websiteUrl: 'https://www.logitech.com',
        status: 'active'
    },
    {
        name: 'Corsair',
        description: 'Supplier of gaming peripherals, PC components, and memory',
        websiteUrl: 'https://www.corsair.com',
        status: 'active'
    },
    {
        name: 'HyperX',
        description: 'Gaming division of Kingston, specializing in gaming peripherals',
        websiteUrl: 'https://www.hyperxgaming.com',
        status: 'active'
    },
    {
        name: 'SteelSeries',
        description: 'Brand for gaming peripherals and accessories',
        websiteUrl: 'https://www.steelseries.com',
        status: 'active'
    },

    // Storage Solutions
    {
        name: 'Western Digital',
        description: 'Provider of storage solutions like HDDs and SSDs',
        websiteUrl: 'https://www.westerndigital.com',
        status: 'active'
    },
    {
        name: 'Seagate',
        description: 'Manufacturer of reliable storage devices and solutions',
        websiteUrl: 'https://www.seagate.com',
        status: 'active'
    },
    {
        name: 'Kingston',
        description: 'Provider of memory products and storage solutions',
        websiteUrl: 'https://www.kingston.com',
        status: 'active'
    },
    {
        name: 'Crucial',
        description: 'Brand of Micron, specializing in memory and storage solutions',
        websiteUrl: 'https://www.crucial.com',
        status: 'active'
    },
    {
        name: 'Hiksemi',
        description: 'Provider of storage solutions including SSDs and memory cards, and a subsidiary of Hikvision',
        websiteUrl: 'https://www.hiksemitech.com/en/hiksemi.html',
        status: 'active'
    },


    // Networking
    {
        name: 'TP-Link',
        description: 'Manufacturer of networking devices like routers and switches',
        websiteUrl: 'https://www.tp-link.com',
        status: 'active'
    },
    {
        name: 'Netgear',
        description: 'Provider of networking solutions and smart home devices',
        websiteUrl: 'https://www.netgear.com',
        status: 'active'
    },
    {
        name: 'D-Link',
        description: 'Global leader in networking solutions, including routers, switches, and smart home devices',
        websiteUrl: 'https://www.dlink.com',
        status: 'active'
    },


    // Accessories & Power
    {
        name: 'Anker',
        description: 'Specialist in mobile accessories and charging solutions',
        websiteUrl: 'https://www.anker.com',
        status: 'active'
    },
    {
        name: 'Yoobao',
        description: 'Provider of portable power solutions, including power banks, chargers, and mobile accessories',
        websiteUrl: '',
        status: 'active'
    },
    {
        name: 'Oraimo',
        description: 'Innovative brand specializing in smart accessories, power banks, audio devices, and wearables',
        websiteUrl: 'https://www.oraimo.com',
        status: 'active'
    },
    {
        name: 'Ldnio',
        description: 'Manufacturer of high-quality chargers, power strips, and mobile accessories',
        websiteUrl: 'https://www.ldnio.com',
        status: 'active'
    },

    // Printing & Imaging
    {
        name: 'Epson',
        description: 'Manufacturer of printers, projectors, and imaging equipment',
        websiteUrl: 'https://www.epson.com',
        status: 'active'
    },
    {
        name: 'Brother',
        description: 'Provider of printers, scanners, and office solutions',
        websiteUrl: 'https://www.brother.com',
        status: 'active'
    },
    {
        name: 'Canon',
        description: 'Specialist in cameras, imaging, and optical products',
        websiteUrl: 'https://www.canon.com',
        status: 'active'
    },
    {
        name: 'Nikon',
        description: 'Manufacturer of cameras and imaging devices',
        websiteUrl: 'https://www.nikon.com',
        status: 'active'
    },
    {
        name: 'GoPro',
        description: 'Specialist in action cameras and accessories',
        websiteUrl: 'https://www.gopro.com',
        status: 'active'
    },

    // Audio Equipment
    {
        name: 'Sony',
        description: 'Global leader in gaming consoles, electronics, and entertainment',
        websiteUrl: 'https://www.sony.com',
        status: 'active'
    },
    {
        name: 'Bose',
        description: 'Known for premium audio equipment and headphones',
        websiteUrl: 'https://www.bose.com',
        status: 'active'
    },
    {
        name: 'Sennheiser',
        description: 'High-quality headphones, microphones, and audio solutions',
        websiteUrl: 'https://www.sennheiser.com',
        status: 'active'
    },

    // Smart Home
    {
        name: 'Ring',
        description: 'Innovator in home security cameras and smart doorbells',
        websiteUrl: 'https://www.ring.com',
        status: 'active'
    },
    {
        name: 'Philips Hue',
        description: 'Smart lighting solutions for homes and businesses',
        websiteUrl: 'https://www.philips-hue.com',
        status: 'active'
    },
    {
        name: 'Hikvision',
        description: 'Global leader in video surveillance products and solutions, specializing in security cameras, NVRs, and AI-powered systems',
        websiteUrl: 'https://www.hikvision.com/en/',
        status: 'active'
    },

  // Smartphone & Mobile Brands
  {
    name: 'Google',
    description: 'Developer of Pixel smartphones and various tech products',
    websiteUrl: 'https://www.google.com',
    status: 'active'
  },
  {
    name: 'OnePlus',
    description: 'Manufacturer of high-performance smartphones',
    websiteUrl: 'https://www.oneplus.com',
    status: 'active'
  },
  {
    name: 'Motorola',
    description: 'Long-standing brand known for mobile phones and communication devices',
    websiteUrl: 'https://www.motorola.com',
    status: 'active'
  },
  {
    name: 'Oppo',
    description: 'Global smartphone brand known for innovative camera technology',
    websiteUrl: 'https://www.oppo.com',
    status: 'active'
  },
  {
    name: 'Vivo',
    description: 'Smartphone manufacturer focusing on audio and camera capabilities',
    websiteUrl: 'https://www.vivo.com',
    status: 'active'
  },
  {
    name: 'Nokia',
    description: 'Iconic brand producing smartphones via HMD Global',
    websiteUrl: 'https://www.nokia.com',
    status: 'active'
  },
  {
    name: 'Realme',
    description: 'Fast-growing brand offering affordable smartphones and accessories',
    websiteUrl: 'https://www.realme.com',
    status: 'active'
  },

  // Computer & Laptop Manufacturers
  {
    name: 'Alienware',
    description: 'Dell’s sub-brand specializing in high-performance gaming PCs and laptops',
    websiteUrl: 'https://www.alienware.com',
    status: 'active'
  },
  {
    name: 'Framework',
    description: 'Innovator in modular, repairable laptops',
    websiteUrl: 'https://frame.work',
    status: 'active'
  },

  // PC Components & Hardware
  {
    name: 'ASRock',
    description: 'Manufacturer of motherboards and PC hardware',
    websiteUrl: 'https://www.asrock.com',
    status: 'active'
  },
  {
    name: 'Sapphire',
    description: 'Specialist in AMD-based GPUs and graphics solutions',
    websiteUrl: 'https://www.sapphiretech.com',
    status: 'active'
  },
  {
    name: 'Zotac',
    description: 'Provider of GPUs, mini-PCs, and compact hardware solutions',
    websiteUrl: 'https://www.zotac.com',
    status: 'active'
  },

  // Gaming & Peripherals
  {
    name: 'Turtle Beach',
    description: 'Specialist in gaming headsets and audio equipment',
    websiteUrl: 'https://www.turtlebeach.com',
    status: 'active'
  },
  {
    name: 'Roccat',
    description: 'Manufacturer of gaming mice, keyboards, and accessories',
    websiteUrl: 'https://www.roccat.com',
    status: 'active'
  },
  {
    name: 'Thrustmaster',
    description: 'Provider of racing and flight simulation peripherals',
    websiteUrl: 'https://www.thrustmaster.com',
    status: 'active'
  },
  {
    name: 'Mad Catz',
    description: 'Manufacturer of gaming accessories and peripherals',
    websiteUrl: 'https://www.madcatz.com',
    status: 'active'
  },

  // Storage Solutions
  {
    name: 'SanDisk',
    description: 'Provider of flash memory storage solutions',
    websiteUrl: 'https://www.sandisk.com',
    status: 'active'
  },
  {
    name: 'Adata',
    description: 'Manufacturer of SSDs, memory products, and storage solutions',
    websiteUrl: 'https://www.adata.com',
    status: 'active'
  },

  // Networking
  {
    name: 'Cisco',
    description: 'Global leader in networking hardware, software, and services',
    websiteUrl: 'https://www.cisco.com',
    status: 'active'
  },
  {
    name: 'Ubiquiti',
    description: 'Provider of high-performance networking equipment and solutions',
    websiteUrl: 'https://www.ui.com',
    status: 'active'
  },
  {
    name: 'Linksys',
    description: 'Manufacturer of consumer routers and networking devices',
    websiteUrl: 'https://www.linksys.com',
    status: 'active'
  },

  // Accessories & Power
  {
    name: 'Belkin',
    description: 'Manufacturer of consumer electronics and accessories',
    websiteUrl: 'https://www.belkin.com',
    status: 'active'
  },
  {
    name: 'Ugreen',
    description: 'Provider of chargers, cables, and mobile accessories',
    websiteUrl: 'https://www.ugreen.com',
    status: 'active'
  },
  {
    name: 'RavPower',
    description: 'Specialist in power banks, chargers, and accessories',
    websiteUrl: 'https://www.ravpower.com',
    status: 'active'
  },

  // Printing & Imaging
  {
    name: 'Fujifilm',
    description: 'Provider of cameras, imaging solutions, and photographic equipment',
    websiteUrl: 'https://www.fujifilm.com',
    status: 'active'
  },
  {
    name: 'Polaroid',
    description: 'Manufacturer of instant cameras and imaging products',
    websiteUrl: 'https://www.polaroid.com',
    status: 'active'
  },
  {
    name: 'Ricoh',
    description: 'Provider of printers, cameras, and imaging solutions',
    websiteUrl: 'https://www.ricoh.com',
    status: 'active'
  },

  // Audio Equipment
  {
    name: 'JBL',
    description: 'Manufacturer of audio equipment, including speakers and headphones',
    websiteUrl: 'https://www.jbl.com',
    status: 'active'
  },
  {
    name: 'Harman Kardon',
    description: 'Premium audio brand known for speakers and sound systems',
    websiteUrl: 'https://www.harmankardon.com',
    status: 'active'
  },
  {
    name: 'Audio-Technica',
    description: 'Provider of high-quality headphones, microphones, and audio equipment',
    websiteUrl: 'https://www.audio-technica.com',
    status: 'active'
  },
  {
    name: 'Shure',
    description: 'Manufacturer of microphones and professional audio solutions',
    websiteUrl: 'https://www.shure.com',
    status: 'active'
  },

  // Smart Home
  {
    name: 'Nest',
    description: 'Provider of smart home products, including thermostats and cameras',
    websiteUrl: 'https://nest.com',
    status: 'active'
  },
  {
    name: 'Ecobee',
    description: 'Manufacturer of smart thermostats and home automation devices',
    websiteUrl: 'https://www.ecobee.com',
    status: 'active'
  },
  {
    name: 'Arlo',
    description: 'Specialist in smart security cameras and home monitoring',
    websiteUrl: 'https://www.arlo.com',
    status: 'active'
  },
  {
    name: 'Eufy',
    description: 'Provider of smart home devices, including cameras and vacuums',
    websiteUrl: 'https://www.eufy.com',
    status: 'active'
  },

  // Emerging Tech
  {
    name: 'Oculus',
    description: 'Leader in virtual reality headsets and technology',
    websiteUrl: 'https://www.oculus.com',
    status: 'active'
  },
  {
    name: 'DJI',
    description: 'Global leader in civilian drones and aerial imaging technology',
    websiteUrl: 'https://www.dji.com',
    status: 'active'
  },
  {
    name: 'Cerebras',
    description: 'Developer of AI hardware and large-scale computing solutions',
    websiteUrl: 'https://www.cerebras.net',
    status: 'active'
  },
  {
    name: 'Graphcore',
    description: 'Innovator in AI processors and machine learning hardware',
    websiteUrl: 'https://www.graphcore.ai',
    status: 'active'
  },
  {
    name: 'Tesla',
    description: 'Leader in electric vehicles, energy storage, and innovative tech',
    websiteUrl: 'https://www.tesla.com',
    status: 'active'
  },
  {
    name: 'Magic Leap',
    description: 'Developer of augmented reality hardware and solutions',
    websiteUrl: 'https://www.magicleap.com',
    status: 'active'
  }

];
// Appwrite client setup
const client = new sdk.Client();
client
    .setEndpoint(process.env.APPWRITE_ENDPOINT )
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const database = new sdk.Databases(client);
const databaseId = process.env.APPWRITE_DATABASE_ID || 'inventory-invoice-db';
const brandsCollectionId = 'brands';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate slug from brand name
function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function createBrandsCollection() {
    try {
        console.log('Creating brands collection...');
        await database.createCollection(
            databaseId,
            brandsCollectionId,
            'Brands'
        );
        console.log('Brands collection created successfully');
    } catch (error) {
        if (error.code === 409) {
            console.log('Brands collection already exists');
        } else {
            throw error;
        }
    }
}

async function createAttributes() {
    console.log('Creating attributes...');
    for (const attr of brandAttributes) {
        try {
            switch (attr.type) {
                case 'string':
                    if (attr.key === 'status') {
                        // Create enum attribute for status
                        await database.createEnumAttribute(
                            databaseId,
                            brandsCollectionId,
                            attr.key,
                            attr.elements,
                            attr.required,
                            attr.default,
                            false
                        );
                    } else {
                        // Create regular string attribute
                        await database.createStringAttribute(
                            databaseId,
                            brandsCollectionId,
                            attr.key,
                            attr.size,
                            attr.required,
                            null,
                            false
                        );
                    }
                    break;

                case 'integer':
                    await database.createIntegerAttribute(
                        databaseId,
                        brandsCollectionId,
                        attr.key,
                        attr.required,
                        attr.min,
                        attr.max,
                        0,
                        false
                    );
                    break;
            }
            console.log(`Created attribute: ${attr.key}`);
            await delay(DELAY_BETWEEN_OPERATIONS);
        } catch (error) {
            if (error.code === 409) {
                console.log(`Attribute ${attr.key} already exists`);
            } else {
                console.error(`Error creating attribute ${attr.key}:`, error);
            }
        }
    }
}

async function createIndexes() {
    console.log('Creating indexes...');
    try {
        // Create index for name (unique)
        await database.createIndex(
            databaseId,
            brandsCollectionId,
            'name_unique',
            'key',
            ['name'],
            true
        );
        console.log('Created name index');

        await delay(DELAY_BETWEEN_OPERATIONS);

        // Create index for slug (unique)
        await database.createIndex(
            databaseId,
            brandsCollectionId,
            'slug_unique',
            'key',
            ['slug'],
            true
        );
        console.log('Created slug index');

        await delay(DELAY_BETWEEN_OPERATIONS);

        // Create index for status
        await database.createIndex(
            databaseId,
            brandsCollectionId,
            'status_index',
            'key',
            ['status'],
            false
        );
        console.log('Created status index');
    } catch (error) {
        if (error.code === 409) {
            console.log('Indexes already exist');
        } else {
            console.error('Error creating indexes:', error);
        }
    }
}

// Add this function to clean brand names for IDs
function generateBrandId(brandName) {
    return brandName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')    // Replace non-alphanumeric chars with hyphens
        .replace(/^-+|-+$/g, '')        // Remove leading/trailing hyphens
        .replace(/\./g, '');            // Remove periods
}

async function populateBrands() {
    console.log('Populating brands...');
    for (const brand of initialBrands) {
        try {
            const brandId = generateBrandId(brand.name);
            const brandData = {
                ...brand,
                slug: generateSlug(brand.name),
                productCount: 0
            };

            await database.createDocument(
                databaseId,
                brandsCollectionId,
                brandId,  // Using brand name as ID
                brandData
            );
            console.log(`Created brand: ${brand.name} with ID: ${brandId}`);
            await delay(DELAY_BETWEEN_OPERATIONS);
        } catch (error) {
            if (error.code === 409) {
                console.log(`Brand ${brand.name} already exists`);
            } else {
                console.error(`Error creating brand ${brand.name}:`, error);
            }
        }
    }
}

async function setupBrandsCollection() {
    try {
        await createBrandsCollection();
        await createAttributes();
        await createIndexes();
        await populateBrands();
        console.log('Brands collection setup completed successfully');
    } catch (error) {
        console.error('Error setting up brands collection:', error);
        throw error;
    }
}

// Execute the setup
setupBrandsCollection()
    .then(() => {
        console.log('Brands initialization completed successfully');
        process.exit(0);
    })
    .catch(error => {
        console.error('Brands initialization failed:', error);
        process.exit(1);
    });
