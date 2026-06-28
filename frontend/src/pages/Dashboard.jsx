import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import axios from "axios";
import StatusChart from "../components/StatusChart";
import MonthlyChart from "../components/MonthlyChart";

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(
            "http://127.0.0.1:8000/api/jobs/",
        {
            headers :{
                Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                )}`,
            },
        })
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

    const upcomingInterviews = jobs.filter(
        (job) =>
            job.interview_date &&
            new Date(job.interview_date) >= new Date()
    ).length;
    if(loading){
        return <h2>Loading Dashboard...</h2>;
    }
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Applications:</h3>
                    <h2>{totalJobs}</h2>
                </div>

                <div className="stat-card">
                    <h3>Applied:</h3>
                    <h2>{appliedJobs}</h2>
                </div>

                <div className="stat-card">
                    <h3>Interviews:</h3>
                    <h2>{interviews}</h2>
                </div>

                <div className="stat-card">
                    <h3>Upcoming Interviews:</h3>
                    <h2>{upcomingInterviews}</h2>
                </div>
                
                <div className="stat-card">
                    <h3>Rejected:</h3>
                    <h2>{rejected}</h2>
                </div>

                <div className="stat-card">
                    <h3>Offers:</h3>
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