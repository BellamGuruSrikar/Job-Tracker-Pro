import { useEffect, useState } from "react";
import axios from "axios";

function Jobs(){
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios
        .get("http://127.0.0.1:8000/api/jobs/")
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
            `http://127.0.0.1:8000/api/jobs/${id}/`
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
    return (
        <div>
            <h1>My Applications</h1>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {jobs.map((job) => (
                    <tr key={job.id}>
                        <td>{job.company_name}</td>
                        <td>{job.job_title}</td>
                        <td>{job.location}</td>
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