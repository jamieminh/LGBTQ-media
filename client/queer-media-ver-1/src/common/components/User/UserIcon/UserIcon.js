import React from 'react';
import blank_user from '../../../../assets/images/blank_user.png'
import './UserIcon.css'

const UserIcon = React.memo(props => {
    const display_name = props.displayName

    return (
        <div className="UserIcon">
            {(display_name) ? 
            <div ><h2>{display_name.substring(0, 2)}</h2></div> : 
            <img src={blank_user} alt="no-user-login" />}

        </div>
    );
})

export default UserIcon;