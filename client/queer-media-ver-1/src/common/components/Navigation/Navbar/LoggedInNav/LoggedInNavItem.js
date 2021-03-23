import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import blank_user from '../../../../../assets/images/blank_user.png'
import LogoutButton from '../LogoutBtn/LogoutBtn';
import './LoggedInNavItem.css'

const LoggedinNav = (props) => {
    let displayName = useSelector(state => state.auth.display_name)
    const dropdownPages = props.pages.map((page, i) => <Link key={i} className="dropdownItem" to={page.link}>{page.name}</Link>)

    displayName = (displayName.length > 10) ? displayName.substring(0, 10) : displayName

    return (
        <li className="UserNavItem" >
            <div className="NavItemLink toggleDropdown" >
                <a id="user_display_name">Hi <span>{displayName}</span></a>
                <i className="fas fa-caret-right icon-rotates" id="RatingTogglerIcon"></i>
            </div>

            <div className="LoggedinMenuDropdown" id="dropdown" >
                {dropdownPages}
                <hr />
                <LogoutButton />
            </div>
        </li>
    );
}

export default LoggedinNav;