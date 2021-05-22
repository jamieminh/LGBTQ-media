import axios from '../../axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../common/components/UI/Modal/Modal';
import * as actionCreators from '../../store/actions/index'
import './UserProfile.css'
import PageTitle from '../../common/components/PageTitle/PageTitle';

const UserProfile = () => {

    const email = useSelector(state => state.auth.email)
    const displayName = useSelector(state => state.auth.display_name)
    const nameHead = displayName.substring(0, displayName.length - 8)
    const nameTail = displayName.slice(-8)
    // const token = localStorage.getItem('token')
    const [isEditBtn, setIsEditBtn] = useState(true)       // true mean the current btn is 'Change Display Name'
    const [modalResult, setModalResult] = useState({ count: 0 })
    const [modalWarning, setModalWarning] = useState({ count: 0 })
    const dispatch = useDispatch()


    const btnOnClickHandler = () => {
        // if current button text is cancel
        if (!isEditBtn) {
            const userChanged = document.getElementById('display-name-input').value

            if (userChanged !== nameHead) {
                setModalWarning({
                    count: modalWarning.count + 1,
                    proceedHandler: cancelProceedHandler,
                    title: 'Are you sure?',
                    message: 'If you cancel now, all changes will be lost.'
                })
            }
            else {
                noChangesMade()
            }

        }
        else {
            setIsEditBtn(!isEditBtn)
            document.getElementById('UserSaveChanges').classList.toggle('show')
        }
    }

    const noChangesMade = () => {
        setModalWarning({
            count: modalWarning.count + 1,
            title: "No Change",
            message: 'You have made no change.'
        })
        setIsEditBtn(true)
        document.getElementById('UserSaveChanges').classList.toggle('show')
    }

    const cancelProceedHandler = () => {
        setIsEditBtn(true)
        document.getElementById('display-name-input').value = nameHead
        document.getElementById('UserSaveChanges').classList.toggle('show')
    }


    const saveChangesHandler = () => {
        const userChanged = document.getElementById('display-name-input').value

        // if there's a change in display name
        if (userChanged !== nameHead) {
            setModalWarning({
                count: modalWarning.count + 1,
                title: 'Are you sure?',
                proceedHandler: saveChangesProceedHandler,
                message: 'Your display name will be changed, this action is irreversible'
            })
        }
        else {
            noChangesMade()
        }


    }

    const saveChangesProceedHandler = () => {
        const userChanged = document.getElementById('display-name-input').value
        const modalFailed = {
            count: modalResult + 1, type: 'error',
            title: 'Error',
            message: 'There has been some error, try again later or use another name'
        }

        setIsEditBtn(true)
        document.getElementById('UserSaveChanges').classList.toggle('show')


        axios.post('/user/change', { email: email, newName: userChanged })
            .then(res => {
                if (res.data.isSuccess) {
                    setModalResult({
                        count: modalResult + 1, type: 'success',
                        title: 'Successul',
                        message: 'Your display name has been changed successfully',
                    })
                    console.log(res.data.changedName);
                    dispatch(actionCreators.changeDisplayName(res.data.changedName))
                }
                else
                    setModalResult(modalFailed)
            })
            .catch(err => {
                console.error(err)
                setModalResult(modalFailed)
            })
    }


    return (
        <div className="UserProfile">
            <PageTitle title={displayName} />
            <h1>User Profile</h1>

            <div className="UserDetails">
                <div className="UserEmail">
                    <label>Your email: </label>
                    <input disabled value={email} />
                </div>
                <div className="UserDisplayName">
                    <label>Your display name: </label>
                    <input
                        id='display-name-input'
                        placeholder='Your display name'
                        defaultValue={nameHead}
                        disabled={isEditBtn} pattern="\w{1,20}"
                        title="Can not exceed 20 characters containing letters, numbers and underscore"
                        required />
                    <input value={nameTail} disabled />
                </div>
            </div>

            <div className="UserDetailsBtns">
                <button onClick={btnOnClickHandler}>{isEditBtn ? "Change Display Name" : "Cancel"}</button>
                <button id="UserSaveChanges" onClick={saveChangesHandler} disabled={isEditBtn} >Save Changes</button>
            </div>


            {modalWarning.count ?
                <CustomModal
                    type='warning' title={modalWarning.title}
                    key={'continue' + modalWarning.count}
                    body={modalWarning.message}
                    proceedHandler={modalWarning.proceedHandler}
                /> : ''}

            {modalResult.count ?
                <CustomModal
                    type={modalResult.type} title={modalResult.title}
                    key={'continue' + modalResult.count}
                    body={modalResult.message}
                /> : ''}

        </div>
    );
}

export default UserProfile;