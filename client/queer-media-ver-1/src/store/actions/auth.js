import * as actionTypes from './actionTypes'


export const login = (userData) => {
    return {
        type: actionTypes.LOGIN,
        payload: {userData: userData}
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

export const changeDisplayName = (newName) => {
    return {
        type: actionTypes.CHANGE_DISPLAY_NAME,
        payload: { newName: newName }
    }
}