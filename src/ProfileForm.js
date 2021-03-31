import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import {useHandleChange, useValidate, useErrors} from './hooks';
import JoblyApi from './api';
import Errors from './Errors';

function ProfileForm({username}) {

    const initialState = {firstName: '', lastName: '', email: ''}

    const [isLoading, setIsLoading] = useState(true);
    const [formErrors, validate] = useValidate();
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const history = useHistory();

    useEffect(() => {
        async function getUserInfo() {

            /** Redirect to login page if not logged in */
            if (!username) {
                history.push('/');
                return false;
            };

            /** Gets info about logged in user and sets initial form data */
            try {
                const user = await JoblyApi.getUser(username);
                setData({firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email});
            } catch (e) {
                getApiErrors(e);
            };
        };
        getUserInfo(username);
        setIsLoading(false);
    }, [username, setData, setIsLoading, history, getApiErrors]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({})

        /** Checks form for errors.
         * If errors, stops form submission and sets errors object
         */
        const isSignUpForm = false;
        const err = validate(data, isSignUpForm);
        if (Object.keys(err).length > 0) {
            return false;
        } else {
            setIsLoading(true);

            /** Removes second password from data object */
            const dataObj = data;
            delete dataObj.password2;
            setData(dataObj);

            /** Submits data to update user info and redirects to home */
            try {
                await JoblyApi.updateUser(username, data);
                history.push('/');
            } catch (e) {
                getApiErrors(e);
                setIsLoading(false);
            };
        };
    };

    if (isLoading) {
        return <Spinner color='dark' size='lg'/>
    };

    return (
        <>
            <h2 className='formheading'>Update User Info For {username}</h2>
            <Errors formErrors={formErrors}
                    apiErrors={apiErrors} />
            { Object.keys(apiErrors).length === 0 && 
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='firstName'>First Name: </Label>
                        <Input type='text'
                            name='firstName' 
                            value={data.firstName}
                            onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='lastName'>Last Name: </Label>
                        <Input type='text'
                            name='lastName' 
                            value={data.lastName}
                            onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'>Password: </Label>
                        <Input type='password'
                            name='password' 
                            placeholder='New Password'
                            value={data.password || ''}
                            onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password2'>Retype New Password: </Label>
                        <Input type='password'
                            name='password2' 
                            placeholder='Retype New Password'
                            value={data.password2 || ''}
                            onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='email'>Email: </Label>
                        <Input type='text'
                            name='email' 
                            value={data.email}
                            onChange={handleChange} />
                    </FormGroup>
                    <Button>Update User Info</Button>
                </Form>
            }
        </>
    )
}

export default ProfileForm;