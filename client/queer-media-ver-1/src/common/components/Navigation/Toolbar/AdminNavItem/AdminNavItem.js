import React, { useState, useEffect } from 'react';
import blank_user from '../../../../../assets/images/blank_user.png'
import LogoutBtn from '../../../Buttons/Entry/LogoutBtn'
import '../NavigationItem/NavigationItem.css'
import './AdminNavItem.css'

const AdminNav = (props) => {

    return (
        <li className="nav-item dropdown NavbarItem AdminNavItem">
            <div className="DropdownTitle">
                <img src={blank_user} alt="user-picture" />
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Admin</a>
            </div>

            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Create</a>
                <a className="dropdown-item" href="#">Update</a>
                <a className="dropdown-item" href="#">Delete</a>
                <div className="dropdown-divider"></div>
                <LogoutBtn />
            </div>
        </li>
    );
}

export default AdminNav;