import React from 'react';
import Job from './Job';

function CompanyJobs({jobs, username, apps, apply}) {
    return (
        <>
            {jobs.map(j => <Job job={j} 
                                key={j.id}
                                username={username}
                                apps={apps}
                                apply={apply} />)}
        </>
    )
};

export default CompanyJobs;