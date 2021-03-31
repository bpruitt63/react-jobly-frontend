import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardTitle, CardText, Button} from 'reactstrap';

function CompanyInfo({company, isCompanyList}) {
    return (
        <div>
            <Card body outline color='dark' className='CompanyCard'>
                {company.logoUrl && 
                    <img src={company.logoUrl} 
                        alt={`${company.name} Logo`} 
                        className='CompanyLogo'/>}
                <CardTitle tag='h3'>{company.name}</CardTitle>
                <CardText>{company.description}</CardText>
                <CardText>Employees: {company.numEmployees}</CardText>
                {isCompanyList &&
                    <Button tag={Link} to={`/companies/${company.handle}`} className='btn'>
                        View Company
                    </Button>
                }
            </Card>
        </div>
    )
}

export default CompanyInfo;