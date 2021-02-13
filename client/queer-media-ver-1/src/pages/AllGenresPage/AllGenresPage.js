import React from 'react';
import GenreCategory from './GenreCategory/GenreCategory'
import allGenres from '../../common/components/Lists/genres'
import './AllGenresPage.css'

const genres = (props) => {
    const classes = "col-6 col-md-4 col-lg-3 d-flex justify-content-center";

    return (
        <div className="container">
            <div className="row GenresRow">
                { allGenres.map(genre => <div className={classes} key={genre}> <GenreCategory genre={genre}/> </div>) }
            </div>           
        </div>
    );
}
 
export default genres;
