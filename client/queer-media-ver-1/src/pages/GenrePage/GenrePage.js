import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import './GenrePage.css'
import ListPaginate from '../../common/components/ListPaginate/ListPaginate';
import Spinner from '../../common/components/UI/Spinner/Spinner'


const Genre = (props) => {

    const [genre, setGenre] = useState('')
    const [titles, setTitles] = useState(null)

    useEffect(() => {
        const genre = props.genre
        let titles = []
        const search_url = 'genres/' + genre;

        axios.get(search_url)
            .then(res => {
                titles = res.data;
                // since the first titles are always animation w/ any genre -> viewer can be confused
                // => swap first 5 for the next 5
                const first_5 = titles.slice(0, 5)
                const next_5 = titles.slice(5, 10)
                titles = next_5.concat(first_5).concat(titles.slice(10))
                setGenre(genre)
                setTitles(titles)

            })
            .catch(err => console.log(err))
    }, []);

    return !titles ? (
        <Spinner />
    ) : (
            <div className="GenrePage">
                <h1>Genre {genre} </h1>
                <ListPaginate titles={titles} />

            </div>
        );

}

export default Genre;