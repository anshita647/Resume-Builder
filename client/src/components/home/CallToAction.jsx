import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CallToAction = () => {
  return (
   <div
  id="cta"
  className="container-lg border-top border-bottom border-2 border-secondary border-opacity-25 w-100 px-4 mt-5"
>
  <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start gap-4 px-3 px-md-5 py-5 border-start border-end border-2 border-secondary border-opacity-25">
    
    <p className="fs-5 fw-medium text-dark mb-0">
Turn your skills and experience into a polished, job-winning resume.    </p>

    <a
      href="https://prebuiltui.com"
      className="btn btn-success d-inline-flex align-items-center gap-2 px-4 py-3"
    >
      <span>Get Started</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </a>

  </div>
</div>

  );
};

export default CallToAction;
