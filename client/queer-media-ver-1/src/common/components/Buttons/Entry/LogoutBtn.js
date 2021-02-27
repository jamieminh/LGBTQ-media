import React from "react";
import * as actionCreators from '../../../../store/actions/index'
import './AuthenticationBtn.css'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const logoutHandler = () => {
        dispatch(actionCreators.logout())
        history.push('/')
    }

    return (
        <button className="LogoutBtn AuthBtn" 
        onClick={logoutHandler}> Logout </button>
    );
};

export default LogoutButton;