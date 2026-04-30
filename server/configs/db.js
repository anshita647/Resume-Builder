import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

if (process.env.NODE_ENV !== "production") {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch (err) {
    console.warn("DNS override failed:", err.message);
  }
}

// ✅ GLOBAL CACHE
let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn; // ✅ reuse existing connection
  }

  if (!cached.promise) {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not set");
    }

    cached.promise = mongoose.connect(process.env.MONGODB_URI)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected");
        return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;