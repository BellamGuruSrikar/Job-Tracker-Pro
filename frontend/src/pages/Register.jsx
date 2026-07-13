import { useState, useEffect } from "react";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      document.title = "Register | Job Tracker";
  }, []);

  const navigate = useNavigate();

  if (localStorage.getItem("access_token")) {
    return <Navigate to="/" />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/register/`,
        {
          username,
          email,
          password,
        }
      );

      toast.success("Registration Successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      toast.error("Registration Failed");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Create Account</h1>

        <form className="auth-form" onSubmit={handleRegister}>

          <div className="input-group">
            <FaUser className="input-icon" />

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;  