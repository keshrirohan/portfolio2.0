import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

/* Global cache to prevent multiple connections in dev hot-reloads */
const globalForMongoose = globalThis as unknown as {
  mongooseConn: typeof mongoose | null;
  mongoosePromise: Promise<typeof mongoose> | null;
};

if (!globalForMongoose.mongooseConn) globalForMongoose.mongooseConn = null;
if (!globalForMongoose.mongoosePromise) globalForMongoose.mongoosePromise = null;

export async function connectDB(): Promise<typeof mongoose> {
  if (globalForMongoose.mongooseConn) return globalForMongoose.mongooseConn;

  if (!globalForMongoose.mongoosePromise) {
    globalForMongoose.mongoosePromise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB ?? "portfolio",
      bufferCommands: false,
    });
  }

  globalForMongoose.mongooseConn = await globalForMongoose.mongoosePromise;
  return globalForMongoose.mongooseConn;
}
