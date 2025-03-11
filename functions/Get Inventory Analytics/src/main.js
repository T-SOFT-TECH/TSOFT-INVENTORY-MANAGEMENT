import { Client, Databases, Query } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  const DBID = "inventory-invoice-db";

  try {
    log('Starting inventory analytics calculation');

    let analyticsData;
    try {
      analyticsData = JSON.parse(req.body);
    } catch (e) {
      return res.json({
        success: false,
        message: 'Invalid JSON in request body'
      }, 400);
    }

    const {
      startDate,
      endDate,
      categoryId = null,
      brandId = null
    } = analyticsData;

    if (!startDate || !endDate) {
      return res.json({
        success: false,
        message: 'Start date and end date are required'
      }, 400);
    }

    // Build queries for products
    log('Fetching products data...');
    const productQueries = [Query.limit(10000)];
    if (categoryId) {
      productQueries.push(Query.equal('category.$id', categoryId));
    }
    if (brandId) {
      productQueries.push(Query.equal('brand.$id', brandId));
    }

    const productsResult = await databases.listDocuments(
      DBID,
      'products',
      productQueries
    );

    const products = productsResult.documents;

    // If no products found, return empty results
    if (products.length === 0) {
      log('No products found matching the criteria');
      return res.json({
        success: true,
        data: {
          totalStockValue: 0,
          stockItems: 0,
          lowStockItems: 0,
          outOfStockItems: 0,
          stockByCategory: [],
          inventoryTurnover: 0,
          stockTrends: []
        }
      });
    }

    // Calculate core metrics
    log('Calculating inventory metrics...');
    const totalStockValue = products.reduce(
      (sum, product) => sum + (product.price * product.stockQuantity), 0);

    const stockItems = products.length;
    const lowStockItems = products.filter(
      p => p.stockQuantity <= p.lowStockThreshold && p.stockQuantity > 0).length;

    const outOfStockItems = products.filter(
      p => p.stockQuantity === 0).length;

    // Category analysis
    const stockByCategory = aggregateStockByCategory(products);

    // Fetch stock transactions
    log('Fetching stock transactions...');
    const stockTransactionQueries = [
      Query.greaterThanEqual('transactionDate', startDate),
      Query.lessThanEqual('transactionDate', endDate),
      Query.limit(10000)
    ];

    const stockTransactionsResult = await databases.listDocuments(
      DBID,
      'stock_transactions',
      stockTransactionQueries
    );

    const stockTransactions = stockTransactionsResult.documents;

    // Fetch sales for inventory turnover calculation
    log('Fetching sales data...');
    const salesQueries = [
      Query.greaterThanEqual('date', startDate),
      Query.lessThanEqual('date', endDate),
      Query.limit(10000)
    ];

    const salesResult = await databases.listDocuments(
      DBID,
      'sales',
      salesQueries
    );

    const sales = salesResult.documents;

    // Get sale items
    // Get sale items
    log('Fetching sale items...');
    const saleIds = sales.map(sale => sale.$id);
    let saleItemsQueries = [];

    if (saleIds.length > 0) {
      // Use 'in' operator for arrays, not 'equal'
      saleItemsQueries.push(Query.equal('saleId', saleIds));
    }

// Always use a valid limit
    saleItemsQueries.push(Query.limit(100)); // Or any appropriate value > 0

    const saleItemsResult = await databases.listDocuments(
      DBID,
      'sale-items',
      saleItemsQueries
    );

    const saleItems = saleItemsResult.documents;

    // Calculate inventory turnover
    const inventoryTurnover = calculateInventoryTurnover(products, saleItems);

    // Calculate stock trends
    const stockTrends = calculateStockTrends(stockTransactions, startDate, endDate);

    log('Inventory analytics completed successfully');

    return res.json({
      success: true,
      data: {
        totalStockValue,
        stockItems,
        lowStockItems,
        outOfStockItems,
        stockByCategory,
        inventoryTurnover,
        stockTrends
      }
    });

  } catch (err) {
    error(`Inventory analytics error: ${err.message}`);

    return res.json({
      success: false,
      message: err.message
    }, 500);
  }
};

/**
 * Aggregate stock by category
 */
function aggregateStockByCategory(products) {
  const categoryMap = {};

  products.forEach(product => {
    const categoryId = product.category?.$id || 'uncategorized';
    const categoryName = product.category?.name || 'Uncategorized';
    const value = product.price * product.stockQuantity;

    if (!categoryMap[categoryId]) {
      categoryMap[categoryId] = {
        categoryId,
        name: categoryName,
        count: 0,
        value: 0
      };
    }

    categoryMap[categoryId].count += 1;
    categoryMap[categoryId].value += value;
  });

  // Convert to array and sort by value
  return Object.values(categoryMap)
    .sort((a, b) => b.value - a.value);
}

/**
 * Calculate inventory turnover
 */
function calculateInventoryTurnover(products, saleItems) {
  // Total quantity sold in period
  const soldItems = saleItems.reduce((sum, item) => sum + item.quantity, 0);

  // Average inventory
  const totalInventory = products.reduce((sum, product) => sum + product.stockQuantity, 0);
  const avgInventory = totalInventory / (products.length || 1); // Avoid division by zero

  return soldItems / (avgInventory || 1); // Avoid division by zero
}

/**
 * Calculate stock trends over time
 */
function calculateStockTrends(stockTransactions, startDate, endDate) {
  // Create date range
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateRange = [];

  const currentDate = new Date(start);
  while (currentDate <= end) {
    dateRange.push(new Date(currentDate).toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Initialize trends with zero values
  const trendsMap = {};
  dateRange.forEach(date => {
    trendsMap[date] = {
      date,
      incoming: 0,
      outgoing: 0,
      remaining: 0
    };
  });

  // Process transactions
  stockTransactions.forEach(transaction => {
    const date = new Date(transaction.transactionDate).toISOString().split('T')[0];
    if (!trendsMap[date]) return; // Skip if date is not in range

    // Sum quantities in this transaction
    const quantities = transaction.quantities || [];
    const totalQuantity = quantities.reduce((sum, qty) => sum + qty, 0);

    if (totalQuantity > 0) {
      trendsMap[date].incoming += totalQuantity;
    } else {
      trendsMap[date].outgoing += Math.abs(totalQuantity);
    }
  });

  // Calculate running total for remaining
  let runningTotal = 0;
  return Object.values(trendsMap)
    .map(trend => {
      runningTotal += trend.incoming - trend.outgoing;
      return {
        ...trend,
        remaining: runningTotal
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}
