import React, {useEffect, useState} from 'react';
import JoblyApi from './api';
import CompanyInfo from './CompanyInfo';
import {useHistory} from 'react-router-dom';
import {Spinner} from 'reactstrap';
import CompanySearchForm from './CompanySearchForm';
import { useHandleChange, useErrors } from './hooks';
import Errors from './Errors';

function Companies({username}) {

    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [data, handleChange, setData] = useHandleChange();
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const history = useHistory();


    useEffect(() => {
        async function getCompanies() {

            /** Redirect to login page if not logged in */
            if (!username) {
                history.push('/login');
                return false;
            };

            /** Gets all companies from database */
            try {
                const companies = await JoblyApi.getCompanies();
                setCompanies(companies); 
            } catch (e) {
                getApiErrors(e);
            };
            setIsLoading(false);
        }
        getCompanies();
    }, [setIsLoading, username, history, getApiErrors])

    if (isLoading) {
        return <Spinner color='dark' size='lg'/>
    };


    /** Submits search form and returns all companies that fit search criteria */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setApiErrors({});
        try {
            const companies = await JoblyApi.getCompanies(data);
            setCompanies(companies);
            setData('');
        } catch (e) {
            getApiErrors(e);
        };
        setIsLoading(false);
    }

    return (
        <div>
            <Errors apiErrors={apiErrors} />
            <CompanySearchForm 
                data={data}
                handleSubmit={handleSubmit}
                handleChange={handleChange}/>
            {companies.length === 0 &&
                Object.keys(apiErrors).length === 0 &&
                <p className='lead'>No companies fit the search criteria.</p>
            }
            {companies.map(c => 
                    <CompanyInfo company={c} key={c.handle}
                        isCompanyList={true} />
                )
            }
        </div>
    )
}

export default Companies;