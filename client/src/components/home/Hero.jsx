import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const {user}=useSelector(state=>state.auth)
  const logos = [
    { url: "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg" },
    { url: "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg" },
    { url: "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg" },
    { url: "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg" },
    { url: "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg" },
  ];

  const users = [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    "https://randomuser.me/api/portraits/men/75.jpg",
  ];

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav className="navbar navbar-expand-md navbar-light bg-light py-3 px-4 position-relative">
        <a className="navbar-brand" href="/">
                            <img src="ss.png" alt="Logo" className="img-fluid" style={{ height: "50px" }} />
                    <img src="\logo.svg" alt="Logo" className="img-fluid" style={{ height: "40px" }} />
      </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop Menu */}
        <div className="collapse navbar-collapse d-none d-md-flex justify-content-between">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0">
            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
            <li className="nav-item"><a className="nav-link" href="#testimonials">Testimonials</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
          <div className="d-flex gap-2">
            <Link to='/app?state=register' className="btn btn-success rounded-pill px-4" hidden={user} >Get started</Link>
            <Link to='/app?state=login' className="btn btn-outline-secondary rounded-pill px-4"hidden={user}>Login</Link>
        <Link
  to="/app"
  className="btn btn-success px-4 rounded-pill"
  hidden={!user}
>
  Dashboard
</Link>
          </div>
        </div>

        {/* Mobile Overlay Menu */}
        {menuOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-success bg-opacity-95 d-flex flex-column justify-content-center align-items-center text-white"
            style={{ zIndex: 1050 }}
          >
            <button
              className="btn-close btn-close-white position-absolute top-3 end-3"
              onClick={() => setMenuOpen(false)}
            ></button>
            <ul className="list-unstyled text-center">
              <li className="my-3"><a href="#" className="text-white fs-4 text-decoration-none">Home</a></li>
              <li className="my-3"><a href="#features" className="text-white fs-4 text-decoration-none">Features</a></li>
              <li className="my-3"><a href="#testimonials" className="text-white fs-4 text-decoration-none">Testimonials</a></li>
              <li className="my-3"><a href="#contact" className="text-white fs-4 text-decoration-none">Contact</a></li>
            </ul>
            <div className="mt-4 d-flex gap-3">
              <Link to='/app?state=register' className="btn btn-light text-success rounded-pill px-4">Get started</Link>
              <Link to='/app?state=login' className="btn btn-outline-light rounded-pill px-4">Login</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="text-center py-5  ">
        {/* Users + Rating */}
        <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
          <div className="d-flex">
            {users.map((user, i) => (
              <img
                key={i}
                src={user}
                alt={`user${i + 1}`}
                className="rounded-circle border border-white"
                style={{ width: 40, height: 40, marginLeft: i === 0 ? 0 : -10, zIndex: users.length - i }}
              />
            ))}
          </div>
          <div className="ms-3">
            <span>⭐⭐⭐⭐⭐</span>
            <p className="small text-muted mb-0">Used by 10,000+ users</p>
          </div>
        </div>

        {/* Heading */}
        <h1 className="display-5 fw-semibold">
          Land your dream job with{" "}
          <span className="text-success">AI-powered </span> resumes.
        </h1>
        <p className="lead mt-3 mx-auto" style={{ maxWidth: 600 }}>
         Build a resume that gets noticed. Our AI-driven platform analyzes your experience 
         and generates a polished, optimized, and professional resume ready for any opportunity.
        </p>

        {/* CTA Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link  to='/app'className="btn btn-success btn-lg rounded-pill px-5">
            Get started →
          </Link>
          <button className="btn btn-outline-secondary btn-lg rounded-pill px-5">
            Try demo
          </button>
        </div>

        {/* Logos */}
        <p className="text-muted mt-5">Trusted by leading brands</p>
        <div className="row justify-content-center align-items-center g-4 mt-2">
          {logos.map((item, i) => (
            <div key={i} className="col-4 col-md-2 d-flex flex-column align-items-center">
              <img src={item.url} alt={item.name} className="img-fluid mb-1" />
              <span className="small text-muted">{item.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
