import React from 'react';
import MediaSlides from './MediaSlides/MediaSlides';
import Random from './RandomTitles/Random';
import './Home.css';

const Home = () => {
    return (
        <div className="Home">
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
