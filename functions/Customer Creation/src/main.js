import { Client, Databases, ID, Query } from 'node-appwrite';

const DBID = "inventory-invoice-db";
const CUSTOMER_COLLECTION = "customers";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('http://172.30.128.1/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  let createdCustomerId = null;

  try {
    log('Starting customer creation process');
    log(`Request body: ${req.body}`);

    let customerData;
    try {
      customerData = JSON.parse(req.body);
    } catch (e) {
      return res.json({
        error: 'Invalid JSON in request body',
        details: e.message
      }, 400);
    }

    // Validate required fields
    const requiredFields = ['name', 'phone'];
    for (const field of requiredFields) {
      if (!customerData[field]) {
        throw new Error(`${field} is required`);
      }
    }

    // Check if customer with this phone number already exists
    log(`Checking if customer with phone ${customerData.phone} already exists`);
    const existingCustomers = await databases.listDocuments(
      DBID,
      CUSTOMER_COLLECTION,
      [Query.equal('phone', customerData.phone)]
    );

    if (existingCustomers.total > 0) {
      return res.json({
        error: 'Customer with this phone number already exists',
        existingCustomer: existingCustomers.documents[0]
      }, 409); // Conflict status code
    }

    // Prepare customer data with defaults for optional fields
    const newCustomer = {
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      addresses: customerData.addresses || [],
      status: customerData.status || 'active',
      notes: customerData.notes || '',

    };

    // Handle address formatting if sent as a single field
    if (!newCustomer.addresses.length && customerData.address) {
      newCustomer.addresses = [{
        street: customerData.address,
        city: customerData.city || '',
        state: customerData.state || '',
        zip: customerData.zip || '',
        country: customerData.country || '',
        isDefault: true
      }];
    }

    // Create customer
    log('Creating new customer');
    const customer = await databases.createDocument(
      DBID,
      CUSTOMER_COLLECTION,
      ID.unique(),
      newCustomer
    );
    createdCustomerId = customer.$id;

    log(`Customer created successfully with ID: ${createdCustomerId}`);
    return res.json({
      success: true,
      customer
    });

  } catch (err) {
    error(`Failed to create customer: ${err.message}`);
    error(`Stack trace: ${err.stack}`);

    // Cleanup if needed
    if (createdCustomerId) {
      try {
        await databases.deleteDocument(
          DBID,
          CUSTOMER_COLLECTION,
          createdCustomerId
        );
        log(`Cleaned up customer: ${createdCustomerId}`);
      } catch (cleanupErr) {
        error(`Failed to cleanup customer: ${cleanupErr.message}`);
      }
    }

    // Provide structured error response
    return res.json({
      error: err.message,
      code: err.code || 'UNKNOWN_ERROR',
      status: 500,
      timestamp: new Date().toISOString()
    }, 500);
  }
};
