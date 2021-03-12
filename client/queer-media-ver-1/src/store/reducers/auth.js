import React from 'react';
import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'
import AdminNav from '../../common/components/Navigation/Toolbar/AdminNavItem/AdminNavItem'
import UserNav from '../../common/components/Navigation/Toolbar/UserNavItem/UserNavItem'
import LoginItem from '../../common/components/Navigation/Toolbar/LoginNavItem/LoginNavItem'

const initState = {
    isLoggedin: false,
    user_id: null,
    email: null,
    display_name: null,
    role: null,
    NavItem: <LoginItem />,
}

const AuthReducer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN:
            console.log(action.payload);
            const { user_id, email, role, display_name } = action.payload.userData
            console.log(user_id, email, role, display_name);
            const nav = (role === 'admin') ? <AdminNav /> : <UserNav />
            return updateState(state,
                {
                    isLoggedin: true, user_id: user_id,
                    display_name: display_name, email: email,
                    role: role, NavItem: nav
                })

        case actionTypes.LOGOUT:
            return updateState(state, {
                isLoggedin: false,
                user_id: null,
                email: null,
                role: null,
                display_name: null,
                NavItem: <LoginItem />,
            })

        default:
            return state
    }
}


export default AuthReducer