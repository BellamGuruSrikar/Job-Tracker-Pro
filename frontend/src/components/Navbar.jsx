import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { FaUser } from "react-icons/fa";
import { useState, useEffect, useRef  } from "react";
import {
    FaHome,
    FaBriefcase,
    FaPlusCircle,
    FaSignOutAlt,
    FaSignInAlt,
    FaUserPlus,
    FaBars, 
    FaTimes,
} from "react-icons/fa";

function Navbar() {
  const token = localStorage.getItem("access_token");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Do you really want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
  };

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (
              navRef.current &&
              !navRef.current.contains(event.target)
          ) {
              setMenuOpen(false);
          }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, []);

  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth > 768) {
              setMenuOpen(false);
          }
      };
      window.addEventListener("resize", handleResize);
      return () => {
          window.removeEventListener("resize", handleResize);
      };
  }, []);

  return (
    <nav className="navbar"
        ref={navRef}>
      <div className="logo">
        <Link to="/"
              onClick={() => setMenuOpen(false)}>JobTracker</Link>
      </div>
      <button className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
      >
          {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        
        {token ? (
            <>
                <Link to="/"
                      onClick={() => setMenuOpen(false)}><FaHome /> Dashboard</Link>
                <Link to="/jobs"
                      onClick={() => setMenuOpen(false)}><FaBriefcase /> Jobs</Link>
                <Link to="/add-job"
                      onClick={() => setMenuOpen(false)}><FaPlusCircle /> Add Job</Link>
                <Link to="/profile"
                      onClick={() => setMenuOpen(false)}><FaUser /> Profile</Link>
                <button className="logout-btn"
                        onClick={()=>{ setMenuOpen(false);
                        handleLogout(); }}><FaSignOutAlt /> Logout
                </button>
            </>
        ) : (
            <>
                <Link to="/login">
                    <FaSignInAlt /> Login
                </Link>

                <Link to="/register">
                    <FaUserPlus /> Register
                </Link>
            </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;