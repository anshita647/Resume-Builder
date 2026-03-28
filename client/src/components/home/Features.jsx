import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Title from "./Title";

const Features = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      id="features"
      className="d-flex flex-column align-items-center my-5"
      style={{ scrollMarginTop: "3rem" }}
    >
      {/* Top Badge */}
      <div className="d-flex align-items-center gap-2 small text-success bg-success bg-opacity-10 border border-success rounded-pill px-3 py-1 mb-4">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <span>Simple Process</span>
      </div>

      <Title
        title="Build your resume"
        description="Craft a polished resume that highlights your skills, experience, and achievements—fast and effortlessly."
      />

      <div className="container py-5">
        {/* ✅ FIX: added mt-4 */}
        <div className="row align-items-center justify-content-center mt-4 mt-xl-n5">
          
          {/* Image */}
          <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
              alt="Feature Group"
              className="img-fluid w-100"
              style={{ maxWidth: "600px" }}
            />
          </div>

          {/* Feature Cards */}
          <div
            className="col-12 col-md-6"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {/* Card 1 */}
            <div className="d-flex justify-content-center mb-4">
              <div
                className={`feature-card p-4 d-flex gap-3 rounded-4 transition
                  ${!isHover ? "violet-active" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-violet"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>

                <div>
                  <h6 className="fw-semibold text-dark">Real-Time Analytics</h6>
                  <p className="text-muted small mb-0">
                    Get instant insights into your finances with live dashboards.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="d-flex justify-content-center mb-4">
              <div className="feature-card p-4 d-flex gap-3 rounded-4 green-hover">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-success"
                >
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                </svg>

                <div>
                  <h6 className="fw-semibold text-dark">Bank-Grade Security</h6>
                  <p className="text-muted small mb-0">
                    End-to-end encryption, 2FA, compliance with GDPR standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="d-flex justify-content-center">
              <div className="feature-card p-4 d-flex gap-3 rounded-4 orange-hover">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-orange"
                >
                  <path d="M12 15V3" />
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="m7 10 5 5 5-5" />
                </svg>

                <div>
                  <h6 className="fw-semibold text-dark">Customizable Reports</h6>
                  <p className="text-muted small mb-0">
                    Export professional, audit-ready financial reports.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .feature-card {
          width: 100%;
          max-width: 420px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .violet-active { background-color: #ede9fe; border-color: #c4b5fd; }
        .feature-card:hover { background-color: #ede9fe; border-color: #c4b5fd; }

        .green-hover:hover { background-color: #dcfce7; border-color: #86efac; }
        .orange-hover:hover { background-color: #ffedd5; border-color: #fdba74; }

        .text-violet { color: #7c3aed; }
        .text-orange { color: #ea580c; }
      `}</style>
    </div>
  );
};

export default Features;
