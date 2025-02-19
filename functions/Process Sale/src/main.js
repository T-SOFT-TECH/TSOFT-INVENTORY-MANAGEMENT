import { Client, Databases, ID, Query } from 'node-appwrite';

const DBID = "inventory-invoice-db";
const PRODUCTS_COLLECTION = "products";
const SALES_COLLECTION = "sales";
const SALE_ITEMS_COLLECTION = "sale-items";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('http://172.30.128.1/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);

  let saleId = null;
  let updatedProducts = [];
  let saleItems = [];

  try {
    log('Starting sale processing');
    log(`Request body: ${req.body}`);

    let saleData;
    try {
      saleData = JSON.parse(req.body);
    } catch (e) {
      return res.json({
        success: false,
        message: 'Invalid JSON in request body',
        details: e.message
      }, 400);
    }

    const { customerId, items, paymentMethod = 'cash' } = saleData;

    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Sale items are required');
    }

    // 1. Validate stock levels
    log('Validating stock levels...');
    for (const item of items) {
      const product = await databases.getDocument(
        DBID,
        PRODUCTS_COLLECTION,
        item.productId
      );

      if (product.stockQuantity < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      // Store product data for later use
      updatedProducts.push({
        ...product,
        requestedQuantity: item.quantity
      });
    }

    // 2. Calculate totals
    const subtotal = items.reduce((sum, item) => {
      const product = updatedProducts.find(p => p.$id === item.productId);
      return sum + (item.quantity * (item.priceAtSale || product.price));
    }, 0);

    const tax = subtotal * 0.10; // 10% tax
    const totalAmount = subtotal + tax;

    // 3. Generate invoice number
    const invoiceNumber = generateInvoiceNumber();

    // 4. Create sale record - note we're not including items directly in the sale
    log('Creating sale record...');
    const sale = await databases.createDocument(
      DBID,
      SALES_COLLECTION,
      ID.unique(),
      {
        customer: customerId, // This is already a relationship field reference
        invoiceNumber,
        subtotal,
        tax,
        totalAmount,
        date: new Date().toISOString(),
        paymentMethod,
        paymentStatus: 'paid', // Default to paid
        status: 'completed'
      }
    );

    saleId = sale.$id;

    // 5. Create sale items and update inventory
    log('Creating sale items and updating inventory...');
    for (const item of items) {
      const product = updatedProducts.find(p => p.$id === item.productId);

      // Create sale item record with proper relationship fields
      const saleItem = await databases.createDocument(
        DBID,
        SALE_ITEMS_COLLECTION,
        ID.unique(),
        {
          saleId: sale.$id, // This will create the relationship
          product: item.productId, // This will create the relationship
          quantity: item.quantity,
          priceAtSale: item.priceAtSale || product.price
        }
      );

      saleItems.push(saleItem);

      // Update product inventory
      await databases.updateDocument(
        DBID,
        PRODUCTS_COLLECTION,
        item.productId,
        {
          stockQuantity: Math.max(0, product.stockQuantity - item.quantity),
          totalQuantitySold: (product.totalQuantitySold || 0) + item.quantity,
          totalRevenue: (product.totalRevenue || 0) + (item.quantity * (item.priceAtSale || product.price))
        }
      );
    }

    log('Sale processed successfully');

    return res.json({
      success: true,
      sale: {
        ...sale,
        items: saleItems
      },
      message: 'Sale processed successfully'
    });

  } catch (err) {
    error(`Failed to process sale: ${err.message}`);
    error(`Stack trace: ${err.stack}`);

    // Attempt to clean up if something went wrong
    if (saleId) {
      try {
        // Delete the sale items - they should cascade delete with the sale
        // but we'll explicitly delete them just to be sure
        for (const item of saleItems) {
          await databases.deleteDocument(
            DBID,
            SALE_ITEMS_COLLECTION,
            item.$id
          );
        }

        // Delete the sale
        await databases.deleteDocument(
          DBID,
          SALES_COLLECTION,
          saleId
        );

        log('Cleaned up failed sale data');
      } catch (cleanupErr) {
        error(`Failed to clean up sale data: ${cleanupErr.message}`);
      }
    }

    return res.json({
      success: false,
      message: err.message,
      details: err.response || err.stack
    }, 500);
  }
};

// Helper function to generate unique invoice numbers
function generateInvoiceNumber() {
  const prefix = 'INV';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}
