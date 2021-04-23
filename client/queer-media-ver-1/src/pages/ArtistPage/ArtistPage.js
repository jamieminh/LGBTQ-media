import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListPaginate from '../../common/components/ListPaginate/ListPaginate'
import PageTitle from '../../common/components/PageTitle/PageTitle';
import Spinner from '../../common/components/UI/Spinner/Spinner' 
import './ArtistPage.css'

const ArtistPage = (props) => {

    const artist_id = props.artist
    const [titles, setTitles] = useState(null)
    const [name, setName] = useState(null)

    useEffect(() => {
        const url = 'http://localhost:4000/artist/'
        const requests = [axios.get(url + artist_id), axios.get(url + 'media/' + artist_id)]

        axios.all(requests)
        .then(res => {
            setName(res[0].data)
            setTitles(res[1].data)
        })
        .catch(err => console.error(err))
    }, [artist_id])

    return ( !(name && titles) ) ? (<Spinner />) : (
        <div className="ArtistPage">
            <PageTitle title={name} />
            <h2>Movies staring <strong>{name}</strong></h2>
            <ListPaginate titles={titles} />
        </div>
    );
}
 
export default ArtistPage;