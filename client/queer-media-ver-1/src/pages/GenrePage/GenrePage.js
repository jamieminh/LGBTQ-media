import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './GenrePage.css'
import ListPaginate from '../../common/components/ListPaginate/ListPaginate';
import Spinner from '../../common/components/UI/Spinner/Spinner'
import Filter from '../../common/components/Filter/Filter'
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index'


const Genre = (props) => {
    const titles = useSelector(state => state.media.titles)
    const [genre, setGenre] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const genre = props.genre
        let titles = []
        const search_url = 'genres/' + genre;
        // reset store titles because when this function fires, user likely came from another page
        dispatch(actionCreators.resetTitles())  

        axios.get(search_url)
            .then(res => {
                titles = res.data;
                // since the first titles are always animation w/ any genre -> viewer can be confused
                // => swap first 5 for the next 5
                const first_5 = titles.slice(0, 5)
                const next_5 = titles.slice(5, 10)
                titles = next_5.concat(first_5).concat(titles.slice(10))
                setGenre(genre)
                dispatch(actionCreators.setTitles(titles))

            })
            .catch(err => console.log(err))
    }, [dispatch, props.genre]);

    return !titles ? (
        <Spinner />
    ) : (
        <div className="GenrePage">
            <h1>Genre {genre} </h1>
            <div className="GenrePageContent">
                <ListPaginate titles={titles} />
                <Filter isGenre={true} />
            </div>
        </div>
    );

}

export default Genre;