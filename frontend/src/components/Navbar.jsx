import { Link } from "react-router-dom";
import "../styles/navbar.css";

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
            <Link to="/">Dashboard</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/add-job">Add Job</Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;