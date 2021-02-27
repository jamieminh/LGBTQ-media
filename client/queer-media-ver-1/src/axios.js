import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://localhost:4000/",
    // withCredentials: trueax
})

export default Axios