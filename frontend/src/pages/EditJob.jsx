import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/addjob.css";

function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);

    const [formData, setFormData] = useState({
        company_name: "",
        job_title: "",
        location: "",
        job_url: "",
        date_applied: "",
        status: "Applied",
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
                    job_url: job.job_url,
                    date_applied: job.date_applied,
                    status: job.status,
                    notes: job.notes,
                    resume_version: job.resume_version,
                    interview_date: job.interview_date,
                    interview_notes: job.interview_notes,
                });

            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const data = new FormData();

        data.append("company_name", formData.company_name);
        data.append("job_title", formData.job_title);
        data.append("location", formData.location);
        data.append("date_applied", formData.date_applied);
        data.append("job_url", formData.job_url);
        data.append("date_applied", formData.date_applied);
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

            alert("Job Updated Successfully");

            navigate("/jobs");

        } catch (error) {
            console.log(error.response?.data);
            alert(JSON.stringify(error.response?.data, null, 2));
        }

        setLoading(false);
    };

    return (
        <div className="add-job-page">
            <div className="job-form">

                <h1>Edit Job</h1>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Company Name</label>

                        <input
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Job Title</label>

                        <input
                            type="text"
                            name="job_title"
                            value={formData.job_title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Date Applied</label>

                        <input
                            type="date"
                            name="date_applied"
                            value={formData.date_applied}
                            onChange={handleChange}
                        />
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
                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Offer">Offer</option>
                        </select>
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
                            value={formData.interview_notes || ""}
                            onChange={handleChange}
                        />
                    </div>

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