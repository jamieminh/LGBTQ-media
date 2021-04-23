import React from 'react';
import MediaSlides from './MediaSlides/MediaSlides';
import Random from './RandomTitles/Random';
import PageTitle from '../../common/components/PageTitle/PageTitle'
import './Home.css';

const Home = () => {
    return (
        <div className="Home">
            <PageTitle title="Home"/>
            <div className="HomeSlides">
                <MediaSlides />
            </div>
            <div className="RandomTitles">
                <h2>Today Surprises</h2>
                <Random />
            </div>
        </div>
    );
}

export default Home;
