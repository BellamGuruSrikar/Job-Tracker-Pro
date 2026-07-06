import { useEffect, useState } from "react";
import {useSearchParams,
        useNavigate,
        useLocation,
        Link, } from "react-router-dom";
import { CSVLink } from "react-csv"; 
import api from "../services/api";
import "../styles/jobs.css";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import {
    FaEdit,
    FaTrash,
    FaFileDownload,
} from "react-icons/fa";

function Jobs(){
   
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm]= useState("");
    const [searchParams] = useSearchParams();
    const statusFromUrl = searchParams.get("status");
    const filterFromUrl = searchParams.get("filter");
    const [statusFilter, setSearchFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        api.get("jobs/")
        .then((response) => {
            setJobs(response.data);
            setLoading(false);
        })
        .catch((error) => {
            if(error.response?.status===401){

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                window.location.href="/login";
            }

            console.log(error);

            setLoading(false);
            });
    }, []);
    useEffect(() => {
        if (statusFromUrl) {
            setSearchFilter(statusFromUrl);
        } else {
            setSearchFilter("All");
        }
    }, [statusFromUrl]);

    const deleteJob = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if(!confirmDelete){
            return;
        }
        try {
            await api.delete(`jobs/${id}/`)
            setJobs((prevJobs) =>
                prevJobs.filter((job) => job.id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const today = new Date().toISOString().split("T")[0];
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.company_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        let matchesStatus = true;
        if (filterFromUrl === "upcoming") {
            matchesStatus =
                job.status === "Interview" &&
                job.interview_date &&
                job.interview_date >= today;
        } else {
            matchesStatus =
                statusFilter === "All" ||
                job.status === statusFilter;
        }
        return matchesSearch && matchesStatus;
    });

    const csvData = filteredJobs.map((job) => ({
        Company: job.company_name,
        JobTitle: job.job_title,
        Status: job.status,
        Location: job.location,
        ResumeVersion: job.resume_version,
        InterviewDate: job.interview_date,
    }));
    if (loading) {
        return <LoadingSpinner />;
    }

    const totalFilteredJobs = filteredJobs.length;
    let pageTitle = `All Applications (${totalFilteredJobs})`;
    if (filterFromUrl === "upcoming") {
        pageTitle = `Upcoming Interviews (${totalFilteredJobs})`;
    }
    else if (statusFilter !== "All") {
        pageTitle = `${statusFilter} Applications (${totalFilteredJobs})`;
    }

    return (
        <div className="jobs-page">
            <Link to="/">
                <button className="back-btn">
                    ← Back to Dashboard
                </button>
            </Link>
            <div className="jobs-header">
                <h1>{pageTitle}</h1>

                <CSVLink
                    data={csvData}
                    filename={"job_applications.csv"}
                >
                    <button className="export-btn">
                        <FaFileDownload/> Export CSV
                    </button>
                </CSVLink>
            </div>

            <div className="top-controls">

                <input
                    type="text"
                    placeholder="Search Company..."
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />

                <select
                    value={statusFilter}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearchFilter(value);
                        if (location.search.includes("filter=upcoming")) {
                            navigate(
                                value === "All"
                                    ? "/jobs"
                                    : `/jobs?status=${value}`,
                                { replace: true }
                            );
                        }
                    }}
                >
                    <option value="All">All</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                </select>

            </div>
            <div className="table-wrapper">
                <table className="jobs-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Location</th>
                            <th>Resume</th>
                            <th>Interview Date</th>
                            <th>Status</th>
                            <th>Resume File</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredJobs.length === 0 ? (
                            <tr>
                                <td colSpan="8">
                                     <EmptyState />
                                </td>
                            </tr>
                        ) : (filteredJobs.map((job) => (
                                <tr key={job.id}>
                                    <td>{job.company_name}</td>
                                    <td>{job.job_title}</td>
                                    <td>{job.location}</td>
                                    <td>{job.resume_version}</td>
                                    <td>{job.interview_date}</td>
                                    <td>
                                        <span
                                            className={`status-badge status-${job.status.toLowerCase()}`}
                                        >
                                            {job.status}
                                        </span>
                                    </td>
                                    
                                    <td>
                                        {job.resume_file ? (
                                            <a className="resume-link"
                                            href={`http://127.0.0.1:8000${job.resume_file}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            >
                                            View Resume
                                            </a>
                                        ) : (
                                            "No File"
                                        )}
                                    </td>
                                    <td className="action-buttons">
                                        <button className="edit-btn" 
                                                onClick={() => navigate(`/edit-job/${job.id}`)}>
                                            <FaEdit /> Edit
                                        </button>

                                        <button className="delete-btn"
                                            onClick={() => deleteJob(job.id)}>
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>
           
        </div>
    );
}
 
export default Jobs