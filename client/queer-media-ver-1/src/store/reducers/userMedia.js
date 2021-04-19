import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'

const initState = {
    media_id: null,
    comments: null,

}


const UserReducer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.SET_COMMENTS:
            return updateState(state, {
                media_id: action.payload.media_id,
                comments: action.payload.comments
            })

        default:
            return state
    }
}


export default UserReducer