import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../../store/actions/index'
import * as AdminInputs from './InputFields'
import '../AdminPages.css'

const TitleForm = (props) => {
    const dispatch = useDispatch()
    const titleDetails = props.titleDetails
    const currentType = useSelector(state => state.admin.mediaType)
    const ratings = useSelector(state => state.admin.ratings)
    const type = titleDetails.type;
    const rated = titleDetails.rated.replaceAll('-', '_')

    useEffect(() => {
        if (type !== '' && type !== currentType) {
            dispatch(actionCreators.updateRatings(type))
        }
    })

    console.log(titleDetails);

    // when type (movie, series) changes, update the ratings (PG, P, TV,...)
    const typeChangeHandler = (event) => {
        const mediaType = event.target.value
        dispatch(actionCreators.updateRatings(mediaType))
    }

    const getRating = (reviewer) => {
        const rev = titleDetails.reviewers.find(rev => rev.name === reviewer)
        return rev ? rev.score : ''
    }

    const getVotes = (reviewer) => {
        const rev = titleDetails.reviewers.find(rev => rev.name === reviewer)
        return rev ? rev.votes : '0'
    }

    const clearAllHandler = (event) => {
        event.preventDefault();
        const inputs = document.querySelectorAll(".AdminInput input, .AdminInput textarea")
        inputs.forEach(input => {
            input.value = ''
        })
    }



    return (
        <form onSubmit={props.submitHandler}>
            {/* Title */}
            <div className="AdminInput">
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" maxLength="255" defaultValue={titleDetails.title}
                    placeholder="e.g. I Care a Lot" required />
            </div>

            {/* Type */}
            <div className="AdminInput">
                <label htmlFor="type">Type: </label>
                <select name="type" id="type" onChange={typeChangeHandler} defaultValue={currentType} required>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>
            </div>

            {/* Rated */}
            <div className="AdminInput">
                <label htmlFor="rated">Rated: </label>
                <select name="rated" id="rated" defaultValue={rated}>
                    {ratings.map(kv => {
                        const rated = Object.keys(kv)[0]
                        const description = kv[rated]
                        return <option value={rated} key={rated}>{rated.replaceAll("_", "-")} - {description}</option>
                    })}
                </select>
            </div>

            {/* Released  */}
            <div className="AdminInput">
                <label htmlFor="released">Year Released: </label>
                <input type="number" name="released" id="released" placeholder="2020"
                    defaultValue={titleDetails.released}
                    min="1900" max={new Date().getFullYear.toString()} required />
            </div>

            {/* Year end */}
            <div className="AdminInput">
                <label htmlFor="yearEnd">Year End: </label>
                <input type="number" name="yearEnd" id="yearEnd" placeholder="2020"
                    defaultValue={titleDetails.year_end === 0 ? '' : titleDetails.year_end}
                    min="1900" max={new Date().getFullYear.toString()} />
            </div>

            {/* Plot */}
            <div className="AdminInput Plot" style={{ verticalAlign: "bottom" }}>
                <label htmlFor="plot">Plot: </label>
                <textarea name="plot" id="plot" rows="3" maxLength='5500'
                    defaultValue={titleDetails.plot}
                    placeholder="Plot summary of the title without spoiler. Max length 5500 characters" required></textarea>
            </div>

            {/* Poster Url */}
            <div className="AdminInput">
                <label htmlFor="posterUrl">Poster Link: </label>
                <input type="url" id="posterUrl" pattern=".+\.((jpg)|(png)|(jpeg))"
                    defaultValue={titleDetails.poster_url}
                    title="Must be a url and end with jpg, jpeg or png"
                    placeholder="Poster link in image format (.png, .jpg, .jpeg)" required />
            </div>

            {/* Runtime */}
            <div className="AdminInput">
                <label htmlFor="runtime">Runtime (minutes):  </label>
                <input type="number" id="runtime" min="0" placeholder='123'
                    defaultValue={titleDetails.runtime} required />
            </div>

            {/* IMDB title code */}
            <div className="AdminInput">
                <label htmlFor="imdbTitle">IMDB Title Code: </label>
                <input type="text" name="imdbTitle" id="imdbTitle"
                    pattern="\d{7}|\d{8}" defaultValue={titleDetails.imdb_url.substring(29, 37)}
                    title="Must contains 7 or 8 numbers"
                    placeholder="E.g. 9893250" required />
            </div>

            {/* IMDB Score */}
            <div className="AdminInput">
                <label htmlFor="imdbScore">IMDB Score & Votes:  </label>
                <div className="ReviewersRatings">
                    <input type="text" id="imdbScore" placeholder='6.8'
                        pattern="\d|(\d\.\d)|(N\/A)"
                        title="Must be a decimal or whole number from 0-10, or N/A"
                        defaultValue={getRating('imdb')} required />
                    <input type="number" id="imdbVotes" placeholder="12333"
                        min='0' defaultValue={getVotes('imdb')} required
                    />
                </div>
            </div>

            {/* Rotten Tomatoes Score */}
            <div className="AdminInput ">
                <label htmlFor="tomatoScore">Rot.Tomatoes Score & Votes:  </label>
                <div className="ReviewersRatings">
                    <input type="text" id="tomatoScore" placeholder='91'
                        pattern="(\d{1,2})|(100)|()"
                        title="Must be a number from 0-100, or leave blank"
                        defaultValue={getRating('rotten tomatoes')} />
                    <input type="number" id="tomatoVotes" placeholder="12333"
                        min='0' defaultValue={getVotes('rotten tomatoes')} required
                    />
                </div>
            </div>

            {/* Meta Critic Score */}
            <div className="AdminInput">
                <label htmlFor="metacriticScore">Metacritic Score & Votes:  </label>
                <div className="ReviewersRatings">
                    <input type="number" id="metacriticScore" placeholder='75'
                        pattern="(\d{1,2})|(100)|()"
                        title="Must be a number from 0-100, or leave blank"
                        defaultValue={getRating('metacritic')} />
                    <input type="number" id="metacriticVotes" placeholder="12333"
                        min='0' defaultValue={getVotes('metacritic')} required
                    />
                </div>
            </div>

            <AdminInputs.AddableInputs type='language' values={titleDetails.languages} />
            <AdminInputs.GenreInputs values={titleDetails.genres} />
            <AdminInputs.AddableInputs type='artist' values={titleDetails.artists.map(item => item.name)} />
            <AdminInputs.AddableInputs type='director' values={titleDetails.directors.map(item => item.name)} />


            <div className="FormButtons">
                <div className="AdminBtn ClearAllBtn">
                    <button onClick={clearAllHandler}>CLEAR ALL</button>
                </div>
                <div className="AdminBtn ConfirmBtn">
                    <button>CONFIRM</button>
                </div>
            </div>

        </form>
    );
}



export default TitleForm;