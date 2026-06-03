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
    user: 2
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/jobs/",
        formData
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

        <button type="submit">
          Save Job
        </button>

      </form>
    </div>
  );
}

export default AddJob;