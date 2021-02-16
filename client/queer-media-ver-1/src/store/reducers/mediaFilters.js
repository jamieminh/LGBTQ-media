import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'

const initState = {
    originalTitles: null,     // the titles list to be applied on for when user deselect a filter
    titles: null,             // the filtered titles {media_id, title, released, poster_url, score, year_end}
    sortBy: null,
    genreFilters: [],
    ratingFilter: null
}

const MediaReducer = (state = initState, action) => {
    let genre = null
    let genreFilters = state.genreFilters     // get current filters state
    let filteredTitles = null

    switch (action.type) {
        case actionTypes.SET_TITLES:
            const titles = action.payload.titles

            // also reset the filters because when titles is set it means users has gone to another page
            return updateState(state, { originalTitles: titles, titles: titles })

        case actionTypes.RESET_TITLES:
            return updateState(state, { 
                originalTitles: null, titles: null, 
                sortBy: null, genreFilters: [], ratingFilter: null })

        case actionTypes.ADD_GENRE_FILTER:
            genre = action.payload.genre
            genreFilters.push(genre)             // add new genre filter
            filteredTitles = genreFilterHandler(state.titles, genreFilters)      // filter media titles
            return updateState(state, { genreFilters: genreFilters, titles: filteredTitles })     // update the state

        case actionTypes.REMOVE_GENRE_FILTER:
            genre = action.payload.genre
            const index = genreFilters.indexOf(genre)      // find index of the genre
            genreFilters.splice(index, 1)                    // remove the genre from the filter
            console.log(genreFilters);

            // after remove, apply genre filter on the originalTitles
            filteredTitles = genreFilterHandler(state.originalTitles, genreFilters)      // filter media titles
            // apply all other filters as well
            if (state.ratingFilter !== null)
                filteredTitles = ratingFilterHandler(filteredTitles, state.ratingFilter)

            if (state.sortBy !== null)
                filteredTitles = sortTitles(filteredTitles, state.sortBy.type, state.sortBy.order)

            return updateState(state, { genreFilters: genreFilters, titles: filteredTitles })     // update the state

        case actionTypes.SET_RATING_FILTER:
            const rating = action.payload.rating    // rating is n/a or an int in [0 .. 4] stars (not actual score)

            // perform rating filter on original titles
            filteredTitles = ratingFilterHandler(state.originalTitles, rating)

            // apply other filters as well
            if (genreFilters.length !== 0)
                filteredTitles = genreFilterHandler(filteredTitles, genreFilters)

            if (state.sortBy !== null)
                filteredTitles = sortTitles(filteredTitles, state.sortBy.type, state.sortBy.order)

            return updateState(state, { ratingFilter: rating, titles: filteredTitles })

        case actionTypes.SORT_BY:
            const type = action.payload.type
            const order = action.payload.order
            const sortedTitles = sortTitles(state.titles, type, order)
            return updateState(state, { titles: sortedTitles, sortBy: { type: type, order: order } })
        default:
            return state
    }
}

export default MediaReducer


const ratingFilterHandler = (titles, rating) => {
    if (rating === 'na')
        return titles.filter(item => item.score === 'N/A')
    else
        return titles.filter(item => parseFloat(item.score) >= (rating * 2))

}

const genreFilterHandler = (titles, genreFilters) => {
    return titles.filter(item => {
        // return item if every genre in the filters is present in the item genres array
        return genreFilters.every(genre => item.genres.includes(genre))
    })
}

const sortTitles = (titles, type, order) => {
    // possible sorts includes Rating (asc/dedc) and Realease (asc/desc)
    return mergeSort(titles, type, order)
}

const mergeSort = (titles, type, order) => {
    if (titles.length < 2) return titles

    const mid = Math.floor(titles.length / 2)
    const left = titles.slice(0, mid)
    const right = titles.slice(mid, titles.length)
    const sorted_left = mergeSort(left, type, order)
    const sorted_right = mergeSort(right, type, order)

    return mergeArray(sorted_left, sorted_right, type, order)
}

const mergeArray = (left, right, type, order) => {
    const mergedArr = []

    if (type === 'rating') {
        while (left.length && right.length) {   // while both arrays' lengths are not 0
            // set score to -1 if N/A to compare it
            const scoreL = left[0].score === 'N/A' ? -1 : parseFloat(left[0].score)
            const scoreR = right[0].score === 'N/A' ? -1 : parseFloat(right[0].score)

            // (asc) if scoreL < scoreR, remove that item from left and add it to mergedArray, and vice versa
            if (order === 'asc')
                mergedArr.push(scoreL < scoreR ? left.shift() : right.shift())
            else
                mergedArr.push(scoreL > scoreR ? left.shift() : right.shift())
        }
    }
    // type = date
    else {
        while (left.length && right.length) {
            const releasedL = left[0].released === 'N/A' ? -1 : parseInt(left[0].released)
            const releasedR = right[0].released === 'N/A' ? -1 : parseInt(right[0].released)

            if (order === 'asc')
                mergedArr.push(releasedL < releasedR ? left.shift() : right.shift())
            else
                mergedArr.push(releasedL > releasedR ? left.shift() : right.shift())
        }
    }

    // if the arrays still have values, push them to the end of mergedArr
    while (left.length)
        mergedArr.push(left.shift())
    while (right.length)
        mergedArr.push(right.shift())

    return mergedArr

}
