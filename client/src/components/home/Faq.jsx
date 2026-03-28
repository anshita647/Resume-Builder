import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
  {
    question: "What is an AI Resume Builder?",
    answer:
      "An AI Resume Builder helps you create a professional resume by automatically analyzing your skills, experience, and career goals to generate optimized content."
  },
  {
    question: "Is my resume ATS-friendly?",
    answer:
      "Yes, all resumes are optimized for Applicant Tracking Systems (ATS), increasing your chances of getting shortlisted by recruiters."
  },
  {
    question: "Can I customize my resume after generation?",
    answer:
      "Absolutely. You can edit sections, rewrite content, change templates, and personalize your resume anytime."
  },
  {
    question: "Is my personal data safe and private?",
    answer:
      "Your data is fully secure. We follow industry-standard security practices and never share your personal information with third parties."
  },
  {
    question: "Can I download my resume in different formats?",
    answer:
      "Yes, you can download your resume in multiple formats such as PDF and DOCX, ready to share or upload."
  },
  {
    question: "Do I need prior design or writing skills?",
    answer:
      "No design or writing skills are required. Our AI handles formatting and content so you can focus on your career."
  }
];


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 text-center">
              <p className="text-success fw-medium mb-2">FAQ's</p>

              <h2 className="fw-semibold mb-3">
                Looking for answers?
              </h2>

              <p className="text-muted mb-5">
                Create professional, AI-powered resumes that are customizable, ATS-friendly, and ready to impress.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-bottom py-3 cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-medium text-start">
                      {faq.question}
                    </h6>

                    <span
                      className={`transition ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      style={{ transition: "transform 0.3s ease" }}
                    >
                      ▼
                    </span>
                  </div>

                  <div
                    className={`overflow-hidden ${
                      openIndex === index ? "mt-3" : ""
                    }`}
                    style={{
                      maxHeight: openIndex === index ? "200px" : "0",
                      opacity: openIndex === index ? 1 : 0,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <p className="text-muted mb-0 small">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
