import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './GenrePage.css'
import ListPaginate from '../../common/components/ListPaginate/ListPaginate';
import Spinner from '../../common/components/UI/Spinner/Spinner'
import Filter from '../../common/components/Filter/Filter'
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index'
import PageTitle from '../../common/components/PageTitle/PageTitle';


const Genre = (props) => {
    const titles = useSelector(state => state.media.titles)
    const [genre, setGenre] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const genre = props.genre
        let titles = []
        const search_url = 'genres/' + genre;
        console.log(genre);
        // reset store titles because when this function fires, user likely came from another page
        dispatch(actionCreators.resetTitles())  

        axios.get(search_url)
            .then(res => {
                titles = res.data;
                setGenre(genre)
                dispatch(actionCreators.setTitles(titles))

            })
            .catch(err => console.log(err))
    }, [dispatch, props.genre]);

    return !titles ? (
        <Spinner />
    ) : (
        <div className="GenrePage">
            <PageTitle title={genre + " Genre"} cap="true"/>
            <h1>Genre {genre} </h1>
            <div className="GenrePageContent">
                <ListPaginate titles={titles} />
                <Filter isGenre={true} />
            </div>
        </div>
    );

}

export default Genre;