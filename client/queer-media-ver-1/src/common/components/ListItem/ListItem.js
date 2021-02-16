import React from 'react';
import { Link } from 'react-router-dom'
import notFound from '../../../assets/images/notfound.jpg'
import './ListItem.css'

const ListItem = (props) => {
    const result = {
        media_id: props.mediaInfo.media_id,
        title: props.mediaInfo.title,
        released: props.mediaInfo.released,
        year_end: props.mediaInfo.year_end,
        poster: props.mediaInfo.poster_url,
        score: props.mediaInfo.score
    }


    const year = "(" + result.released + (result.year_end === 0 ? ")" : " - " + result.year_end + ")")

    return (
        <div className="ListItem" key={result.media_id}>
            <Link to={"/media/" + result.media_id}>
                <p className="ListItemScore">{(result.score === 'N/A') ? '__' : result.score}</p>
                <img className="ListItemImg"
                    src={result.poster}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = notFound
                    }}
                    alt={result.title + "-poster"} />
                <p className="ListItemTitle">{result.title} {year}</p>
            </Link>
        </div>

    );
}

export default ListItem;