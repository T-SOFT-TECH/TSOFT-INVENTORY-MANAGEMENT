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
    
];
// Appwrite client setup
const client = new sdk.Client();
client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'http://172.30.128.1/v1')
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