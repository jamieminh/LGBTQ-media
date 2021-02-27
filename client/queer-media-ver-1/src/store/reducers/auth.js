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
    role: null,
    NavItem: <LoginItem />,
}

const AuthReducer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN:
            const payload = action.payload
            const nav = (payload.role === 'admin') ? <AdminNav /> : <UserNav />
            return updateState(state, {isLoggedin: true, user_id: payload.user_id, 
                email: payload.email, role: payload.role, NavItem: nav})

        case actionTypes.LOGOUT:
            return updateState(state, {
                isLoggedin: false,
                user_id: null,
                email: null,
                role: null,
                NavItem: <LoginItem />,
            })

        default:
            return state
    }
}


export default AuthReducer