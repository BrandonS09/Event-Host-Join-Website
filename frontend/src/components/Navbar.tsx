import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; // Ensure this path is correct

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      <Navbar.Brand as={Link} to="/" className="ml-3">
        Eventify
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            as={Link}
            to="/login"
            className={location.pathname === "/login" ? "active" : ""}
          >
            Login
          </Nav.Link>
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
