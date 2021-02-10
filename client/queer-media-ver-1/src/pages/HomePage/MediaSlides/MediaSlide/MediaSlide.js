import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MediaSlide.css';
import { Link } from 'react-router-dom';

import Spinner from '../../../../common/components/UI/Spinner/Spinner'
import notFound from '../../../../assets/images/notfound.jpg'

const MediaSlide = (props) => {
    const [titles, setTitles] = useState(null)

    useEffect(() => {
        let url = '';
        if (props.rank === 'latest')
            url = 'http://localhost:4000/media/latest/' + props.type + '/12'
        else
            url = 'http://localhost:4000/reviewers/highest/' + props.type

        axios.get(url)
            .then(res => {
                const titles = res.data;
                setTitles(titles)
            })
            .catch(err => console.log(err))
    }, [])

    const carouseSlide = (startPos, range) => {
        let seeMore = <div></div>
        if (range === 3) {
            seeMore = <div className="col-sm-3 CarouselMedia SeeMore">
                <p>See More</p>
            </div>
        }
        return (
            <div className="row">
                {[...titles].splice(startPos, range).map(item => {
                    return (
                        <div className="col-sm-3 CarouselMedia" key={'mediaSlide-' + item.media_id}>
                            <Link to={"/media/" + item.media_id}>
                                <p className="MediaScore">{(item.score === 'N/A') ? '__' : item.score}</p>
                                <img className="MediaImage"
                                    src={item.poster_url}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = notFound
                                    }}
                                    alt={item.title + " poster"} />
                                <p className="title">{item.title + " (" + item.released + ") "}</p>
                            </Link>

                        </div>
                    )
                })}
                {seeMore}
            </div>
        )
    }

    const carouseSlideXS = (item) => {
        return (
            <div className="carousel-item" key={item.media_id}>
                <div className="CarouselMedia">
                    <Link to={"/media/" + item.media_id}>
                        <p className="MediaScore">{(item.score === 'N/A') ? '__' : item.score}</p>
                        <img className="MediaImage"
                            src={item.poster}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = notFound
                            }}
                            alt={item.title + " poster"} />
                        <p className="title">{item.title + " (" + item.released + ") "}</p>
                    </Link>
                </div>
            </div>
        )
    }

    const carouselControls = (isXS) => {
        const xs = (isXS) ? "xs" : "";
        let href = "#" + props.rank + props.type + xs;
        return (
            <React.Fragment>
                <a href={href} className="carousel-control-prev" role="button" data-slide="prev">
                    <span><i className="fa fa-angle-left fa-2x" aria-hidden="true"></i></span>
                    <span className="sr-only">Previous</span>
                </a>

                <a href={href} className="carousel-control-next" role="button" data-slide="next">
                    <span><i className="fa fa-angle-right fa-2x" aria-hidden="true"></i></span>
                    <span className="sr-only">Next</span>
                </a>
            </React.Fragment>
        )
    }

    let firstItem = (!titles) ? '' : { ...titles[0] };
    return (
        (!titles) ? <Spinner /> :

            <div className=" CarouselWrapper">
                <div className="CarouselHeader">
                    <h3 className="CarouselTitle">{props.title}</h3>
                    <Link to='/' className="SeeMoreOut">View more &gt;</Link>
                </div>

                {/* Carousel for sm and larger screens */}
                <div className="carousel slide CarouselGenre d-none d-sm-block" id={props.rank + props.type}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            {carouseSlide(0, 4)}
                        </div>
                        <div className="carousel-item">
                            {carouseSlide(4, 4)}
                        </div>
                        <div className="carousel-item">
                            {carouseSlide(8, 4)}
                        </div>
                        {carouselControls(false)}
                    </div>
                </div>

                {/* Carousel for xs screens */}
                <div className="carousel slide CarouselGenre d-sm-none" id={props.rank + props.type + "xs"}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="CarouselMedia">
                                <Link to={"/media/" + firstItem.media_id}>
                                    <p className="MediaScore">{(firstItem.score === 'N/A') ? '__' : firstItem.score}</p>
                                    <img className="MediaImage"
                                        src={firstItem.poster}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = notFound
                                        }}
                                        alt={firstItem.title + "-poster"} />
                                    <p className="title">{firstItem.title + " (" + firstItem.released + ") "}</p>
                                </Link>
                            </div>
                        </div>
                        {[...titles].splice(1, 11).map(item => carouseSlideXS(item))}

                        {carouselControls(true)}
                    </div>
                </div>
            </div>
    );


}

export default MediaSlide;