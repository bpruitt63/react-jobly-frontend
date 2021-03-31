import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Spinner} from 'reactstrap';
import {useErrors} from './hooks';
import JoblyApi from './api';
import Job from './Job';
import Errors from './Errors';


function Jobs({username, apps, getApps, apply, applicationErrors}) {

    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [apiErrors, getApiErrors] = useErrors();
    const history = useHistory();

    useEffect(() => {

        /** Redirect to login page if not logged in */
        if (!username) {
            history.push('/login');
            return false;
        };

        /** Gets all jobs from database */
        async function getJobs() {
            try {
                const jobs = await JoblyApi.getJobs();
                setJobs(jobs);
                getApps(username);
            } catch (e) {
                getApiErrors(e);
            };
            setIsLoading(false);
        };   
        getJobs();
    }, [setIsLoading, username, history, getApps, getApiErrors]);

    if (isLoading) {
        return <Spinner color='dark' size='lg'/>
    };

    return (
        <div>
            <h1>Jobly Jobs</h1>
            <Errors formErrors={applicationErrors} 
                    apiErrors={apiErrors} />
            {jobs.map(j => <Job username={username}
                                job={j} 
                                key={j.id} 
                                apps={apps} 
                                apply={apply}/>)}
        </div>
    )
}

export default Jobs;