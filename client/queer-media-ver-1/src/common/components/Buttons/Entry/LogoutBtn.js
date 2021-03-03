import React from "react";
import axios from '../../../../axios'
import * as actionCreators from '../../../../store/actions/index'
import './AuthenticationBtn.css'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const logoutHandler = () => {
        axios.get('entry/logout')
        .then(_ => {
            dispatch(actionCreators.logout())
            history.push('/')
        })
        .catch(err => console.error(err))        
    }

    return (
        <button className="LogoutBtn AuthBtn" 
        onClick={logoutHandler}> Logout </button>
    );
};

export default LogoutButton;