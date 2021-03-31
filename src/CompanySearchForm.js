import React from 'react';
import { Button, Form, FormGroup, Label, 
        Input, InputGroup, InputGroupAddon } from 'reactstrap';

function CompanySearchForm({data, handleSubmit, handleChange}) {

    return (
        <Form className='CompanySearchForm' onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor='name'>Search Companies</Label>
                <InputGroup>
                    <Input type='text' 
                        name='name' 
                        id='name' 
                        placeholder='Company Name'
                        value={data.name || ''}
                        onChange={handleChange} />
                    <InputGroupAddon addonType='append'>
                        <Button>Submit</Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </Form>
    )
}

export default CompanySearchForm;