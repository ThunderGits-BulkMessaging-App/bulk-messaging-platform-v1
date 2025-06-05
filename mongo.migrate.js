const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// 1. Atlas and Local URIs
const CLOUD_URI = 'mongodb+srv://pg733513:qL7WXPxdmRTPCeim@mycluster.knqyw.mongodb.net/tg-messenger';
const LOCAL_URI = 'mongodb://127.0.0.1:27017/tg-messenger';

async function syncCloudToLocal() {
    // Connect to Cloud
    const cloudClient = new MongoClient(CLOUD_URI);
    await cloudClient.connect();
    const cloudDb = cloudClient.db('tg-messenger');

    // Connect to Local
    const localClient = new MongoClient(LOCAL_URI);
    await localClient.connect();
    const localDb = localClient.db('tg-messenger');

    // Fetch all collections in the cloud DB
    const collections = await cloudDb.listCollections().toArray();

    for (const { name } of collections) {
        const cloudData = await cloudDb.collection(name).find().toArray();

        if (cloudData.length > 0) {
            // Optional: Clean existing local data
            await localDb.collection(name).deleteMany({});

            // Insert into local
            await localDb.collection(name).insertMany(cloudData);
            console.log(`✅ Synced collection: ${name}`);
        } else {
            console.log(`⚠️ Skipped empty collection: ${name}`);
        }
    }

    await cloudClient.close();
    await localClient.close();
    console.log('🎉 Cloud to local sync complete!');
}

// Call the function when server starts
syncCloudToLocal().catch(console.error);
