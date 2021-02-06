import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li className="nav-item NavbarItem">
            <NavLink
                className="nav-link m-2 NavbarLink"
                to={props.link}
                exact
                activeClassName="NavItemActive"
            >{props.children}</NavLink>
        </li>
    );
}
 
export default navigationItem;