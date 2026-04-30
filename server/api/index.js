import serverless from "serverless-http";
import app from "../server.js";
import connectDB from "../configs/db.js";

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null };
}

// ✅ create once
const serverlessHandler = serverless(app);

export default async function handler(req, res) {
  try {
    // ✅ NON-BLOCKING DB CONNECT
    if (!cached.conn) {
      connectDB()
        .then((conn) => {
          cached.conn = conn;
          console.log("✅ MongoDB connected");
        })
        .catch((err) => console.error("DB Error:", err));
    }

    // ✅ respond immediately
    return serverlessHandler(req, res);

  } catch (error) {
    console.error("Handler Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}