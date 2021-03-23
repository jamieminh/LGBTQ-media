import React from 'react';
import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'

const initState = {
    isLoggedin: false,
    user_id: null,
    email: null,
    display_name: null,
    role: null,
    pages: null
}

const adminPages = [{ name: "Create", link: '/upsert-media/create' }]
const userPages = [{ name: 'Profile', link: '/profile' }]

const AuthReducer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN:
            const { user_id, email, role, display_name } = action.payload.userData
            const pages = (role === 'admin') ? adminPages : userPages
            return updateState(state,
                {
                    isLoggedin: true, user_id: user_id,
                    display_name: display_name, email: email,
                    role: role, pages: pages
                })

        case actionTypes.LOGOUT:
            return updateState(state, {
                isLoggedin: false,
                user_id: null,
                email: null,
                role: null,
                display_name: null,
                pages: null
            })

        case actionTypes.CHANGE_DISPLAY_NAME:
            return updateState(state, {
                display_name: action.payload.newName
            })

        default:
            return state
    }
}


export default AuthReducer