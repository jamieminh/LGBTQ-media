import React, {Fragment, Component} from 'react';
import MediaSlides from './MediaSlides/MediaSlides';
import Random from './RandomTitles/Random';
import './Home.css';

class Home extends Component {
    state = {

    }
    render() { 
        return (
            <div className="Home">
                {/* <h2>THIS IS THE HOME PAGE</h2> */}
                <div className="row Slides">
                    <div className="col-12 col-lg-9">
                        <MediaSlides/>
                    </div>
                    <div className="d-none d-lg-block col-lg-3 RandomTitles">
                        <h2>Today Surprises</h2>
                        <Random />
                    </div>
                </div>
                
            </div>
        );
    }
}
 
export default Home;
