import React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../configs/api";
const ProfessionalSummaryForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);

const prompt = `Rewrite the following professional summary into a concise, professional resume summary in 3-4 lines. 
Do not give multiple options. Do not include headings or explanations. Return only the final improved summary.

Summary: ${data}`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        {
          userContent: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onChange(response.data.enhancedContent);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-start flex-wrap">
        {/* Left Section */}
        <div>
          <h5 className="fw-bold">Professional Summary</h5>
          <p className="text-muted small">Add a summary for your resume</p>

          <button
            type="button"
            disabled={isGenerating}
            onClick={generateSummary}
            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
          >
            {isGenerating ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <Sparkles size={16} />
            )}
            {isGenerating ? "Generating..." : "AI Enhance"}
          </button>
        </div>

        {/* Textarea Section */}
        <div className="w-100 mt-4">
          <textarea
            value={data || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={7}
            className="form-control"
            placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
          />

          <p className="text-muted small text-center mt-2">
            Tip: Keep it concise (3–4 sentences) and focus on relevant
            achievements and skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
