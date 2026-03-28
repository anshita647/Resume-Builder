import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";   // ✅ missing import
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../configs/api";
import { login } from "../app/features/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
   const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = useState(urlState || "login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
toast.success(data.message);
    navigate("/app"); // ✅ go to dashboard
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };   // ✅ fixed bracket

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="border rounded-4 shadow p-5 bg-white"
        style={{ width: "480px", height: "550px" }}
      >
        <div className="text-center mb-3">
          <i className="bi bi-person-circle text-success fs-1"></i>
        </div>

        <h1 className="text-center mb-2 fw-bold">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>

        <p className="text-center text-muted mb-4">
          Please {state === "login" ? "sign in" : "register"} to continue
        </p>

        {state !== "login" && (
          <div className="mb-3 input-group shadow-sm rounded-pill overflow-hidden">
            <span className="input-group-text bg-white border-0">
              <i className="bi bi-person-fill text-secondary fs-5"></i>
            </span>
            <input
              type="text"
              name="name"
              className="form-control border-0"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-3 input-group shadow-sm rounded-pill overflow-hidden">
          <span className="input-group-text bg-white border-0">
            <i className="bi bi-envelope-fill text-secondary fs-5"></i>
          </span>
          <input
            type="email"
            name="email"
            className="form-control border-0"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 input-group shadow-sm rounded-pill overflow-hidden">
          <span className="input-group-text bg-white border-0">
            <i className="bi bi-lock-fill text-secondary fs-5"></i>
          </span>
          <input
            type="password"
            name="password"
            className="form-control border-0"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {state === "login" && (
          <div className="mb-3 text-end">
            <button
              type="reset"
              className="btn btn-link p-0 text-decoration-none text-success fw-semibold"
            >
              Forgot password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-success w-100 mb-3 rounded-pill shadow-sm"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-muted mb-0">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a
            href="#"
            className="text-success fw-semibold"
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
          >
            Click here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;