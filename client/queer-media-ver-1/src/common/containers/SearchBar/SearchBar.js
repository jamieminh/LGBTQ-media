import React, { useState } from 'react';
import './SearchBar.css';
import { withRouter } from 'react-router-dom';

const SearchBar = (props) => {
    const [searchVal, setSearchVal] = useState('')

    const onChangeHandler = (event) => {
        setSearchVal(event.target.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const escaped_url = escape(searchVal);
        console.log(escaped_url);

        props.history.push('/search/' + escaped_url)
    }

    return (
        <div className="SearchBar">
            {/* <p>you're searching {this.state.searchVal}</p> */}
            <form onSubmit={onSubmitHandler}>
                <div className="search-box">
                    <input type="text" id="search-input" placeholder="Search for a title..."
                        onChange={onChangeHandler}
                    />
                    <input type="submit" value="Search" />
                </div>
            </form>
        </div>
    );

}

export default withRouter(SearchBar);