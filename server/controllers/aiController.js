import {generateResumeImprovement} from "../configs/ai.js";
import Resume from "../models/Resume.js";
import imagekit from "../configs/imageKit.js";
// controller for enhancing resume professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Professional summary content is required",
      });
    }

    const prompt = `
You are an expert resume writer.
Enhance the professional summary to make it professional, concise, and impactful.
Do not add new information. Only improve the language.

${userContent}
`;

    const enhancedContent = await generateResumeImprovement(prompt);

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// controller for enhancing resume job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Job description content is required",
      });
    }

    const prompt = `
You are an expert resume writer.
Enhance the job description to be achievement-oriented and professional.
Do not add new information.

${userContent}
`;

    const enhancedContent = await generateResumeImprovement(prompt);

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// controller for updating resume with extracted AI data
// PUT: /api/ai/update-resume/:resumeId
export const uploadResume = async (req, res) => {
  try {
    const { resumeText } = req.body;
    const { resumeId } = req.params;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing resume text" });
    }

    const prompt = `
You are an expert AI Agent to extract structured data from resumes.

Extract the following information from this resume text:

${resumeText}

Provide the output strictly in valid JSON format with the following structure:

{
  "professionalSummary": String,
  "skills": [String],
  "personalInfo": {
    "image": String,
    "fullName": String,
    "email": String,
    "phone": String,
    "location": String,
    "linkedin": String,
    "website": String
  },
  "experience": [
    {
      "company": String,
      "position": String,
      "startDate": String,
      "endDate": String,
      "description": String,
      "isCurrent": Boolean
    }
  ],
  "professionalSummary": [
    {
      "name": String,
      "type": String,
      "description": String
    }
  ],
  "education": [
    {
      "institution": String,
      "degree": String,
      "field": String,
      "graduation_date": String,
      "gpa": String
    }
  ]
}
`;

  let extractedData;
let parsedData;

try {
  extractedData = await generateResumeImprovement(prompt);
} catch (error) {
  return res.status(500).json({ message: "AI failed" });
}

    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      parsedData,
      {returnDocument: "after" }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      resume: updatedResume,
      message: "Resume updated successfully",
    });
  } catch (error) {
   
    return res.status(500).json({
      message: error.message,
    });
  }
};
// controller for uploading image to ImageKit
// POST: /api/ai/upload-image
export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    console.log("STEP 1: req.file →", req.file); // ✅ LINE 1

    if (!file) {
            console.log("STEP 2: No file received"); // ✅ LINE 2
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log("STEP 3: Uploading to ImageKit..."); // ✅ LINE 3

    const result = await imagekit.files.upload({
      file: file.buffer.toString("base64"), // ✅ FIXED
      fileName: file.originalname,
    });
    console.log("STEP 4: ImageKit result →", result); // ✅ LINE 4

    return res.status(200).json({
      url: result.url,
    });

  } catch (error) {
        console.error("STEP 5: ERROR →", error); // ✅ LINE 5

    return res.status(500).json({
      message: error.message,
    });
  }
};