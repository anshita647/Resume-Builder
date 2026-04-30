import serverless from "serverless-http";
import app from "../server.js";
import connectDB from "../configs/db.js";

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

const handler = async (req, res) => {
  try {
    if (!cached.conn) {
      cached.conn = await connectDB();
    }

    return app(req, res);
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Server Error" });
  }
};

export default serverless(handler);