import React, { useState } from 'react';
import axios from '../../axios'
import Spinner from '../../common/components/UI/Spinner/Spinner'
import * as actionCreators from '../../store/actions/index'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie'
import PageTitle from '../../common/components/PageTitle/PageTitle';


axios.defaults.withCredentials = true
const Login = (props) => {

    const [emailLogin, setEmailLogin] = useState(null)
    const [pwLogin, setPwLogin] = useState(null)

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    let isRemember = false
    const cookies = new Cookies()

    const dispatch = useDispatch()
    const history = useHistory()

    const historyState = history.location.state

    const login = (event) => {
        let isSubscribed = true
        setIsLoading(true)
        event.preventDefault()

        console.log(emailLogin, pwLogin, isRemember);
        // dispatch(actionCreators.login(emailLogin, pwLogin))
        axios.post('entry/login/', {
            email: emailLogin,
            password: pwLogin,
            remember: isRemember
        })
            .then(response => {
                if (isSubscribed) {
                    const result = response.data;
                    console.log(result);
                    if (result.message)
                        setMessage(result.message)
                    else {
                        // set login cookie if user chose "remember me"
                        if (result.token !== '') {
                            cookies.set('token', result.token, {
                                path: '/',
                                maxAge: 5 * 24 * 60 * 60
                            })
                        }

                        dispatch(actionCreators.login(result))
                        history.push(historyState ? historyState.fromUrl : '/')
                    }
                }
            })
            .then(res => {
                if (isSubscribed)
                    setIsLoading(false)
            })

        return () => { isSubscribed = false }

    }


    return (isLoading) ? <Spinner /> : (
        <div className="LoginForm">
            <PageTitle title="Login" />
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
                <div className="FormInput RememberMe">
                    <input type="checkbox" name="remember" id="remember-me" onChange={() => isRemember = !isRemember} />
                    <label htmlFor="remember">Remember Me</label>
                </div>
                <button value="login">Login</button>
            </form>

            <div className="entryLink">
                <Link to="/register" >Not a Member? Signup!</Link>
            </div>
        </div>
    );
}

export default Login;