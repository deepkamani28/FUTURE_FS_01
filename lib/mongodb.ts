import { MongoClient, type Db } from "mongodb"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log("Using cached MongoDB connection")
    return { client: cachedClient, db: cachedDb }
  }

  const MONGODB_URI = process.env.MONGODB_URI

  console.log("MONGODB_URI exists:", !!MONGODB_URI)
  if (MONGODB_URI) {
    console.log("MONGODB_URI host:", MONGODB_URI.split("@")[1]?.split("/")[0] || "unknown")
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set. Please add it to your environment variables.")
  }

  try {
    console.log("Attempting to connect to MongoDB...")
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    await client.connect()
    console.log("Successfully connected to MongoDB")

    const db = client.db("portfolio")

    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("MongoDB connection error:", error instanceof Error ? error.message : error)
    throw new Error(
      `Failed to connect to MongoDB. Check your MONGODB_URI: ${error instanceof Error ? error.message : "Unknown error"}`,
    )
  }
}
