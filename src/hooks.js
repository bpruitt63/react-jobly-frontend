import {useCallback, useState} from 'react';

function useHandleChange(initialState={}) {
    const [data, setData] = useState(initialState);
    const handleChange = (e) => {
        const {name, value} = e.target
        setData(d => ({
            ...d,
            [name]: value
        }));
    };
    return [data, handleChange, setData];
};

function useValidate() {
    const [formErrors, setFormErrors] = useState({});

    /** Validation for SignupForm and ProfileForm.
     * Sets state to object with all form errors.
     */
    function validate(data, isSignUpForm) {
        let err = {};
        if (!data.firstName || data.firstName.length < 1 || data.firstName.length > 30) {
            err.firstName = "First name must be between 1 and 30 characters";
        } else {
            delete(err.firstName);
        };
        if (!data.lastName || data.lastName.length < 1 || data.lastName.length > 30) {
            err.lastName = "Last name must be between 1 and 30 characters";
        } else {
            delete(err.lastName);
        };
        if (!data.email || data.email.length < 6 || data.email.length > 60) {
            err.emailLength = "Email must be between 6 and 60 characters";
        } else {
            delete(err.emailName);
        };
        if (data.email && !data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            err.email = "Must be valid email address";
        } else {
            delete(err.email);
        };
        if (data.password !== data.password2){
            err.passwords = "Passwords must match";
        }
        if (isSignUpForm) {
            if (!data.username || data.username.length < 1 || data.username.length > 30) {
                err.username = "Username must be between 1 and 30 characters";
            } else {
                delete(err.username);
            }
            if (!data.password || data.password.length < 5 || data.password.length > 20) {
                err.password = "Password must be between 5 and 20 characters";
            } else {
                delete(err.password);
            };
        } else {
            if (data.password && (data.password.length < 5 || data.password.length > 20)) {
                err.password = "Password must be between 5 and 20 characters";
            } else {
                delete(err.password);
            };
        }
        setFormErrors(err);
        return err;
    };
    return [formErrors, validate];
};

function useErrors() {
    const [apiErrors, setApiErrors] = useState({});

    /** Sets state with object containing all errors returned from API calls */
    const getApiErrors = useCallback(e => {
        const errors = {...e};
        setApiErrors(errors);
    }, [setApiErrors]);
    return [apiErrors, getApiErrors, setApiErrors];
};

export {useHandleChange, useValidate, useErrors};