import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import "../styles/notfound.css";

function NotFound() {
    return (
        <div className="notfound-page">

            <FaExclamationTriangle className="notfound-icon" />

            <h1>404</h1>

            <h2>Page Not Found</h2>

            <p>
                The page you are looking for doesn't exist.
            </p>

            <Link to="/">
                <button className="home-btn">
                    Back to Dashboard
                </button>
            </Link>

        </div>
    );
}

export default NotFound;