import serverless from "serverless-http";
import app from "../server.js";
import connectDB from "../configs/db.js";

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null };
}

const handler = async (req, res) => {
  if (!cached.conn) {
    cached.conn = await connectDB();
  }

  return serverless(app)(req, res); // ✅ correct usage
};

export default handler;