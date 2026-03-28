import React, { useState } from "react";
import { Layout, Check } from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "Traditional resume layout with clear sections and professional typography.",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Modern design with bold headings and a clean visual hierarchy.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "Simple, distraction-free layout focused on content clarity.",
    },
    {
      id: "minimalImage",
      name: "Minimal Image",
      preview:
        "Minimal layout with profile image emphasis for visual appeal.",
    },
  ];

  return (
    <div className="position-relative">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
      >
        <Layout size={14} />
        <span className="d-none d-sm-inline">Template</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="position-absolute top-100 start-0 mt-2 p-3 bg-white border rounded shadow-sm"
          style={{ width: "260px", zIndex: 10 }}
        >
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`position-relative p-3 mb-2 border rounded cursor-pointer ${
                selectedTemplate === template.id
                  ? "border-primary bg-primary bg-opacity-10"
                  : "border-secondary-subtle"
              }`}
              style={{ cursor: "pointer" }}
            >
              {/* Selected Tick */}
              {selectedTemplate === template.id && (
                <div className="position-absolute top-0 end-0 m-2">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 20, height: 20 }}>
                    <Check size={12} className="text-white" />
                  </div>
                </div>
              )}

              <h6 className="fw-medium text-dark mb-1">
                {template.name}
              </h6>

              <div className="mt-2 p-2 bg-light rounded text-muted small fst-italic">
                {template.preview}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
