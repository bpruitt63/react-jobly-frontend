import React from 'react';
import {Link} from 'react-router-dom';

function Job({username, job, apps, apply}){
    return (
        <div>
            <h3>{job.title}</h3>
            <Link to={`/companies/${job.companyHandle}`} >
                <h5>{job.companyName}</h5>
            </Link>
            <p>Salary: ${job.salary}</p>
            <p>Equity: {job.equity}</p>
            {apps.includes(job.id) ? 
                <p>Already Applied</p>
            :
                <button onClick={() => apply(username, job.id)}>Apply</button>
            }
        </div>
    )
}

export default Job;