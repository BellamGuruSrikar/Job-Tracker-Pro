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
import DeleteModal from "../components/DeleteModal";
import {
    FaEdit,
    FaTrash,
    FaFileDownload,
    FaUndoAlt,
} from "react-icons/fa";

function Jobs(){
   
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm]= useState("");
    const [statusFilter, setSearchFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchParams] = useSearchParams();
    const highlightId = searchParams.get("highlight");
    const statusFromUrl = searchParams.get("status");
    const filterFromUrl = searchParams.get("filter");
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
    useEffect(() => {
        if (!highlightId) return;
        const row = document.getElementById(`job-${highlightId}`);
        if (row) {
            row.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [jobs, highlightId]);

    const openDeleteModal = (job) => {
        setSelectedJob(job);
        setShowDeleteModal(true);
    };

    const deleteJob = async () => {
        try {
            await api.delete(`jobs/${selectedJob.id}/`);
            setJobs((prev) =>
                prev.filter((job) => job.id !== selectedJob.id)
            );
            setShowDeleteModal(false);
            setSelectedJob(null);
        } catch (error) {
            console.log(error);
        }
    };

    const today = new Date().toISOString().split("T")[0];
    const filteredJobs = jobs.filter((job) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
            job.company_name.toLowerCase().includes(search) ||
            job.job_title.toLowerCase().includes(search) ||
            job.location.toLowerCase().includes(search) ||
            (job.resume_version || "")
                .toLowerCase()
                .includes(search) ||
            job.status.toLowerCase().includes(search);

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

    const sortedJobs = [...filteredJobs];
    switch (sortBy) {
        case "Newest":
            sortedJobs.sort(
                (a, b) =>
                    new Date(b.date_applied) -
                    new Date(a.date_applied)
            );
            break;

        case "Oldest":
            sortedJobs.sort(
                (a, b) =>
                    new Date(a.date_applied) -
                    new Date(b.date_applied)
            );
            break;

        case "CompanyAZ":
            sortedJobs.sort((a, b) =>
                a.company_name.localeCompare(b.company_name)
            );
            break;

        case "CompanyZA":
            sortedJobs.sort((a, b) =>
                b.company_name.localeCompare(a.company_name)
            );
            break;

        case "Status":
            sortedJobs.sort((a, b) =>
                a.status.localeCompare(b.status)
            );
            break;

        default:
            break;
    }

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

                {filteredJobs.length > 0 ? (
                    <CSVLink data={csvData}
                        filename={"job_applications.csv"}
                    >
                        <button className="export-btn">
                            <FaFileDownload /> Export CSV
                        </button>
                    </CSVLink>
                ) : (
                    <button className="export-btn disabled-btn"
                        disabled
                    >
                        <FaFileDownload /> Export CSV
                    </button>
                )}

            </div>

            <div className="top-controls">

                <input
                    type="text"
                    placeholder="Search company, role, location..."
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

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="Newest">Newest First</option>
                    <option value="Oldest">Oldest First</option>
                    <option value="CompanyAZ">Company A-Z</option>
                    <option value="CompanyZA">Company Z-A</option>
                    <option value="Status">Status</option>
                </select>

                <button
                    className="reset-btn"
                    onClick={() => { setSearchTerm("");
                        setSearchFilter("All");
                        setSortBy("Newest");
                    }}
                >
                    <FaUndoAlt style={{ marginRight: "8px" }} />
                    Reset
                </button>

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
                        ) : (sortedJobs.map((job) => (
                                <tr id={`job-${job.id}`}
                                    key={job.id}
                                    className={`clickable-row ${
                                        Number(highlightId) === job.id ? "highlight-row" : ""
                                    }`}
                                    onClick={() => navigate(`/jobs/${job.id}`, {
                                            state: {
                                                from: location.pathname + location.search,
                                            },
                                        })
                                    }
                                >
                                    <td>{job.company_name}</td>
                                    <td>{job.job_title}</td>
                                    <td>{job.location}</td>
                                    <td>{job.resume_version || "Not Available"}</td>
                                    <td>{job.interview_date || "Not Scheduled"}</td>
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
                                                href={job.resume_file}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                View Resume
                                            </a>
                                        ) : (
                                            "No File"
                                        )}
                                    </td>
                                    <td className="action-buttons">
                                        <button className="edit-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/edit-job/${job.id}`);
                                            }}
                                        >
                                            <FaEdit /> Edit
                                        </button>

                                        <button className="delete-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openDeleteModal(job);
                                            }}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                company={selectedJob?.company_name}
                role={selectedJob?.job_title}
                onClose={() => setShowDeleteModal(false)}
                onDelete={deleteJob}
            />
        </div>

    );
}
 
export default Jobs