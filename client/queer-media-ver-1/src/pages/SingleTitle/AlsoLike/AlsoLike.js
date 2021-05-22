import React, { useState, useEffect } from 'react';

import axios from '../../../axios'
import { Link } from 'react-router-dom'
import Spinner from '../../../common/components/UI/Spinner/Spinner';
import notFound from '../../../assets/images/notfound.jpg'
import './AlsoLike.css'

const AlsoLike = (props) => {
    const [titles, setTitles] = useState(null)

    useEffect(() => {
        console.log('[ALSO LIKE]');
        let genres = props.genres.join('+')
        if (props.genres.includes("n/a") || props.genres.includes("film-noir")) {
            genres = "others"
        }
        axios.get('genres/multiple/' + genres)
            .then(res => {
                const titles = res.data;
                setTitles(titles)

            })
            .catch(err => console.error(err))
    }, [props.genres])

    let content = ''
    if (titles) {
        content = titles.map(item => {
            let year = item.released + (item.year_end === 0 ? '' : ' - ' + item.year_end)
            return (
                <div className="AlsoLikeItem" key={item.media_id}>
                    <Link to={"/media/" + item.media_id}>
                        <p className="AlsoLikeScore">{(item.score_imdb === 'N/A') ? '__' : item.score_imdb}</p>
                        <img className="AlsoLikeImage"
                            src={item.poster_url}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = notFound
                            }}
                            alt={item.title + "-poster"} />
                        <p className="title">{item.title + " (" + year + ")"}</p>
                    </Link>
                </div>)
        })

    }

    return (titles == null) ? (
        <Spinner />
    ) : (
        <div className="AlsoLike">
            {content}
        </div>
    );
}

export default AlsoLike;
