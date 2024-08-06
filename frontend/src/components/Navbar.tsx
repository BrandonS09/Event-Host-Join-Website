import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useTheme } from "./ThemeContext"; // Import useTheme
import "./Navbar.css"; // Ensure this path is correct

const NavBar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get the current theme from context

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      bg={theme === "light" ? "light" : "dark"} // Set bg color based on theme
      variant={theme === "light" ? "light" : "dark"} // Set variant based on theme
      expand="lg"
      sticky="top"
      className={theme === "light" ? "navbar-light" : "navbar-dark"} // Apply custom class based on theme
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
                className={location.pathname === "/create-event" ? "active" : ""}
              >
                Create Event
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
