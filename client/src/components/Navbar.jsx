import React from "react";
import { Navbar as BSNavbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  const isDashboardPage = location.pathname === "/app";

  return (
    <BSNavbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>

        <BSNavbar.Brand as={Link} to="/" className="fw-bold">
          SmartResume
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="main-navbar" />

        <BSNavbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="align-items-center gap-3">

            {/* NOT LOGGED IN */}
            {!user && (
              <>
                <Button
                  variant="success"
                  onClick={() => navigate("/app?state=register")}
                >
                  Get Started
                </Button>

                <Button
                  variant="outline-success"
                  onClick={() => navigate("/app?state=login")}
                >
                  Login
                </Button>
              </>
            )}

            {/* LOGGED IN */}
            {user && (
              <>
                {/* Greeting */}
                <span className="text-muted d-none d-md-inline">
                  Hi, {user?.name}
                </span>

                {/* Hide Dashboard button IF already on /app */}
                {!isDashboardPage && (
                  <Button
                    variant="success"
                    onClick={() => navigate("/app")}
                  >
                    Dashboard
                  </Button>
                )}

                <Button
                  variant="outline-danger"
                  onClick={logoutUser}
                >
                  Logout
                </Button>
              </>
            )}

          </Nav>
        </BSNavbar.Collapse>

      </Container>
    </BSNavbar>
  );
};

export default Navbar;