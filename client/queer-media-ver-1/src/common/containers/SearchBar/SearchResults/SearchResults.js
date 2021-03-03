import React, { useEffect, useState } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner'
import ListItem from '../../../components/ListItem/ListItem'
import axios from '../../../../axios';
import './SearchResults.css'

const SearchResults = (props) => {

    const [query, setQuery] = useState('')
    const [results, setResults] = useState(null)
    
    useEffect(() => {
        let passed_query = props.match.params.query
        // console.log(passed_query.replace('\'', '\\\''));
        const query = passed_query.trim().replace(/\s+/g, "+")

        let titles = []
        const search_url = 'media/search/' + query;

        axios.get(search_url)
            .then(res => {
                titles = res.data;
                setQuery(passed_query)
                setResults(titles)
            })
            .catch(err => console.log(err))
    }, [])



    let displayTitles = ""
    let searchStatus = <p>Sorry, we couldn't find anything looking on "<strong>{query}</strong>"</p>
    if (results && results.length !== 0) {
        searchStatus = <p>Search Results for "<strong>{query}</strong>"</p>
        displayTitles = results.map(item => {
            return <ListItem key={item.media_id} mediaInfo={item} />
        })
    }


    return !results ? (
        <Spinner />
    ) : (
            <div>
                <div className="SearchedFor">
                    {searchStatus}
                </div>
                <div className="SearchResults">
                    {/* <h1>Params = {this.state.search_results}</h1> */}
                    {displayTitles}
                    <div className="EmptySpaceFill"></div>
                    <div className="EmptySpaceFill"></div>
                    <div className="EmptySpaceFill"></div>
                    <div className="EmptySpaceFill"></div>
                </div>
            </div>
        );

}

export default SearchResults;