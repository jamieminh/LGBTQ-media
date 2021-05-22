import React, { useEffect, useState } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../../axios';
import './SearchResults.css'
import ListPaginate from '../../../components/ListPaginate/ListPaginate';
import PageTitle from '../../../components/PageTitle/PageTitle';

const SearchResults = (props) => {

    const [query, setQuery] = useState('')
    const [results, setResults] = useState(null)
    const [isAllAux, setIsAllAux] = useState(false)
    
    useEffect(() => {
        let passed_query = props.match.params.query
        // console.log(passed_query.replace('\'', '\\\''));
        const query = passed_query.trim().replace(/\s+/g, "+")

        let titles = []
        const search_url = 'media/search/' + query;

        axios.get(search_url)
            .then(res => {
                const data = res.data;
                console.log(data);
                setQuery(passed_query)
                if (data.isAllAux) {
                    setIsAllAux(true)
                    setResults([])
                }
                else {
                    setResults(data)
                }
            })
            .catch(err => console.log(err))
    }, [props.match.params.query])


    console.log(results);

    let displayTitles = ""
    let searchStatus = <p>Sorry, we couldn't find anything looking on "<strong>{query}</strong>"</p>
    if (isAllAux) {
        searchStatus = <p>Please be more specific with your search</p>
    }
    if (results && results.length !== 0) {
        searchStatus = <p>Search Results for "<strong>{query}</strong>"</p>
        displayTitles =  <ListPaginate titles={results} />
    }


    return !results ? (
        <Spinner />
    ) : (
            <div>
                <PageTitle title={"Search Results for " + query} />
                <div className="SearchedFor">
                    {searchStatus}
                </div>
                <div className="SearchResults">
                    {displayTitles}
                </div>
            </div>
        );

}

export default SearchResults;