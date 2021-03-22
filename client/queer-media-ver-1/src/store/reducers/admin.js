import React from 'react';
import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'


const MOVIE_RATINGS = [
    { G: "General Audiences" }, { PG: "Parental Guidance Suggested" },
    { PG_13: "Parents Strongly Cautioned" }, { R: "Restricted" }, { NC_17: "Clearly Adult" },
    {NOT_RATED: 'Not Rated at the Time of Creation'}]

const SERIES_RATINGS = [
    { TV_Y: "All Children" }, { TV_Y7: "Directed to Older Children" },
    { TV_Y_FV: "Directed to Older Children - Fantasy Violance" },
    { TV_G: "General Audiences" }, { TV_PG: "Parental Guidance Suggested" },
    { TV_14: "Parental Strongly Cautioned" },
    { TV_MA: "Mature Audience Only" }, {NOT_RATED: 'Not Rated at the Time of Creation'}]

    
const initState = {
    mediaType: 'movie',
    ratings: MOVIE_RATINGS
}


const AdminReducer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.UPDATE_RATINGS:
            console.log('dispatch success');
            const ratings = (action.payload.mediaType === 'movie') ? MOVIE_RATINGS : SERIES_RATINGS
            console.log(ratings);

            return updateState(state, {
                mediaType: action.payload.mediaType,
                ratings: ratings
            })

        default:
            return state
    }
}


export default AdminReducer