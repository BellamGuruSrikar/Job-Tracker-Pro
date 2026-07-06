import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/jobdetails.css";
import {
    FaArrowLeft,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaBriefcase,
    FaLink,
    FaFilePdf,
    FaStickyNote,
    FaUserTie,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

function JobDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        api.get(`jobs/${id}/`)
            .then((response) => {
                setJob(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!job) {
        return <h2>Job not found.</h2>;
    }

    return (
        <div className="job-details-page">
            {/* Back Button */}
            <button className="back-btn"
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft /> Back
            </button>
            {/* Header */}
            <div className="details-card hero-card">
                <h1>{job.company_name}</h1>
                <h3>{job.job_title}</h3>
                <span
                    className={`status-badge status-${job.status.toLowerCase()}`}
                >
                    {job.status}
                </span>
            </div>

            {/* Application Information */}
            <div className="details-card">
                <h2>
                    <FaBriefcase /> Application Information
                </h2>
                <div className="details-grid">
                    <div>
                        <strong>Company</strong>
                        <p>{job.company_name}</p>
                    </div>
                    <div>
                        <strong>Job Title</strong>
                        <p>{job.job_title}</p>
                    </div>
                    <div>
                        <strong>
                            <FaMapMarkerAlt /> Location
                        </strong>
                        <p>{job.location || "Not Provided"}</p>
                    </div>
                    <div>
                        <strong>
                            <FaCalendarAlt /> Date Applied
                        </strong>
                        <p>{job.date_applied}</p>
                    </div>
                    <div>
                        <strong>Status</strong>
                        <p>{job.status}</p>
                    </div>
                </div>
            </div>

            {/* Resume */}
            <div className="details-card">
                <h2>
                    <FaFilePdf /> Resume
                </h2>
                <div className="details-grid">
                    <div>
                        <strong>Resume Version</strong>
                        <p>{job.resume_version || "Not Provided"}</p>
                    </div>
                    <div>
                        <strong>Resume File</strong>
                        {job.resume_file ? (
                            <a href={job.resume_file}
                                target="_blank"
                                rel="noreferrer"
                                className="details-link"
                            >
                                <>
                                    <FaFilePdf
                                        style={{
                                            color: "#dc2626",
                                            marginRight: "6px",
                                        }}
                                    />
                                    View Resume
                                </>
                            </a>
                        ) : (
                            <p>No Resume Uploaded</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Job URL */}
            {job.job_url && (
                <div className="details-card">
                    <h2>
                        <FaLink /> Job Posting
                    </h2>
                    <a href={job.job_url}
                        target="_blank"
                        rel="noreferrer"
                        className="details-link"
                    >
                        <>
                            <FaLink
                                style={{
                                    marginRight: "6px",
                                }}
                            />
                            Visit Job Posting
                        </>
                    </a>
                </div>
            )}

            {/* Interview */}
            {job.status === "Interview" && (
                <div className="details-card">
                    <h2>
                        <FaUserTie /> Interview Details
                    </h2>
                    <div className="details-grid">
                        <div>
                            <strong>Interview Date</strong>
                            <p>
                                {job.interview_date || "Not Scheduled"}
                            </p>
                        </div>
                        <div>
                            <strong>Interview Notes</strong>
                            <p>
                                {job.interview_notes ||
                                    "No Interview Notes"}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Notes */}
            <div className="details-card">
                <h2>
                    <FaStickyNote /> Notes
                </h2>
                <p>
                    {job.notes || "No Notes Available"}
                </p>
            </div>

            {/* Bottom Buttons */}
            <div className="details-actions">
                <button className="edit-btn"
                    onClick={() =>
                        navigate(`/edit-job/${job.id}`)
                    }
                >
                    <FaEdit /> Edit Job
                </button>

                <button className="delete-btn"
                >
                    <FaTrash /> Delete Job
                </button>
            </div>
        </div>
    );

}

export default JobDetails;