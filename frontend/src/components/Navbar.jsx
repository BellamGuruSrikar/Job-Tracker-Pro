import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { FaUser } from "react-icons/fa";
import {
    FaHome,
    FaBriefcase,
    FaPlusCircle,
    FaSignOutAlt,
    FaSignInAlt,
    FaUserPlus,
} from "react-icons/fa";

function Navbar() {
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Do you really want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">JobTracker</Link>
      </div>

      <div className="nav-links">
        
        {token ? (
            <>
                <Link to="/"><FaHome /> Dashboard</Link>
                <Link to="/jobs"><FaBriefcase /> Jobs</Link>
                <Link to="/add-job"><FaPlusCircle /> Add Job</Link>
                <Link to="/profile"><FaUser /> Profile</Link>
                <button className="logout-btn"
                    onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
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