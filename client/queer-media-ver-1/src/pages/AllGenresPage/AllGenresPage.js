import React from 'react';
import GenreCategory from './GenreCategory/GenreCategory'
import allGenres from '../../common/components/Lists/genres'
import './AllGenresPage.css'
import PageTitle from '../../common/components/PageTitle/PageTitle';

const genres = () => {
    return (
        <div className="AllGenres">
            <PageTitle title="All Genres" />
            { allGenres.map(genre => <GenreCategory genre={genre} key={genre} />)}
            <div className="AllGenresSpaceFill"></div>
            <div className="AllGenresSpaceFill"></div>
        </div>
    );
}

export default genres;
