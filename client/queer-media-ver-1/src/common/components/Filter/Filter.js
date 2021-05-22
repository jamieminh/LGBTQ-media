import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../../store/actions/index'
import { rating_0, rating_1, rating_2, rating_3, rating_4, not_applicable }
    from '../Lists/ratings'

import allGenres from '../Lists/genres'
import './Filter.css'


const Filter = (props) => {
    const sortBy = useSelector(state => state.media.sortBy)
    var currentRating = "all"
    const dispatch = useDispatch()

    // function to handle genres filter by dispatching actions to the store
    const updateSelectedGenres = (cb) => {
        const genre = cb.target.value
        const checked = cb.target.checked
        if (checked)    // true means user has selected it
            dispatch(actionCreators.addGenreFilter(genre))
        else            // de-select
            dispatch(actionCreators.removeGenreFilter(genre))
    }

    // function to handle rating filter and sort by dispatching actions to the store
    const updateSelectedRadio = (rd) => {
        const radioName = rd.target.name;
        const id = rd.target.id;

        // sort by
        if (radioName === 'sort') {
            const [type, order] = id.split("_")
            dispatch(actionCreators.sortBy(type, order))
        }
        // filter by rating
        else {
            const score = id.split("_")[2]      // get the number of star (0 to 4)
            if (score !== currentRating) {
                dispatch(actionCreators.setRatingFilter(score))
                currentRating = score
            }
        }
    }

    //function to add classes to handle css of dropdowns
    const toggleHandler = (type) => {
        let toggler = ''
        let togglee = ''
        let rotateSibling = ''

        switch (type) {
            case 'rating':
                toggler = document.getElementById("RatingTogglerIcon");
                togglee = document.getElementById("FilterByRating")
                rotateSibling = document.getElementById("RatingRotateSibling")
                break
            case 'genre':
                toggler = document.getElementById("GenreTogglerIcon");
                togglee = document.getElementById("FilterByGenre")
                rotateSibling = document.getElementById("GenreRotateSibling")
                break
            default:
                toggler = document.getElementById("SortTogglerIcon");
                togglee = document.getElementById("SortBy")
                rotateSibling = document.getElementById("SortRotateSibling")
        }

        toggler.classList.toggle('rotate')
        togglee.classList.toggle('show')
        rotateSibling.classList.toggle('on')
    }

    const genresFilter = (!props.isGenre) ? allGenres.map(genre => (
        <div className="FiterGenre" key={"filter-by-" + genre}>
            <input type="checkbox" id={"filter-genre-" + genre} value={genre} onClick={updateSelectedGenres} />
            <label htmlFor={"filter-genre-" + genre}>{genre}</label>
        </div>
    )) : ''


    return (
        <div className="TitlesFilter">

            {/* Sort Titles by Release Date (asc/desc) or IMDB score (asc/desc) */}
            <div className="FilterToggler" onClick={() => toggleHandler('sort')}>
                <h3 id="SortRotateSibling" className="on">Sort by</h3>
                <i className="fas fa-caret-right icon-rotates rotate" id="SortTogglerIcon"></i>
            </div>

            <div id="SortBy" className="show">
                <div>
                    <input type="radio" name="sort" id="date_desc" onClick={updateSelectedRadio}
                        checked={(sortBy.type === 'date' && sortBy.order === 'desc')} readOnly />
                    <label htmlFor="date_desc">Release Date - Latest</label>
                </div>
                <div>
                    <input type="radio" name="sort" id="date_asc" onClick={updateSelectedRadio} />
                    <label for="date_asc">Release Date - Oldest</label>
                </div>
                <div>
                    <input type="radio" name="sort" id="rating_desc" onClick={updateSelectedRadio}
                        checked={(sortBy.type === 'rating' && sortBy.order === 'desc')} readOnly />
                    <label for="rating_desc">IMDB Score - Highest</label>
                </div>
                <div>
                    <input type="radio" name="sort" id="rating_asc" onClick={updateSelectedRadio} />
                    <label for="rating_asc">IMDB Score - Lowest</label>
                </div>
            </div>

            {/* Filter Titles by Ratings  */}
            <div className="FilterToggler" onClick={() => toggleHandler('rating')}>
                <h3 id="RatingRotateSibling">Filter by Rating</h3>
                <i className="fas fa-caret-right icon-rotates" id="RatingTogglerIcon"></i>
            </div>

            <div id="FilterByRating">
                <div className="RatingStars">
                    <input type="radio" value="all" name="rating" defaultChecked="true" id="filter_rating_all" onClick={updateSelectedRadio} />
                    <label for="filter_rating_all">All </label>
                </div>
                <div className="RatingStars">
                    <input type="radio" value="4" name="rating" id="filter_rating_4" onClick={updateSelectedRadio} />
                    <label for="filter_rating_4" >
                        <img src={rating_4} alt="filter-by-rating-4-starts"></img>
                        <span> & up</span>
                    </label>
                </div>
                <div className="RatingStars">
                    <input type="radio" value="3" name="rating" id="filter_rating_3" onClick={updateSelectedRadio} />
                    <label for="filter_rating_3">
                        <img src={rating_3} alt="filter-by-rating-3-starts"></img>
                        <span> & up</span>
                    </label>
                </div>
                <div className="RatingStars">
                    <input type="radio" value="2" name="rating" id="filter_rating_2" onClick={updateSelectedRadio} />
                    <label htmlFor="filter_rating_2">
                        <img src={rating_2} alt="filter-by-rating-2-starts"></img>
                        <span> & up</span>
                    </label>
                </div>
                <div className="RatingStars">
                    <input type="radio" value="1" name="rating" id="filter_rating_1" onClick={updateSelectedRadio} />
                    <label htmlFor="filter_rating_1">
                        <img src={rating_1} alt="filter-by-rating-1-starts"></img>
                        <span> & up</span>
                    </label>
                </div>
                <div className="RatingStars">
                    <input type="radio" value="0" name="rating" id="filter_rating_0" onClick={updateSelectedRadio} />
                    <label htmlFor="filter_rating_0">
                        <img src={rating_0} alt="filter-by-rating-0-starts"></img>
                        <span> & up</span>
                    </label>
                </div>
                <div className="RatingStars">
                    <input type="radio" value="na" name="rating" id="filter_rating_na" onClick={updateSelectedRadio} />
                    <label htmlFor="filter_rating_na">
                        <img src={not_applicable} alt="filter-by-rating-na"></img>
                    </label>
                </div>
            </div>

            {/* Filter titles by genres */}
            {(!props.isGenre) ?
                <div>
                    <div className="FilterToggler" onClick={() => toggleHandler('genre')}>
                        <h3 id="GenreRotateSibling">Filter by Genre</h3>
                        <i className="fas fa-caret-right icon-rotates" id="GenreTogglerIcon"></i>
                    </div>


                    <div id="FilterByGenre">
                        {genresFilter}
                    </div>
                </div> : ''
            }

        </div>
    );

}

export default Filter;