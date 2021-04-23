import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Spinner from "../../../common/components/UI/Spinner/Spinner";
import notFound from "../../../assets/images/notfound.jpg";
import Cookies from 'universal-cookie'

import "./Random.css";

const Random = () => {
    const [titles, setTitles] = useState(null)
    const cookies = new Cookies()


    useEffect(() => {
        let randomTitles = cookies.get('randomTitles')
        console.log(randomTitles);
        if (!randomTitles) {
            // generate a list of 14 random ids
            let ids = Array.from({ length: 14 }, () =>
                Math.floor(Math.random() * 5000 + 1)
            );

            // convert the array to set to make sure there's no duplicate
            ids = [...new Set(ids)]
            const promises = ids.map((id) =>
                axios.get("http://localhost:4000/media/" + id)
            );

            let tts = [];
            axios.all(promises)
                .then((responses) => {
                    responses.forEach((res) => {
                        const data = res.data;
                        const genres = [];
                        const genresAll = data.genres;
                        if (genresAll.length >= 2)
                            genres.push(genresAll[0], genresAll[genresAll.length - 1]);
                        // first and last genres
                        else genres.push(genresAll[0]);

                        data.genres = [...genres];
                        tts.push(data);
                    });
                })
                .then(_ => {
                    const today = new Date().getTime()
                    const endOfDay = new Date().setHours(23, 59, 59)

                    cookies.set('randomTitles', JSON.stringify(tts), {
                        path: '/',
                        maxAge: endOfDay - today        // end at the end of local today
                    })
                    setTitles(tts)
                });
        }
        else {
            setTitles(randomTitles)
        }
    }, [])


    return !titles ? (
        <Spinner />
    ) : (
        <div className="Random">
            {titles.map((item) => (
                <div className="RandomMedia" key={item.id}>
                    <Link to={'/media/' + item.id}>
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
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Random;
