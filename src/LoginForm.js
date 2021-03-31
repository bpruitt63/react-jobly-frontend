import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import {useHandleChange, useErrors} from './hooks';
import JoblyApi from './api';
import Errors from './Errors';

function LoginForm({username, updateUser}) {

    const initialState = {username: '', password: ''}

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const history = useHistory();

    
    /** Redirects to home if already logged in */
    if (username) {
        return <Redirect to='/' />
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setApiErrors({});

        /** Validates login form and sets error if missing fields */
        if (!data.username || !data.password) {
            setErrors({error: "Username and Password are required"})
            setData(initialState);
            return false;
        } else {
            setIsLoading(true);

            /** Checks for valid name/password combination.
             * Returns API token.
             * Runs function to put username and token into state and local storage.
             */
            try {
                const token = await JoblyApi.login(data);
                updateUser(data.username, token);
                JoblyApi.token = token;
                history.push('/');
            } catch (e) {
                getApiErrors(e);
                setData(initialState);
                setIsLoading(false);
            };
        };
    };

    if (isLoading) {
        return <Spinner color='dark' size='lg'/>
    };

    return (
        <>
            <h1 className='formheading'>Log In To Jobly</h1>
            <Errors formErrors={errors}
                        apiErrors={apiErrors} />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='username'>Username</Label>
                    <Input type='text'
                        name='username'
                        placeholder='Username'
                        value={data.username}
                        onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password'
                        name='password'
                        placeholder='Password'
                        value={data.password}
                        onChange={handleChange} />
                </FormGroup>
                <Button>Log In</Button>
        </Form>
        </>
    )
}

export default LoginForm;