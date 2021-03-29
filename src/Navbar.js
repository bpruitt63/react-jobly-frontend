import React from 'react';
import {NavLink} from 'react-router-dom';

function Navbar({username}){
    return (
        <nav>
            <NavLink to='/'>Jobly</NavLink>
            {username ? 
                <>
                    <NavLink to='/companies'>Companies</NavLink>
                    <NavLink to='/jobs'>Jobs</NavLink>
                    <NavLink to='/profile'>{username}</NavLink>
                    <NavLink to='/logout'>Log Out</NavLink>
                </>
            :
                <>
                    <NavLink to='/signup'>Register</NavLink>
                    <NavLink to='/login'>Log In</NavLink>
                </>
            }
        </nav>
    )
}

export default Navbar;