import { Client, Databases, ID, Storage } from 'node-appwrite';

const DBID = "inventory-invoice-db";
const PRODUCT_BUCKET = "productImages";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('http://172.30.128.1/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  const storage = new Storage(client);

  let createdProductId = null;
  let createdSpecId = null;
  let createdImageId = null;
  let category = null;

  try {
    log('Starting product creation process');
    log(`Request body: ${req.body}`);

    // Parse request body with error handling
    let parsedBody;
    try {
      parsedBody = JSON.parse(req.body);
    } catch (e) {
      return res.json({
        error: 'Invalid JSON in request body',
        details: e.message
      }, 400);
    }

    const { category: requestCategory, specifications, imageUrl, ...productData } = parsedBody;
    category = requestCategory; // Store category for cleanup

    log(`Parsed data - Category: ${category}, Product Data:`, productData);
    log(`Specifications:`, specifications);

    // Validate required fields
    if (!category) {
      throw new Error('Category is required');
    }
    if (!specifications) {
      throw new Error('Specifications are required');
    }

    if (imageUrl) {
      createdImageId = imageUrl;
      log(`Image ID to track: ${createdImageId}`);
    }

    // Create base product
    log('Creating base product...');
    const product = await databases.createDocument(
      DBID,
      'products',
      ID.unique(),
      {
        ...productData,
        category,
        imageUrl: createdImageId
      }
    );
    createdProductId = product.$id;
    log(`Base product created with ID: ${createdProductId}`, product);

    // Create specs document
    const specsCollectionName = `${category}_specs`;
    log(`Creating specifications in collection: ${specsCollectionName}`);
    const specs = await databases.createDocument(
      DBID,
      specsCollectionName,
      ID.unique(),
      {
        ...specifications,
        product: createdProductId // Correct relationship field
      }
    );
    createdSpecId = specs.$id;
    log(`Specifications created with ID: ${createdSpecId}`, specs);

    return res.json({
      product,
      specs,
      specCollectionName: specsCollectionName
    });

  } catch (err) {
    error(`Failed to create product: ${err.message}`);
    error(`Stack trace: ${err.stack}`);
    log('Starting cleanup process...');

    // Cleanup in reverse order
    if (createdSpecId) {
      try {
        const specsCollectionName = `${category}_specs`;
        await databases.deleteDocument(
          DBID,
          specsCollectionName,
          createdSpecId
        );
        log(`Cleaned up specs: ${createdSpecId}`);
      } catch (cleanupErr) {
        error(`Failed to cleanup specs: ${cleanupErr.message}`);
      }
    }

    if (createdProductId) {
      try {
        await databases.deleteDocument(
          DBID,
          'products',
          createdProductId
        );
        log(`Cleaned up product: ${createdProductId}`);
      } catch (cleanupErr) {
        error(`Failed to cleanup product: ${cleanupErr.message}`);
      }
    }

    if (createdImageId) {
      try {
        await storage.deleteFile(
          PRODUCT_BUCKET,
          createdImageId
        );
        log(`Cleaned up image: ${createdImageId}`);
      } catch (cleanupErr) {
        error(`Failed to cleanup image: ${cleanupErr.message}`);
      }
    }

    return res.json({
      error: err.message,
      stack: err.stack,
      details: err.response
    }, 500);
  }
};
