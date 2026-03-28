import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

// Keep this (it's fine)
if (process.env.NODE_ENV !== "production") {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch (err) {
    console.warn("DNS override failed:", err.message);
  }
}

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not set");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;