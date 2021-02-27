import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputEmail, InputPw, InputPwRep } from './Inputs';
import Spinner from '../../common/components/UI/Spinner/Spinner'
import { Link, useHistory, withRouter } from 'react-router-dom'

const Register = (props) => {

    const [emailReg, setEmailReg] = useState(null)
    const [pwReg, setPwReg] = useState(null)
    const [pwRegRep, setPwRegRep] = useState(null)

    const [message, setMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const register = (event) => {
        event.preventDefault()

        if (pwReg !== pwRegRep)
            setMessage('Confirm Password is Incorrect!')
        else {
            setIsLoading(true)

            axios.post('http://localhost:4000/entry/register/', {
                email: emailReg,
                password: pwReg
            })
                .then(response => {
                    console.log(response);
                    if (response.data.isSuccess) {
                        setMessage(null)
                        setSuccessMessage('Register Successful! Directing you to Login page...')
                        setTimeout(() => history.push('/login'), 3000)
                    }
                    else
                        setMessage(response.data.message)
                })
                .then(res => setIsLoading(false))
        }

    }

    return (isLoading) ? <Spinner /> : (
        <div className="RegisterForm">
            <form onSubmit={register}>
                <h2>Signup to be a Member</h2>
                {message ? <p className="ErrorMessage">{message}</p> : ''}
                {successMessage ? <h5 className="SuccessMessage">{successMessage}</h5> : ''}

                <div className="FormInput">
                    <input type="text" placeholder="Email" name="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        title="Example: something@domain.com"
                        onChange={(e) => setEmailReg(e.target.value)}
                        required
                    />
                    <span className="InputSymbol"><i className="fas fa-envelope"></i></span>
                </div>

                <div className="FormInput">
                    <input type="password" placeholder="Password" name="password" id="register-pw"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain: at least one number, one uppercase and lowercase letter, and at least 8 characters"
                        onChange={(e) => setPwReg(e.target.value)}
                        required />
                    <span className="InputSymbol"><i className="fas fa-lock"></i></span>
                    <span className="InputSymbol Eye" onClick={() => props.togglePw('register-pw')}>
                        <i className="fas fa-eye" id="register-pw-eye"></i>
                    </span>
                </div>

                <div className="FormInput">
                    <input type="password" placeholder="Confirm Password" name="password" id="register-pw-rep"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain: at least one number, one uppercase and lowercase letter, and at least 8 characters"
                        onChange={(e) => setPwRegRep(e.target.value)}
                        required />
                    <span className="InputSymbol"><i className="fas fa-lock"></i></span>
                    <span className="InputSymbol Eye" onClick={() => props.togglePw('register-pw-rep')}>
                        <i className="fas fa-eye" id="register-pw-rep-eye"></i>
                    </span>
                </div>

                <button value="register" >Register</button>

            </form>

            <div className="entryLink">
                <Link to="/login" >Already a Member? Login!</Link>
            </div>
        </div>
    );
}

export default Register;