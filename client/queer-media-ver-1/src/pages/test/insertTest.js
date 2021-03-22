import React, { useState, useEffect } from 'react';
import axios from '../../axios'
import Spinner from '../../common/components/UI/Spinner/Spinner';

const InsertTest = () => {

    const [titleDetails, setTitleDetails] = useState(null)


    useEffect(() => {
        const title = 'I care a lot'
        const type = 'movie'
        const rated = 'R'
        const released = '2021'
        const yearEnd = '0'
        const plot = "Marla and Fran's relationship "
        const posterUrl = 'someURL.jpg'
        const runtime = '148'
        const imdbTitle = '9893250'
        const languages = ['English', 'French']

        const genres = ['crime', 'thriller', 'comedy']
        const reviewers = [['imdb', '7.6', '23223'], ['rotten tomatoes','75', '1231'], ['metacritic', '81', '45454']]
        const artists = ['Rosamund Pike', 'Eiza Gonzalez', 'Peter Dinklage']
        const directors = ['J Blakeson']

        setTitleDetails({
            title: title, type: type, rated: rated,
            released: released, yearEnd: yearEnd, plot: plot,
            posterUrl: posterUrl, runtime: runtime, imdbTitle: imdbTitle,
            reviewers: reviewers, languages: languages, genres: genres,
            directors: directors, artists: artists
        })
    }, [])

    const insertRecord = () => {
        axios.post('admin/create-media', { titleDetails: titleDetails })
            .then(response => console.log(response))
            .catch(err => console.error(err))
    }

    return (!titleDetails) ? <Spinner /> : (
        <div className="InsertTest">
            <h1>Insert Test</h1>
            {Object.keys(titleDetails).map(key =>
                <div>
                    <p>{key}: {titleDetails[key]}</p>
                </div>
            )}
            <button onClick={insertRecord}>Insert</button>

            {/* {titleDetails.forEach(item => <li>{item}</li>)} */}
        </div>
    );
}

export default InsertTest;