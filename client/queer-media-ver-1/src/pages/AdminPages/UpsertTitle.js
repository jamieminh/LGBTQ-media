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
    const [errorInfo, setErrorInfo] = useState({ count: 0, message: null })
    const [successInfo, setSuccessInfo] = useState({ count: 0, message: null })
    const media_id = state ? state.media_id : ''

    // used for when the page is loaded fresh (create a new title)
    const titleDetails = (state) ? state.titleDetails : {
        media_id: media_id, artists: [''], directors: [''], genres: [''], 
        imdb_url: '', languages: [''], media_id: '', plot: '', poster_url: '', 
        rated: '', released: '', reviewers: [], title: '', type: '', year_end: ''
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

    const submitHandler = () => {
        const ids = ['title', 'type', 'rated', 'released',
            'yearEnd', 'plot', 'posterUrl', 'runtime', 'imdbTitle',
            'imdbScore', 'imdbVotes', 'tomatoScore', 'tomatoVotes',
            'metacriticScore', 'metacriticVotes']
        const values = ids.map(id => document.getElementById(id).value.trim())
        const artists = inputGroupValues("AdminInput_artist")
        const directors = inputGroupValues("AdminInput_director")
        const genres = inputGroupValues("AdminInput_genre")
        const languages = inputGroupValues("AdminInput_language")
        const reviewers = [['imdb', values[9], values[10]]]

        if (values[11] !== '') reviewers.push(['rotten tomatoes', values[11], values[12]])
        if (values[13] !== '') reviewers.push(['metacritic', values[13], values[14]])

        const yearEnd = values[4] === '' ? 0 : values[4]

        const newDetails = {
            title: values[0], type: values[1], rated: values[2],
            released: values[3], yearEnd: yearEnd, plot: values[5],
            posterUrl: values[6], runtime: values[7], imdbTitle: values[8],
            reviewers: reviewers, languages: languages, genres: genres,
            directors: directors, artists: artists
        }

        if (inputGroupsCheck(artists) && inputGroupsCheck(directors)
            && inputGroupsCheck(genres) && inputGroupsCheck(languages)) {
            setErrorInfo({count: 0})
            setSuccessInfo({count: 0})
            if (type === 'create') {
                insertRecord(newDetails)
            }
            else {
                updateRecord(titleDetails.media_id, newDetails)
            }
        }
        else {
            setErrorInfo({
                count: errorInfo.count + 1,
                message: "Input Groups Cannot Contain Duplicate Values"
            })
        }

    }

    const insertRecord = (newDetails) => {
        axios.post('admin/create-media', { titleDetails: newDetails })
            .then(res => {
                const isSuccess = res.data.isSuccess
                console.log(res.data);
                if (isSuccess) {
                    setSuccessInfo({ count: successInfo + 1, message: 'Insert Successful. You are being directed to Home page.' })
                    setErrorInfo({count: 0})
                }
                else {
                    setErrorInfo({
                        count: errorInfo.count + 1,
                        message: 'The media with this IMDB code already exists.'
                    })
                    setSuccessInfo({count: 0})
                }
            })
            .catch(err => {
                setErrorInfo({
                    count: errorInfo.count + 1,
                    message: 'There has been some error, Login and try again.'
                })
                setSuccessInfo({count: 0})
            })
    }

    const updateRecord = (media_id, newDetails) => {
        axios.post('admin/update-media', { titleDetails: newDetails, media_id: media_id })
            .then(res => {
                const isSuccess = res.data.isSuccess
                if (isSuccess) {
                    setSuccessInfo({ count: successInfo + 1, message: 'Update Successful. You are being directed to the media page.' })
                    setErrorInfo({count: 0})
                }
                else {
                    setErrorInfo({
                        count: errorInfo.count + 1,
                        message: 'There has been some error, check your inputs or try again later'
                    })
                    setSuccessInfo({count: 0})
                }
            })
            .catch(_ => {
                setErrorInfo({
                    count: errorInfo.count + 1,
                    message: 'There has been some error, check your inputs or try again later'
                })
                setSuccessInfo({count: 0})
            })
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
            <h2 style={{textTransform: 'capitalize'}}>{type} Media</h2>
            <div className="AdminForm">
                <UpsertForm titleDetails={titleDetails} submitHandler={submitHandler} type={type}/>
                {(errorInfo.count !== 0) ? <CustomModal type="error" title="Error" body={errorInfo.message} key={'error_' + errorInfo.count} /> : ''}
                {(successInfo.count !== 0) ? <CustomModal type="success" title="Success" body={successInfo.message} key={'success_' + errorInfo.count} /> : ''}
            </div>

        </div>
    );
}

export default UpsertTitle;