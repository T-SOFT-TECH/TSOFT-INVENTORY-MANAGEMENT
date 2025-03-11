import { Client, Databases, Query } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  const DBID = "inventory-invoice-db";

  try {
    log('Starting customer analytics calculation');

    let analyticsData;
    try {
      analyticsData = JSON.parse(req.body);
    } catch (e) {
      return res.json({
        success: false,
        message: 'Invalid JSON in request body'
      }, 400);
    }

    const { startDate, endDate, segmentBy = 'spending' } = analyticsData;

    if (!startDate || !endDate) {
      return res.json({
        success: false,
        message: 'Start date and end date are required'
      }, 400);
    }

    log('Fetching customers data...');
    const customersResult = await databases.listDocuments(
      DBID,
      'customers',
      [Query.limit(10000)]
    );

    const customers = customersResult.documents;
    const totalCustomers = customers.length;

    log('Fetching sales data for the period...');
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

    // Count active customers (made purchase in period)
    const activeCustomerIds = new Set(sales.map(sale => sale.customer));
    const activeCustomers = activeCustomerIds.size;

    // New customers (created within period)
    const newCustomers = customers.filter(customer => {
      const createdAt = new Date(customer.$createdAt);
      return createdAt >= new Date(startDate) && createdAt <= new Date(endDate);
    }).length;

    // Calculate previous period for retention analysis
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const periodLength = endDateObj.getTime() - startDateObj.getTime();

    const previousPeriodEnd = new Date(startDateObj);
    previousPeriodEnd.setDate(previousPeriodEnd.getDate() - 1);

    const previousPeriodStart = new Date(previousPeriodEnd);
    previousPeriodStart.setTime(previousPeriodEnd.getTime() - periodLength);

    log('Fetching sales data for previous period...');
    const previousPeriodSalesQueries = [
      Query.greaterThanEqual('date', previousPeriodStart.toISOString()),
      Query.lessThanEqual('date', previousPeriodEnd.toISOString()),
      Query.limit(10000)
    ];

    const previousPeriodSalesResult = await databases.listDocuments(
      DBID,
      'sales',
      previousPeriodSalesQueries
    );

    const previousPeriodSales = previousPeriodSalesResult.documents;

    // Calculate retention rate
    const previousPeriodCustomerIds = new Set(
      previousPeriodSales.map(sale => sale.customer)
    );

    const returnedCustomers = Array.from(activeCustomerIds)
      .filter(id => previousPeriodCustomerIds.has(id)).length;

    const customerRetentionRate = previousPeriodCustomerIds.size > 0 ?
      (returnedCustomers / previousPeriodCustomerIds.size) * 100 : 0;

    // Calculate customer spending
    log('Calculating customer spending...');
    const customerSpending = {};

    sales.forEach(sale => {
      const customerId = sale.customer;
      if (!customerSpending[customerId]) {
        customerSpending[customerId] = 0;
      }
      customerSpending[customerId] += sale.totalAmount;
    });

    // Calculate average customer value
    const averageCustomerValue = activeCustomers > 0 ?
      Object.values(customerSpending).reduce((sum, val) => sum + val, 0) / activeCustomers : 0;

    // Calculate customer segments
    const customerSegments = calculateCustomerSegments(customerSpending, segmentBy);

    // Calculate customer trends
    const customerTrends = calculateCustomerTrends(
      sales,
      newCustomers,
      previousPeriodCustomerIds,
      startDate,
      endDate
    );

    log('Customer analytics completed successfully');

    return res.json({
      success: true,
      data: {
        totalCustomers,
        activeCustomers,
        newCustomers,
        customerRetentionRate,
        averageCustomerValue,
        customerSegments,
        customerTrends
      }
    });

  } catch (err) {
    error(`Customer analytics error: ${err.message}`);

    return res.json({
      success: false,
      message: err.message
    }, 500);
  }
};

/**
 * Calculate customer segments
 */
function calculateCustomerSegments(customerSpending, segmentBy) {
  const spendValues = Object.values(customerSpending);
  if (spendValues.length === 0) {
    return [];
  }

  // Sort spending values
  spendValues.sort((a, b) => a - b);

  // Define segments based on quartiles
  const segments = [
    { name: 'Low Spenders', threshold: 0, count: 0 },
    { name: 'Medium Spenders', threshold: 0, count: 0 },
    { name: 'High Spenders', threshold: 0, count: 0 },
    { name: 'VIP', threshold: 0, count: 0 }
  ];

  // Calculate quartiles for thresholds
  segments[1].threshold = spendValues[Math.floor(spendValues.length * 0.25)];
  segments[2].threshold = spendValues[Math.floor(spendValues.length * 0.5)];
  segments[3].threshold = spendValues[Math.floor(spendValues.length * 0.75)];

  // Count customers in each segment
  spendValues.forEach(value => {
    if (value < segments[1].threshold) segments[0].count++;
    else if (value < segments[2].threshold) segments[1].count++;
    else if (value < segments[3].threshold) segments[2].count++;
    else segments[3].count++;
  });

  // Calculate percentages
  return segments.map(segment => ({
    segment: segment.name,
    count: segment.count,
    percentage: (segment.count / spendValues.length) * 100
  }));
}

/**
 * Calculate customer trends over time
 */
function calculateCustomerTrends(sales, newCustomers, previousCustomerIds, startDate, endDate) {
  // Create date range
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateRange = [];

  const currentDate = new Date(start);
  const day = 1000 * 60 * 60 * 24; // milliseconds in a day
  const totalDays = Math.round((end - start) / day);

  // Limit to 30 data points for performance
  const stepSize = Math.max(1, Math.ceil(totalDays / 30));

  while (currentDate <= end) {
    dateRange.push(new Date(currentDate).toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + stepSize);
  }

  // Track unique customers by date
  const customersByDate = {};
  dateRange.forEach(date => {
    customersByDate[date] = {
      new: new Set(),
      returning: new Set()
    };
  });

  // Analyze sales
  sales.forEach(sale => {
    const saleDate = new Date(sale.date);

    // Find the closest date in our range
    const closestDate = dateRange.reduce((prev, curr) => {
      const currDate = new Date(curr);
      const prevDate = new Date(prev);
      return Math.abs(currDate - saleDate) < Math.abs(prevDate - saleDate) ? curr : prev;
    });

    if (previousCustomerIds.has(sale.customer)) {
      customersByDate[closestDate].returning.add(sale.customer);
    } else {
      customersByDate[closestDate].new.add(sale.customer);
    }
  });

  // Convert to array
  return dateRange.map(date => ({
    date,
    new: customersByDate[date].new.size,
    returning: customersByDate[date].returning.size
  }));
}
