import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "portfolio";

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
  mongoClientPromise?: Promise<MongoClient>;
};

const client = globalForMongo.mongoClient ?? new MongoClient(uri);
const clientPromise =
  globalForMongo.mongoClientPromise ?? client.connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
  globalForMongo.mongoClientPromise = clientPromise;
}

export async function getDb() {
  const mongoClient = await clientPromise;

  return mongoClient.db(dbName);
}
