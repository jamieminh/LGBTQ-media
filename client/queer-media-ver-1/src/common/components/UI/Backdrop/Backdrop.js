import React from 'react';
import './Backdrop.css'

const backdrop = (props) => {
    return (
        props.show ? 
            <div className="Backdrop d-md-none" onClick={props.close}></div>
            : null
    );
}
 
export default backdrop;