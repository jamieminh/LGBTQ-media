import React, { useState, useEffect } from 'react';
import axios from 'axios'


const CreateTitle = () => {

    const [role, setRole] = useState()

    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const USER_ID = '6024b1d4d43b350071506467'

    var options = {
        method: 'GET',
        url: 'https://' + domain + '/api/v2/users/'+ USER_ID + '/roles',
        headers: {authorization: 'Bearer MGMT_API_ACCESS_TOKEN'}
      };

    const useEffect = () => {
        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <h1>Admin page: create title</h1>
    );
}

export default CreateTitle;