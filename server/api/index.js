import serverless from "serverless-http";
import app from "../server.js";
import connectDB from "../configs/db.js";

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null };
}

// ✅ create once (important)
const serverlessHandler = serverless(app);

export default async function handler(req, res) {
  try {
    if (!cached.conn) {
      cached.conn = await connectDB();
      console.log("✅ MongoDB connected");
    }

    return serverlessHandler(req, res); // ✅ reuse
  } catch (error) {
    console.error("Handler Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}