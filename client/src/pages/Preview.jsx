import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import { ArrowLeft } from "lucide-react";
import api from "../configs/api";
const Preview = () => {
  const { resumeid } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const{data}=await api.get(`/api/resumes/public/${resumeid}`);
        setResumeData(data.resume);
      } catch (error) {
        console.error("Failed to load resume:", error);
        setResumeData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [resumeid]);

  // ✅ Loading State
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loader />
      </div>
    );
  }

  // ❌ Resume Not Found
  if (!resumeData) {
    return (
      <div className="container text-center d-flex flex-column justify-content-center align-items-center vh-100">
        <h2 className="text-secondary mb-4">
          Resume Not Found
        </h2>

        <Link to="/" className="btn btn-success d-flex align-items-center gap-2">
          <ArrowLeft size={16} />
          Go to Home Page
        </Link>
      </div>
    );
  }

  // ✅ Resume Found
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="card shadow-sm p-4">
        <ResumePreview
  data={resumeData}
  template={resumeData.template}
  accentColor={resumeData.accentColor || "#3498db"} // default color
/>
        </div>
      </div>
    </div>
  );
};

export default Preview;
