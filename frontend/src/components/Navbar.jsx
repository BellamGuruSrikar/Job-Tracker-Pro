import { Link } from "react-router-dom";

function Navbar(){
    const token = localStorage.getItem("access_token");

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        window.location.href = "/login";
    };
    return(
        <nav>
            {/* <Link to="/">Dashboard</Link> |{" "}
            <Link to="/jobs">Jobs</Link> |{" "}
            <Link to="/add-job">Add Job</Link> |{" "} */}
            {token ? (
                <>
                <Link to="/">Dashboard</Link>   |{" "}
                <Link to="/jobs">Jobs</Link>    |{" "}
                <Link to="/add-job">Add Job</Link>  |{" "}

                <button onClick={handleLogout}>
                    Logout
                </button>
                </>
            ) : (
                <>
                <Link to="/login">Login</Link>  |{" "}
                <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;