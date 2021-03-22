import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from '../../../axios';
// import axios from 'axios'
import CustomModal from '../../../common/components/UI/Modal/Modal';
import './UserVote.css'

const UserVote = (props) => {

    const history = useHistory()

    const media_id = props.media_id
    const user_id = useSelector(state => state.auth.user_id)
    const [currentRating, setCurrentRating] = useState(0)
    const [newRating, setNewRating] = useState(null)
    const [modal, setModal] = useState({ count: 0 })

    useEffect(() => {
        let isSubscribed = true
        if (user_id) {
            axios.get('/user/get-rating', { params: { media_id: media_id, user_id: user_id } })
                .then(res => {
                    if (isSubscribed) {
                        const score = res.data.score || 0
                        setCurrentRating(score)
                        document.getElementById('rating' + score).checked = true
                    }

                })
                .catch(err => {
                    if (isSubscribed)
                        console.error(err)
                })
        }

        return () => { isSubscribed = false }
    }, [media_id, user_id])

    const updateRating = (e) => {
        // if a user is not logged in
        if (!user_id) {
            document.getElementById(e.target.id).checked = false    // uncheck stars
            setModal({
                count: modal.count + 1, type: 'warning', title: 'Login required',
                message: 'You have to login to rate this media. Do you want to login?',
            })
        }
        // if there's a user logged in
        else {
            const scoreVal = e.target.value
            console.log(media_id, user_id, scoreVal);
            axios.post('/user/add-rating', { params: { media_id: media_id, user_id: user_id, score: scoreVal } })
                .then(_ => setNewRating(scoreVal))
                .catch(_ => {
                    setModal({
                        count: modal.count + 1, type: 'error', title: 'Rating error',
                        message: 'There has been some error, please try again later',
                    })
                })
        }
    }

    const loginProceedHandler = () => {
        history.push({ pathname: '/login', state: { fromUrl: history.location.pathname } })
    }


    return (
        <div className="UserRating">
            <p>You</p>
            <div className="UserRatingOptions">
                <input type="radio" id="rating10" name="rating" value="10" onClick={updateRating} />
                <label htmlFor="rating10" title="5 stars"></label>

                <input type="radio" id="rating9" name="rating" value="9" onClick={updateRating} />
                <label className="half" htmlFor="rating9" title="4 1/2 stars"></label>

                <input type="radio" id="rating8" name="rating" value="8" onClick={updateRating} />
                <label htmlFor="rating8" title="4 stars"></label>

                <input type="radio" id="rating7" name="rating" value="7" onClick={updateRating} />
                <label className="half" htmlFor="rating7" title="3 1/2 stars"></label>

                <input type="radio" id="rating6" name="rating" value="6" onClick={updateRating} />
                <label htmlFor="rating6" title="3 stars"></label>

                <input type="radio" id="rating5" name="rating" value="5" onClick={updateRating} />
                <label className="half" htmlFor="rating5" title="2 1/2 stars"></label>

                <input type="radio" id="rating4" name="rating" value="4" onClick={updateRating} />
                <label htmlFor="rating4" title="2 stars"></label>

                <input type="radio" id="rating3" name="rating" value="3" onClick={updateRating} />
                <label className="half" htmlFor="rating3" title="1 1/2 stars"></label>

                <input type="radio" id="rating2" name="rating" value="2" onClick={updateRating} />
                <label htmlFor="rating2" title="1 star"></label>

                <input type="radio" id="rating1" name="rating" value="1" onClick={updateRating} />
                <label className="half" htmlFor="rating1" title="1/2 star"></label>

                <input type="radio" id="rating0" name="rating" value="0" onClick={updateRating} style={{ display: 'none' }} />

            </div>
            <p className="CurrentUserRating">{user_id ? (currentRating || 'N/A') : (newRating || 'N/A')}</p>
            {(modal.count) ?
                <CustomModal key={modal.count} title={modal.title} type={modal.type}
                    body={modal.message} proceedHandler={modal.type === 'warning' ? loginProceedHandler: ''}
                /> : ''}
        </div>

    );
}

// source code: https://codepen.io/lrz3/pen/gEKdYw?editors=1100

export default UserVote;