import React from 'react';
import GenreCategory from './GenreCategory/GenreCategory'
import './AllGenresPage.css'

const genres = (props) => {
    const classes = "col-6 col-md-4 col-lg-3 d-flex justify-content-center";
    const genres = ['action', 'adventure', 'animation', 'biography', 'comedy', 
                    'crime', 'documentary', 'drama', 'family', 'fantasy', 
                    'game-show', 'history', 'horror', 'musical', 'mystery', 
                    'news','reality-TV', 'romance', 'sci-fi', 'short', 
                    'talk-show', 'thriller', 'war', 'western', 'adult', 'others']

    return (
        <div className="container">
            <div className="row GenresRow">
                { genres.map(genre => <div className={classes} key={genre}> <GenreCategory genre={genre}/> </div>) }
            </div>           
        </div>
    );
}
 
export default genres;
