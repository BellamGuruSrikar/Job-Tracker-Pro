import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import api from "../services/api";
import StatusChart from "../components/StatusChart";
import MonthlyChart from "../components/MonthlyChart";
import LoadingSpinner from "../components/LoadingSpinner";
import {
    FaBriefcase,
    FaCheckCircle,
    FaUserClock,
    FaTimesCircle,
    FaCalendarCheck,
    FaTrophy,
    FaArrowRight,
} from "react-icons/fa";

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("jobs/")
        .then((response) => {
            setJobs(response.data);
            setLoading(false);
        })
        .catch((error) =>{ console.log(error);
                setLoading(false);
            });
    }, []);

    const totalJobs = jobs.length;

    const appliedJobs = jobs.filter(
        (job) => job.status === "Applied"
    ).length;

    const interviews = jobs.filter(
        (job) => job.status === "Interview"
    ).length;

    const rejected = jobs.filter(
        (job) => job.status === "Rejected"
    ).length;

    const offers = jobs.filter(
        (job) => job.status === "Offer"
    ).length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingInterviews = jobs.filter(
        (job) =>
            job.status === "Interview" &&
            job.interview_date &&
            new Date(job.interview_date) >= today
    ).length;
    if (loading) {
        return <LoadingSpinner />;
    }
    const goToJobs = (status) => {
        if (status === "Upcoming") {
            navigate("/jobs?filter=upcoming");
        } else {
            navigate(`/jobs?status=${status}`);
        }
    };
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>

            <div className="stats-grid">
                <div className="stat-card clickable-card"
                    onClick={() => goToJobs("All")}>
                    <h3><span>
                            <FaBriefcase/> Total Applications:
                        </span>
                        <FaArrowRight className="card-arrow" />
                        </h3>
                    <h2>{totalJobs}</h2>
                </div>

                <div className="stat-card clickable-card"
                    onClick={() => goToJobs("Applied")}>
                    <h3><span>
                            <FaCheckCircle /> Applied:
                        </span>
                        <FaArrowRight className="card-arrow" />
                    </h3>
                    <h2>{appliedJobs}</h2>
                </div>

                <div className="stat-card clickable-card"
                    onClick={() => goToJobs("Interview")}>
                    <h3><span>
                            <FaUserClock /> Interviews:
                        </span>
                        <FaArrowRight className="card-arrow" />
                    </h3>
                    <h2>{interviews}</h2>
                </div>

                <div className="stat-card clickable-card"
                    onClick={() => goToJobs("Upcoming")}>
                    <h3><span>
                            <FaCalendarCheck /> Upcoming Interviews:
                        </span>
                        <FaArrowRight className="card-arrow" />
                    </h3>
                    <h2>{upcomingInterviews}</h2>
                </div>
                
                <div className="stat-card clickable-card"
                    onClick={() => goToJobs("Rejected")}>
                    <h3><span>
                            <FaTimesCircle /> Rejected:
                        </span>
                        <FaArrowRight className="card-arrow" />
                    </h3>
                    <h2>{rejected}</h2>
                </div>

                <div className="stat-card clickable-card"
                    onClick={() => goToJobs("Offer")}>
                    <h3><span>
                            <FaTrophy /> Offers:
                        </span>
                        <FaArrowRight className="card-arrow" />
                    </h3>
                    <h2>{offers}</h2>
                </div>
            </div>
            <h2 className="section-title">Recent Applications</h2>
            <ul className="recent-list">
                {jobs.slice(0,5).map((job)=>(
                    <li key={job.id}>
                        {job.company_name}-{job.job_title}-{job.status}
                    </li>
                ))}
            </ul>

            <h2 className="section-title">Applications By Status</h2>
            <StatusChart jobs={jobs} />

            <h2 className="section-title">Applications Per Month</h2>
            <MonthlyChart jobs={jobs}/>
        </div>
    );
}

export default Dashboard;