import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./LoginBtn";
import LogoutButton from "./LogoutBtn";


const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  // isAuthenticated returns true if Auth0 has authenticated the user
  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;