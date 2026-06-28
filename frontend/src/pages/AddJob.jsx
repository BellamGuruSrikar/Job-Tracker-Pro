import { useState } from "react";
import axios from "axios";
import "../styles/addjob.css";

function AddJob() {
  const [loading, setLoading] = useState(false);
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
    interview_notes: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (resumeFile) {
      data.append("resume_file", resumeFile);
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/jobs/",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "access_token"
            )}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Job Added Successfully");
      setLoading(false);

      setFormData({
        company_name: "",
        job_title: "",
        location: "",
        job_url: "",
        date_applied: "",
        status: "Applied",
        notes: "",
        resume_version: "",
        interview_date: "",
        interview_notes: ""
      });
      setResumeFile(null);

    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response?.status === 401) {
          alert("Session expired. Please login again.");
      }
      else if (error.response?.status === 400) {
          alert("Please fill all required fields.");
      }
      else {
          alert("Something went wrong.");
      }
    }
  };
  const [resumeFile, setResumeFile] = useState(null);

  
  return (
    <div className="add-job-page">
      <div className="job-form">
        <h1>Add New Job</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name</label>

            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label>Job Title</label>

            <input
              type="text"
              name="job_title"
              placeholder="Job Title"
              value={formData.job_title}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              placeholder="Location"
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
            <label>Upload Resume</label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResumeFile(e.target.files[0])
              }
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

          <button type="submit"
            className="save-btn"
             disabled={loading}>
            {loading ? "Saving..." : "Save Job"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddJob;