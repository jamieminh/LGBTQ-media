import React, { Component } from 'react';
import axios from 'axios';
import notFound from '../../assets/images/notfound.jpg'
import Spinner from '../../common/components/UI/Spinner/Spinner'
import './SingleTitle.css'
import { not_applicable, rating_0, rating_0_5, rating_1, 
        rating_1_5, rating_2, rating_2_5, rating_3, 
        rating_3_5, rating_4, rating_4_5, rating_5 } from './ratings'


class SingleTitle extends Component {
    state = {
        isExist: null,
        media_id: null,
        title: null,
        released: null,
        plot: null,
        poster_url: null,
        rated: null,
        type: null,
        year_end: null,
        languages: null,        // a list of languages as Strings
        genres: null,           // a list of genres as Strings
        reviewers: null,        // a list of reviewers {reviewer, score}
        artists: null,          // a list of artists {artist name, artist id}
        directors: null         // a list of directors {director name, director id}
    }


    componentDidMount() {
        axios.get('http://localhost:4000/media/full/' + this.props.match.params.media_id)
            .then(res => {
                if (res.data === "")
                    this.setState({ isExist: false })
                else {
                    const media = res.data.media
                    this.setState({
                        isExist: true, media_id: media.media_id, title: media.title, 
                        rated: media.rated, released: media.released, plot: media.plot, 
                        poster_url: media.poster_url, type: media.type, year_end: media.year_end, 
                        languages: media.languages, genres: res.data.genres, 
                        reviewers: res.data.reviewers, artists: res.data.artists, 
                        directors: res.data.directors
                    })
                }
            })
            .then(res => {
                if (isExist) {
                    axios.get
                }
            })
    }

    getRatingStars = (score, decimal = false) => {
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
        }
    }



    render() {

        var content = <p>We cannot find any information for whatever you are looking for</p>


        if (this.state.isExist) {
            var directors = []
            this.state.directors.map(director => directors.push(director.name))
            var review_scores = this.state.reviewers.map(review => {
                return (
                    <div className="SingleTitleReviewer" key={this.state.media_id + "-" + review.name}>
                        <span>{review.name}</span>
                        <img
                            src={this.getRatingStars(review.score, review.name === "imdb")}
                            alt={review.name + "rating"}></img>
                    </div>
                )

            })
            console.log(review_scores);

            content = (
                <div className="SingleTitle">
                    <div className="GeneralInfo">
                        <div className="GeneralInfoImg">
                            <img
                                src={this.state.poster_url}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = notFound
                                }}
                                alt={this.state.title + " poster"} />
                        </div>

                        <div className="GeneralInfoText">
                            <h3>{this.state.title}</h3>
                            <div className="GeneralInfoRatings">
                                {review_scores}
                            </div>
                            <p>Type: {this.state.type}</p>
                            <p>Rated: {this.state.rated}</p>
                            <p>Year: {this.state.released} - {this.state.year_end}</p>
                            <p>Directors: {directors.join(", ")}</p>
                            <p>Genres: {this.state.genres.join(", ")}</p>
                            <p>Languages: {this.state.languages.join(", ")}</p>
                        </div>
                    </div>

                    <div className="TitleMainContent">

                        {this.state.artists.map(artist => <p>{artist.name}</p>)}

                    </div>
                </div>

            )
        }

        return (this.state.isExist == null) ? (
            <Spinner />
        ) : (
                <React.Fragment>
                    {content}
                </React.Fragment>
            );
    }
}

export default SingleTitle;