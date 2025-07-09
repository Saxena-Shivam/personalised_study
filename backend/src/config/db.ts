import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI as string;
export const client = new MongoClient(mongoUri);

export async function connectDB() {
  await client.connect();
  return client;
}
