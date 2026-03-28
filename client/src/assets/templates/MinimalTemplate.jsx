import React from "react";
import PersonalInfoForm from "../../components/PersonalInfoForm.jsx";

const MinimalTemplate = ({ data, accentColor}) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="container bg-white text-dark py-5" style={{ maxWidth: "900px" }}>
            {data.personalInfo && (
  <PersonalInfoForm
    data={data.personalInfo}
    onChange={(updatedInfo) => console.log("Updated:", updatedInfo)}
  />
)}

            {/* Header */}
            <header className="mb-5">
                <h1 className="display-5 fw-light mb-4">
                    {data.personalInfo?.fullName || "Your Name"}
                </h1>

                <div className="d-flex flex-wrap gap-4 text-secondary small">
                    {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
                    {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
                    {data.personalInfo?.linkedin && (
                        <span className="text-break">{data.personalInfo.linkedin}</span>
                    )}
                    {data.personalInfo?.website && (
                        <span className="text-break">{data.personalInfo.website}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professionalSummary && (
                <section className="mb-5">
                    <p className="text-secondary">
                        {data.professionalSummary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section className="mb-5">
                    <h6
                        className="text-uppercase mb-4 fw-medium letter-spacing"
                        style={{ color: accentColor}}
                    >
                        Experience
                    </h6>

                    {data.experience.map((exp, index) => (
                        <div key={index} className="mb-4">
                            <div className="d-flex justify-content-between align-items-baseline mb-1">
                                <h5 className="fw-medium mb-0">{exp.position}</h5>
                                <span className="text-muted small">
                                    {formatDate(exp.start_date)} –{" "}
                                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                </span>
                            </div>

                            <div className="text-secondary mb-2">
                                {exp.company}
                            </div>

                            {exp.description && (
                                <div className="text-secondary" style={{ whiteSpace: "pre-line" }}>
                                    {exp.description}
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}
{/* Projects */}
{data.projects?.length > 0 && (
  <section className="mb-5">
    <h6
      className="text-uppercase mb-4 fw-medium"
      style={{ color: accentColor }}
    >
      Projects
    </h6>

    {data.projects.map((proj, index) => (
      <div key={index} className="mb-3">
        <h5 className="fw-medium mb-1">{proj.name}</h5>

        {proj.type && (
          <div className="small mb-1" style={{ color: accentColor }}>
            {proj.type}
          </div>
        )}

        {proj.description && (
          <p className="text-secondary mb-0">{proj.description}</p>
        )}
      </div>
    ))}
  </section>
)}

            {/* Education */}
            {data.education?.length > 0 && (
                <section className="mb-5">
                    <h6
                        className="text-uppercase mb-4 fw-medium"
                        style={{ color: accentColor}}
                    >
                        Education
                    </h6>

                    {data.education.map((edu, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-baseline mb-3">
                            <div>
                                <div className="fw-medium">
                                    {edu.degree} {edu.field && `in ${edu.field}`}
                                </div>
                                <div className="text-secondary">
                                    {edu.institution}
                                </div>
                                {edu.gpa && (
                                    <div className="text-muted small">
                                        GPA: {edu.gpa}
                                    </div>
                                )}
                            </div>

                            <span className="text-muted small">
                                {formatDate(edu.graduation_date)}
                            </span>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {data.skills?.length > 0 && (
                <section>
                    <h6
                        className="text-uppercase mb-4 fw-medium"
                        style={{ color: accentColor}}
                    >
                        Skills
                    </h6>

                    <div className="text-secondary">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
};

export default MinimalTemplate;
