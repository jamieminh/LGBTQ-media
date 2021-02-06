import axios from "axios";
import React, { Component } from "react";
import Spinner from "../../../common/components/UI/Spinner/Spinner";
import notFound from "../../../assets/images/notfound.jpg";

import "./Random.css";

class Random extends Component {
    state = {
        titles: null,
    };

    componentDidMount() {
        let randomTitles = sessionStorage.getItem("randomTitles");
        // console.log(randomTitles);
        if (randomTitles === null) {
            // generate a list of random id
            const ids = Array.from({ length: 15 }, () =>
                Math.floor(Math.random() * 5000 + 1)
            );
            const promises = ids.map((id) =>
                axios.get("http://localhost:4000/media/" + id)
            );

            let tts = [];
            axios.all(promises)
                .then((responses) => {
                    responses.forEach((res) => {
                        const data = res.data;
                        const genres = [];
                        // const title = {id: data.media_id, title: data.title, poster: data.poster_url, year: data.released}
                        const genresAll = data.genres;
                        if (genresAll.length >= 2)
                            genres.push(genresAll[0], genresAll[genresAll.length - 1]);
                        // first and last genres
                        else genres.push(genresAll[0]);

                        data.genres = [...genres];
                        tts.push(data);
                    });
                })
                .then((res) => {
                    sessionStorage.setItem('randomTitles', JSON.stringify(tts))
                    this.setState({ titles: tts });
                    // console.log(this.state.titles);
                });
        }
        else {
            this.setState({titles: JSON.parse(randomTitles)})
            console.log(this.state.titles);
        }
    }

    render() {
        return !this.state.titles ? (
            <Spinner />
        ) : (
                <div className="Random">
                    {this.state.titles.map((item) => (
                        <div className="RandomMedia" key={item.id}>
                            <img
                                className="RandomImage"
                                src={item.poster}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = notFound;
                                }}
                                alt={item.title + " poster"}
                            />
                            <div className="RandomInfo">
                                <p className="RandomTitle">
                                    {item.title + " (" + item.released + ")"}
                                </p>
                                <p className="RandomScore">{item.score}</p>
                                <div className="RandomGenres">
                                    {item.genres.map((genre) => (
                                        <p key={genre}>{genre}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
    }
}

export default Random;