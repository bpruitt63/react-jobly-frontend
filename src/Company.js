import React, { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Spinner} from 'reactstrap';
import JoblyApi from './api';
import {useErrors} from './hooks';
import CompanyInfo from './CompanyInfo';
import Errors from './Errors';
import CompanyJobs from './CompanyJobs';

function Company({username, apps, getApps, apply}) {

    const { handle } = useParams();
    const [company, setCompany] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [apiErrors, getApiErrors] = useErrors();
    const history = useHistory();

    useEffect(() => {

        /** Redirect to login page if not logged in */
        if (!username) {
            history.push('/login');
            return false;
        };

        /** Gets all info about company */
        async function getCompany() {
            try {
                const company = await JoblyApi.getCompany(handle);
                setCompany(company); 
            } catch (e) {
                getApiErrors(e);
            };
            setIsLoading(false);
        };
        getApps(username);
        getCompany();
    }, [handle, username, history, getApps, getApiErrors]);

    if (isLoading) {
        return <Spinner color='dark' size='lg'/>
    }

    return (
        <div className='Company'>
            <Errors apiErrors={apiErrors} />
            { Object.keys(apiErrors).length === 0 && 
                <>
                    <CompanyInfo company={company}
                                isCompanyList={false} />
                    <h3>Jobs at {company.name}</h3>
                    <CompanyJobs jobs={company.jobs}
                                username={username}
                                apps={apps}
                                apply={apply} />
                </>
            }
        </div>
    )
}

export default Company;