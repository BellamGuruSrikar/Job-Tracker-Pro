import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios
        .get("http://127.0.0.1:8000/api/jobs/")
        .then((response) => {
            setJobs(response.data);
        })
        .catch((error) => console.log(error));
    }, []);

    const totalJobs = jobs.length;

    const interviews = jobs.filter(
        (job) => job.status === "Interview"
    ).length;

    const rejected = jobs.filter(
        (job) => job.status === "Rejected"
    ).length;

    const offers = jobs.filter(
        (job) => job.status === "Offer"
    ).length;

    return (
        <div>
            <h1>Dashboard</h1>

            <h2>Total Applications: {totalJobs}</h2>
            <h2>Interviews: {interviews}</h2>
            <h2>Rejected: {rejected}</h2>
            <h2>Offers: {offers}</h2>
        </div>
    );
}

export default Dashboard;