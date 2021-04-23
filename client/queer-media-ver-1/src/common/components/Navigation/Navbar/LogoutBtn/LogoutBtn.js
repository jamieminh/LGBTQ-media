import React from "react";
import axios from '../../../../../axios'
import * as actionCreators from '../../../../../store/actions/index'
import './LogoutBtn.css'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';


const LogoutButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const cookie = new Cookies()

    const logoutHandler = () => {
        const token = cookie.get('token')
        cookie.remove('token')        

        axios.get('entry/logout/' + token)
        .then(_ => {
            dispatch(actionCreators.logout())
            history.go('/')
        })
        .catch(err => console.error(err))        
    }

    return (
        <button className="LogoutBtn" 
        onClick={logoutHandler}> Logout </button>
    );
};

export default LogoutButton;