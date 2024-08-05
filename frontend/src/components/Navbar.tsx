// NavBar.tsx
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; // Ensure this path is correct
import { useAuth } from "./AuthContext";

const NavBar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
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
            <Nav.Link
              onClick={logout}
              className={location.pathname === "/logout" ? "active" : ""}
            >
              Logout
            </Nav.Link>
          )}
          <Nav.Link
            as={Link}
            to="/events"
            className={location.pathname === "/events" ? "active" : ""}
          >
            Events
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
