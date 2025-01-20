import { Client, Databases } from 'node-appwrite';
import config from '../appwrite.json';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('tsoftmart-inventory-invoice-system')               // Your project ID
    .setKey('standard_44341605fac817a215dfe3cd962993c99d2d5819d586e4c85667ad1ec4a4980df32fc1a6e33d1e0ed2c1851c64e1e4265153847c5d652c91c9523443f3b34fee0b4f804da5f40e9791f0bfc933901b42c60627fb77117f7c41f2d7a6ef37130eac6e65c362bf52a54f7e81fbe1812f9499ed18b7951202aa0b7b3e593511c38b');                     // Your API key

const databases = new Databases(client);

async function deploy() {
    try {
        // Create database if it doesn't exist
        const databaseId = 'inventory-invoice-db';
        try {
            await databases.create(databaseId, 'POS System');
            console.log('Database created successfully');
        } catch (error: any) {
            if (error.code !== 409) throw error;
            console.log('Database already exists');
        }

        // Create collections
        for (const collection of config.collections) {
            try {
                await databases.createCollection(
                    databaseId,
                    collection.id,
                    collection.name
                );
                console.log(`Collection ${collection.name} created successfully`);

                // Create attributes
                for (const attribute of collection.attributes) {
                    try {
                        await databases.createStringAttribute(
                            databaseId,
                            collection.id,
                            attribute.key,
                            attribute.size,
                            attribute.required,
                            attribute.default,
                            attribute.array
                        );
                        console.log(`Attribute ${attribute.key} created successfully`);
                    } catch (error: any) {
                        if (error.code !== 409) throw error;
                        console.log(`Attribute ${attribute.key} already exists`);
                    }
                }

                // Create indexes
                for (const index of collection.indexes) {
                    try {
                        await databases.createIndex(
                            databaseId,
                            collection.id,
                            index.key,
                            index.type,
                            index.attributes
                        );
                        console.log(`Index ${index.key} created successfully`);
                    } catch (error: any) {
                        if (error.code !== 409) throw error;
                        console.log(`Index ${index.key} already exists`);
                    }
                }
            } catch (error: any) {
                if (error.code !== 409) throw error;
                console.log(`Collection ${collection.name} already exists`);
            }
        }

        console.log('Database deployment completed successfully');
    } catch (error) {
        console.error('Deployment failed:', error);
    }
}

deploy();
