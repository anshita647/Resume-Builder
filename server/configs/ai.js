import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateResumeImprovement = async (text) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  // ✅ FIX: add timeout protection
  const result = await Promise.race([
    model.generateContent(text),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API timeout")), 7000)
    ),
  ]);

  const response = await result.response;

  return response.text();
};