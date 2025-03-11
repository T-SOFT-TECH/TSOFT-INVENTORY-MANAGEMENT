import { Client, Databases, ID, Storage, Query } from 'node-appwrite';  // Added Query

const DBID = "inventory-invoice-db";
const PRODUCT_BUCKET = "productImages";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  const storage = new Storage(client);

  let createdProductId = null;
  let createdSpecId = null;
  let createdImageId = null;
  let category = null;
  let isUpdate = false;
  let updatedSpecs = null;  // Added to store updated specs

  try {
    log('Starting product operation process');
    log(`Request body: ${req.body}`);

    let parsedBody;
    try {
      parsedBody = JSON.parse(req.body);
    } catch (e) {
      return res.json({
        error: 'Invalid JSON in request body',
        details: e.message
      }, 400);
    }

    const { productId, category: requestCategory, specifications, imageId, ...productData } = parsedBody;
    isUpdate = !!productId;
    category = requestCategory;

    log(`Operation type: ${isUpdate ? 'Update' : 'Create'}`);
    log(`Parsed data - Category: ${category}, Product Data:`, productData);
    log(`Specifications:`, specifications);

    if (!category) {
      throw new Error('Category is required');
    }
    if (!specifications) {
      throw new Error('Specifications are required');
    }

    if (imageId) {
      createdImageId = imageId;
      log(`Image ID to track: ${createdImageId}`);
    }

    let product;
    if (isUpdate) {
      // Update existing product
      log(`Updating product with ID: ${productId}`);
      product = await databases.updateDocument(
        DBID,
        'products',
        productId,
        {
          ...productData,
          category,
          imageId: createdImageId || undefined
        }
      );

      // Find and update existing specs
      const specsCollectionName = `${category}_specs`;
      log(`Looking for existing specs in collection: ${specsCollectionName}`);

      const existingSpecs = await databases.listDocuments(
        DBID,
        specsCollectionName,
        [Query.equal('product', productId)]
      );

      if (existingSpecs.documents.length > 0) {
        // Update existing specs
        const specId = existingSpecs.documents[0].$id;
        log(`Updating existing specs with ID: ${specId}`);

        updatedSpecs = await databases.updateDocument(
          DBID,
          specsCollectionName,
          specId,
          {
            ...specifications,
            product: productId
          }
        );
      } else {
        // Create new specs if none exist
        log(`No existing specs found, creating new specs`);
        updatedSpecs = await databases.createDocument(
          DBID,
          specsCollectionName,
          ID.unique(),
          {
            ...specifications,
            product: productId
          }
        );
      }

      log('Update completed successfully');
    } else {
      // Create new product flow remains unchanged
      product = await databases.createDocument(
        DBID,
        'products',
        ID.unique(),
        {
          ...productData,
          category,
          imageId: createdImageId
        }
      );
      createdProductId = product.$id;

      const specsCollectionName = `${category}_specs`;
      updatedSpecs = await databases.createDocument(
        DBID,
        specsCollectionName,
        ID.unique(),
        {
          ...specifications,
          product: product.$id
        }
      );
      createdSpecId = updatedSpecs.$id;
    }

    // Return consistent response format for both create and update
    return res.json({
      product,
      specs: updatedSpecs,  // Now we always have specs to return
      operation: isUpdate ? 'update' : 'create'
    });


  } catch (err) {
    error(`Failed to ${isUpdate ? 'update' : 'create'} product: ${err.message}`);
    error(`Stack trace: ${err.stack}`);

    // Only perform cleanup for new resources in case of failure
    if (!isUpdate) {
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
    }
};
