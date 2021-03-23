import React, { useState, useEffect, } from 'react';
import axios from '../../../axios'
import Spinner from '../../../common/components/UI/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../../store/actions/index'
import './Comments.css'
import UserIcon from '../../../common/components/User/UserIcon/UserIcon';
import CustomModal from '../../../common/components/UI/Modal/Modal'

const Comments = (props) => {
    const media_id = props.media_id
    const dispatch = useDispatch()

    const user_id = useSelector(state => state.auth.user_id)    // to display the Comment button and post comments
    const displayName = useSelector(state => state.auth.display_name)   // to display a user icon next to the cmt box

    const [comments, setComments] = useState(useSelector(state => state.user.comments))
    const [userComment, setUserComment] = useState('')        // userComment, updated onChange
    const [commentAdded, setCommentAdded] = useState(null)      // state to re-render Comments everytime user leave a comment
    const [charLeft, setCharLeft] = useState(3000)              // to keep track of characters left in the comment box
    const [modal, setModal] = useState({ count: 0, message: null }) // state to display modal

    useEffect(() => {
        axios.get('/user/comments/' + media_id)
            .then(res => {
                const cmts = res.data
                setComments(cmts)
                dispatch(actionCreators.setComments(media_id, cmts))
            })
    }, [commentAdded])      // use commentAdded to re-fetch the comments

    // handle posting comments
    const addCommentHandler = (event) => {
        event.preventDefault()
        console.log('add comment form submitted');
        setModal({
            count: modal.count + 1, type: 'warning', title: 'Are you sure?', proceed: true,
            message: 'Are you sure you want to add this comment, this action is irreversible.',
        })
    }

    // when user is sure they want to leave the comment
    const addCommentProceedHandler = () => {
        setUserComment('')
        setCharLeft(3000)
        axios.post('/user/add-comment', {
            comment: userComment,
            media_id: media_id,
            user_id: user_id
        })
            .then(res => {
                if (res.data.isSuccess) {
                    // set success Modal
                    setModal({
                        count: modal.count + 1, type: 'success', title: 'Comment Added',
                        message: 'Your comment has been posted.'
                    })
                    setCommentAdded(!commentAdded)
                }
                else {
                    // set error Modal'
                    setModal({
                        count: modal.count + 1, type: 'error', title: 'Comment NOT Added',
                        message: 'There has been some error, try again later.'
                    })
                }
            })
    }

    // whenever use type in the comment area, calculate characters left and update userComment
    const onChangeHandler = (e) => {
        setUserComment(e.target.value)
        setCharLeft(charLeft - 1)
    }


    return (!comments) ? <Spinner /> : (
        <div className='MediaComments'>
            <h2>Comments</h2>
            <div className="AddComment">
                <UserIcon displayName={displayName} />
                <form onSubmit={addCommentHandler}>
                    <textarea className="CommentArea"
                        minLength='1' maxLength='3000' onChange={onChangeHandler}
                        value={userComment}
                        title='Must NOT contains any of the following characters <, >, & or backslash'
                        placeholder="Leave a Comment, maximum 3000 characters"
                        id="comment-ta" required></textarea>
                    <span className="focus-border"></span>
                    <small><em id="char-left">{charLeft} characters left</em></small>
                    {!user_id ?
                        <small style={{ float: 'right' }}><em>* You need to login to leave a comment</em></small> :
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

            {modal.count ?
                <CustomModal key={modal.count} type={modal.type} body={modal.message}
                    title={modal.title} proceedHandler={modal.proceed ? addCommentProceedHandler : ''}
                /> : ''}

        </div>
    );
}

export default Comments;