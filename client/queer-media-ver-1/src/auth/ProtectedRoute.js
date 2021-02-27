import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Layout from '../hoc/Layout/Layout';

// // import { withAuthenticationRequired } from "@auth0/auth0-react";
// import Spinner from "../common/components/UI/Spinner/Spinner";

// const ProtectedRoute = ({ component: Component, roles, ...args }) => (
//     <Route {...args} render={props => {
//         const currentUser = authenticationService.currentUserValue;

//         if (!currentUser) {
//             // not logged in => redirect to login page
//             return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//         }

//         if (roles && roles.indexOf(currentUser.role) === -1) {
//             // not authorised role
//             return <Redirect to={{ pathname: '/'}} />
//         }

//         return <Component {...props} />
//     }}
//         // component={withAuthenticationRequired(component, {
//         //     onRedirecting: () => <Spinner />,
//         // })}
//         // {...args}
//     />
// );

// export default ProtectedRoute;


const ProtectedAdminRoute = ({ component: Component, ...args }) => {
    const role = useSelector(state => state.auth.role)

    return (
        <Route {...args} render={props => {
            // not logged in as admin or not logged in at all, redirect to home
            return (!role || role !== 'admin') ?
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                : <Layout> <Component {...props} /> </Layout>
        }}

        />
    )
}

const ProtectedUserRoute = ({ component: Component, ...args }) => {
    const role = useSelector(state => state.auth.role)

    return (
        <Route {...args} render={props => {
            // not logged in as admin or not logged in at all, redirect to home
            return (!role || role !== 'user') ?
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                : <Layout> <Component {...props} /> </Layout>
        }}

        />
    )
}

export { ProtectedUserRoute, ProtectedAdminRoute };

