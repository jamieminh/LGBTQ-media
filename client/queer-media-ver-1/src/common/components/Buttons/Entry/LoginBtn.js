import React from 'react';

import { useAuth0 } from '@auth0/auth0-react'

const LoginBtn = () => {
    const { loginWithRedirect } = useAuth0()

    // redirect user to AUth0 Universal Login page
    return (
        <button
            className="LoginBtn AuthBtn"
            onClick={() => loginWithRedirect()}
        >Login</button>
    )
}

export default LoginBtn