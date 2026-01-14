import React, { useState } from "react";
import logo_img from "./images/logo.png";
import { HashLink } from "react-router-hash-link";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-logo">
        <HashLink to="/#home">
          <img src={logo_img} alt="Dr Gautam Dental Clinic" />
          <span>Dr Gautam's Dental Clinic</span>
        </HashLink>
      </div>

      {/* LINKS */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <HashLink to="/#home" onClick={() => setMenuOpen(false)}>
          Home
        </HashLink>
        <HashLink to="/#about-doctors" onClick={() => setMenuOpen(false)}>
          About
        </HashLink>
        <HashLink to="/#our-services" onClick={() => setMenuOpen(false)}>
          Treatments
        </HashLink>
        <HashLink to="/register" className="btn-outline" onClick={() => setMenuOpen(false)}>
          Register
        </HashLink>
        <HashLink to="/login_user" className="btn-light" onClick={() => setMenuOpen(false)}>
          Login
        </HashLink>
        <HashLink to="/login_user" className="btn-primary" onClick={() => setMenuOpen(false)}>
          Appointment
        </HashLink>
      </div>

      {/* MOBILE MENU ICON */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
