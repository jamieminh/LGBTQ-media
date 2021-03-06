import * as actionTypes from './actionTypes'


export const updateRatings = (mediaType) => {
    return {
        type: actionTypes.UPDATE_RATINGS,
        payload: { mediaType }
    }
}