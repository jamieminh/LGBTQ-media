import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ListItem from '../../../common/components/ListItem/ListItem';
import './ListPaginate.css'

const PER_PAGE = 24;        // 24 is divisible by 3 and 4

// props include only titles
const ListPaginate = (props) => {

    const [currentPage, setCurrentPage] = useState(0)

    const titles = props.titles
    const totalPage = Math.ceil(props.titles.length / PER_PAGE)


    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage)
        const selectPage = document.getElementById("JumpPageSelect")
        selectPage.options[selectedPage].selected = true   

    }


    const currentPageData = (offset) => {
        return titles.slice(offset, offset + PER_PAGE)
            .map(item => {
                return (
                    <ListItem key={item.media_id} mediaInfo={item} />
                )
            })
    }

    const goToPage = () => {
        const selectPage = document.getElementById("JumpPageSelect")
        handlePageClick({selected: selectPage.value})
    }


    return (
        <div className="ListPaginate">
            <div className="PageJump">
                <p>Go to page </p>
                <select id="JumpPageSelect">
                    {Array.from({ length: totalPage }, (v, k) => k + 1).map(i => {
                        return <option value={i-1} key={i} >{i}</option>
                    })}
                </select>
                <button onClick={goToPage}>Go</button>
            </div>
            <div className="ListContainer">
                {/* {goClicked==true ? goToPage() :  */}
                {currentPageData(currentPage * PER_PAGE)}

                {/* add empty space fill so the last item line wont be cented */}
                <div className="EmptySpaceFill"></div>
                <div className="EmptySpaceFill"></div>
                <div className="EmptySpaceFill"></div>
                {/* <div className="EmptySpaceFill"></div> */}
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

export default ListPaginate;