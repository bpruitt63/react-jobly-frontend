import React from 'react';
//import {NavLink} from 'react-router-dom';
import {Navbar, NavbarBrand, NavItem, NavLink, Nav} from 'reactstrap';

function Navlist({username}){
    return (
        <Navbar color='info' className='Nav'>
            <NavbarBrand href='/'>Jobly</NavbarBrand>
            {username ? 
                <Nav>
                    <NavItem>
                        <NavLink href='/companies'>Companies</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='/jobs'>Jobs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='/profile'>{username}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='/logout'>Log Out</NavLink>
                    </NavItem>
                </Nav>
            :
                <Nav>
                    <NavItem>
                        <NavLink href='/signup'>Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='/login'>Log In</NavLink>
                    </NavItem>
                </Nav>
            }
        </Navbar>
    )
}

export default Navlist;