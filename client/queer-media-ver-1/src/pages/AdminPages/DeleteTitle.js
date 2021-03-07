import axios from '../../axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import CustomModal from '../../common/components/UI/Modal/Modal';
import Spinner from '../../common/components/UI/Spinner/Spinner';

const DeleteTitle = (props) => {
    const history = useHistory()
    const [modal, setModal] = useState(null)
    const state = history.location.state
    console.log(state);

    const deleteTitleProceedHandler = () => {
        const media_id = state.media_id
        axios.post('admin/delete-media', { media_id: media_id })
            .then(res => {
                const isSuccess = res.data.isSuccess
                console.log(res.data);
                if (isSuccess) {
                    setModal(<CustomModal type='success' title='Success' key='modal_success'
                        body="Deletion Successful. You are being directed to Home page." />)
                    setTimeout(() => history.replace('/'), 2500)
                }
            })
            .catch(_ => {
                setModal(<CustomModal type='error' title='Error' key='modal_failed'
                    closeHandler={() => history.goBack()}
                    body="There has been some error. Try again later. Press 'Close' to go back to media page." />)
            })
    }

    useEffect(() => {
        if (!state) {
            setModal(<CustomModal type='warning' title='Error'
                closeHandler={() => history.push('/')} key='modal_no_media'
                body="To delete a title, look it up and press Delete button under Artists section.
                Click 'Close' to return to Home page" />)

        }
        else {
            const media_id = state.media_id
            const title = state.title
            setModal(<CustomModal type='warning' title='Are you sure?' key='modal_sure'
                proceedHandler={deleteTitleProceedHandler}
                closeHandler={() => history.goBack()}
                body={"Are you sure you want to delete this media with ID '" + media_id + "' and Title '" + title.toUpperCase() +
                    "'? This action is irreverisible!"} />)

        }
    }, [])

    return (!modal) ? <Spinner /> : modal

}

export default DeleteTitle;