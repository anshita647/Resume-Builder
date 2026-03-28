import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  User,
  FileText,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  Share2,
  TableRowsSplit,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import api from "../configs/api"; // Added API import
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const ResumeBuilder = () => {
  const { resumeid } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [resumeData, setResumeData] = useState({
  _id: "",
  title: "",
  personalInfo: { image: null },
  professionalSummary: "",
    projects: [],  // <---- Add this
  experience: [],
  education: [],
  skills: [],
  template: "classic",
accentColor: "#3b82f6",
  isPublic: false,
});


  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state added
  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
  { id: "projects", name: "Projects", icon: Briefcase }, // <--- correct id
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];
  // Fetch resume from backend
  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      try {
      const { data } = await api.get(`/api/resumes/get/${resumeid}`, {
  headers: { Authorization: `Bearer ${token}` }
});

if (data.resume) {

  const resume = data.resume;

 setResumeData({
  _id: resume._id,
  title: resume.title || "",
 personalInfo: {
    ...resume.personalInfo,
    image: resume.personalInfo?.image, // ✅ CORRECT PLACE
  },
    professionalSummary: resume.professionalSummary || "",
  experience: resume.experience || [],
  education: resume.education || [],
  skills: resume.skills || [],
  template: resume.template || "classic",
accentColor: resume.accentColor|| "#3b82f6",
  isPublic: resume.isPublic || false
});


  document.title = resume.title;
}else {
          alert("Resume not found");
        }
      } catch (error) {
        console.error("Error loading resume:", error);
        alert("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };

    if (resumeid) fetchResume();
  }, [resumeid, token]);

  // Toggle visibility
  const changeResumeVisibility = async () => {
    try {
      const { data } = await api.put(
      `/api/resumes/update/${resumeData._id}`, // ✅ Add resumeId here
        {
          resumeId: resumeData._id,
          resumeData: { isPublic: !resumeData.isPublic },
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setResumeData((prev) => ({ ...prev, isPublic: !prev.isPublic }));
      toast.success(data.message || "Visibility updated");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error(error?.response?.data?.message || "Failed to update");
    }
  };

  // Share resume
  const handleShare = async () => {
    const frontendUrl = window.location.origin;
    const resumeUrl = `${frontendUrl}/app/view/${resumeid}`;

    if (navigator.share) {
      await navigator.share({
        title: "My Resume",
        text: "Check out my resume",
        url: resumeUrl,
      });
    } else {
      alert("Sharing not supported on this device");
    }
  };

  // Download resume
  const downloadResume = () => {
    window.print();
  };

  

 
    const saveResume = async () => {
  let updatedResumeData = structuredClone(resumeData);

  if (updatedResumeData.personalInfo?.image instanceof File) {
  delete updatedResumeData.personalInfo.image;
}


  const formData = new FormData();
  formData.append("resumeData", JSON.stringify(updatedResumeData));
  formData.append("removeBackground", removeBackground ? "true" : "false");

  if (resumeData.personalInfo?.image instanceof File) {
    formData.append("image", resumeData.personalInfo.image);
  }

  const { data } = await api.put(
    `/api/resumes/update/${resumeData._id}`,
    formData,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const resume = data.resume;

  setResumeData({
  _id: resume._id,
  title: resume.title || "",
  personalInfo: resume.personalInfo || { image: null },
  experience: resume.experience || [],
  education: resume.education || [],
  skills: resume.skills || [],
  template: resume.template || "classic",
  accentColor: resume.accentColor || "#3b82f6", 
  isPublic: resume.isPublic || false
});
return data;
};
  if (loading) return <div className="text-center mt-5">Loading...</div>;
  return (
    <div className="container mt-4">
      <Link
        to="/app"
        className="d-inline-flex align-items-center gap-2 text-secondary text-decoration-none mb-3"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="row">
        {/* LEFT PANEL */}
        <div className="col-lg-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3 border rounded p-2">
                <div className="d-flex align-items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accentColor}
                    onChange={(color) =>
                      setResumeData((prev) => ({ ...prev, accentColor: color }))
                    }
                  />

                  <span className="fw-bold">{activeSection.name}</span>
                </div>

                <div className="d-flex gap-2">
                  {activeSectionIndex > 0 && (
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setActiveSectionIndex((prev) => prev - 1)}
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>
                  )}

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1),
                      )
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div>
              {activeSection.id === "personal" && (
  <PersonalInfoForm
    data={resumeData.personalInfo}
    onChange={(data) =>
      setResumeData((prev) => ({ ...prev, personalInfo: data }))
    }
    removeBackground={removeBackground}
    setRemoveBackground={setRemoveBackground}
  />
)}
              
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professionalSummary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professionalSummary: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, experience: data }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, education: data }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.projects}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, projects: data }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>

     <button
  className="btn btn-success mt-3 w-100"
  onClick={async () => {
    const promise = saveResume();

    toast.promise(promise, {
      loading: "Saving changes...",
      success: "Changes saved successfully!",
      error: "Failed to save changes",
    });

    await promise;
  }}
>
  Save Changes
</button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-lg-7">
          <div className="d-flex justify-content-end gap-2 mb-3">
            {resumeData.isPublic && (
              <button
                onClick={handleShare}
                className="btn btn-outline-primary btn-sm"
              >
                <Share2 size={16} /> Share
              </button>
            )}

           <button
  onClick={changeResumeVisibility}
  className="btn btn-outline-secondary btn-sm"
>
  {resumeData.isPublic ? (
    <>
      <Eye size={16} /> Public
    </>
  ) : (
    <>
      <EyeOff size={16} /> Private
    </>
  )}
</button>

            <button
              onClick={downloadResume}
              className="btn btn-outline-success btn-sm"
            >
              <Download size={16} /> Download
            </button>
          </div>

          <ResumePreview
  data={resumeData}
  template={resumeData.template}
  accentColor={resumeData.accentColor}
  removeBackground={removeBackground} // ✅ ADD THIS
/>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
