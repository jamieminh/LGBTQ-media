import React from 'react';
import GenreCategory from './GenreCategory/GenreCategory'
import allGenres from '../../common/components/Lists/genres'
import './AllGenresPage.css'

const genres = (props) => {
    return (
        <div className="AllGenres">
            { allGenres.map(genre => <GenreCategory genre={genre} key={genre} />)}
            <div className="AllGenresSpaceFill"></div>
            <div className="AllGenresSpaceFill"></div>
        </div>
    );
}

export default genres;
