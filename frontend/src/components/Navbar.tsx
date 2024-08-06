import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Ensure this path is correct
import { useAuth } from "./AuthContext";
import { useTheme } from "./ThemeContext"; // Import useTheme

const NavBar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const { theme } = useTheme(); // Get current theme
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      bg={theme === "dark" ? "dark" : "light"}
      variant={theme}
      expand="lg"
      sticky="top"
    >
      <Navbar.Brand as={Link} to="/" className="ml-3">
        Eventify
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!isLoggedIn ? (
            <>
              <Nav.Link
                as={Link}
                to="/login"
                className={location.pathname === "/login" ? "active" : ""}
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className={location.pathname === "/register" ? "active" : ""}
              >
                Register
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              <Nav.Link
                as={Link}
                to="/events"
                className={location.pathname === "/events" ? "active" : ""}
              >
                Events
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/create-event"
                className={
                  location.pathname === "/create-event" ? "active" : ""
                }
              >
                Create Event
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard"
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                Dashboard
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
