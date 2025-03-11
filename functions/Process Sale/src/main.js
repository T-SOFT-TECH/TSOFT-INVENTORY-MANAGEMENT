import { Client, Databases, ID, Query } from 'node-appwrite';

const DBID = "inventory-invoice-db";
const PRODUCTS_COLLECTION = "products";
const SALES_COLLECTION = "sales";
const SALE_ITEMS_COLLECTION = "sale-items";
const SETTINGS_COLLECTION = "settings";
const SETTINGS_DOCUMENT_ID = "default"; // Default settings document ID

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
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
        message: 'Invalid JSON in request body'
      }, 400);
    }

    const {
      customerId,
      items,
      paymentMethod = 'cash',
      paymentStatus = 'paid', // Default to 'paid' for backward compatibility
      salesRep = null, // Information about the sales rep
      idempotencyKey
    } = saleData;

    // Ensure required fields are present
    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Sale items are required');
    }

    // IDEMPOTENCY CHECK - Prevent duplicate processing
    if (idempotencyKey) {
      log(`Checking idempotency key: ${idempotencyKey}`);
      const existingSales = await databases.listDocuments(
        DBID,
        SALES_COLLECTION,
        [Query.equal('idempotencyKey', idempotencyKey)]
      );

      if (existingSales.documents.length > 0) {
        const existingSale = existingSales.documents[0];
        log(`Found existing sale with idempotency key: ${idempotencyKey}`);

        // Get the sale items for the existing sale
        const existingItems = await databases.listDocuments(
          DBID,
          SALE_ITEMS_COLLECTION,
          [Query.equal('saleId', existingSale.$id)]
        );

        return res.json({
          success: true,
          message: 'Sale has already been processed',
          sale: {
            ...existingSale,
            items: existingItems.documents
          }
        });
      }
    }

    // VALIDATION - Check if customer exists
    try {
      await databases.getDocument(
        DBID,
        'customers',
        customerId
      );
    } catch (e) {
      throw new Error('Invalid customer ID');
    }

    // FETCH SETTINGS - Get tax rate and invoice settings
    log('Fetching settings...');
    const settings = await databases.getDocument(
      DBID,
      SETTINGS_COLLECTION,
      SETTINGS_DOCUMENT_ID
    );

    const taxRate = (settings.taxRate || 10) / 100; // Default to 10% if not set
    const invoicePrefix = settings.invoicePrefix || 'INV-';
    const nextInvoiceNumber = settings.nextInvoiceNumber || 1000;

    // VALIDATE STOCK LEVELS
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

    // CALCULATE TOTALS
    const subtotal = items.reduce((sum, item) => {
      const product = updatedProducts.find(p => p.$id === item.productId);
      return sum + (item.quantity * (item.priceAtSale || product.price));
    }, 0);

    const tax = subtotal * taxRate;
    const totalAmount = subtotal + tax;

    // GENERATE INVOICE NUMBER
    const paddedNumber = nextInvoiceNumber.toString().padStart(6, '0');
    const invoiceNumber = `${invoicePrefix}${paddedNumber}`;

    // Increment invoice number in settings
    await databases.updateDocument(
      DBID,
      SETTINGS_COLLECTION,
      SETTINGS_DOCUMENT_ID,
      {
        nextInvoiceNumber: nextInvoiceNumber + 1
      }
    );

    // CREATE SALE RECORD
    log('Creating sale record...');
    const sale = await databases.createDocument(
      DBID,
      SALES_COLLECTION,
      ID.unique(),
      {
        customer: customerId,
        invoiceNumber,
        subtotal,
        tax,
        totalAmount,
        date: new Date().toISOString(),
        paymentMethod,
        paymentStatus,
        status: 'completed',
        idempotencyKey: idempotencyKey || ID.unique(), // Store idempotency key or generate one
        taxRate: settings.taxRate, // Store the tax rate used for historical reference
        salesRep: salesRep  // Store the sales rep information
      }
    );



    // CREATE ALL SALE ITEMS FIRST (before updating inventory)
    log('Creating sale items...');
    for (const item of items) {
      const product = updatedProducts.find(p => p.$id === item.productId);

      // Create sale item record with proper relationship fields
      const saleItem = await databases.createDocument(
        DBID,
        SALE_ITEMS_COLLECTION,
        ID.unique(),
        {
          saleId: sale.$id,
          product: item.productId,
          quantity: item.quantity,
          priceAtSale: item.priceAtSale || product.price
        }
      );

      saleItems.push(saleItem);
    }

    // UPDATE INVENTORY - With different behavior based on payment status
    log('Updating inventory...');
    for (const item of items) {
      const product = updatedProducts.find(p => p.$id === item.productId);

      // Prepare update data based on payment status
      const updateData = {
        // If paid, deduct from stock; if pending, only mark as reserved
        stockQuantity: paymentStatus === 'paid'
          ? Math.max(0, product.stockQuantity - item.quantity)
          : product.stockQuantity,

        // Track reserved inventory for pending payments
        reservedQuantity: paymentStatus === 'pending'
          ? (product.reservedQuantity || 0) + item.quantity
          : (product.reservedQuantity || 0),

        // Only update sales metrics if payment confirmed
        totalQuantitySold: paymentStatus === 'paid'
          ? (product.totalQuantitySold || 0) + item.quantity
          : (product.totalQuantitySold || 0),

        totalRevenue: paymentStatus === 'paid'
          ? (product.totalRevenue || 0) + (item.quantity * (item.priceAtSale || product.price))
          : (product.totalRevenue || 0)
      };

      await databases.updateDocument(
        DBID,
        PRODUCTS_COLLECTION,
        item.productId,
        updateData
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

    // Limit error details sent to client for security
    const clientErrorMessage = err.message;

    // Attempt to clean up if something went wrong
    if (saleId) {
      try {
        // Delete the sale items
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
      message: clientErrorMessage
    }, 500);
  }
};
