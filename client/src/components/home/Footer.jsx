import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      {/* Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <footer className="bg-light text-secondary py-5 mt-5">
        <div className="container">
          <div className="row gy-5 justify-content-between">

            {/* Left Section */}
            <div className="col-lg-7">
              <div className="row gy-4">

                {/* Logo */}
                <div className="col-12 col-md-3">
                  <a href="https://prebuiltui.com">
                    <img src="ss.png" alt="Logo" className="img-fluid" style={{ height: "110px" }} />
                  </a>
                </div>

                {/* Product */}
                <div className="col-6 col-md-3">
                  <p className="fw-semibold text-dark">Product</p>
                  <ul className="list-unstyled small">
                    <li><a href="/" className="text-secondary text-decoration-none hover-green">Home</a></li>
                    <li><a href="/" className="text-secondary text-decoration-none hover-green">Support</a></li>
                    <li><a href="/" className="text-secondary text-decoration-none hover-green">Pricing</a></li>
                    <li><a href="/" className="text-secondary text-decoration-none hover-green">Affiliate</a></li>
                  </ul>
                </div>

                {/* Resources */}
                <div className="col-6 col-md-3">
                  <p className="fw-semibold text-dark">Resources</p>
                  <ul className="list-unstyled small">
                    <li><a href="/" className="text-secondary text-decoration-none hover-green">Company</a></li>
                    <li><a href="/" className="text-secondary text-decoration-none hover-green">Blogs</a></li>
                    <li><a href="/" className="text-secondary text-decoration-none hover-green">Community</a></li>
                    <li>
                      <a href="/" className="text-secondary text-decoration-none hover-green">
                        Careers
                        <span className="badge bg-success ms-2">We’re hiring!</span>
                      </a>
                    </li>
                    <li><a href="/" className="text-secondary text-decoration-none hover-green">About</a></li>
                  </ul>
                </div>

                {/* Legal */}
                <div className="col-6 col-md-3">
                  <p className="fw-semibold text-dark">Legal</p>
                  <ul className="list-unstyled small">
                    <li><a href="/" className="text-secondary text-decoration-none hover-green">Privacy</a></li>
                    <li><a href="/" className="text-secondary text-decoration-none hover-green">Terms</a></li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Right Section */}
            <div className="col-lg-4 text-center text-lg-end">
              <p className="small mx-lg-auto" style={{ maxWidth: "240px" }}>
                Making every customer feel valued—no matter the size of your audience.
              </p>

              {/* Social Icons */}
              <div className="d-flex justify-content-center justify-content-lg-end gap-3 mt-3 text-success">
                {/* Dribbble */}
                <a href="https://dribbble.com/prebuiltui" target="_blank" rel="noreferrer" className="text-success">
                  <i className="bi bi-dribbble fs-5"></i>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/prebuiltui" target="_blank" rel="noreferrer" className="text-success">
                  <i className="bi bi-linkedin fs-5"></i>
                </a>

                {/* Twitter/X */}
                <a href="https://x.com/prebuiltui" target="_blank" rel="noreferrer" className="text-success">
                  <i className="bi bi-twitter fs-5"></i>
                </a>

                {/* YouTube */}
                <a href="https://www.youtube.com/@prebuiltui" target="_blank" rel="noreferrer" className="text-success">
                  <i className="bi bi-youtube fs-5"></i>
                </a>
              </div>

              <p className="small mt-3">
                © 2026 Resume Builder · 
              </p>
            </div>

          </div>
        </div>
      </footer>

      {/* Hover helper */}
      <style>{`
        .hover-green:hover { color: #198754 !important; }
      `}</style>
    </>
  );
};

export default Footer;
