// This file connects your app to MongoDB — a cloud database where your data is stored.
// It creates ONE shared connection that is reused across all API calls for efficiency.
import { MongoClient } from "mongodb";

// The database URL comes from your .env file (MONGODB_URI).
// It looks like: mongodb+srv://username:password@cluster.mongodb.net/
// Never hard-code this here — keep it in .env so it stays secret.
const uri = process.env.MONGODB_URI;

// The name of the specific database to use inside your MongoDB cluster.
// Defaults to "portfolio" if you haven't set MONGODB_DB in your .env file.
const dbName = process.env.MONGODB_DB ?? "portfolio";

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

// We store the client on `globalThis` (a global object shared across the whole app)
// so that during development hot-reloads, we reuse the same connection instead of
// opening a brand-new one every time a file changes. Too many open connections = errors.
const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
  mongoClientPromise?: Promise<MongoClient>;
};

// Reuse the existing client if it already exists, otherwise create a new one.
const client = globalForMongo.mongoClient ?? new MongoClient(uri);

// Connect to MongoDB (returns a promise — we wait for it before using the DB).
const clientPromise =
  globalForMongo.mongoClientPromise ?? client.connect();

// In development only, save the client globally so hot-reloads don't create duplicates.
// In production, Next.js doesn't hot-reload, so this isn't needed there.
if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
  globalForMongo.mongoClientPromise = clientPromise;
}

// Call this function inside any API route to get access to the database.
// Usage example: const db = await getDb(); const docs = await db.collection("posts").find().toArray();
export async function getDb() {
  // Wait until the connection is fully established before returning the DB object.
  const mongoClient = await clientPromise;

  // Return the specific database (named by dbName) so you can query collections inside it.
  return mongoClient.db(dbName);
}
