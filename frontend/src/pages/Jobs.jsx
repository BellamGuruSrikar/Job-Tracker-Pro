import { useEffect, useState } from "react";
import { CSVLink } from "react-csv"; 
import axios from "axios";
import "../styles/jobs.css";

function Jobs(){
   
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm]= useState("");
    const [statusFilter, setSearchFilter]= useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get("http://127.0.0.1:8000/api/jobs/",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                    )}`,
                },
            }
        )
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

    const deleteJob = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if(!confirmDelete){
            return;
        }
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/jobs/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                }
            );

            setJobs(
            jobs.filter((job) => job.id !== id)
            );

        } catch (error) {
            console.log(error);
        }
    };
    
    const updateStatus = async (id,newStatus)=>{
        try{
            await axios.patch(
                `http://127.0.0.1:8000/api/jobs/${id}/`,
                {
                    status: newStatus
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                }
            );
            setJobs(
                jobs.map((job)=>
                    job.id === id
                    ?{ ...job,status: newStatus}
                    : job
                )
            );
        } catch (error){
            console.log(error);
        }
    };
    const filteredJobs = jobs.filter((job)=>{
        const matchesSearch=
          job.company_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus=
            statusFilter=== "All" ||
            job.status=== statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const csvData = jobs.map((job) => ({
        Company: job.company_name,
        JobTitle: job.job_title,
        Status: job.status,
        Location: job.location,
        ResumeVersion: job.resume_version,
        InterviewDate: job.interview_date,
    }));
    if(loading){
        return <h2>Loading Jobs...</h2>;
    }

    return (
        <div className="jobs-page">
            <div className="jobs-header">
                <h1>My Applications</h1>

                <CSVLink
                    data={csvData}
                    filename={"job_applications.csv"}
                >
                    <button className="export-btn">
                        Export CSV
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
                    onChange={(e)=>setSearchFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                </select>

            </div>

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
                            <td
                                colSpan="8"
                                style={{
                                    textAlign: "center",
                                    padding: "20px",
                                    fontWeight: "bold",
                                }}
                            >
                                No job applications found.
                                <br />
                                Click "Add Job" to create your first application.
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
                                    <select value={job.status} 
                                    onChange={(e)=> updateStatus(job.id,e.target.value)}>
                                        <option value="Applied">Applied</option>
                                        <option value="Interview">Interview</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Offer">Offer</option>
                                    </select>
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
                                <td><button className="delete-btn"
                                        onClick={()=>deleteJob(job.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            ))
                        )}
                </tbody>
            </table>
        </div>
    );
}
 
export default Jobs