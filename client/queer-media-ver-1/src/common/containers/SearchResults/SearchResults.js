import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner'
import ListItem from '../../components/ListItem/ListItem'
import axios from 'axios';
import './SearchResults.css'

class SearchResults extends Component {

    state = {
        query: '',
        search_results: null
    }

    componentDidMount() {
        let passed_query = this.props.match.params.query
        console.log(passed_query.replace('\'', '\\\''));
        const query = passed_query.trim().replace(/\s+/g, "+")

        let titles = []
        const search_url = 'http://localhost:4000/media/search/' + query;
        console.log(search_url);

        axios.get(search_url)
            .then(res => {
                titles = res.data;
                // console.log(titles);
                this.setState({ query: passed_query, search_results: titles })
                console.log(this.state);
            })
            .catch(err => console.log(err))
    }


    render() {

        let displayTitles = ""
        let searchStatus = <p>Sorry, we couldn't find anything looking on "<strong>{this.props.match.params.query}</strong>"</p>
        if (this.state.search_results && this.state.search_results.length !== 0) {
            searchStatus = <p>Search Results for "<strong>{this.props.match.params.query}</strong>"</p>
            displayTitles = this.state.search_results.map(item => {
                return <ListItem key={item.media_id} mediaInfo={item} />
            })
        }


        return !this.state.search_results ? (
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
}

export default SearchResults;