import { Client, Databases, Query } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  const DBID = "inventory-invoice-db";

  try {
    log('Starting sales analytics calculation');

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
      aggregation = 'day',
      categoryId = null,
      customerId = null,
      productId = null
    } = analyticsData;

    if (!startDate || !endDate) {
      return res.json({
        success: false,
        message: 'Start date and end date are required'
      }, 400);
    }

    // Build queries
    log('Fetching sales data...');
    const queries = [
      Query.greaterThanEqual('date', startDate),
      Query.lessThanEqual('date', endDate),
      Query.limit(10000) // Maximum number of sales to analyze
    ];

    if (customerId) {
      queries.push(Query.equal('customer', customerId));
    }

    const salesResult = await databases.listDocuments(
      DBID,
      'sales',
      queries
    );

    const sales = salesResult.documents;
    log(`Retrieved ${sales.length} sales records`);

    // If no sales found, return empty results
    if (sales.length === 0) {
      log('No sales found for the selected period');
      return res.json({
        success: true,
        data: {
          totalRevenue: 0,
          orderCount: 0,
          averageOrderValue: 0,
          salesByTime: [],
          salesByCategory: [],
          topProducts: [],
          paymentMethods: []
        }
      });
    }

    // Calculate core metrics
    log('Calculating sales metrics...');
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const orderCount = sales.length;
    const averageOrderValue = totalRevenue / orderCount;

    // Prepare time-series data based on aggregation
    const salesByTime = aggregateSalesByTime(sales, aggregation);

    // Get sale items for detailed analysis with sequential queries
    log('Fetching sale items...');
    let allSaleItems = [];
    for (const sale of sales) {
      const saleItemsResult = await databases.listDocuments(
        DBID,
        'sale-items',
        [Query.equal('saleId', sale.$id)]
      );
      allSaleItems = allSaleItems.concat(saleItemsResult.documents);
    }
    const saleItems = allSaleItems;
    log(`Retrieved ${saleItems.length} sale-items records`);

    // Get all product IDs from sale items
    const productIds = [...new Set(saleItems.map(item => item.product.$id))];
    log(`Found ${productIds.length} unique product IDs in sales`);

    // DEBUG: Log a sample sale item to see structure
    if (saleItems.length > 0) {
      log(`Sample sale item: ${JSON.stringify(saleItems[0])}`);
    }

    // Fetch product details with sequential queries - using getDocument for each ID
    log('Fetching product details...');
    let allProducts = [];
    let failedFetches = 0;

    for (const productId of productIds) {
      try {
        // Use getDocument instead of listDocuments with a Query
        const product = await databases.getDocument(
          DBID,
          'products',
          productId
        );
        allProducts.push(product);
      } catch (e) {
        // Skip if product not found
        failedFetches++;
        log(`Error fetching product ${productId}: ${e.message}`);
      }
    }

    const products = allProducts;
    log(`Successfully retrieved ${products.length} products (${failedFetches} failed)`);

    // DEBUG: Log a sample product to see structure
    if (products.length > 0) {
      log(`Sample product structure: ${JSON.stringify(products[0])}`);
    }

    // Create product lookup map
    const productMap = {};
    products.forEach(product => {
      productMap[product.$id] = product;
    });

    // Category analysis
    log('Processing category data...');
    const salesByCategory = aggregateSalesByCategory(saleItems, productMap, log);

    // Top products analysis
    log('Processing top products data...');
    const topProducts = calculateTopProducts(saleItems, productMap, log);

    // Payment methods analysis
    const paymentMethods = aggregateByPaymentMethod(sales);

    log('Sales analytics completed successfully');

    return res.json({
      success: true,
      data: {
        totalRevenue,
        orderCount,
        averageOrderValue,
        salesByTime,
        salesByCategory,
        topProducts,
        paymentMethods
      }
    });

  } catch (err) {
    error(`Sales analytics error: ${err.message}`);

    return res.json({
      success: false,
      message: err.message
    }, 500);
  }
};

/**
 * Aggregate sales by time period
 */
function aggregateSalesByTime(sales, aggregation) {
  const salesByTime = {};

  sales.forEach(sale => {
    let timeKey;
    const saleDate = new Date(sale.date);

    if (aggregation === 'day') {
      timeKey = saleDate.toISOString().split('T')[0]; // YYYY-MM-DD
    } else if (aggregation === 'week') {
      // Get start of week (Sunday)
      const dayOfWeek = saleDate.getDay(); // 0 = Sunday, 6 = Saturday
      const startOfWeek = new Date(saleDate);
      startOfWeek.setDate(saleDate.getDate() - dayOfWeek);
      timeKey = startOfWeek.toISOString().split('T')[0];
    } else if (aggregation === 'month') {
      timeKey = `${saleDate.getFullYear()}-${(saleDate.getMonth() + 1).toString().padStart(2, '0')}`;
    } else {
      // Default to day
      timeKey = saleDate.toISOString().split('T')[0];
    }

    if (!salesByTime[timeKey]) {
      salesByTime[timeKey] = {
        period: timeKey,
        revenue: 0,
        orders: 0
      };
    }

    salesByTime[timeKey].revenue += sale.totalAmount;
    salesByTime[timeKey].orders += 1;
  });

  // Convert to array and sort by period
  return Object.values(salesByTime).sort((a, b) => a.period.localeCompare(b.period));
}

/**
 * Aggregate sales by category with debugging
 */
function aggregateSalesByCategory(saleItems, productMap, log) {
  log("calling sales by category");

  const categoryMap = {};
  let missingProducts = 0;
  let missingCategories = 0;

  saleItems.forEach(item => {
    // Fix this line - use $id like in the other function
    const productId = item.product.$id;
    const product = productMap[productId];

    if (!product) {
      missingProducts++;
      return;
    }

    // Debug the category structure
    if (!product.category) {
      missingCategories++;
    }

    // Safely access category data with better fallbacks
    const categoryId = product.category?.$id || 'uncategorized';
    const categoryName = product.category?.name || 'Uncategorized';
    const amount = item.quantity * item.priceAtSale;

    log(`found category for ${categoryId}: ${categoryName}`);

    if (!categoryMap[categoryId]) {
      categoryMap[categoryId] = {
        categoryId,
        name: categoryName,
        revenue: 0,
        count: 0
      };
    }

    categoryMap[categoryId].revenue += amount;
    categoryMap[categoryId].count += item.quantity;
  });

  log(`Sales by category stats: ${Object.keys(categoryMap).length} categories found. Products missing: ${missingProducts}, Categories missing: ${missingCategories}`);

  // Convert to array and sort by revenue
  return Object.values(categoryMap)
    .sort((a, b) => b.revenue - a.revenue);
}

/**
 * Calculate top products by sales with debugging
 */
function calculateTopProducts(saleItems, productMap, log) {
  const productStats = {};
  let missingProducts = 0;
  let productsWithoutName = 0;

  saleItems.forEach(item => {
    const productId = item.product.$id;
    const product = productMap[productId];

    if (!product) {
      missingProducts++;
    } else if (!product.name) {
      productsWithoutName++;
    }

    if (!productStats[productId]) {
      productStats[productId] = {
        productId,
        name: product ? product.name || `Product ID: ${String(productId).slice(0, 8)}` : `Product ID: ${String(productId).slice(0, 8)}`,
        quantity: 0,
        revenue: 0
      };
    }

    productStats[productId].quantity += item.quantity;
    productStats[productId].revenue += item.quantity * item.priceAtSale;
  });

  log(`Top products stats: ${Object.keys(productStats).length} unique products. Missing products: ${missingProducts}, Products without name: ${productsWithoutName}`);

  // Convert to array, sort by revenue, and take top 10
  return Object.values(productStats)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
}

/**
 * Aggregate sales by payment method
 */
function aggregateByPaymentMethod(sales) {
  const methodMap = {};

  sales.forEach(sale => {
    const method = sale.paymentMethod || 'Unknown';

    if (!methodMap[method]) {
      methodMap[method] = {
        method,
        count: 0,
        amount: 0
      };
    }

    methodMap[method].count += 1;
    methodMap[method].amount += sale.totalAmount;
  });

  // Convert to array and sort by amount
  return Object.values(methodMap)
    .sort((a, b) => b.amount - a.amount);
}
