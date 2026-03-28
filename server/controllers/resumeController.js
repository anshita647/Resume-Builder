import Resume from "../models/Resume.js"; 
import imagekit from '../configs/imageKit.js';
import mongoose from "mongoose";
import fs from "fs";

// CREATE RESUME
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const newResume = await Resume.create({
      userId,
      title
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

// DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const resumeIdObj = new mongoose.Types.ObjectId(req.params.resumeId);

    const resume = await Resume.findOneAndDelete({
      _id: resumeIdObj,
      userId
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found or not authorized"
      });
    }

    return res.status(200).json({
      message: "Resume deleted successfully"
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

// GET PRIVATE RESUME
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      userId
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found or not authorized"
      });
    }

    const resumeData = resume.toObject();
    delete resumeData.__v;
    delete resumeData.createdAt;
    delete resumeData.updatedAt;

    return res.status(200).json({
      message: "Resume fetched successfully",
      resume: resumeData
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

// GET PUBLIC RESUME
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    return res.status(200).json({
      message: "Public resume fetched",
      resume
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

// UPDATE RESUME
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    let resumeData = req.body.resumeData || req.body;
    const image = req.file;
    const removeBackground = req.body.removeBackground === "true";

    if (typeof resumeData === "string") {
      resumeData = JSON.parse(resumeData);
    }

    let resumeDataCopy =
      typeof resumeData === "string"
        ? JSON.parse(resumeData)
        : structuredClone(resumeData);

    // IMAGE UPLOAD
    if (image) {
      try {
        const fileStream = fs.createReadStream(image.path);

        const response = await imagekit.files.upload({
          file: fileStream,
          fileName: image.originalname,
          folder: "user-resumes",
          transformations: removeBackground
            ? [
                {
                  transformation: [
                    {
                      effect: "background_removal",
                    },
                  ],
                },
              ]
            : undefined,
        });

        // ✅ SAVE IMAGE URL
        resumeDataCopy.personalInfo = resumeDataCopy.personalInfo || {};
        resumeDataCopy.personalInfo.image = response.url;

        // ✅ DELETE TEMP FILE
        fs.unlinkSync(image.path);

        console.log("Image uploaded successfully:", response.url);

      } catch (error) {
        console.error("Image upload error:", error);
      }
    }

    // BUILD UPDATED DATA
    // fetch the existing resume
const existingResume = await Resume.findOne({ _id: resumeId, userId });

// merge personalInfo safely
const updatedData = {
  ...existingResume.toObject(),
  ...resumeDataCopy,
  personalInfo: {
    ...existingResume.personalInfo,       // keep existing fields
    ...resumeDataCopy.personalInfo        // overwrite only fields that are present
  }
};

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      updatedData,
      { returnDocument: "after" }
    );

    if (!updatedResume) {
      return res.status(404).json({
        message: "Resume not found or not authorized"
      });
    }

    return res.status(200).json({
      message: "Resume updated successfully",
      resume: updatedResume
    });

  } catch (error) {
    console.error("UPDATE RESUME CATCH ERROR:", error);

    return res.status(400).json({
      message: error.message,
      errors: error.errors || null,
    });
  }
};