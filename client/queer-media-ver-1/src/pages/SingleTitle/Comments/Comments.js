import React, { useState, useEffect, } from 'react';
import axios from '../../../axios'
import Spinner from '../../../common/components/UI/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../../store/actions/index'
import './Comments.css'
import UserIcon from '../../../common/components/User/UserIcon/UserIcon';

const Comments = (props) => {
    const media_id = props.media_id
    // const comments = useSelector(state => state.user.comments)
    const [comments, setComments] = useState(useSelector(state => state.user.comments))
    const [userComment, setUserComment] = useState(null)
    const dispatch = useDispatch()
    const isUser = useSelector(state => state.auth.role) === 'user'
    const displayName = useSelector(state => state.auth.display_name)
    let charactersLeft = 3000
    const [charLeft, setCharLeft] = useState(3000)

    useEffect(() => {
        console.log(media_id);
        axios.get('/user/comments/' + media_id)
            .then(res => {
                const cmts = res.data
                setComments(cmts)
                dispatch(actionCreators.setComments({ media_id: media_id, comments: cmts }))
            })
    }, [])

    // const onFocusHandler = () => {
    //     document.getElementById('comment-submit').classList.toggle('notShown')
    // }

    const addCommentHandler = (event) => {
        event.preventDefault()
        const comment = document.getElementById('comment-ta').value;
        console.log('add comment form submitted');
        console.log(comment);
    }

    const onChangeHandler = () => {
        // charactersLeft--;
        // document.getElementById('char-left').innerText = charactersLeft
        setCharLeft(charLeft-1)
    }


    return (!comments) ? <Spinner /> : (
        <div className='MediaComments'>
            <h3>Comments</h3>
            <div className="AddComment">
                <UserIcon displayName={displayName}/>
                <form onSubmit={addCommentHandler}>
                    <textarea className="CommentArea"
                        pattern="[^<>&]" minLength='1' maxLength='3000' onChange={onChangeHandler}
                        title='Must NOT contains any of the following characters <, >, & or backslash'
                        placeholder="Leave a Comment, maximum 3000 characters" id="comment-ta" ></textarea>
                    <span className="focus-border"></span>
                    <small><em id="char-left">{charLeft} characters left</em></small>
                    {!isUser ?
                        <small><em>* You have to log in to leave a comment</em></small> :
                        <button className='notShown' id='comment-submit'>Comment</button>}

                </form>
            </div>
            <div className='ExistedComments'>
                {comments.map(cmt => {
                    return (
                        <div className="UserComment" key={cmt.comment_id}>
                            <h5 >{cmt.user}</h5>
                            <small >{cmt.createdAt}</small>
                            <p >{cmt.comment}</p>
                            <hr />
                        </div>
                    )
                })}
            </div>            

        </div>
    );
}

export default Comments;