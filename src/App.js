import React, {useCallback, useState} from 'react';
import JoblyApi from './api';
import {useErrors} from './hooks';
import './App.css';
import Routes from './Routes';

function App() {

    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [apps, setApps] = useState([]);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();


    /** Finds which jobs user has already applied for and sets apps state */

    const getApps = useCallback(async () => {
      const user = await JoblyApi.getUser(username);
      setApps(user.applications);
    }, [username]);


    /** Applies for job in database */

    async function apply(username, jobId) {
      setApiErrors({});
      try {
        await JoblyApi.apply(username, jobId);
        setApps([...apps, jobId]);
      } catch (e) {
        getApiErrors(e);
      };
    };


    /** Puts logged in user into state and local storage */

    function updateUser(name, token) {
      setUsername(name);
      if (name === '') {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
      } else {
        localStorage.setItem("username", name);
        localStorage.setItem("token", token);
      }
    };

    return (
      <div className="App">
        <Routes username={username} 
                updateUser={updateUser}
                apps={apps}
                getApps={getApps}
                apply={apply}
                apiErrors={apiErrors} />
      </div>
    );
}

export default App;
