import axios from '../../axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PageTitle from '../../common/components/PageTitle/PageTitle';

const AdminProfile = () => {
    const email = useSelector(state => state.auth.email)
    const token = localStorage.getItem('token')

    const [content, setContent] = useState(null)

    useEffect(() => {
        // axios.get('user/' + email, {
        //     headers: {"x-access-token": token}
        // })
        axios.get('admin/' + email)
        .then(res => {
            console.log(res.data);
            setContent(res.data)
        })
        .catch(err => console.log(err))
    }, [email, token])


    return (
        <div>
            <PageTitle title="Admin Profile" />
            <h1>User Profile</h1>
            {content ? <h2>{content.user_id}</h2> : <h2>null</h2>}
            {content ? <h2>{content.role}</h2> : <h2>null</h2>}
        </div>
    );
}
 
export default AdminProfile;