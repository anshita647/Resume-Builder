import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (allow all Vercel deployments)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.includes("vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is live...");
});

// ✅ Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// ✅ Connect DB (IMPORTANT)
await connectDB();
console.log("✅ Database connected");

// ❌ DO NOT USE app.listen() in Vercel

// ✅ Export for Vercel serverless
export default app;