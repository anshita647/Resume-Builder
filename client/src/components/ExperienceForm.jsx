import React from "react";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import { toast } from "react-toastify";
import { Sparkles } from "lucide-react";
const ExperienceForm = ({ data = [], onChange }) => {
const token=useSelector((state)=>state.auth.token);
const [isGenerating, setIsGenerating] = React.useState(-1);
  // ✅ Add Experience
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  };

  // ✅ Remove Experience
  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // ✅ Update Field
  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
const generateDescription = async (index) => {
      setIsGenerating(index);
const prompt = `Enhance the following job description to make it more impactful, professional, and achievement-oriented.

Company: ${data[index].company}
Position: ${data[index].position}
Start Date: ${data[index].start_date}
End Date: ${data[index].is_current ? "Present" : data[index].end_date}

Current Description:
${data[index].description || "No description provided"}

Rewrite it into 3-5 strong bullet points with action verbs and measurable impact. Do NOT ask for more information.`;      try {
        const response = await api.post(
          "/api/ai/enhance-job-desc",
          {
            userContent: prompt,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        updateExperience(index, "description", response.data.enhancedContent);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsGenerating(-1);
      }
    };


  return (
    <div className="mb-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
        <div>
          <h5 className="fw-bold">Professional Experience</h5>
          <p className="text-muted small">
            Add your job experience
          </p>

          <button
            type="button"
            onClick={addExperience}
            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
          >
            <Plus size={16} />
            Add Experience
          </button>
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-4 text-muted">
          <Briefcase size={40} className="mb-3 opacity-50" />
          <p className="mb-1">No experience added yet</p>
          <small>Click Add Experience to get started</small>
        </div>
      ) : (
        data.map((experience, index) => (
          <div
            key={index}
            className="p-3 border rounded mb-3 bg-light"
          >

            {/* Top Row */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold mb-0">
                Experience #{index + 1}
              </h6>

              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="btn btn-sm btn-outline-danger"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Company + Position */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="form-control"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  type="month"
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <input
                  type="month"
                  value={experience.end_date}
                  disabled={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="form-control"
                />
              </div>
            </div>

            {/* Currently Working */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={experience.is_current}
                onChange={(e) =>
                  updateExperience(index, "is_current", e.target.checked)
                }
              />
              <label className="form-check-label">
                Currently Working Here
              </label>
            </div>

            {/* Description */}
<div>
  <div className="d-flex justify-content-between align-items-center mb-2">
    <label className="form-label fw-medium mb-0">
      Job Description
    </label>

    <button
      type="button"
      disabled={isGenerating === index}
      onClick={() => generateDescription(index)}
      className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
    >
      {isGenerating === index ? (
        <span className="spinner-border spinner-border-sm"></span>
      ) : (
        <Sparkles size={14} />
      )}

      {isGenerating === index ? "Generating..." : "AI Enhance"}
    </button>
  </div>

    

              <textarea
                rows={4}
                className="form-control"
                placeholder="Describe your responsibilities and achievements..."
                value={experience.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
              />
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default ExperienceForm;
