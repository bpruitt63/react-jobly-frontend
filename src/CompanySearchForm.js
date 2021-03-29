import React from 'react';

function CompanySearchForm({data, handleSubmit, handleChange}) {

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Search Companies</label>
            <input type='text' 
                name='name' 
                id='name' 
                placeholder='Company Name'
                value={data.name || ''}
                onChange={handleChange}></input>
            <button>Submit</button>
        </form>
    )
}

export default CompanySearchForm;