import * as actionTypes from './actionTypes'


export const setComments = (media_id, comments) => {
    return {
        type: actionTypes.SET_COMMENTS,
        payload: { media_id: media_id, comments: comments }
    }
}

// export const addComment = (comment) => {
//     return {
//         type: actionTypes.ADD_COMMENT,
//         payload: {comment: comment}
//     }
// }

// export const removeComment = (commentID) => {
//     return {
//         type :actionTypes.REMOVE_COMMNET,
//         payload: {commentID: commentID}
//     }
// }