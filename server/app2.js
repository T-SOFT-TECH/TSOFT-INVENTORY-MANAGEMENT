const sdk = require("node-appwrite");
require('dotenv').config();

// Configuration
const DELAY_BETWEEN_OPERATIONS = 1000;
const DELAY_BETWEEN_COLLECTIONS = 3000;

// Initialize Appwrite client
const client = new sdk.Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'http://localhost/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const database = new sdk.Databases(client);
const storage = new sdk.Storage(client);
const databaseId = process.env.APPWRITE_DATABASE_ID || 'inventory-invoice-db';

// Helper functions
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Collection creation function
async function createCollection(collectionId, name) {
  try {
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
    await delay(DELAY_BETWEEN_COLLECTIONS);
  } catch (error) {
    if (error.code === 409) {
      console.log(`Collection ${collectionId} already exists`);
    } else {
      console.error(`Failed to create collection ${collectionId}:`, error.message);
      throw error;
    }
  }
}

// Create bucket
async function createBucket(bucketId, name, maxSize = 10000000, allowedExtensions = ['jpg', 'png', 'pdf']) {
  try {
    console.log(`Creating bucket: ${bucketId}`);

    const permissions = [
      sdk.Permission.read(sdk.Role.any()),
      sdk.Permission.create(sdk.Role.any()),
      sdk.Permission.update(sdk.Role.any()),
      sdk.Permission.delete(sdk.Role.any()),
    ];

    await storage.createBucket(
      bucketId,
      name,
      permissions,
      maxSize,
      allowedExtensions
    );

    console.log(`Created bucket: ${bucketId}`);
    await delay(DELAY_BETWEEN_OPERATIONS);
  } catch (error) {
    if (error.code === 409) {
      console.log(`Bucket ${bucketId} already exists`);
    } else {
      console.error(`Failed to create bucket ${bucketId}:`, error.message);
    }
  }
}

// Create attributes function
async function createAttributes(collectionId, attributes) {
  for (const attr of attributes) {
    try {
      console.log(`Creating attribute: ${attr.key} in ${collectionId}`);

      if (!attr.type) {
        throw new Error(`Missing type for attribute ${attr.key}`);
      }

      switch (attr.type) {
        case 'string':
          if (attr.format === "enum" && attr.elements) {
            await database.createEnumAttribute(
              databaseId,
              collectionId,
              attr.key,
              attr.elements,
              attr.required,
              attr.default,
              attr.array || false
            );
          } else {
            await database.createStringAttribute(
              databaseId,
              collectionId,
              attr.key,
              attr.size || 255,
              attr.required,
              attr.default,
              attr.array || false
            );
          }
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

        case 'datetime':
          await database.createDatetimeAttribute(
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

// Create relationship attribute
async function createRelationship(collectionId, relationshipAttr) {
  try {
    console.log(`Creating relationship: ${relationshipAttr.key} in ${collectionId}`);

    await database.createRelationshipAttribute(
      databaseId,
      collectionId,
      relationshipAttr.key,
      relationshipAttr.relatedCollection,
      relationshipAttr.relationType,
      relationshipAttr.twoWay || false,
      relationshipAttr.twoWayKey || null,
      relationshipAttr.onDelete || 'setNull'
    );

    console.log(`Created relationship: ${relationshipAttr.key} in ${collectionId}`);
    await delay(DELAY_BETWEEN_OPERATIONS);
  } catch (error) {
    if (error.code === 409) {
      console.log(`Relationship ${relationshipAttr.key} already exists in ${collectionId}`);
    } else {
      console.error(`Failed to create relationship ${relationshipAttr.key}:`, error.message);
      console.error('Full error:', error);
    }
  }
}

// Create indexes
async function createCollectionIndexes(collectionId, indexes) {
  for (const index of indexes) {
    try {
      console.log(`Creating index: ${index.key} in ${collectionId}`);

      await database.createIndex(
        databaseId,
        collectionId,
        index.key,
        index.type,
        index.attributes,
        index.orders || []
      );

      console.log(`Created index: ${index.key} in ${collectionId}`);
      await delay(DELAY_BETWEEN_OPERATIONS);
    } catch (error) {
      if (error.code === 409) {
        console.log(`Index ${index.key} already exists in ${collectionId}`);
      } else {
        console.error(`Failed to create index ${index.key}:`, error.message);
      }
    }
  }
}

// Main setup function
async function setupAppwrite() {
  try {
    console.log('Starting Appwrite setup for non-product collections...');

    // Create collections
    const collections = [
      { id: "inventory-invoice-db", name: "Inventory/Invoice Database" },
      { id: "sales", name: "Sales" },
      { id: "stock_transactions", name: "Stock Transactions" },
      { id: "settings", name: "Settings" },
      { id: "invoices", name: "Invoices" },
      { id: "brands", name: "Brands" },
      { id: "categories", name: "Categories Collection" },
      { id: "customers", name: "Customers Collection" },
      { id: "sale-items", name: "Sale Items collection" }
    ];

    for (const collection of collections) {
      await createCollection(collection.id, collection.name);
    }

    // Create storage buckets
    await createBucket("productImages", "Product Images", 1000000, ["jpg", "png", "gif", "jpeg", "webp"]);
    await createBucket("brand-logo", "Brand Logo", 500000, ["jpg", "png", "svg", "jpeg", "webp"]);
    await createBucket("stock-receipts", "Stock Receipts", 5000000, ["jpg", "png", "jpeg", "webp"]);
    await createBucket("invoices-bucket", "Invoices Bucket", 10000000, ["jpg", "png", "pdf"]);

    // SALES COLLECTION
    // Sales - Regular attributes
    const salesAttributes = [
      { key: "invoiceNumber", type: "string", required: false, size: 50 },
      { key: "totalAmount", type: "double", required: false },
      { key: "date", type: "datetime", required: false },
      { key: "status", type: "string", required: false, format: "enum", elements: ["completed", "pending", "cancelled"] },
      { key: "paymentStatus", type: "string", required: false, format: "enum", elements: ["paid", "pending", "failed"] },
      { key: "subtotal", type: "double", required: false },
      { key: "tax", type: "double", required: false },
      { key: "paymentMethod", type: "string", required: true, format: "enum", elements: ["cash", "card", "transfer"] },
      { key: "idempotencyKey", type: "string", required: true, size: 40 },
      { key: "taxRate", type: "double", required: false }
    ];
    await createAttributes("sales", salesAttributes);

    // Sales - Relationships
    const salesRelationships = [
      {
        key: "customer",
        type: "relationship",
        required: false,
        relatedCollection: "customers",
        relationType: "oneToMany",
        twoWay: true,
        twoWayKey: "sales",
        onDelete: "setNull"
      },
      {
        key: "saleItems",
        type: "relationship",
        required: false,
        relatedCollection: "sale-items",
        relationType: "manyToOne",
        twoWay: true,
        twoWayKey: "saleId",
        onDelete: "setNull"
      }
    ];
    for (const rel of salesRelationships) {
      await createRelationship("sales", rel);
    }

    // Sales - Indexes
    const salesIndexes = [
      { key: "invoiceNumber", type: "unique", attributes: ["invoiceNumber"], orders: ["ASC"] },
      { key: "date", type: "key", attributes: ["date"], orders: ["ASC"] },
      { key: "status", type: "key", attributes: ["status"], orders: ["ASC"] }
    ];
    await createCollectionIndexes("sales", salesIndexes);

    // STOCK TRANSACTIONS COLLECTION
    // Stock Transactions - Regular attributes
    const stockTransactionsAttributes = [
      { key: "transactionDate", type: "datetime", required: true },
      { key: "quantities", type: "integer", required: true, array: true },
      { key: "unitCosts", type: "double", required: true, array: true },
      { key: "totalQuantity", type: "integer", required: true, min: 0 },
      { key: "totalCost", type: "double", required: true, min: 0 },
      { key: "reference", type: "string", required: false, size: 100 },
      { key: "supplierName", type: "string", required: false, size: 100 },
      { key: "supplierInvoice", type: "string", required: false, size: 100 },
      { key: "notes", type: "string", required: false, size: 1000 },
      { key: "status", type: "string", required: false, format: "enum", elements: ["completed", "pending", "cancelled"], default: "pending" },
      { key: "receiptImageIds", type: "string", required: false, array: true, size: 2000 }
    ];
    await createAttributes("stock_transactions", stockTransactionsAttributes);

    // Stock Transactions - Relationships
    const stockTransactionsRelationships = [
      {
        key: "products",
        type: "relationship",
        required: false,
        relatedCollection: "products",
        relationType: "manyToMany",
        twoWay: true,
        twoWayKey: "stockTransactions",
        onDelete: "setNull"
      }
    ];
    for (const rel of stockTransactionsRelationships) {
      await createRelationship("stock_transactions", rel);
    }

    // Stock Transactions - Indexes
    const stockTransactionsIndexes = [
      { key: "transaction_date", type: "key", attributes: ["transactionDate"], orders: ["DESC"] },
      { key: "status", type: "key", attributes: ["status"], orders: ["ASC"] }
    ];
    await createCollectionIndexes("stock_transactions", stockTransactionsIndexes);

    // SETTINGS COLLECTION
    // Settings - Regular attributes
    const settingsAttributes = [
      { key: "storeName", type: "string", required: false, size: 50 },
      { key: "currency", type: "string", required: false, size: 5 },
      { key: "dateFormat", type: "string", required: false, size: 15 },
      { key: "timezone", type: "string", required: false, size: 10 },
      { key: "theme", type: "string", required: false, format: "enum", elements: ["light", "dark", "system"], default: "dark" },
      { key: "companyName", type: "string", required: false, size: 100 },
      { key: "address", type: "string", required: false, size: 300 },
      { key: "phone", type: "string", required: false, size: 16 },
      { key: "email", type: "string", required: false, size: 50 },
      { key: "website", type: "string", required: false, size: 100 },
      { key: "taxId", type: "string", required: false, size: 20 },
      { key: "invoicePrefix", type: "string", required: false, size: 6 },
      { key: "nextInvoiceNumber", type: "integer", required: false },
      { key: "termsAndConditions", type: "string", required: false, size: 5000 },
      { key: "showLogo", type: "boolean", required: false, default: true },
      { key: "logo", type: "string", required: false, size: 200 },
      { key: "emailNotifications", type: "boolean", required: false, default: true },
      { key: "lowStockAlerts", type: "boolean", required: false, default: true },
      { key: "lowStockThreshold", type: "integer", required: false, default: 10 },
      { key: "orderConfirmations", type: "boolean", required: false, default: true },
      { key: "paymentReminders", type: "boolean", required: false, default: true },
      { key: "language", type: "string", required: false, size: 30 },
      { key: "notes", type: "string", required: false, size: 5000 },
      { key: "taxRate", type: "double", required: false }
    ];
    await createAttributes("settings", settingsAttributes);

    // INVOICES COLLECTION
    // Invoices - Regular attributes
    const invoicesAttributes = [
      { key: "invoiceNumber", type: "string", required: true, size: 50 },
      { key: "customerId", type: "string", required: true, size: 255 },
      { key: "customerDetails", type: "string", required: true, size: 5000 },
      { key: "items", type: "string", required: false, size: 5000 },
      { key: "subtotal", type: "double", required: false, min: 0, default: 0 },
      { key: "taxRate", type: "double", required: false, min: 0, default: 0 },
      { key: "taxAmount", type: "double", required: false, min: 0, default: 0 },
      { key: "totalAmount", type: "double", required: false, min: 0, default: 0 },
      { key: "status", type: "string", required: false, format: "enum", elements: ["draft", "pending", "paid", "cancelled", "overdue"], default: "pending" },
      { key: "paymentMethod", type: "string", required: false, size: 50 },
      { key: "paymentDate", type: "datetime", required: false },
      { key: "dueDate", type: "datetime", required: true },
      { key: "notes", type: "string", required: false, size: 1000 },
      { key: "termsAndConditions", type: "string", required: false, size: 3000 },
      { key: "paymentStatus", type: "string", required: false, format: "enum", elements: ["pending", "paid", "failed", "refunded", "partial"], default: "pending" }
    ];
    await createAttributes("invoices", invoicesAttributes);

    // Invoices - Indexes
    const invoicesIndexes = [
      { key: "invoiceNumber", type: "unique", attributes: ["invoiceNumber"], orders: ["ASC"] },
      { key: "customerId", type: "key", attributes: ["customerId"], orders: ["ASC"] },
      { key: "status", type: "key", attributes: ["status"], orders: ["ASC"] },
      { key: "paymentStatus", type: "key", attributes: ["paymentStatus"], orders: ["ASC"] },
      { key: "dueDate", type: "key", attributes: ["dueDate"], orders: ["ASC"] }
    ];
    await createCollectionIndexes("invoices", invoicesIndexes);

    // BRANDS COLLECTION
    // Brands - Regular attributes
    const brandsAttributes = [
      { key: "name", type: "string", required: true, size: 200 },
      { key: "slug", type: "string", required: true, size: 200 },
      { key: "description", type: "string", required: false, size: 1000 },
      { key: "logoUrl", type: "string", required: false, size: 255 },
      { key: "status", type: "string", required: true, format: "enum", elements: ["active", "inactive"] },
      { key: "websiteUrl", type: "string", required: false, size: 255 },
      { key: "productCount", type: "integer", required: false, min: 0, default: 0 }
    ];
    await createAttributes("brands", brandsAttributes);

    // Brands - Relationships
    const brandsRelationships = [
      {
        key: "products",
        type: "relationship",
        required: false,
        relatedCollection: "products",
        relationType: "manyToOne",
        twoWay: true,
        twoWayKey: "brand",
        onDelete: "setNull"
      }
    ];
    for (const rel of brandsRelationships) {
      await createRelationship("brands", rel);
    }

    // Brands - Indexes
    const brandsIndexes = [
      { key: "name", type: "key", attributes: ["name"], orders: ["ASC"] }
    ];
    await createCollectionIndexes("brands", brandsIndexes);

    // CATEGORIES COLLECTION
    // Categories - Regular attributes
    const categoriesAttributes = [
      { key: "name", type: "string", required: true, size: 50 },
      { key: "slug", type: "string", required: true, size: 255 },
      { key: "description", type: "string", required: false, size: 2000 },
      { key: "level", type: "integer", required: false, min: 0, max: 99999 },
      { key: "order", type: "integer", required: false, min: 0, max: 9999999 },
      { key: "parentId", type: "string", required: false, size: 40 }
    ];
    await createAttributes("categories", categoriesAttributes);

    // Categories - Relationships
    const categoriesRelationships = [
      {
        key: "products",
        type: "relationship",
        required: false,
        relatedCollection: "products",
        relationType: "manyToOne",
        twoWay: true,
        twoWayKey: "category",
        onDelete: "setNull"
      }
    ];
    for (const rel of categoriesRelationships) {
      await createRelationship("categories", rel);
    }

    // CUSTOMERS COLLECTION
    // Customers - Regular attributes
    const customersAttributes = [
      { key: "name", type: "string", required: true, size: 100 },
      { key: "phone", type: "string", required: true, size: 16 },
      { key: "email", type: "string", required: false, size: 100 },
      { key: "status", type: "string", required: false, format: "enum", elements: ["active", "inactive"] },
      { key: "totalOrders", type: "integer", required: false },
      { key: "totalSpent", type: "double", required: false },
      { key: "notes", type: "string", required: false, size: 1000 },
      { key: "addresses", type: "string", required: false, array: true, size: 2000 },
      { key: "lastOrderDate", type: "datetime", required: false }
    ];
    await createAttributes("customers", customersAttributes);

    // Customers - Relationships
    const customersRelationships = [
      {
        key: "sales",
        type: "relationship",
        required: false,
        relatedCollection: "sales",
        relationType: "oneToMany",
        twoWay: true,
        twoWayKey: "customer",
        onDelete: "setNull"
      }
    ];
    for (const rel of customersRelationships) {
      await createRelationship("customers", rel);
    }

    // SALE ITEMS COLLECTION
    // Sale Items - Regular attributes
    const saleItemsAttributes = [
      { key: "quantity", type: "integer", required: true },
      { key: "priceAtSale", type: "double", required: false }
    ];
    await createAttributes("sale-items", saleItemsAttributes);

    // Sale Items - Relationships
    const saleItemsRelationships = [
      {
        key: "product",
        type: "relationship",
        required: false,
        relatedCollection: "products",
        relationType: "manyToOne",
        twoWay: false,
        onDelete: "restrict"
      },
      {
        key: "saleId",
        type: "relationship",
        required: false,
        relatedCollection: "sales",
        relationType: "manyToOne",
        twoWay: true,
        twoWayKey: "saleItems",
        onDelete: "setNull"
      }
    ];
    for (const rel of saleItemsRelationships) {
      await createRelationship("sale-items", rel);
    }

    console.log('Non-product collections setup completed successfully!');
  } catch (error) {
    console.error('Appwrite setup failed:', error);
    throw error;
  }
}

// Execute the script
setupAppwrite()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
