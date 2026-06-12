import { useState } from "react";
import axios from "axios";

function AddJob() {
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

      setFormData({
        company_name: "",
        job_title: "",
        location: "",
        job_url: "",
        date_applied: "",
        status: "Applied",
        notes: "",
        user: 2
      });

    } catch (error) {
      console.error(error);
      alert("Error Adding Job");
    }
  };
  const [resumeFile, setResumeFile] = useState(null);

  
  return (
    <div>
      <h1>Add Job</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="job_title"
          placeholder="Job Title"
          value={formData.job_title}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="date"
          name="date_applied"
          value={formData.date_applied}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="resume_version"
          placeholder="Resume Version"
          value={formData.resume_version}
          onChange={handleChange}
        />

        <br /><br />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setResumeFile(e.target.files[0])
          }
        />
        <br /><br />

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

        <br /><br />

        <input
          type="date"
          name="interview_date"
          value={formData.interview_date}
          onChange={handleChange}
        />

        <textarea
          name="interview_notes"
          placeholder="Interview Notes"
          value={formData.interview_notes}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Save Job
        </button>

      </form>
    </div>
  );
}

export default AddJob;