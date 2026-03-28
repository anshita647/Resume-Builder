import React from "react";

/*
Make sure you have Bootstrap & Bootstrap Icons included:
npm install bootstrap bootstrap-icons
and in index.js or main.jsx:
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
*/

const ClassicTemplate = ({ data, accentColor}) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="container bg-white text-dark p-4 p-md-5">

            {/* Header */}
            <header
                className="text-center mb-4 pb-3 border-bottom"
                style={{ borderColor: accentColor, borderBottomWidth: "2px" }}
            >
                <h1 className="fw-bold mb-2" style={{ color: accentColor}}>
                    {data.personalInfo?.fullName || "Your Name"}
                </h1>

                <div className="d-flex flex-wrap justify-content-center gap-3 text-muted small">
                    {data.personalInfo?.email && (
                        <div>
                            <i className="bi bi-envelope me-1"></i>
                            {data.personalInfo.email}
                        </div>
                    )}
                    {data.personalInfo?.phone && (
                        <div>
                            <i className="bi bi-telephone me-1"></i>
                            {data.personalInfo.phone}
                        </div>
                    )}
                    {data.personalInfo?.location && (
                        <div>
                            <i className="bi bi-geo-alt me-1"></i>
                            {data.personalInfo.location}
                        </div>
                    )}
                    {data.personalInfo?.linkedin && (
                        <div className="text-break">
                            <i className="bi bi-linkedin me-1"></i>
                            {data.personalInfo.linkedin}
                        </div>
                    )}
                    {data.personalInfo?.website && (
                        <div className="text-break">
                            <i className="bi bi-globe me-1"></i>
                            {data.personalInfo.website}
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professionalSummary && (
                <section className="mb-4">
                    <h5 className="fw-semibold mb-2" style={{ color: accentColor}}>
                        PROFESSIONAL SUMMARY
                    </h5>
                    <p className="text-secondary">
                        {data.professionalSummary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section className="mb-4">
                    <h5 className="fw-semibold mb-3" style={{ color: accentColor}}>
                        PROFESSIONAL EXPERIENCE
                    </h5>

                    {data.experience.map((exp, index) => (
                        <div
                            key={index}
                            className="ps-3 mb-3 border-start"
                            style={{ borderColor: accentColor, borderWidth: "3px" }}
                        >
                            <div className="d-flex justify-content-between flex-wrap">
                                <div>
                                    <h6 className="fw-bold mb-0">{exp.position}</h6>
                                    <div className="fw-medium text-secondary">
                                        {exp.company}
                                    </div>
                                </div>
                                <div className="text-muted small">
                                    {formatDate(exp.start_date)} –{" "}
                                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                </div>
                            </div>

                            {exp.description && (
                                <p className="mt-2 text-secondary white-space-pre-line">
                                    {exp.description}
                                </p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* proJECTS */}
          {/* professionalSummary */}
{data.projects?.length > 0 && (
  <section className="mb-4">
    <h5 className="fw-semibold mb-3" style={{ color: accentColor }}>
      Projects
    </h5>

    {data.projects.map((proj, index) => (
      <div key={index} className="ps-3 mb-3 border-start border-secondary">
        <h6 className="fw-bold mb-1">{proj.name}</h6>

        {proj.type && (
          <div className="small mb-1" style={{ color: accentColor }}>
            {proj.type}
          </div>
        )}

        {proj.description && (
          <p className="text-secondary mb-0 white-space-pre-line">
            {proj.description}
          </p>
        )}
      </div>
    ))}
  </section>
)}

            

            {/* Education */}
            {data.education?.length > 0 && (
                <section className="mb-4">
                    <h5 className="fw-semibold mb-3" style={{ color: accentColor}}>
                        EDUCATION
                    </h5>

                    {data.education.map((edu, index) => (
                        <div key={index} className="d-flex justify-content-between flex-wrap mb-2">
                            <div>
                                <h6 className="fw-bold mb-0">
                                    {edu.degree} {edu.field && `in ${edu.field}`}
                                </h6>
                                <div className="text-secondary">{edu.institution}</div>
                                {edu.gpa && (
                                    <div className="text-muted small">
                                        GPA: {edu.gpa}
                                    </div>
                                )}
                            </div>
                            <div className="text-muted small">
                                {formatDate(edu.graduation_date)}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {data.skills?.length > 0 && (
                <section>
                    <h5 className="fw-semibold mb-3" style={{ color: accentColor}}>
                        CORE SKILLS
                    </h5>

                    <div className="d-flex flex-wrap gap-3">
                        {data.skills.map((skill, index) => (
                            <span key={index} className="text-secondary">
                                • {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;
