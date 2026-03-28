import React from "react";
const MinimalImageTemplate = ({ data, accentColor, removeBackground }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const imageSrc =
    typeof data.personalInfo?.image === "string"
      ? data.personalInfo.image
      : data.personalInfo?.image
        ? URL.createObjectURL(data.personalInfo.image)
        : null;

  return (
    <div className="container bg-white text-dark">
      <div className="row">
        {/* Image Column */}
        {/* Image Column */}
        <div className="col-md-4 text-center py-4 d-flex justify-content-center align-items-center">
          {imageSrc && (
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                // ✅ THE CORE LOGIC:
                // - removeBackground OFF → accentColor ring (original behavior)
                // - removeBackground ON + accentColor set → fill with accentColor
                // - removeBackground ON + no accentColor → white background
                backgroundColor: removeBackground
                  ? accentColor || "#ffffff"
                  : "transparent",
                border: removeBackground
                  ? `4px solid ${accentColor || "#cccccc"}`
                  : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={imageSrc}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: removeBackground ? "150px" : "120px",
                  height: removeBackground ? "150px" : "120px",
                  objectFit: "cover",
                  backgroundColor: "transparent",
                }}
              />
            </div>
          )}
        </div>

        {/* Name + Profession */}
        <div className="col-md-8 d-flex flex-column justify-content-center py-4 px-4">
          <h1
            className="fw-bold text-uppercase letter-spacing"
            style={{ color: accentColor }}
          >
            {" "}
            {data.personalInfo?.fullName || "Your Name"}
          </h1>
          <div className="text-muted text-uppercase small fw-medium">
            {data.personalInfo?.profession || "Profession"}
          </div>
        </div>
      </div>

      <div className="row">
        {/* Left Sidebar */}
        <aside className="col-md-4 border-end border-secondary p-4">
          {/* Contact */}
          <section className="mb-4">
            <h6
              className="text-uppercase fw-semibold mb-3"
              style={{ color: accentColor }}
            >
              {" "}
              Contact
            </h6>

            <div className="small">
              {data.personalInfo?.phone && (
                <div className="d-flex align-items-center mb-2">
                  <i
                    className="bi bi-telephone me-2"
                    style={{ color: accentColor }}
                  ></i>
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo?.email && (
                <div className="d-flex align-items-center mb-2">
                  <i
                    className="bi bi-envelope me-2"
                    style={{ color: accentColor }}
                  ></i>
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo?.location && (
                <div className="d-flex align-items-center">
                  <i
                    className="bi bi-geo-alt me-2"
                    style={{ color: accentColor }}
                  ></i>
                  {data.personalInfo.location}
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mb-4">
              <h6 className="text-uppercase fw-semibold text-muted mb-3">
                Education
              </h6>

              {data.education.map((edu, index) => (
                <div key={index} className="mb-3 small">
                  <div className="fw-semibold text-uppercase">{edu.degree}</div>
                  <div className="text-muted">{edu.institution}</div>
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
              <h6 className="text-uppercase fw-semibold text-muted mb-3">
                Skills
              </h6>

              <ul className="list-unstyled small mb-0">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Right Content */}
        <main className="col-md-8 p-4">
          {/* Summary */}
          {data.professionalSummary && (
            <section className="mb-4">
              <h6
                className="text-uppercase fw-semibold mb-3"
                style={{ color: accentColor }}
              >
                Summary
              </h6>
              <p className="text-secondary">{data.professionalSummary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-4">
              <h6
                className="text-uppercase fw-semibold mb-3"
                style={{ color: accentColor }}
              >
                Experience
              </h6>

              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="d-flex justify-content-between">
                    <div className="fw-semibold">{exp.position}</div>
                    <div className="text-muted small">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>

                  <div className="small mb-2" style={{ color: accentColor }}>
                    {exp.company}
                  </div>

                  {exp.description && (
                    <ul className="small text-secondary">
                      {exp.description.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

         

                 {/* Projects */}
{data.projects?.length > 0 && (
  <section>
    <h6
      className="text-uppercase fw-semibold mb-3"
      style={{ color: accentColor }}
    >
      Projects
    </h6>

    {data.projects.map((project, index) => (
      <div key={index} className="mb-4">
        <div className="fw-medium">{project.name}</div>
        {project.type && (
          <div className="small mb-2" style={{ color: accentColor }}>
            {project.type}
          </div>
        )}

        {project.description && (
          <ul className="small text-secondary">
            {project.description.split("\n").map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </section>
)}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;
