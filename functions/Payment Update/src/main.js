import { Client, Databases, Query } from 'node-appwrite';

const DBID = "inventory-invoice-db";
const PRODUCTS_COLLECTION = "products";
const SALES_COLLECTION = "sales";
const SALE_ITEMS_COLLECTION = "sale-items";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  const rollbackChanges = [];

  try {
    const { saleId, newPaymentStatus, newPaymentMethod } = JSON.parse(req.body);
    log(`Starting payment status update for sale ${saleId} to ${newPaymentStatus}`);

    // Get the sale and its current status
    const sale = await databases.getDocument(DBID, SALES_COLLECTION, saleId);
    const oldStatus = sale.paymentStatus;
    const oldPaymentMethod = sale.paymentMethod;

    // Prepare update data
    const updateData = {
      paymentStatus: newPaymentStatus
    };

    // If a new payment method is provided, update it
    if (newPaymentMethod && newPaymentMethod !== oldPaymentMethod) {
      updateData.paymentMethod = newPaymentMethod;
      log(`Updating payment method from ${oldPaymentMethod} to ${newPaymentMethod}`);
    }

    // Save original sale state for potential rollback
    rollbackChanges.push({
      type: 'sale',
      id: saleId,
      data: {
        paymentStatus: oldStatus,
        paymentMethod: oldPaymentMethod
      }
    });

    // Update the sale with a single database call
    await databases.updateDocument(DBID, SALES_COLLECTION, saleId, updateData);

    // Special handling when changing from pending to paid
    if (oldStatus === 'pending' && newPaymentStatus === 'paid') {
      const saleItems = await databases.listDocuments(
        DBID,
        SALE_ITEMS_COLLECTION,
        [Query.equal('saleId', saleId)]
      );

      // Process each item
      for (const item of saleItems.documents) {
        const productId = item.product.$id || item.product;

        // Get current product state
        const product = await databases.getDocument(
          DBID,
          PRODUCTS_COLLECTION,
          productId
        );

        // Save original product state for potential rollback
        rollbackChanges.push({
          type: 'product',
          id: productId,
          data: {
            stockQuantity: product.stockQuantity,
            reservedQuantity: product.reservedQuantity || 0,
            totalQuantitySold: product.totalQuantitySold || 0,
            totalRevenue: product.totalRevenue || 0
          }
        });

        // Convert reserved quantity to actual deduction
        await databases.updateDocument(
          DBID,
          PRODUCTS_COLLECTION,
          productId,
          {
            stockQuantity: Math.max(0, product.stockQuantity - item.quantity),
            reservedQuantity: Math.max(0, (product.reservedQuantity || 0) - item.quantity),
            totalQuantitySold: (product.totalQuantitySold || 0) + item.quantity,
            totalRevenue: (product.totalRevenue || 0) + (item.quantity * item.priceAtSale)
          }
        );
      }
    }

    return res.json({
      success: true,
      message: `Sale payment status updated to ${newPaymentStatus}`
    });

  } catch (err) {
    error(`Failed to update payment status: ${err.message}`);

    // Rollback all changes in reverse order (LIFO)
    log(`Error occurred, starting rollback of ${rollbackChanges.length} changes`);

    for (let i = rollbackChanges.length - 1; i >= 0; i--) {
      const change = rollbackChanges[i];
      try {
        log(`Rolling back ${change.type} with ID ${change.id}`);

        if (change.type === 'sale') {
          await databases.updateDocument(
            DBID,
            SALES_COLLECTION,
            change.id,
            change.data
          );
        } else if (change.type === 'product') {
          await databases.updateDocument(
            DBID,
            PRODUCTS_COLLECTION,
            change.id,
            change.data
          );
        }
      } catch (rollbackErr) {
        // Log rollback errors but continue with other rollbacks
        error(`Failed to roll back ${change.type} ${change.id}: ${rollbackErr.message}`);
      }
    }

    return res.json({
      success: false,
      message: err.message,
      rollbackStatus: rollbackChanges.length > 0 ? 'attempted' : 'none required'
    }, 500);
  }
};
