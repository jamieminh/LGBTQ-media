import React from 'react';

const InputEmail = () => {
    return (
        <div className="FormInput">
            <input type="text" placeholder="Email" name="email" 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
            required 
                
            />
            <span className="InputSymbol"><i class="fas fa-envelope"></i></span>
        </div>
    );
}
const InputPw = (props) => {
    return (
        <div className="FormInput">
            <input type="password" placeholder="Password" name="password" id="login-pw" required />
            <span className="InputSymbol"><i class="fas fa-lock"></i></span>
            <span className="InputSymbol Eye" onClick={() => props.togglePw('login-pw')}>
                <i className="fas fa-eye" id="login-pw-eye"></i>
            </span>
        </div>
    );
}

const InputPwRep = (props) => {
    return (
        <div className="FormInput">
            <input type="password" placeholder="Repeat Password" name="password-repeat" id="register-pw-repeat" required />
            <span className="InputSymbol"><i class="fas fa-lock"></i></span>
            <span className="InputSymbol Eye" onClick={() => props.togglePw('register-pw-repeat')}>
                <i className="fas fa-eye" id="register-pw-repeat-eye"></i>
            </span>
        </div>
    );
}


export { InputEmail, InputPw, InputPwRep }