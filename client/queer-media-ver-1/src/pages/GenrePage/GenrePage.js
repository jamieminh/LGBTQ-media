import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Spinner from '../../common/components/UI/Spinner/Spinner'
import axios from 'axios';
// import GenreItem from './GenreItem/GenreItem'
import ListItem from '../../common/components/ListItem/ListItem';
import './GenrePage.css'

const PER_PAGE = 20;


class Genre extends Component {

    state = {
        genre: '',
        currentPage: 0,
        totalPage: 0,
        titles: ''
    }

    handlePageClick = ({ selected: selectedPage }) => {
        this.setState({ currentPage: selectedPage })
    }



    componentDidMount = () => {
        const genre = this.props.genre

        let titles = []
        const search_url = 'http://localhost:4000/genres/' + genre;
        console.log(search_url);

        axios.get(search_url)
            .then(res => {
                titles = res.data;
                // since the first titles are always animation w/ any genre -> viewer can be confused
                // => swap first 5 for the next 5
                const first_5 = titles.slice(0, 5)
                const next_5 = titles.slice(5, 10)
                titles = next_5.concat(first_5).concat(titles.slice(10))
                this.setState({ genre: genre, titles: titles, totalPage: Math.ceil(titles.length / PER_PAGE) })
                console.log(this.state);
            })
            .catch(err => console.log(err))
    }

    currentPageData = (offset) => {
        return this.state.titles.slice(offset, offset + PER_PAGE)
            .map(item => {
                return (
                    <ListItem key={item.media_id} mediaInfo={item} />
                )
            })
    }

    render() {
        
        return !this.state.titles ? (
            <Spinner />
        ) : (
                <div className="GenrePage">
                    <h1>Genre {this.state.genre} </h1>
                    <div className="PageJump">
                        <p>Go to page </p>
                        <select>
                            {Array.from({length: this.state.totalPage}, (v, k) => k+1).map(i => {
                                return <option>{i}</option>
                            })}
                        </select>
                    </div>
                    <div className="SearchResults">
                        {this.currentPageData(this.state.currentPage * PER_PAGE)}
                        <div className="EmptySpaceFill"></div>
                        <div className="EmptySpaceFill"></div>
                        <div className="EmptySpaceFill"></div>
                        <div className="EmptySpaceFill"></div>
                    </div>

                    <ReactPaginate
                        previousLabel={<i className="fas fa-chevron-circle-left"></i>}
                        nextLabel={<i className="fas fa-chevron-circle-right"></i>}
                        // breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.totalPage}
                        marginPagesDisplayed={2}    // pages dispayed at start and end
                        pageRangeDisplayed={2}      // pages displayed at start
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />


                </div>
            );
    }
}

export default Genre;