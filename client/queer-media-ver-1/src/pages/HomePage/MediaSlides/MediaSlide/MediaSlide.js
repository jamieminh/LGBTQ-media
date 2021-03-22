import React, { useEffect, useState } from 'react';
import axios from '../../../../axios';
import Slider from 'react-slick'
import './MediaSlide.css';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from '../../../../common/components/UI/Spinner/Spinner'
import notFound from '../../../../assets/images/notfound.jpg'

const MediaSlide = (props) => {
    const [titles, setTitles] = useState(null)
    const config = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 8000,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipe: true,
    };

    const configXS = { ...config, slidesToShow: 1, slidesToScroll: 1, dots: false, }
    const configS = { ...config, slidesToShow: 2, slidesToScroll: 2 }



    useEffect(() => {
        let url = '';
        let isSubscribed = true         // cleanup unmounted component
        if (props.rank === 'latest')
            url = 'media/latest/' + props.type + '/12'
        else
            url = 'reviewers/highest/' + props.type

        axios.get(url)
            .then(res => {
                if (isSubscribed) {
                    const titles = res.data;
                    setTitles(titles)
                }
            })
            .catch(err => {
                if (isSubscribed)
                    console.log(err)
            })
        return () => { isSubscribed = false }
    }, [props.rank, props.type])

    console.log(titles);

    const content = (titles) ? titles.map(title => {
        return (
            <div className="CarouselItem" key={'carousel-item-' + title.media_id}>
                <Link to={"/media/" + title.media_id}>
                    <p className="CarouselMediaScore">{(title.score === 'N/A') ? '__' : title.score}</p>
                    <img className="CarouselImage"
                        src={title.poster_url}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = notFound
                        }}
                        alt={title.title + " poster"} />
                    <p className="CarouselMediaTitle">{title.title + " (" + title.released + ") "}</p>
                </Link>

            </div>
        )
    }) : ''


    return (
        (!titles) ? <Spinner /> :
            <div className="CarouselContainer">
                <div className="CarouselHeader">
                    <h3 className="CarouselTitle">{props.title}</h3>

                    <Link to={{
                        pathname: '/' + (props.type === 'movie' ? 'movies' : props.type),
                        state: (props.rank === 'highest') ? { seeMore: true } : null     // this only applies to seemore of 'Highest...' since the data fetched at the Type Page is already sorted
                    }} className="SeeMore">
                        <button>
                            See More <i className="fas fa-angle-right"></i>
                        </button>
                    </Link>
                </div>

                <div className="CarouselXSmall">
                    <Slider {...configXS}>
                        {content}
                    </Slider>
                </div>

                <div className="CarouselSmall">
                    <Slider {...configS}>
                        {content}
                    </Slider>
                </div>

                <div className="CarouselMedium">
                    <Slider {...config}>
                        {content}
                    </Slider>
                </div>
            </div>
    )


}

export default MediaSlide;