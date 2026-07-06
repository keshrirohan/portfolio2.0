// This file connects to MongoDB using Mongoose — a library that lets you define
// "Models" (like blueprints for your data) and query the database using JavaScript objects.
//
// Difference from mongodb.ts:
//   mongodb.ts  → raw driver, good for simple queries
//   mongoose.ts → adds Schemas & Models so you get type-safe, structured data access
import mongoose from "mongoose";

// The database URL from your .env file (same variable as mongodb.ts uses).
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

/* Global cache to prevent multiple connections in dev hot-reloads */

// Just like in mongodb.ts, we store the connection on globalThis so that
// when Next.js hot-reloads a file during development, we reuse the same
// Mongoose connection instead of opening a new one every single time.
const globalForMongoose = globalThis as unknown as {
  mongooseConn: typeof mongoose | null;
  mongoosePromise: Promise<typeof mongoose> | null;
};

// Make sure the cached values start as null if they've never been set before.
if (!globalForMongoose.mongooseConn) globalForMongoose.mongooseConn = null;
if (!globalForMongoose.mongoosePromise) globalForMongoose.mongoosePromise = null;

// Call connectDB() at the top of any API route that uses Mongoose models.
// It ensures a connection is open before you try to read or write data.
// Example usage: await connectDB();  ← put this line before any db query.
export async function connectDB(): Promise<typeof mongoose> {
  // If we already have a live connection cached, return it immediately — no need to reconnect.
  if (globalForMongoose.mongooseConn) return globalForMongoose.mongooseConn;

  // If we don't have a connection yet, start one (but only start it once —
  // store the promise so parallel calls don't create multiple connections).
  if (!globalForMongoose.mongoosePromise) {
    globalForMongoose.mongoosePromise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB ?? "portfolio", // Which database inside the cluster to use
      bufferCommands: false, // Don't queue commands if the connection drops — fail fast instead
    });
  }

  // Wait for the connection to finish, then cache and return it.
  globalForMongoose.mongooseConn = await globalForMongoose.mongoosePromise;
  return globalForMongoose.mongooseConn;
}
