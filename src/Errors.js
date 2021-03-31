import React from 'react';
import {Alert} from 'reactstrap';

function Errors({formErrors={}, apiErrors={}}) {
    return (
        <div>
        {Object.keys(formErrors).map((key, e) => <Alert color='warning'
                                                 key={e}>{formErrors[key]}</Alert>)}
        {Object.keys(apiErrors).map((key, e) => <Alert color='danger'
                                                 key={e}>{apiErrors[key]}</Alert>)}
        </div>
    )
};

export default Errors;