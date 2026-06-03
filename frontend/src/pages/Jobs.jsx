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
    return (
        <div>
            <h1>My Applications</h1>

            {jobs.map((job) => (
                <div key={job.id}>
                <h3>{job.company_name}</h3>
                <p>{job.job_title}</p>
                <p>{job.status}</p>
                <hr />
                </div>
            ))}
        </div>
    );
}
 
export default Jobs