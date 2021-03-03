import React from 'react';
import {NavLink} from 'react-router-dom';
import '../NavigationItem/NavigationItem.css';

const LoginItem = (props) => {
    return (
        <li className="nav-item NavbarItem">
            <NavLink
                className="nav-link m-2 NavbarLink LoginNavLink"
                to='/login'
                exact
            >Login</NavLink>
        </li>
    );
}
 
export default LoginItem;