// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();  
// import connectDB from "./configs/db.js";
// import userRouter from "./routes/userRoutes.js";
// import resumeRouter from "./routes/resumeRoutes.js";
// import aiRouter from "./routes/aiRoutes.js";
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cors({
//   origin: "https://frontened-mu.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
// app.options('*', cors());
// app.get("/", (req, res) => {
//   res.send("Server is live...");
// });
// app.use('/api/users',userRouter)
// app.use('/api/resumes',resumeRouter)
// app.use('/api/ai', aiRouter);
// // Start server only after DB connects
// const startServer = async () => {
//   try {
//     await connectDB();
//     console.log("✅ Database connected");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server is running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("❌ Failed to start server:", error.message);
//     process.exit(1);
//   }
// };

// startServer();
