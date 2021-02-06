import React, { Component } from 'react';
import axios from 'axios';
import './MediaSlide.css';
import { Link } from 'react-router-dom';

import Spinner from '../../../../common/components/UI/Spinner/Spinner'
import notFound from '../../../../assets/images/notfound.jpg'

class MediaSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: null,
        }
    };

    componentDidMount() {
        let url = '';
        if (this.props.rank === 'latest')
            url = 'http://localhost:4000/media/latest/' + this.props.type
        else
            url = 'http://localhost:4000/reviewers/highest/' + this.props.type

        axios.get(url)
            .then(res => {
                const titles = res.data;
                this.setState({ titles: titles })
            })
            .catch(err => console.log(err))

    }

    carouseSlide = (startPos, range) => {
        let seeMore = <div></div>
        if (range === 3) {
            seeMore = <div className="col-sm-3 CarouselMedia SeeMore">
                <p>See More</p>
            </div>
        }
        return (
            <div className="row">
                {[...this.state.titles].splice(startPos, range).map(item => {
                    return (
                        <div className="col-sm-3 CarouselMedia" key={item.id}>
                            <Link to={"/media/" + item.id}>
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
                    )
                })}
                {seeMore}
            </div>
        )
    }

    carouseSlideXS = (item) => {
        return (
            <div className="carousel-item" key={item.id}>
                <div className="CarouselMedia">
                    <Link to={"/media/" + item.id}>
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

    carouselControls = (isXS) => {
        const xs = (isXS) ? "xs" : "";
        let href = "#" + this.props.rank + this.props.type + xs;
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

    render() {
        let firstItem = (!this.state.titles) ? '' : { ...this.state.titles[0] };
        return (
            (!this.state.titles) ? <Spinner /> :

                <div className=" CarouselWrapper">
                    <div className="CarouselHeader">
                        <h3 className="CarouselTitle">{this.props.title}</h3>
                        <Link to='/' className="SeeMoreOut">View more &gt;</Link>
                    </div>

                    {/* Carousel for sm and larger screens */}
                    <div className="carousel slide CarouselGenre d-none d-sm-block" id={this.props.rank + this.props.type}>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                {this.carouseSlide(0, 4)}
                            </div>
                            <div className="carousel-item">
                                {this.carouseSlide(4, 4)}
                            </div>
                            <div className="carousel-item">
                                {this.carouseSlide(8, 3)}
                            </div>
                            {this.carouselControls(false)}
                        </div>
                    </div>

                    {/* Carousel for xs screens */}
                    <div className="carousel slide CarouselGenre d-sm-none" id={this.props.rank + this.props.type + "xs"}>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="CarouselMedia">
                                    <Link to={"/media/" + firstItem.id}>
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
                            {[...this.state.titles].splice(1, 11).map(item => this.carouseSlideXS(item))}

                            {this.carouselControls(true)}
                        </div>
                    </div>
                </div>
        );
    }

}

export default MediaSlide;