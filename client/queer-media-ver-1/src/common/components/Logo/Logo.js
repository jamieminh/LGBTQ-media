import React from 'react';
import tvlogo from '../../../assets/images/logo.png'
import './Logo.css'

const logo = (props) => {
    // let addClasses = props.onSideDrawer ? classes.SideDrawer : null

    return ( 
        <div className="Logo" >
            <img src={tvlogo} alt="tv-logo"/>
        </div>
    );
}
 
export default logo;
// style={{width: props.width}}