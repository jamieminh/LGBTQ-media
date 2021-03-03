import React, { useState, useEffect } from 'react';
import axios from '../../../axios'
import { useSelector } from 'react-redux';


const CreateTitle = () => {

    const email = useSelector(state => state.auth.email)
    const token = localStorage.getItem('token')

    const [content, setContent] = useState(null)

    useEffect(() => {
        console.log(email);
        console.log(token);
        axios.get('admin/' + email, {
            headers: {"x-access-token": token}
        })
        .then(res => {
            console.log(res.data);
            setContent(res.data)
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <h1>Admin Profile</h1>
            {content ? <h2>{content.user_id}</h2> : 'null'}
            {content ? <h2>{content.role}</h2> : <h2>null</h2>}

        </div>
    );
}

export default CreateTitle;