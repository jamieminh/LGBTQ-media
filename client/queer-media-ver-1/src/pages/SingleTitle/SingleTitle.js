import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useHistory } from 'react-router-dom'
import TrailerEmbed from './TrailerEmbed/TrailerEmbed'
import notFound from '../../assets/images/notfound.jpg'
import Spinner from '../../common/components/UI/Spinner/Spinner'
import Error from '../ErrorPage/Error'
import AlsoLike from './AlsoLike/AlsoLike';
import Comments from './Comments/Comments'

import {
    not_applicable, rating_0, rating_0_5, rating_1,
    rating_1_5, rating_2, rating_2_5, rating_3,
    rating_3_5, rating_4, rating_4_5, rating_5,
    imdb, metacritic, tomato
} from '../../common/components/Lists/ratings'
import './SingleTitle.css'
import { useSelector } from 'react-redux';
import UserVote from './UserVote/UserVote';
import PageTitle from '../../common/components/PageTitle/PageTitle';
import FeaturedArtists from './FeaturedArtists/FeaturedArtists';


const SingleTitle = (props) => {
    const [isExist, setExist] = useState(null)
    const [titleDetails, setTitleDetails] = useState(null)
    const media_id = props.match.params.media_id

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
        let isSubscribed = true     // cleanup unmounted component
        let artists = null
        let title_info = null
        let exist = false
        axios.get('media/full/' + media_id)
            .then(res => {
                if (isSubscribed) {
                    if (res.data !== "") {
                        const media = res.data.media
                        artists = res.data.artists

                        title_info = {
                            media_id: media.media_id, title: media.title, runtime: media.runtime,
                            rated: media.rated, released: media.released, plot: media.plot,
                            poster_url: media.poster_url, type: media.type, year_end: media.year_end,
                            languages: media.languages, imdb_url: media.imdb_url, genres: res.data.genres,
                            artists: res.data.artists, reviewers: res.data.reviewers, directors: res.data.directors
                        }
                        exist = true

                        setTitleDetails(title_info)
                        setExist(true)
                    }
                }

            })

            // get artists images
            // .then(_ => {
            //     if (exist) {
            //         let requests = artists.map(artist => {
            //             return axios.get('http://localhost:4000/artist/image', { params: { name: artist.name, id: artist.artist_id } })
            //         })

            //         axios.all(requests)
            //             .then(responses => {
            //                 let artists = responses.map(r => r.data)
            //                 setTitleDetails({ ...title_info, artists: artists })
            //                 setExist(exist)
            //             })
            //             .catch(err => console.log(err))
            //     }

            // })
            .then(_ => console.log(titleDetails))
            .catch(err => {
                if (isSubscribed)
                    console.error(err)
            })

        return () => (isSubscribed = false)
    }, [media_id])


    const updateBtnHandler = () => {
        history.push({
            pathname: '/upsert-media/update',
            state: { titleDetails: titleDetails, media_id: media_id }
        })
    }

    const deleteHandler = () => {
        history.push({
            pathname: '/delete-media',
            state: { media_id: titleDetails.media_id, title: titleDetails.title }
        })
    }

    const AdminBtns = () => {
        if (userRole === 'admin')
            return (
                <div className="AdminBtns">
                    <button onClick={updateBtnHandler}>Update</button>
                    <button onClick={deleteHandler}><i className="fas fa-exclamation-triangle"></i>Delete</button>
                </div>
            )
    }

    const getContent = () => {
        if (!isExist)
            return <Error />
        else {
            let directors = titleDetails.directors.map(director => director.name)     // get directors' names
            let review_scores = titleDetails.reviewers.map(review => {                // format the ratings
                let review_img = (review.name === "imdb") ? imdb : (review.name === "metacritic") ? metacritic : tomato
                let img = (review.name === "imdb") ?
                    <a href={titleDetails.imdb_url} target="_blank" rel="noreferrer">
                        <img src={review_img} alt={review.name + " logo"}></img>
                    </a> :
                    <img src={review_img} alt={review.name + " logo"}></img>
                return (
                    <div className="SingleTitleReviewer" key={titleDetails.media_id + "-" + review.name}>
                        {img}
                        <img
                            src={getRatingStars(review.score, review.name === "imdb")}
                            alt={review.name + " rating"}></img>
                        <p>{review.votes} votes</p>
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

                        <h1 className="MediaTitleSm">{titleDetails.title}</h1>


                        <div className="GeneralInfoText">
                            <h1 className="MediaTitle">{titleDetails.title}</h1>
                            <div className="GeneralInfoRatings">
                                {review_scores}
                                <UserVote media_id={media_id} />
                            </div>
                            <p><span>Type</span>: {titleDetails.type}</p>
                            <p><span>Rated</span>: {titleDetails.rated}</p>
                            <p><span>Year</span>: {year}</p>
                            <p><span>Directors</span>: {directors.join(", ")}</p>
                            <p><span>Genres</span>: {titleDetails.genres.join(", ")}</p>
                            <p><span>Languages</span>: {titleDetails.languages.join(", ")}</p>
                        </div>
                    </div>

                    {AdminBtns()}

                    <div className="TitleMainContent">
                        <div className="FeaturedArtists">
                            <h2>Featured artists</h2>
                            <FeaturedArtists artists={titleDetails.artists} />
                        </div>

                        {/* <div className="SingleTitleArtists">
                            {titleDetails.artists.map(artist =>
                                <div className="SingleTitleArtist" key={artist[0]}>
                                    <Link to={'/artist/' + artist[0]}>
                                        <img src={artist[2]} alt={artist[1] + " profile picture"}></img>
                                        <p>{artist[1]}</p>
                                    </Link>
                                </div>
                            )}
                        </div> */}

                        <div className="SingleTitlePlot">
                            <h2>Plot Summary</h2>
                            <p>{titleDetails.plot}</p>
                        </div>

                        {/* <div className="SingleTitleTrailer">
                            <h2>Trailer</h2>
                            <TrailerEmbed titleName={titleDetails.title} />
                        </div> */}


                        <div className="RelatedTitles">
                            <h2>You may also like</h2>
                            <AlsoLike genres={titleDetails.genres} />
                        </div>

                        <Comments media_id={media_id} />

                    </div>
                </div>

            )
        }
    }





    return (isExist == null) ? (
        <Spinner />
    ) : (
        <React.Fragment>
            <PageTitle title={titleDetails.title} />
            {getContent()}
        </React.Fragment>
    );

}

export default SingleTitle;