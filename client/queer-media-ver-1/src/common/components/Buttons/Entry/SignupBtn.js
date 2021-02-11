import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();

    // similar to LoginBtn but with a 'screen_hint: signup' to  land the 
    // user directly to a sign-up page
    return (
        <button
            className="SignupBtn AuthBtn"
            onClick={() =>
                loginWithRedirect({
                    screen_hint: "signup",
                })
            }
        >Sign Up
        </button>
    );
};

export default SignupButton;