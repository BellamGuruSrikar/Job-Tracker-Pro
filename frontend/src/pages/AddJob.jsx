import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import "../styles/addjob.css";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";


function AddJob() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        document.title = "Add Job | Job Tracker";
    }, []);
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
        interview_notes: ""
    });

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
            validationErrors.status = "Please select the application status.";
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

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        if (resumeFile) {
            data.append("upload_resume", resumeFile);
        }

        try {
        await api.post("jobs/", data, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });

        toast.success("Job Added Successfully");
        setLoading(false);

        setFormData({
            company_name: "",
            job_title: "",
            location: "",
            job_url: "",
            date_applied: "",
            status: "",
            notes: "",
            resume_version: "",
            interview_date: "",
            interview_notes: ""
        });
            setResumeFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {
            console.log(error.response);
            console.log(error.response?.data);
            setLoading(false);
            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.");
            }
            else if (error.response?.status === 400) {
                toast.error(JSON.stringify(error.response?.data));
            }
            else {
                toast.error("Something went wrong.");
            }
        }
    };
    const [resumeFile, setResumeFile] = useState(null);
    const fileInputRef = useRef(null);

    const isFormValid =
        formData.company_name.trim() !== "" ||
        formData.job_title.trim() !== "" ||
        formData.location.trim() !== "" ||
        formData.date_applied !== "" ||
        formData.status !== "";

    return (
        <div className="add-job-page">
            <div className="job-form">
                <h1>Add New Job</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Company Name
                            <span className="required">*</span>
                        </label>

                        <input
                            className={errors.company_name ? "error-input" : ""}
                            type="text"
                            name="company_name"
                            placeholder="Company Name"
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
                        <label>
                            Job Title
                            <span className="required">*</span>
                        </label>
                        <input
                            className={errors.job_title ? "error-input" : ""}
                            type="text"
                            name="job_title"
                            placeholder="Job Title"
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
                        <label>
                            Location
                            <span className="required">*</span>
                        </label>
                        <input
                            className={errors.location ? "error-input" : ""}
                            type="text"
                            name="location"
                            placeholder="Location"
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
                        <label>Job URL</label>
                        <input
                            type="url"
                            name="job_url"
                            placeholder="https://company.com/job"
                            value={formData.job_url}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Date Applied
                            <span className="required">*</span>
                        </label>
                        <input
                            className={errors.date_applied ? "error-input" : ""}
                            type="date"
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
                        <label>Resume Version</label>
                        <input
                            type="text"
                            name="resume_version"
                            placeholder="Resume Version"
                            value={formData.resume_version}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Upload Resume (PDF)</label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                            setResumeFile(e.target.files[0])
                            }
                        />
                    </div>
                
                    <div className="form-group">
                        <label>
                            Status
                            <span className="required">*</span>
                        </label>
                        <select className={errors.status ? "error-input" : ""}
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
                                    value={formData.interview_date}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Interview Notes</label>

                                <textarea
                                    name="interview_notes"
                                    placeholder="Interview Notes"
                                    value={formData.interview_notes}
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


                    <button type="submit"
                        className={`save-btn ${!isFormValid ? "disabled-save-btn" : ""}`}
                        disabled={loading || !isFormValid}>
                        {loading ? ("Saving...") : (
                        <>
                            <FaPlusCircle style={{ marginRight: "8px" }} />
                            Save Job
                        </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddJob;