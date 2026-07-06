import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/addjob.css";
import { toast } from "react-toastify";

function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pageLoading, setPageLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        company_name: "",
        job_title: "",
        location: "",
        job_url: "",
        date_applied: "",
        status: "",
        notes: "",
        resume_version: "",
        interview_date: "",
        interview_notes: "",
    });

    useEffect(() => {
        api
            .get(`jobs/${id}/`)
            .then((response) => {

                const job = response.data;

                setFormData({
                    company_name: job.company_name,
                    job_title: job.job_title,
                    location: job.location,
                    job_url: job.job_url || "",
                    date_applied: job.date_applied,
                    status: job.status,
                    notes: job.notes || "",
                    resume_version: job.resume_version || "",
                    interview_date: job.interview_date || "",
                    interview_notes: job.interview_notes || "",
                });
                setPageLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setPageLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name === "status") {
            setFormData((prev) => ({
                ...prev,
                status: value,

                notes: "",
                interview_date: "",
                interview_notes: "",
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form Validation
        const validationErrors = {};
        const missingFields = [];

        // Company Name
        if (!formData.company_name.trim()) {
            validationErrors.company_name = "Company name is required.";
            missingFields.push("Company Name");
        }

        // Job Title
        if (!formData.job_title.trim()) {
            validationErrors.job_title = "Job title is required.";
            missingFields.push("Job Title");
        }

        // Location
        if (!formData.location.trim()) {
            validationErrors.location = "Location is required.";
            missingFields.push("Location");
        }

        // Date Applied
        if (!formData.date_applied) {
            validationErrors.date_applied = "Please select the application date.";
            missingFields.push("Date Applied");
        }

        // Status
        if (!formData.status) {
            validationErrors.status = "Please select a status.";
            missingFields.push("Status");
        }

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            if (missingFields.length === 5) {
                toast.warning("Please enter all the required fields.");
            } else {
                toast.warning(
                    `Please enter: ${missingFields.join(", ")}`
                );
            }

            return;
        }

        setErrors({});
        
        setLoading(true);

        const data = new FormData();

        data.append("company_name", formData.company_name);
        data.append("job_title", formData.job_title);
        data.append("location", formData.location);
        data.append("date_applied", formData.date_applied);
        data.append("job_url", formData.job_url);
        data.append("status", formData.status);
        data.append("notes", formData.notes);
        data.append("resume_version", formData.resume_version);
        data.append("interview_date", formData.interview_date || "");
        data.append("interview_notes", formData.interview_notes);

        // Only send a new file if the user selected one
        if (resumeFile) {
            data.append("resume_file", resumeFile);
        }

        try {
            await api.patch(`jobs/${id}/`, data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })

            toast.success("Job Updated Successfully");

            navigate("/jobs");

        } catch (error) {
            console.log(error.response?.data);
            toast.error("Failed to update job.");
        }

        setLoading(false);
    };
    if (pageLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="add-job-page">
            <div className="job-form">
                <h1>Edit Job</h1>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Company Name <span className="required">*</span></label>
                        <input
                            className={errors.company_name ? "error-input" : ""}
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                        />

                        {errors.company_name && (
                            <small className="error-text">
                                {errors.company_name}
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Job Title <span className="required">*</span></label>
                        <input
                            className={errors.job_title ? "error-input" : ""}
                            type="text"
                            name="job_title"
                            value={formData.job_title}
                            onChange={handleChange}
                        />

                        {errors.job_title && (
                            <small className="error-text">
                                {errors.job_title}
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Location <span className="required">*</span></label>
                        <input
                            className={errors.location ? "error-input" : ""}
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />

                        {errors.location && (
                            <small className="error-text">
                                {errors.location}
                            </small>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>Date Applied <span className="required">*</span></label>
                        <input
                            className={errors.date_applied ? "error-input" : ""}
                            type="data"
                            name="date_applied"
                            value={formData.date_applied}
                            onChange={handleChange}
                        />

                        {errors.date_applied && (
                            <small className="error-text">
                                {errors.date_applied}
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Job URL</label>

                        <input
                            type="url"
                            name="job_url"
                            value={formData.job_url}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Status <span className="required">*</span></label>
                        <select
                            className={errors.status ? "error-input" : ""}
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="">-- Select Status --</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Offer">Offer</option>
                        </select>

                        {errors.status && (
                            <small className="error-text">
                                {errors.status}
                            </small>
                        )}

                    </div>

                    <div className="form-group">
                        <label>Resume Version</label>

                        <input
                            type="text"
                            name="resume_version"
                            value={formData.resume_version}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Replace Resume (Optional)</label>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setResumeFile(e.target.files[0])}
                        />
                    </div>

                    {/* Applied */}
                    {formData.status === "Applied" && (
                        <div className="form-group">
                            <label>Application Notes</label>
                            <textarea
                                name="notes"
                                placeholder="Application Notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {/* Interview */}
                    {formData.status === "Interview" && (
                        <>
                            <div className="form-group">
                                <label>Interview Date</label>
                                <input
                                    type="date"
                                    name="interview_date"
                                    value={formData.interview_date || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Interview Notes</label>
                                <textarea
                                    name="interview_notes"
                                    placeholder="Interview Notes"
                                    value={formData.interview_notes || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    {/* Offer */}
                    {formData.status === "Offer" && (
                        <div className="form-group">
                            <label>Offer Notes</label>
                            <textarea
                                name="notes"
                                placeholder="Offer Notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {/* Rejected */}
                    {formData.status === "Rejected" && (
                        <div className="form-group">
                            <label>Rejection Notes</label>
                            <textarea
                                name="notes"
                                placeholder="Reason / Notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="save-btn"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Job"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default EditJob;