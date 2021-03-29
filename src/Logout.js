import {Redirect} from 'react-router-dom';
import { useEffect } from 'react';
import JoblyApi from './api';

function Logout({updateUser}) {

    /** Removes name and token from state and local storage */
    useEffect(() => {
        updateUser('', '');
        JoblyApi.token = '';
    }, [updateUser]);
    

    return <Redirect to='/' />
};

export default Logout;