import React, { useEffect } from 'react';
import axios from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import ListPaginate from '../../common/components/ListPaginate/ListPaginate'
import Spinner from '../../common/components/UI/Spinner/Spinner'
import Filter from '../../common/components/Filter/Filter'
// import Axios from '../../axios'
import './TypePage.css'

// axios.defaults.withCredentials = true
const TypePage = (props) => {

    const titles = useSelector(state => state.media.titles)
    const dispatch = useDispatch()


    useEffect(() => {
        const state = props.location.state
        // reset store titles because when this function fires, user likely came from another page
        dispatch(actionCreators.resetTitles())  
        
        axios.get('media/latest/' + props.type + '/all')
            .then(res => {
                const fetchedTitles = res.data
                dispatch(actionCreators.setTitles(fetchedTitles))

                // if the page is prompted from the See More links in Home page
                if (state !== null) {
                    dispatch(actionCreators.sortBy('rating', 'desc'))
                }
            })
            .catch(err => console.error(err))
    }, [])


    return (!titles) ? (<Spinner />) : (
        <div className="TypePage">
            <h1>All {props.pageTitle}</h1>
            <div className="TypePageContent">
                <ListPaginate titles={titles} />
                <Filter />
            </div>

        </div>
    );
}

export default TypePage;