import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../../../common/components/UI/Spinner/Spinner';
import './FeaturedArtists.css'

const FeaturedArtists = (props) => {
    const artists = props.artists
    console.log(artists);

    const [artistsImages, setArtistsImages] = useState(null)


    useEffect(() => {
        let requests = props.artists.map(artist => {
            return axios.get('http://localhost:4000/artist/image', { params: { name: artist.name, id: artist.artist_id } })
        })

        axios.all(requests)
            .then(responses => {
                let artists = responses.map(r => r.data)
                console.log(artists);
                setArtistsImages(artists)
            })
            .catch(err => console.log(err))


    }, [props.artists])

    return (artistsImages == null) ? (
        <Spinner />
    ) : (
        <div className="SingleTitleArtists">
            {artistsImages.map(artist =>
                <div className="SingleArtist" key={artist[0]}>
                    <Link to={'/artist/' + artist[0]}>
                        <img src={artist[2]} alt={artist[1] + " profile picture"}></img>
                        <p>{artist[1]}</p>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default FeaturedArtists;