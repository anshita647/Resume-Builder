import React from "react";
import ClassicTemplate from "../assets/templates/ClassicTemplate.jsx";
import ModernTemplate from "../assets/templates/ModernTemplate.jsx";
import MinimalTemplate from "../assets/templates/MinimalTemplate.jsx";
import MinimalImageTemplate from "../assets/templates/MinimalImageTemplate.jsx";

const ResumePreview = ({ data, template,removeBackground, accentColor, classes = "" }) => {
 let previewData = { ...data };


  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={previewData} accentColor={accentColor} />;

      case "minimal":
        return <MinimalTemplate data={previewData} accentColor={accentColor} />;

      case "minimalImage":
        return (
          <MinimalImageTemplate
            data={previewData}
            accentColor={accentColor}
                  removeBackground={removeBackground} 
          />
        );

      default:
        return <ClassicTemplate data={previewData} accentColor={accentColor} />;
    }
  };

  return (
    <div className="bg-light p-3">
      <div
        id="resume-preview"
        className={`border bg-white shadow-sm ${classes}`}
      >
        {renderTemplate()}
      </div>

      {/* Print Styles */}
      <style>{`
        @page {
          size: letter;
          margin: 0;
        }

        @media print {
          html, body {
            width: 8.5in;
            height: 11in;
            overflow: hidden;
          }

          body * {
            visibility: hidden;
          }

          #resume-preview, 
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
