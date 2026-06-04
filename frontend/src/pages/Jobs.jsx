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
                        <td>{job.status}</td>
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