import React, { useState, useEffect } from 'react';
import axios from '../../axios'
import { useSelector } from 'react-redux';
import './AdminPages.css'
import UpsertForm from './UpsertForm/UpsertForm'
import { useHistory } from 'react-router-dom';
import CustomModal from '../../common/components/UI/Modal/Modal'


const UpsertTitle = (props) => {
    const history = useHistory()
    const state = history.location.state
    const type = props.type            // create or update
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [count, setCount] = useState(0);      // to always show modal 
    console.log(type);

    // used for when the page is loaded fresh (create a new title)
    const titleDetails = (state) ? state.titleDetails : {
        artists: [''], directors: [''], genres: [''], imdb_url: '', languages: [''], media_id: '', plot: '',
        poster_url: '', rated: '', released: '', reviewers: [], title: '', type: '', year_end: ''
    }

    // get values from input groups (genres, artists, directors, languages)
    const inputGroupValues = (className) => {
        const elements = document.getElementsByClassName(className)
        return Array.from(elements).map(item => item.value)
    }

    // check if input groups contain duplicates
    const inputGroupsCheck = (groupValues) => {
        return new Set(groupValues).size === groupValues.length
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("confirm button clicked");
        const ids = ['title', 'type', 'rated', 'released',
            'yearEnd', 'plot', 'posterUrl', 'runtime', 'imdbTitle',
            'imdbScore', 'imdbVotes', 'tomatoScore', 'tomatoVotes',
            'metacriticScore', 'metacriticVotes']
        const values = ids.map(id => document.getElementById(id).value)
        const artists = inputGroupValues("AdminInput_artist")
        const directors = inputGroupValues("AdminInput_director")
        const genres = inputGroupValues("AdminInput_genre")
        const languages = inputGroupValues("AdminInput_language")
        const reviewers = [['imdb', values[9], values[10]]]

        if (values[11] !== '') reviewers.push(['rotten tomatoes', values[11], values[12]])
        if (values[13] !== '') reviewers.push(['metacritic', values[13], values[14]])

        // console.log(values);
        // console.log(artists, inputGroupsCheck(artists));
        // console.log(directors, inputGroupsCheck(directors));
        // console.log(genres, inputGroupsCheck(genres));
        // console.log(languages, inputGroupsCheck(languages));
        // console.log(reviewers);

        const yearEnd = values[4] === '' ? 0 : values[4]

        const titleDetails = {
            title: values[0], type: values[1], rated: values[2],
            released: values[3], yearEnd: yearEnd, plot: values[5],
            posterUrl: values[6], runtime: values[7], imdbTitle: values[8],
            reviewers: reviewers, languages: languages, genres: genres,
            directors: directors, artists: artists
        }

        

        if (inputGroupsCheck(artists) && inputGroupsCheck(directors)
            && inputGroupsCheck(genres) && inputGroupsCheck(languages)) {
            setErrorMessage(null)
            setCount(0)
            if (type === 'create') {
                insertRecord(titleDetails)
            }
            else {
                updateRecord(titleDetails.media_id)
            }


        }
        else {
            setErrorMessage("Input Groups Cannot Contain Duplicate Values")
            setCount(count + 1)
            console.log(errorMessage);
        }

    }

    const insertRecord = (titleDetails) => {
        console.log(titleDetails);
        axios.post('admin/create-media', { titleDetails: titleDetails })
            .then(res => {
                const isSuccess = res.data.isSuccess
                if (isSuccess) {
                    setSuccessMessage('Insert Successful')
                    setCount(count + 1)
                }
                else {
                    setErrorMessage('There are one or more error in the inputs, check and try again')
                    setCount(count + 1)
                }
            })
            .catch(err => {
                setErrorMessage('There are one or more error in the inputs, check and try again')
                setCount(count + 1)
            })
    }

    const updateRecord = (media_id) => {
        console.log('Update record');
    }

    // useEffect(() => {
    //     console.log(email);
    //     console.log(token);
    //     axios.get('admin/' + email, {
    //         headers: {"x-access-token": token}
    //     })
    //     .then(res => {
    //         console.log(res.data);
    //         setContent(res.data)
    //     })
    //     .catch(err => console.log(err))
    // }, [])

    // const createTitle = (event) => {
    //     event.preventDefault()
    // }


    return (
        <div className="AdminPageMain">
            <h2>Add a New Media</h2>
            <div className="AdminForm">
                <UpsertForm titleDetails={titleDetails} submitHandler={submitHandler} />
                {(errorMessage) ? <CustomModal type="error" title="Error" body={errorMessage} key={'error_' + count} /> : ''}
                {(successMessage) ? <CustomModal type="success" title="Success" body={successMessage} key={'success_' + count} /> : ''}
            </div>

        </div>
    );
}

export default UpsertTitle;