import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";
import { toast } from "react-toastify";
import { 
    FaEye,
    FaEyeSlash,
    FaUser,
    FaLock
} from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (localStorage.getItem("access_token")) {
    return <Navigate to="/" />;
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/token/`,
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      toast.success("Login Successful!");

      window.location.href = "/";
    } catch (error) {
      toast.error("Invalid username or password.");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Job Tracker Pro</h1>

        <form className="auth-form" onSubmit={handleLogin}>

          <div className="input-group">

            <FaUser className="input-icon" />

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

          </div>

          <div className="password-field">
            <FaLock className="input-icon" />
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button type="submit"
              disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;