import React, { Component, useEffect, useState } from 'react';
import axios from '../../axios';
import { config_1 } from '../../config'
import { Link, useHistory } from 'react-router-dom'

import TrailerEmbed from './TrailerEmbed/TrailerEmbed'
import notFound from '../../assets/images/notfound.jpg'
import Spinner from '../../common/components/UI/Spinner/Spinner'
import blank_user from '../../assets/images/blank_user.png'
import Error from '../ErrorPage/Error'
import AlsoLike from './AlsoLike/AlsoLike';

import {
    not_applicable, rating_0, rating_0_5, rating_1,
    rating_1_5, rating_2, rating_2_5, rating_3,
    rating_3_5, rating_4, rating_4_5, rating_5,
    imdb, metacritic, tomato
} from '../../common/components/Lists/ratings'
import './SingleTitle.css'
import { useSelector } from 'react-redux';



// let proxyurl = "https://cors-anywhere.herokuapp.com/";
// proxyurl = ""
// const url = proxyurl + "https://serpapi.com/search.json?"
// const API_KEY = config_1.KEY


const SingleTitle = (props) => {
    const [isExist, setExist] = useState(null)
    const [titleDetails, setTitleDetails] = useState(null)

    const userRole = useSelector(state => state.auth.role)
    const history = useHistory()

    const getRatingStars = (score, decimal = false) => {
        if (score.toUpperCase === "N/A")
            return not_applicable

        score = decimal ? Math.round(score) : Math.round(score / 10)  // round to the nearest int in (0, 10)

        switch (score) {
            case 0: return rating_0
            case 1: return rating_0_5
            case 2: return rating_1
            case 3: return rating_1_5
            case 4: return rating_2
            case 5: return rating_2_5
            case 6: return rating_3
            case 7: return rating_3_5
            case 8: return rating_4
            case 9: return rating_4_5
            case 10: return rating_5
            default: return not_applicable
        }
    }


    useEffect(() => {
        axios.get('media/full/' + props.match.params.media_id)
            .then(res => {
                if (res.data === "")
                    setExist(false)
                else {
                    const media = res.data.media
                    console.log(res.data);
                    // artists_names = (res.data.artists)

                    setTitleDetails({
                        media_id: media.media_id, title: media.title, runtime: media.runtime,
                        rated: media.rated, released: media.released, plot: media.plot,
                        poster_url: media.poster_url, type: media.type, year_end: media.year_end,
                        languages: media.languages, imdb_url: media.imdb_url, genres: res.data.genres,
                        artists: res.data.artists, reviewers: res.data.reviewers, directors: res.data.directors
                    })
                    setExist(true)

                }
            })
            .catch(err => console.error(err))
    }, [ props.match.params.media_id])

    const updateBtnHandler = () => {
        history.push({
            pathname: '/upsert-media/update',
            state: {titleDetails: titleDetails}
        })
    }

    const AdminBtns = () => {
        if (userRole === 'admin')
            return (
                <div className="AdminBtns">
                    <button onClick={updateBtnHandler}>Update</button>
                    <button>Delete</button>
                </div>
            )
    }

    const getContent = () => {
        if (!isExist)
            return <Error />
        else {
            let directors = titleDetails.directors.map(director => director.name)     // get directors' names
            let review_scores = titleDetails.reviewers.map(review => {        // format the ratings
                let review_img = (review.name === "imdb") ? imdb : (review.name === "metacritic") ? metacritic : tomato
                return (
                    <div className="SingleTitleReviewer" key={titleDetails.media_id + "-" + review.name}>
                        <a href={titleDetails.imdb_url} target="_blank" rel="noreferrer"><img src={review_img} alt={review.name + " logo"}></img></a>
                        <img
                            src={getRatingStars(review.score, review.name === "imdb")}
                            alt={review.name + " rating"}></img>
                    </div>
                )
            })

            const year = titleDetails.released + (titleDetails.year_end === 0 ? '' : ' - ' + titleDetails.year_end)

            return (
                <div className="SingleTitle">
                    <div className="GeneralInfo">
                        <div className="GeneralInfoImg">
                            <img
                                src={titleDetails.poster_url}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = notFound
                                }}
                                alt={titleDetails.title + " poster"} />
                        </div>

                        <h2 className="MediaTitleSm">{titleDetails.title}</h2>


                        <div className="GeneralInfoText">
                            <h2 className="MediaTitle">{titleDetails.title}</h2>
                            <div className="GeneralInfoRatings">
                                {review_scores}
                            </div>
                            <p><span>Type</span>: {titleDetails.type}</p>
                            <p><span>Rated</span>: {titleDetails.rated}</p>
                            <p><span>Year</span>: {year}</p>
                            <p><span>Directors</span>: {directors.join(", ")}</p>
                            <p><span>Genres</span>: {titleDetails.genres.join(", ")}</p>
                            <p><span>Languages</span>: {titleDetails.languages.join(", ")}</p>
                            {AdminBtns()}
                        </div>
                    </div>

                    <div className="TitleMainContent">

                        <div className="SingleTitleArtists">
                            {titleDetails.artists.map(artist =>
                                <div className="SingleTitleArtist" key={artist.name}>
                                    {/* <img src={artist.img_url} alt={artist.name + " profile picture"}></img> */}
                                    <Link to={'/artist/' + artist.artist_id}>
                                        <img src={blank_user} alt={artist.name + " profile picture"}></img>
                                        <p>{artist.name}</p>
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="SingleTitlePlot">
                            <h3>Plot Summary</h3>
                            <p>{titleDetails.plot}</p>
                        </div>

                        {/* <div className="SingleTitleTrailer">
                            <h3>Trailer</h3>
                            <TrailerEmbed titleName={titleDetails.title} />
                        </div> */}

                        <div className="RelatedTitles">
                            <h3>You may also like</h3>
                            <AlsoLike genres={titleDetails.genres} />
                        </div>

                        <div className="Comments">
                            <h3>Comments</h3>
                        </div>
                    </div>
                </div>

            )
        }
    }





    return (isExist == null) ? (
        <Spinner />
    ) : (
            <React.Fragment>
                {getContent()}
            </React.Fragment>
        );

}

export default SingleTitle;