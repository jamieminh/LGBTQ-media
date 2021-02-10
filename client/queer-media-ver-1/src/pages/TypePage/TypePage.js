import React, { useEffect, useState} from 'react';
import axios from 'axios'
import ListPaginate from '../../common/components/ListPaginate/ListPaginate'
import Spinner from '../../common/components/UI/Spinner/Spinner'
import './TypePage.css'

const TypePage = (props) => {
    const [titles, setTitles ] = useState(null)


    useEffect(() => {
        const url = 'http://localhost:4000/media/latest/' + props.type + '/all'
        axios.get(url)
        .then(res => {
            const titles = res.data
            setTitles(titles)
        })
        .catch(err => console.error(err))
    }, [])


    return (!titles) ? (<Spinner/>) : (
        <div className="TypePage">
            <h1>All {props.type}</h1>
            <ListPaginate titles={titles} />            
        </div>
    );
}
 
export default TypePage;