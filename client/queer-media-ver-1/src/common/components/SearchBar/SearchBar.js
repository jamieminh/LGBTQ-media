import React, { Component } from 'react';
import './SearchBar.css';
import { withRouter } from 'react-router-dom';

class SearchBar extends Component {
    state = {
        searchVal: '',
    }

    onChangeHandler = (event) => {
        this.setState({searchVal: event.target.value})
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        const escaped_url = escape(this.state.searchVal);
        console.log(escaped_url);

        this.props.history.push('/search/' + escaped_url)
    }

    render() {
        return (
            <div className="SearchBar">
                {/* <p>you're searching {this.state.searchVal}</p> */}
                <form onSubmit={this.onSubmitHandler}>
                    <div className="search-box">
                        <input type="text" id="search-input" placeholder="Search for a title..."
                            onChange={this.onChangeHandler}
                        />
                        <input type="submit" value="Search"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SearchBar);