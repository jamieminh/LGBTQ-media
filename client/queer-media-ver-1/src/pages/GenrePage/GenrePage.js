import React, {  useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Spinner from '../../common/components/UI/Spinner/Spinner'
import axios from 'axios';
// import GenreItem from './GenreItem/GenreItem'
import ListItem from '../../common/components/ListItem/ListItem';
import './GenrePage.css'

const PER_PAGE = 20;


const Genre = (props) => {

    const [genre, setGenre] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [titles, setTitles] = useState(null)



    useEffect(() => {
        const genre = props.genre
        let titles = []
        const search_url = 'http://localhost:4000/genres/' + genre;

        axios.get(search_url)
            .then(res => {
                titles = res.data;
                // since the first titles are always animation w/ any genre -> viewer can be confused
                // => swap first 5 for the next 5
                const first_5 = titles.slice(0, 5)
                const next_5 = titles.slice(5, 10)
                titles = next_5.concat(first_5).concat(titles.slice(10))
                setGenre(genre)
                setTitles(titles)
                setTotalPage(Math.ceil(titles.length / PER_PAGE))

            })
            .catch(err => console.log(err))
    }, []);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage)
    }


    const currentPageData = (offset) => {
        return titles.slice(offset, offset + PER_PAGE)
            .map(item => {
                return (
                    <ListItem key={item.media_id} mediaInfo={item} />
                )
            })
    }

    return !titles ? (
        <Spinner />
    ) : (
            <div className="GenrePage">
                <h1>Genre {genre} </h1>
                <div className="PageJump">
                    <p>Go to page </p>
                    <select>
                        {Array.from({ length: totalPage }, (v, k) => k + 1).map(i => {
                            return <option>{i}</option>
                        })}
                    </select>
                </div>
                <div className="SearchResults">
                    {currentPageData(currentPage * PER_PAGE)}
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
                    pageCount={totalPage}
                    marginPagesDisplayed={2}    // pages dispayed at start and end
                    pageRangeDisplayed={2}      // pages displayed at start
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        );

}

export default Genre;