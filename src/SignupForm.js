import React, {useState} from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import {useHandleChange, useValidate, useErrors} from './hooks';
import JoblyApi from './api';
import Errors from './Errors';

function SignupForm({username, updateUser}) {

    const initialState = {username: '', password: '', password2: '',
                         firstName: '', lastName: '', email: ''}

    const [isLoading, setIsLoading] = useState(false);
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [formErrors, validate] = useValidate();
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const history = useHistory();


    /** Redirects to home if already logged in */
    if (username) {
        return <Redirect to='/' />
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({})

        /** Checks form for errors.
         * If errors, stops form submission and sets errors object
         */
        const isSignUpForm = true;
        const err = validate(data, isSignUpForm);
        if (Object.keys(err).length > 0) {
            return false;
        } else {
            setIsLoading(true);

            /** Removes second password from data object */
            const dataObj = data;
            delete dataObj.password2;
            setData(dataObj);

            /** Submit new user to database.
             * Get API token.
             * Logs in new user by putting username/token into state and local storage
             * Redirects to home
             */
            try {
                const token = await JoblyApi.signup(data);
                updateUser(data.username, token);
                JoblyApi.token = token;
                history.push('/');
            } catch (e) {
                getApiErrors(e);
                setIsLoading(false);
            };
        };
    };

    if (isLoading) {
        return <p>Submitting Data...</p>
    };

    return (
        <>
            <Errors formErrors={formErrors}
                    apiErrors={apiErrors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input type='text' 
                    name='username' 
                    placeholder='Username'
                    value={data.username}
                    onChange={handleChange} />
                <label htmlFor='password'>Password: </label>
                <input type='password' 
                    name='password' 
                    placeholder='Password'
                    value={data.password}
                    onChange={handleChange} />
                <label htmlFor='password2'>Retype Password: </label>
                <input type='password' 
                    name='password2' 
                    placeholder='Retype Password'
                    value={data.password2}
                    onChange={handleChange} />
                <label htmlFor='firstName'>First Name: </label>
                <input type='text' 
                    name='firstName' 
                    placeholder='First Name'
                    value={data.firstName}
                    onChange={handleChange} />
                <label htmlFor='lastName'>Last Name: </label>
                <input type='text' 
                    name='lastName' 
                    placeholder='Last Name'
                    value={data.lastName}
                    onChange={handleChange} />
                <label htmlFor='email'>Email: </label>
                <input type='text' 
                    name='email' 
                    placeholder='example@example.com'
                    value={data.email}
                    onChange={handleChange} />
                <button>Register</button>
            </form>
        </>
    )
}

export default SignupForm;