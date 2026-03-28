import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  isPublic: {
    type: Boolean,
    default: false
  },

  template: {
    type: String,
    default: "classic"
  },

  accentColor: {
    type: String,
    default: "#3B82F6"
  },

  professionalSummary: {
    type: String
  },

  skills: [
    {
      type: String
    }
  ],

  // Personal Info
  personalInfo: {
    image: String,
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    website: String
  },

  // Experience
  experience: [
    {
      company: String,
      position: String,
      startDate: String,
endDate: String,
      description: String,
      isCurrent: Boolean
    }
  ],

  // professionalSummary
  professionalSummary: [
    {
      name: String,
      type: String,
      description: String
    }
  ],

  // Education
  education: [
    {
      institution: String,
      degree: String,
      field: String,
      graduation_date: String,
      gpa: String
    }
  ]

}, { timestamps: true,minimize:false });

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;