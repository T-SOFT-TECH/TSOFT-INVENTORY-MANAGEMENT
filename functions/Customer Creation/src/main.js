import { Client, Databases, ID, Query } from 'node-appwrite';

const DBID = "inventory-invoice-db";
const CUSTOMER_COLLECTION = "customers";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key']);

  const databases = new Databases(client);
  let createdCustomerId = null;
  let customerData;

  try {
    log('Starting customer process');

    try {
      customerData = JSON.parse(req.body);
    } catch (e) {
      return res.json({
        error: 'Invalid JSON in request body',
        details: e.message
      }, 400);
    }

    // Determine if this is an update (customerId exists) or create operation
    const isUpdate = !!customerData.customerId;
    log(`Operation: ${isUpdate ? 'UPDATE' : 'CREATE'}`);

    // Validate required fields
    const requiredFields = ['name', 'phone'];
    for (const field of requiredFields) {
      if (!customerData[field]) {
        throw new Error(`${field} is required`);
      }
    }

    // For CREATE only: Check if customer with this phone number already exists
    if (!isUpdate) {
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
    }

    // Prepare customer data with defaults for optional fields
    const customerPayload = {
      name: customerData.name,
      email: customerData.email || '',
      phone: customerData.phone,
      status: customerData.status || 'active',
      notes: customerData.notes || '',
      addresses: [],  // Initialize as empty array
    };

    // Convert addresses array to array of JSON strings if provided
    if (customerData.addresses && Array.isArray(customerData.addresses)) {
      customerPayload.addresses = customerData.addresses.map(addr => JSON.stringify(addr));
    }

    // Handle single address field conversion
    if (customerData.address) {
      const addressObject = {
        street: customerData.address,
        city: customerData.city || '',
        state: customerData.state || '',
        zip: customerData.zip || '',
        country: customerData.country || '',
        isDefault: true
      };

      // Convert object to JSON string for Appwrite compatibility
      customerPayload.addresses = [JSON.stringify(addressObject)];
      log(`Formatted address as JSON string: ${customerPayload.addresses[0]}`);
    }

    let customer;

    if (isUpdate) {
      // Update existing customer
      log(`Updating customer with ID: ${customerData.customerId}`);
      customer = await databases.updateDocument(
        DBID,
        CUSTOMER_COLLECTION,
        customerData.customerId,
        customerPayload
      );
      log(`Customer updated successfully`);
    } else {
      // Create new customer
      log('Creating new customer');
      customer = await databases.createDocument(
        DBID,
        CUSTOMER_COLLECTION,
        ID.unique(),
        customerPayload
      );
      createdCustomerId = customer.$id;
      log(`Customer created successfully with ID: ${createdCustomerId}`);
    }

    // Transform addresses back to objects for the response
    if (customer.addresses && Array.isArray(customer.addresses)) {
      try {
        customer.addresses = customer.addresses.map(addr =>
          typeof addr === 'string' ? JSON.parse(addr) : addr
        );
      } catch (parseErr) {
        log(`Warning: Could not parse addresses in response: ${parseErr.message}`);
        // Continue without failing - just return the raw data
      }
    }

    return res.json({
      success: true,
      customer
    });

  } catch (err) {
    error(`Failed to ${customerData?.customerId ? 'update' : 'create'} customer: ${err.message}`);

    // Cleanup only applies to newly created customers
    if (!customerData?.customerId && createdCustomerId) {
      try {
        await databases.deleteDocument(DBID, CUSTOMER_COLLECTION, createdCustomerId);
        log(`Cleaned up customer: ${createdCustomerId}`);
      } catch (cleanupErr) {
        error(`Failed to cleanup customer: ${cleanupErr.message}`);
      }
    }

    return res.json({
      error: err.message,
      code: err.code || 'UNKNOWN_ERROR',
      status: 500,
      timestamp: new Date().toISOString()
    }, 500);
  }
};
