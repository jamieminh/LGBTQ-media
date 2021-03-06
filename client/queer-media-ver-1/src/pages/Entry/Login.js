import React, { useState } from 'react';
import axios from '../../axios'
import Spinner from '../../common/components/UI/Spinner/Spinner'
import * as actionCreators from '../../store/actions/index'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'


axios.defaults.withCredentials = true
const Login = (props) => {

    const [emailLogin, setEmailLogin] = useState(null)
    const [pwLogin, setPwLogin] = useState(null)

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const ac = new AbortController();


    const login = (event) => {
        setIsLoading(true)
        console.log('Login btn clicked 1');

        event.preventDefault()
        console.log('Login btn clicked 2');

        console.log(emailLogin, pwLogin);
        // dispatch(actionCreators.login(emailLogin, pwLogin))
        axios.post('entry/login/', {
            email: emailLogin,
            password: pwLogin
        })
            .then(response => {
                const result = response.data;
                if (result.message)
                    setMessage(result.message)
                else {
                    dispatch(actionCreators.login(result))
                    history.push('/')
                }
            })
            .then(res => setIsLoading(false))  

    }


    return (isLoading) ? <Spinner /> : (
        <div className="LoginForm">
            <form onSubmit={login}>
                <h2>Member Login</h2>
                <p className="ErrorMessage">{message}</p>

                <div className="FormInput">
                    <input type="text" placeholder="Email" name="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        title="Example: something@domain.com"
                        onChange={(e) => setEmailLogin(e.target.value)}
                        required
                    />
                    <span className="InputSymbol"><i className="fas fa-envelope"></i></span>
                </div>

                <div className="FormInput">
                    <input type="password" placeholder="Password" name="password" id="login-pw"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain: at least one number, one uppercase and lowercase letter, and at least 8 characters"
                        onChange={(e) => setPwLogin(e.target.value)}
                        required />
                    <span className="InputSymbol"><i className="fas fa-lock"></i></span>
                    <span className="InputSymbol Eye" onClick={() => props.togglePw('login-pw')}>
                        <i className="fas fa-eye" id="login-pw-eye"></i>
                    </span>
                </div>
                {/* <InputEmail />
                <InputPw  togglePw={props.togglePw}/> */}
                <button value="login">Login</button>
            </form>

            <div className="entryLink">
                <Link to="/register" >Not a Member? Signup!</Link>
            </div>
        </div>
    );
}

export default Login;