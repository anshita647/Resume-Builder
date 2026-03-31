import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "../server/configs/db.js";
import userRouter from "../server/routes/userRoutes.js";
import resumeRouter from "../server/routes/resumeRoutes.js";
import aiRouter from "../server/routes/aiRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ TEMP CORS (fix error immediately)
app.use(cors({ origin: "*" }));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Server is live...");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// ✅ Connect DB
await connectDB();
console.log("✅ Database connected");

// ❌ NO app.listen()

export default app;