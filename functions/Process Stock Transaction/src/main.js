import { Client, Databases, ID,  } from 'node-appwrite';

const DBID = "inventory-invoice-db";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  let transactionId = null;
  let originalStockLevels = [];

  try {
    log('Starting stock transaction process');

    let parsedBody;
    try {
      parsedBody = JSON.parse(req.body);
    } catch (e) {
      return res.json({
        error: 'Invalid JSON in request body',
        details: e.message
      }, 400);
    }

    const { items, reference, notes, supplierName, supplierInvoice, transactionDate, receiptImageIds  } = parsedBody;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Valid items array is required');
    }

    // Validate transaction date if provided
    const validatedDate = transactionDate ? new Date(transactionDate) : new Date();
    if (transactionDate && isNaN(validatedDate.getTime())) {
      throw new Error('Invalid transaction date format');
    }

    // Calculate totals and prepare arrays
    let totalQuantity = 0;
    let totalCost = 0;
    const quantities = [];
    const unitCosts = [];
    const productIds = [];
    const productUpdates = [];

    // Store original stock levels and validate products
    for (const item of items) {
      try {
        const product = await databases.getDocument(
          DBID,
          'products',
          item.productId
        );

        // Store original stock level for potential rollback
        originalStockLevels.push({
          productId: item.productId,
          stockQuantity: product.stockQuantity
        });

        // Calculate item totals
        totalQuantity += item.quantity;
        totalCost += (item.quantity * item.unitCost);

        quantities.push(item.quantity);
        unitCosts.push(item.unitCost);
        productIds.push(item.productId);

        productUpdates.push({
          documentId: item.productId,
          stockQuantity: product.stockQuantity + item.quantity,
          lastStockDate: new Date().toISOString()
        });

      } catch (err) {
        throw new Error(`Failed to validate product ${item.productId}: ${err.message}`);
      }
    }

    // Create initial transaction record
    const transaction = await databases.createDocument(
      DBID,
      'stock_transactions',
      ID.unique(),
      {
        transactionDate: validatedDate.toISOString(),
        quantities,
        unitCosts,
        totalQuantity,
        totalCost,
        reference: reference || null,
        supplierName: supplierName || null,
        supplierInvoice: supplierInvoice || null,
        notes: notes || null,
        products: productIds,
        receiptImageIds: receiptImageIds || [],
        status: 'pending'
      }
    );

    transactionId = transaction.$id;

    // Update product stock quantities
    try {
      await Promise.all(
        productUpdates.map(update =>
          databases.updateDocument(
            DBID,
            'products',
            update.documentId,
            {
              stockQuantity: update.stockQuantity,
              lastStockDate: update.lastStockDate
            }
          )
        )
      );
    } catch (err) {
      // If updating products fails, trigger cleanup
      throw new Error(`Failed to update products: ${err.message}`);
    }

    // Mark transaction as completed
    const completedTransaction = await databases.updateDocument(
      DBID,
      'stock_transactions',
      transactionId,
      {
        status: 'completed'
      }
    );

    return res.json({
      success: true,
      transaction: completedTransaction,
      updatedProducts: productUpdates.length
    });

  } catch (err) {
    error(`Failed to process stock transaction: ${err.message}`);
    error(`Stack trace: ${err.stack}`);

    // Cleanup process
    try {
      log('Starting cleanup process');

      // Delete the transaction if it was created
      if (transactionId) {
        await databases.deleteDocument(
          DBID,
          'stock_transactions',
          transactionId
        );
        log('Successfully deleted failed transaction');
      }

      // Restore original stock levels if they were modified
      if (originalStockLevels.length > 0) {
        await Promise.all(
          originalStockLevels.map(({ productId, stockQuantity }) =>
            databases.updateDocument(
              DBID,
              'products',
              productId,
              {
                stockQuantity,
                lastStockDate: new Date().toISOString()
              }
            )
          )
        );
        log('Successfully restored original stock levels');
      }

    } catch (cleanupError) {
      error(`Cleanup process failed: ${cleanupError.message}`);
    }

    return res.json({
      success: false,
      error: err.message,
      details: err.response
    }, 500);
  }
};
