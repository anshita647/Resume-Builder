import express from "express";
import protect from "../middlewares/authMiddleware.js";
import upload from "../configs/multer.js";
import {
  createResume,
  updateResume,
  deleteResume,
  getResumeById,
  getPublicResumeById
} from "../controllers/resumeController.js";

const resumeRouter = express.Router();

// CREATE RESUME
resumeRouter.post("/create", protect, createResume);

// UPDATE RESUME (with image)
resumeRouter.put(
  "/update/:resumeId",
  protect,
  upload.single("image"),
  updateResume
);

// DELETE RESUME
resumeRouter.delete("/:resumeId", protect, deleteResume);

// GET PRIVATE RESUME
resumeRouter.get("/get/:resumeId", protect, getResumeById);

// GET PUBLIC RESUME
resumeRouter.get("/public/:resumeId", getPublicResumeById);

export default resumeRouter;