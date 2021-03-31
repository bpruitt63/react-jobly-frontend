import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import Navlist from './Navlist';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Logout from './Logout';
import ProfileForm from './ProfileForm';
import { Container } from 'reactstrap';

function Routes({username, updateUser, apps, getApps, apply, apiErrors}){

    return (
        <Container>
            <Navlist username={username}/>
            <Switch>
                <Route exact path='/'>
                    <Home username={username}/>
                </Route>
                <Route exact path='/companies'>
                    <Companies username={username}/>
                </Route>
                <Route exact path='/companies/:handle'>
                    <Company username={username}
                            apps={apps}
                            getApps={getApps}
                            apply={apply}/>
                </Route>
                <Route exact path='/jobs'>
                    <Jobs username={username}
                            apps={apps}
                            getApps={getApps}
                            apply={apply}
                            applicationErrors={apiErrors} />
                </Route>
                <Route exact path='/login'>
                    <LoginForm username={username} 
                        updateUser={updateUser}/>
                </Route>
                <Route exact path='/signup'>
                    <SignupForm username={username}
                        updateUser={updateUser}/>
                </Route>
                <Route exact path='/profile'>
                    <ProfileForm username={username}/>
                </Route>
                <Route exact path='/logout'>
                    <Logout updateUser={updateUser}/>
                </Route>
                <Redirect to='/' />
            </Switch>
        </Container>
    )
}

export default Routes;