import React, { useState } from 'react';
import allGenres from '../../../common/components/Lists/genres'


export const GenreInputs = (props) => {
    const values = props.values   // if the page is 'update', this array length > 0
    const [count, setCount] = useState(values ? values.length : 1)

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
                        <select name="genres" className="AdminInput_genre" 
                        id={"genresInput_" + ind} defaultValue={values ? values[ind] : ''}>
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
    const type = props.type
    const max = (type === 'artist') ? 5 : (type === 'language') ? 3 : 2
    const values = props.values   // if the page is 'update', this array length > 0
    const [count, setCount] = useState(values ? values.length : 1)

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
                {[...Array(count).keys()].map(ind =>
                    <li key={type + "_" + ind}>
                        <AnAddable type={type} index={ind} value={values ? values[ind] : ''} />
                    </li>)}
            </ul>
            <button className="AddableBtn" onClick={addableHandler}>+</button>
            <button className="AddableBtn RemoveAddableBtn" onClick={removeAddableHandler}>-</button>
        </div>
    )
}


const AnAddable = (props) => {
    return <input type="text" className={'AdminInput_' + props.type}
        name={props.type} id={props.type + "_" + props.index}
        defaultValue={props.value}
        placeholder={props.type + " name"} required />
}

