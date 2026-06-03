import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav>
            <Link to="/">Dashboard</Link> |{" "}
            <Link to="/jobs">Jobs</Link> |{" "}
            <Link to="/add-job">Add Job</Link>
        </nav>
    );
}

export default Navbar;