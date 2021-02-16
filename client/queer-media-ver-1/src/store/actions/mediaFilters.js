import * as actionTypes from './actionTypes'


export const setTitles = (titles) => {
    return {
        type: actionTypes.SET_TITLES,
        payload: { titles: titles }
    }
}

export const resetTitles = () => {
    return {
        type: actionTypes.RESET_TITLES,
    }
}

export const addGenreFilter = (genre) => {
    return {
        type: actionTypes.ADD_GENRE_FILTER,
        payload: { genre: genre }
    }
}

export const removeGenreFilter = (genre) => {
    return {
        type: actionTypes.REMOVE_GENRE_FILTER,
        payload: { genre: genre }
    }
}

export const setRatingFilter = (rating) => {
    return {
        type: actionTypes.SET_RATING_FILTER,
        payload: { rating: rating }
    }
}

export const sortBy = (type, order) => {
    return {
        type: actionTypes.SORT_BY,
        payload: { 
            type: type,
            order: order
        }
    }
}