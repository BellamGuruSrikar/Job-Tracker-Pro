import { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/profile.css";

function Profile() {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        document.title = "Profile | Job Tracker";
    }, []);

    useEffect(() => {
        api.get("jobs/")
            .then((response) => {
                setJobs(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    const interviews = jobs.filter(j => j.status === "Interview").length;
    const offers = jobs.filter(j => j.status === "Offer").length;
    const rejected = jobs.filter(j => j.status === "Rejected").length;

    return (
        <div className="profile-page">

            <div className="profile-card">

                <h1>👤 My Profile</h1>

                <h3>Total Applications</h3>
                <p>{jobs.length}</p>

                <h3>Interviews</h3>
                <p>{interviews}</p>

                <h3>Offers</h3>
                <p>{offers}</p>

                <h3>Rejected</h3>
                <p>{rejected}</p>

            </div>

        </div>
    );
}

export default Profile;