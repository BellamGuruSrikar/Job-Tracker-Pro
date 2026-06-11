import { useEffect, useState } from "react";
import axios from "axios";

function Jobs(){
   
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm]= useState("");
    const [statusFilter, setSearchFilter]= useState("All");

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
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const deleteJob = async (id) => {
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
    return (
        <div>
            <h1>My Applications</h1>
            
            <input type="text"
            placeholder="Search Company..."
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            />

            <select value={statusFilter}
            onChange={(e)=> setSearchFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
            </select>

            <br/> <br />
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Resume</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredJobs.map((job) => (
                    <tr key={job.id}>
                        <td>{job.company_name}</td>
                        <td>{job.job_title}</td>
                        <td>{job.location}</td>
                        <td>{job.resume_version}</td>
                        <td>
                            <select value={job.status} 
                            onChange={(e)=> updateStatus(job.id,e.target.value)}>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Offer">Offer</option>
                            </select>
                        </td>
                        <td><button onClick={()=>deleteJob(job.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default Jobs