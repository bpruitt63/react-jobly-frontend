import React from 'react';

function CompanyInfo({company}) {
    return (
        <div>
            <h1>{company.name}</h1>
            {company.logoUrl && 
                <img src={company.logoUrl} alt={`${company.name} Logo`} />}
            <p>{company.description}</p>
            <p>Employees: {company.numEmployees}</p>
        </div>
    )
}

export default CompanyInfo;