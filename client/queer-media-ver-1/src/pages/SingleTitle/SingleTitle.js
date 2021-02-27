import React, { Component } from 'react';
import axios from '../../axios';
import { config_1 } from '../../config'
import { Link } from 'react-router-dom'

import TrailerEmbed from './TrailerEmbed/TrailerEmbed'
import notFound from '../../assets/images/notfound.jpg'
import Spinner from '../../common/components/UI/Spinner/Spinner'
import blank_user from '../../assets/images/blank_user.png'
import Error from '../ErrorPage/Error'
import AlsoLike from './AlsoLike/AlsoLike';

import { not_applicable, rating_0, rating_0_5, rating_1,
    rating_1_5, rating_2, rating_2_5, rating_3,
    rating_3_5, rating_4, rating_4_5, rating_5,
    imdb, metacritic, tomato
} from '../../common/components/Lists/ratings'
import './SingleTitle.css'



let proxyurl = "https://cors-anywhere.herokuapp.com/";
proxyurl = ""
const url = proxyurl + "https://serpapi.com/search.json?"
const API_KEY = config_1.KEY

// axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

console.log(axios.defaults.headers);


// let params = [
//     ['api_key', API_KEY].join('='),
//     ['tbm', "isch"].join('='),    // image search
//     ['ijn', '0'].join('='),       // first page
//     ['gl', 'us'].join('='),
//     ['hl', 'en'].join('=')
// ].join('&')

let params = {
    api_key: API_KEY,
    tbm: "isch",    // image search
    ijn: '0',       // first page
    gl: 'us',
    hl: 'en',
    q: 'superman'
}

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
        imdb_url: null,
        languages: null,        // a list of languages as Strings
        genres: null,           // a list of genres as Strings
        reviewers: null,        // a list of reviewers {reviewer, score}
        artists: null,          // a list of artists {artist name, artist id}
        // artists: [
        //     { name: 'Charlize Theron', id: 12, img_url: blank_user },
        //     { name: 'Sofia Boutella', id: 344, img_url: blank_user },
        //     { name: 'James McAvoy', id: 444, img_url: blank_user },
        //     { name: 'John Something Goodman', id: 124, img_url: blank_user },
        //     { name: 'Scarlett Johansson', id: 112, img_url: blank_user }
        // ],
        directors: null,         // a list of directors {director name, director id}
        refreshTrailer: false
    }


    componentDidMount() {
        let artists_names = []
        let artists_info = []
        axios.get('media/full/' + this.props.match.params.media_id)
            .then(res => {
                if (res.data === "")
                    this.setState({ isExist: false })
                else {
                    const media = res.data.media
                    artists_names = (res.data.artists)
                    this.setState({
                        isExist: true, media_id: media.media_id, title: media.title,
                        rated: media.rated, released: media.released, plot: media.plot,
                        poster_url: media.poster_url, type: media.type, year_end: media.year_end,
                        languages: media.languages, imdb_url: media.imdb_url, genres: res.data.genres,
                        artists: res.data.artists, reviewers: res.data.reviewers, directors: res.data.directors
                    })
                }
            })
            //  get artists images
            // .then(res => {
            //     if (this.state.isExist) {
            //         const requests = []
            // artists_names.forEach(artist => {
            //     const request = url + params + '&q=' + encodeURIComponent(artist.name + " imdb")
            //     requests.push(axios.get(request))
            // })

            // console.log(this.state.artists);

            // let artists_images = []

            // request({url: url, qs: params}, (err, res, body) => {
            //     if (err) return console.log(err);
            //     console.log(body.url);
            //     console.log(body);
            //     console.log(res);
            // })

            // axios.all(requests)
            //     .then(responses => {
            //         responses.forEach(res => {
            //             console.log(res);
            //             if (res.data.error == null)   // no error
            //                 artists_images.push(res.data.images_results[0].original);
            //             else
            //                 artists_images.push(blank_user)
            //         })
            //     })
            //     .then(res => {
            //         console.log(artists_images);
            //         for (let i = 0; i < artists_names.length; i++) {
            //             const artist = { ...artists_names[i], img_url: artists_images[i] }
            //             artists_info.push(artist)
            //         }
            //         this.setState({ artists: artists_info })
            //     })
            //     .catch(err => console.error(err))
            //     }
            // })
            // .then(res => {
            //     this.setState({ artists: artists_info })
            // })
            .catch(err => console.error(err))
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
            default: return not_applicable
        }
    }



    render() {

        var content = <Error />


        if (this.state.isExist) {
            var directors = this.state.directors.map(director => director.name)     // get directors' names
            var review_scores = this.state.reviewers.map(review => {        // format the ratings
                let review_img = (review.name === "imdb") ? imdb : (review.name === "metacritic") ? metacritic : tomato
                return (
                    <div className="SingleTitleReviewer" key={this.state.media_id + "-" + review.name}>
                        <a href={this.state.imdb_url} target="_blank"><img src={review_img} alt={review.name + " logo"}></img></a>
                        <img
                            src={this.getRatingStars(review.score, review.name === "imdb")}
                            alt={review.name + " rating"}></img>
                    </div>
                )

            })

            const year = this.state.released + (this.state.year_end == 0 ? '' : ' - ' + this.state.year_end)

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

                        <h2 className="MediaTitleSm">{this.state.title}</h2>


                        <div className="GeneralInfoText">
                            <h2 className="MediaTitle">{this.state.title}</h2>
                            <div className="GeneralInfoRatings">
                                {review_scores}
                            </div>
                            <p><span>Type</span>: {this.state.type}</p>
                            <p><span>Rated</span>: {this.state.rated}</p>
                            <p><span>Year</span>: {year}</p>
                            <p><span>Directors</span>: {directors.join(", ")}</p>
                            <p><span>Genres</span>: {this.state.genres.join(", ")}</p>
                            <p><span>Languages</span>: {this.state.languages.join(", ")}</p>
                        </div>
                    </div>

                    <div className="TitleMainContent">

                        <div className="SingleTitleArtists">
                            {this.state.artists.map(artist =>
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
                            <p>{this.state.plot}</p>
                        </div>

                        <div className="SingleTitleTrailer">
                            <h3>Trailer</h3>
                            <TrailerEmbed titleName={this.state.title} />
                        </div>

                        <div className="RelatedTitles">
                            <h3>You may also like</h3>
                            <AlsoLike genres={this.state.genres} />
                        </div>

                        <div className="Comments">
                            <h3>Comments</h3>
                        </div>
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