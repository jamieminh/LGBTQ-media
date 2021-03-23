import React from 'react';
import logo from '../../assets/images/logo.png';
import Login from './Login';
import Register from './Register';
import { withRouter } from 'react-router-dom'
import './Entry.css'



const Entry = (props) => {

    const EntryType = props.entry === "login" ? Login : Register

    const togglePw = (id) => {
        let pw = document.getElementById(id);
        pw.type = (pw.type === 'password') ? 'text' : 'password'

        let eye = document.getElementById(id + "-eye")
        eye.className = ( eye.className === "fas fa-eye-slash") ? "fas fa-eye" : "fas fa-eye-slash"
    }

    return (
        <main id="EntryMain">
            <div className="EntryBox">
                <div className="EntryLogo">
                    <img src={logo} alt="app-logo" />
                </div>

                <div className="EntryForm">
                    <EntryType togglePw={togglePw}/>
                </div>

            </div>
        </main>

    );
}

export default withRouter(Entry);