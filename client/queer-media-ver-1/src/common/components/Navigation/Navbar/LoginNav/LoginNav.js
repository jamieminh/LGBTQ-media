import React from 'react';
import { NavLink } from 'react-router-dom'
import './LoginNav.css'

const LoginNav = () => {
    return (
        <li><NavLink
            className="NavItemLink LoginNavItem"
            to="/login"
            exact>Login</NavLink></li>
    );
}

export default LoginNav;