import React from 'react';
import { Link } from 'react-router-dom'
import tvlogo from '../../../assets/images/logo.png'
import './Logo.css'

const logo = (props) => {
    // let addClasses = props.onSideDrawer ? classes.SideDrawer : null

    return (
        <div className="Logo" >
            <Link to='/'>
                <img src={tvlogo} alt="tv-logo" />
            </Link>
        </div>
    );
}

export default logo;
// style={{width: props.width}}