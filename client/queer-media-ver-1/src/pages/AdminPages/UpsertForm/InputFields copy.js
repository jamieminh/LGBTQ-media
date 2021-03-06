import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../../store/actions/index'
import allGenres from '../../../common/components/Lists/genres'

export const titleInput = () => {
    return (
        <div className="AdminInput">
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" placeholder="e.g. I Care a Lot" required />
        </div>
    )
}

export const TypeInput = () => {
    const dispatch = useDispatch()

    const typeChangeHandler = (event) => {
        const mediaType = event.target.value
        dispatch(actionCreators.updateRatings(mediaType))
    }
    return (
        <div className="AdminInput">
            <label htmlFor="type">Type: </label>
            <select name="type" id="type" onChange={typeChangeHandler} required>
                <option value="movie" defaultValue>Movie</option>
                <option value="series">Series</option>
            </select>
        </div>
    )
}

export const RatedInput = () => {
    const ratings = useSelector(state => state.admin.ratings)
    console.log(ratings);
    return (
        <div className="AdminInput">
            <label htmlFor="rated">Rated: </label>
            <select name="rated" id="rated">
                {ratings.map(kv => {
                    const rated = Object.keys(kv)[0]
                    const description = kv[rated]
                    return <option value={rated} key={rated}>{rated.replaceAll("_", "-")} - {description}</option>
                })}
            </select>
        </div>
    )
}

export const releasedInput = () => {
    return (
        <div className="AdminInput">
            <label htmlFor="released">Released: </label>
            <input type="number" name="released" id="released" placeholder="2020"
                min="1900" max={new Date().getFullYear.toString()} required />
        </div>
    )
}

export const yearEndInput = () => {
    return (
        <div className="AdminInput">
            <label htmlFor="yearEnd">Year End: </label>
            <input type="number" name="yearEnd" id="yearEnd" placeholder="2020"
                min="1900" max={new Date().getFullYear.toString()} />
        </div>
    )
}

export const plotInput = () => {
    return (
        <div className="AdminInput Plot" style={{ verticalAlign: "bottom" }}>
            <label htmlFor="plot">Plot: </label>
            <textarea name="plot" id="plot" cols="30" rows="3"
                placeholder="Plot summary of the title without spoiler" required></textarea>
        </div>
    )
}


export const posterUrl = () => {
    return (
        <div className="AdminInput">
            <label htmlFor="posterUrl">Poster Link: </label>
            <input type="url" id="posterUrl" pattern=".+\.((jpg)|(png)|(jpeg)"
                title="Must be a url and end with jpg, jpeg or png"
                placeholder="Poster link in image format (.png, .jpg, .jpeg)" required />
        </div>
    )
}


export const runtimeInput = () => {
    return (
        <div className="AdminInput">
            <label htmlFor="runtime">Runtime: </label>
            <input type="number" id="runtime" min="1" placeholder='123' required />
            <p>(minutes)</p>
        </div>
    )
}

export const imdbTitle = () => {
    return (
        <div className="AdminInput">
            <label htmlFor="imdbTitle">IMDB Title Code: </label>
            <input type="number" name="imdbTitle" id="imdbTitle" 
                min="1000000" max="99999999" pattern="\d{7}|\d{8}"
                title="Must contains 7 or 8 numbers"
                placeholder="E.g. 9893250" required />
        </div>
    )
}


export const GenreInputs = () => {
    const [count, setCount] = useState(1)

    const addableHandler = (event) => {
        event.preventDefault();
        if (count !== 4)
            setCount(count + 1)
    }

    const removeAddableHandler = (event) => {
        event.preventDefault();
        if (count > 1)
            setCount(count - 1)
    }

    return (
        <div className="AdminInput AddableInputs">
            <label htmlFor="genre">Genres: </label>
            <ul>
                {[...Array(count).keys()].map(ind =>
                    <li key={"genresInput_" + ind}>
                        <select name="genres" id={"genresInput_" + ind}>
                            {allGenres.map(item => {
                                return <option value={item} key={'genre_' + item}>{item}</option>
                            })}
                        </select>
                    </li>)}
            </ul>
            <button className="AddableBtn" onClick={addableHandler}>+</button>
            <button className="AddableBtn RemoveAddableBtn" onClick={removeAddableHandler}>-</button>

        </div>
    )
}

export const AddableInputs = (props) => {
    const [count, setCount] = useState(1)
    const type = props.type
    const max = (type === 'artist') ? 5 : 3

    const addableHandler = (event) => {
        event.preventDefault();
        if (count < max)
            setCount(count + 1)
    }

    const removeAddableHandler = (event) => {
        event.preventDefault();
        if (count > 1)
            setCount(count - 1)
    }

    return (
        <div className="AdminInput AddableInputs">
            <label htmlFor={type}>{type + 's'}: </label>
            <ul>
                {[...Array(count).keys()].map(ind => <li key={type + "_" + ind}><AnAddable type={type} index={ind} /></li>)}
            </ul>
            <button className="AddableBtn" onClick={addableHandler}>+</button>
            <button className="AddableBtn RemoveAddableBtn" onClick={removeAddableHandler}>-</button>
        </div>
    )
}


const AnAddable = (props) => {
    return <input type="text" name={props.type} id={props.type + "_" + props.index}
        placeholder={props.type + " name"} required />
}

export const SubmitButton = (props) => {
    const submitHandler = (event) => {
        event.preventDefault();
        console.log("confirm button clicked");
        const ids = ['title', 'type', 'rated', 'released', 'yearEnd', 'plot', 'posterUrl', 'runtime', 'imdbTitle']
        const values = ids.map(id => document.getElementById(id).value)
        console.log(values);

    }

    return (
        <div className="AdminInput AdminBtn ConfirmBtn">
            <input type="submit" onClick={submitHandler} value="CONFIRM"/>
        </div>
    )
}

export const ClearAllButton = () => {
    const clearAllHandler = (event) => {
        event.preventDefault();
        const inputs = document.querySelectorAll(".AdminInput input, .AdminInput textarea")
        console.log(inputs);
        inputs.forEach(input => {
            input.value = ''
        })
    }

    return (
        <div className="AdminInput AdminBtn ClearAllBtn">
            <button onClick={clearAllHandler}>CLEAR ALL</button>
        </div>
    )
}

