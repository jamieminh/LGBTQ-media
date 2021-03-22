import React from 'react';
import MediaSlide from './MediaSlide/MediaSlide';
import './MediaSlides.css';

const MediaSildes = () => {
    return (
        <React.Fragment>
            <MediaSlide title='Latest Movies' rank="latest" type="movie"/>
            <MediaSlide title='Latest Series' rank="latest" type="series"/>
            {/* <MediaSlide title='Latest Animation' rank="latest" type="animation"/> */}
            <MediaSlide title='Highest Rated Movies' rank="highest" type="movie"/>
            <MediaSlide title='Highest Rated Series' rank="highest" type="series"/>
            {/* <MediaSlide title='Highest Rated Animation' rank="highest" type="animation"/> */}


        </React.Fragment>
    );
}
 
export default MediaSildes;