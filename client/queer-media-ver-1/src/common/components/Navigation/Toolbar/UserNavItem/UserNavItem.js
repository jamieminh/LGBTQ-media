import React, { useState, useEffect } from 'react';
import LogoutBtn from '../../../Buttons/Entry/LogoutBtn'
import blank_user from '../../../../../assets/images/blank_user.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import '../AdminNavItem/AdminNavItem.css'

const UserNavItem = () => {

    const email = useSelector(state => state.auth.email)
    const username = email.substring(0, 9)

    return (
        <li className="nav-item dropdown NavbarItem AdminNavItem">
            <div className="DropdownTitle">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {username}</a>
            </div>

            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/profile">Profile</Link>
                <div className="dropdown-divider"></div>
                <LogoutBtn />
            </div>
        </li>
    );
}
 
export default UserNavItem;