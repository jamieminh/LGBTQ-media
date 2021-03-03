import { useDispatch } from 'react-redux'
import * as actionTypes from './actionTypes'
import axios from 'axios'



export const login = (userData) => {
    return {
        type: actionTypes.LOGIN,
        payload: {email: userData.email, user_id: userData.user_id, role: userData.role}
    }

}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    }
}

export const register = (email, password) => {
    return {
        type: actionTypes.REGISTER,
        payload: { email, password }
    }
}