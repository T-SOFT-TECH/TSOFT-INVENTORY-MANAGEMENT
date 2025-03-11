import { Client, Databases, Query } from 'node-appwrite';


export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);

  try {
    log('Starting product fetch process');

    // Parse the product ID from the request
    const { productId } = JSON.parse(req.body);

    if (!productId) {
      throw new Error('Product ID is required');
    }

    // Get the base product first
    const product = await databases.getDocument(
      "inventory-invoice-db",
      'products',
      productId
    );

    // Get the specifications from the category-specific collection
    const specsCollectionName = `${product.category.$id}_specs`;
    let specifications = null;

    try {
      // Query specs using product relationship
      const specsList = await databases.listDocuments(
        "inventory-invoice-db",
        specsCollectionName,
        [
          Query.equal('product', productId)
        ]
      );

      if (specsList.documents.length > 0) {
        specifications = specsList.documents[0];
      }
    } catch (specsError) {
      log(`No specifications found: ${specsError.message}`);
    }

    // Return complete product data
    return res.json({
      product: {
        ...product,
        specifications: specifications || {}
      }
    });

  } catch (err) {
    error(`Failed to fetch product: ${err.message}`);
    return res.json({
      error: err.message,
      details: err.response
    }, 500);
  }
};
