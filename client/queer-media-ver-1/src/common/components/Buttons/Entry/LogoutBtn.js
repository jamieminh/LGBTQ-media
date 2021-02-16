import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './AuthenticationBtn.css'

const LogoutButton = () => {
    const { logout } = useAuth0();
    // the exposed logout method clears app session and 
    // redirect to the Auth0 endpoint to clear Auth0 session 
    return (
        <button
            className="LogoutBtn AuthBtn"
            onClick={() =>
                logout({
                    // where auth0 will redirect users after loggin out
                    // returnTo: 'http://localhost:3000/',
                    returnTo: window.location.origin,
                })
            }
        >
            Logout
        </button>
    );
};

export default LogoutButton;