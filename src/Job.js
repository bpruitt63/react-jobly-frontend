import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardTitle, CardText, Button} from 'reactstrap';

function Job({username, job, apps, apply}){
    return (
        <Card className='JobCard'>
            <CardTitle tag='h4'>{job.title}</CardTitle>
            <Link to={`/companies/${job.companyHandle}`} >
                <h5>{job.companyName}</h5>
            </Link>
            <CardText>Salary: ${job.salary}</CardText>
            <CardText>Equity: {job.equity}</CardText>
            {apps.includes(job.id) ? 
                <Button disabled>Already Applied</Button>
            :
                <Button onClick={() => apply(username, job.id)}>Apply</Button>
            }
        </Card>
    )
}

export default Job;