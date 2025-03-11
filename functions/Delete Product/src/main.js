import { Client, Databases, Storage, Query } from 'node-appwrite';

const DBID = "inventory-invoice-db";
const PRODUCT_BUCKET = "productImages";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  const storage = new Storage(client);

  try {
    log('Starting product deletion process');

    // Parse request body to get product ID
    const { productId } = JSON.parse(req.body);
    if (!productId) {
      throw new Error('Product ID is required');
    }

    // First get the product to know its category and image
    const product = await databases.getDocument(DBID, 'products', productId);
    log(`Found product: ${product.$id}, category: ${product.category.$id}`);

    // Delete specifications first
    const specsCollectionName = `${product.category.$id}_specs`;
    const specs = await databases.listDocuments(
      DBID,
      specsCollectionName,
      [Query.equal('product', productId)]
    );

    if (specs.documents.length > 0) {
      log(`Deleting specs document: ${specs.documents[0].$id}`);
      await databases.deleteDocument(
        DBID,
        specsCollectionName,
        specs.documents[0].$id
      );
    }

    // Delete the product image if it exists
    if (product.imageUrl) {
      log(`Deleting product image: ${product.imageUrl}`);
      try {
        await storage.deleteFile(PRODUCT_BUCKET, product.imageUrl);
      } catch (imageError) {
        // Log but don't fail if image deletion fails
        error(`Failed to delete image: ${imageError.message}`);
      }
    }

    // Finally delete the product
    log(`Deleting product document: ${productId}`);
    await databases.deleteDocument(DBID, 'products', productId);

    return res.json({
      success: true,
      message: 'Product and associated resources deleted successfully'
    });

  } catch (err) {
    error(`Failed to delete product: ${err.message}`);
    error(`Stack trace: ${err.stack}`);

    return res.json({
      success: false,
      error: err.message,
      details: err.response
    }, 500);
  }
};
