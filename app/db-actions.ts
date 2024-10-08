'use server'

import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { MembershipSubscription } from '@/lib/types';
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const dbName = serverRuntimeConfig.DB_NAME!;
const collectionName = serverRuntimeConfig.COLLECTION_NAME!;
const uri = process.env.MONGO_URI!;

const client = new MongoClient(uri, { serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function getMongoCollection() {
    await client.connect();
    const db = client.db(dbName);
    return db.collection(collectionName);
}

export async function connectToMongo() {
    try {
        await client.connect();
        await client.db(dbName).command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch ( error ) {
        console.log("Unable to connect to MongoDB", error);
    } finally {
        // await client.close();
    }
}

export async function createCollection() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = await db.createCollection<MembershipSubscription>(collectionName);
        // console.log('Created collection', collection);
    } catch ( error ) {
        console.log("Unable to create collection", error);
    }
}

export async function createSubscription(subscription: MembershipSubscription) {
    const collection = await getMongoCollection();
    const result = await collection.insertOne(subscription);
    return result.insertedId.toString();
}

export async function readSubscription(pubKey: string) {
    const collection = await getMongoCollection();
    return await collection.findOne({ publicKey: pubKey });
}

export async function travelerSubscription(pubKey: string) {
    const collection = await getMongoCollection();
    return await collection.findOne({ publicKey: pubKey, subscriptionRank: 'Traveler' });
}

export async function readAllSubscriptions() {
    const collection = await getMongoCollection();
    return await collection.find({}).toArray();
}

export async function updateSubscription(pubKey: string, update: Partial<MembershipSubscription>) {
    const collection = await getMongoCollection();
    const result = await collection.updateOne(
        { publicKey: pubKey },
        { $set: update }
    );
    return result.modifiedCount;
}

export async function retrievePlayerApiKey(pubKey: string): Promise<string | null> {
    const collection = await getMongoCollection();
    const result = await collection.findOne(
        { publicKey: pubKey },
        { projection: { key: 1, _id: 0 } }
    );
    return result ? result.key : null;
}

export async function deleteSubscription(id: string) {
    const collection = await getMongoCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
}
