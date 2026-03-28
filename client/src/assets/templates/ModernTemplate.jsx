import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor}) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="bg-white text-dark p-0" style={{ maxWidth: "900px", margin: "0 auto" }}>
      
      {/* Header */}
      <header className="text-white p-5"
        style={{
          backgroundColor: accentColor,
          minHeight: "140px",
        }}
      >
        <div className="d-flex flex-column justify-content-center h-100">
          <h1 className="fw-light mb-3">
            {data.personalInfo?.fullName || "Your Name"}
          </h1>

          <div className="row g-2 small">
            {data.personalInfo?.email && (
              <div className="col-12 col-md-6 d-flex align-items-center gap-2">
                <Mail size={14} />
                <span>{data.personalInfo.email}</span>
              </div>
            )}

            {data.personalInfo?.phone && (
              <div className="col-12 col-md-6 d-flex align-items-center gap-2">
                <Phone size={14} />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}

            {data.personalInfo?.location && (
              <div className="col-12 col-md-6 d-flex align-items-center gap-2">
                <MapPin size={14} />
                <span>{data.personalInfo.location}</span>
              </div>
            )}

            {data.personalInfo?.linkedin && (
              <a
                href={data.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="col-12 col-md-6 d-flex align-items-center gap-2 text-white text-decoration-none"
              >
                <Linkedin size={14} />
                <span className="text-break">
                  {data.personalInfo.linkedin.replace("https://www.", "")}
                </span>
              </a>
            )}

            {data.personalInfo?.website && (
              <a
                href={data.personalInfo.website}
                target="_blank"
                rel="noreferrer"
                className="col-12 col-md-6 d-flex align-items-center gap-2 text-white text-decoration-none"
              >
                <Globe size={14} />
                <span className="text-break">
                  {data.personalInfo.website.replace("https://", "")}
                </span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="p-4 p-md-5">

        {/* Professional Summary */}
        {data.professionalSummary && (
          <section className="mb-5">
            <h2 className="h4 fw-light mb-3 pb-2 border-bottom">
              Professional Summary
            </h2>
            <p className="text-secondary">
              {data.professionalSummary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-5">
            <h2 className="h4 fw-light mb-4 pb-2 border-bottom">
              Experience
            </h2>

            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="mb-4 ps-4 border-start border-2 border-light"
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="fw-medium mb-1">
                      {exp.position}
                    </h5>
                    <div className="fw-medium" style={{ color: accentColor}}>
                      {exp.company}
                    </div>
                  </div>

                  <span className="small bg-light px-3 py-1 rounded text-secondary">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                {exp.description && (
                  <div
                    className="text-secondary mt-2"
                    style={{ whiteSpace: "pre-line" }}
                  >
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
    <h2 className="h4 fw-light mb-3 pb-2 border-bottom">
      Projects
    </h2>

    {data.projects.map((p, index) => (
      <div
        key={index}
        className="mb-4 ps-4 border-start border-2"
        style={{ borderLeftColor: accentColor }}
      >
        <h5 className="fw-medium mb-1">{p.name}</h5>

        {p.type && (
          <div className="small fw-semibold" style={{ color: accentColor }}>
            {p.type}
          </div>
        )}

        {p.description && (
          <p className="text-secondary small mt-2">{p.description}</p>
        )}
      </div>
    ))}
  </section>
)}

        <div className="row g-5">
          {/* Education */}
          {data.education?.length > 0 && (
            <section className="col-12 col-md-6">
              <h2 className="h4 fw-light mb-3 pb-2 border-bottom">
                Education
              </h2>

              {data.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="fw-semibold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  <div style={{ color: accentColor}}>
                    {edu.institution}
                  </div>
                  <div className="d-flex justify-content-between small text-secondary">
                    <span>{formatDate(edu.graduation_date)}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section className="col-12 col-md-6">
              <h2 className="h4 fw-light mb-3 pb-2 border-bottom">
                Skills
              </h2>

              <div className="d-flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge rounded-pill px-3 py-2 text-white"
                    style={{ backgroundColor: accentColor}}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
