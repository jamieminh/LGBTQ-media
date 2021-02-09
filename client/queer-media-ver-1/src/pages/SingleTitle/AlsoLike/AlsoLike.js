import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from '../../../common/components/UI/Spinner/Spinner';
import notFound from '../../../assets/images/notfound.jpg'
import './AlsoLike.css'

class AlsoLike extends Component {
    state = {
        titles: null
    }

    componentDidMount() {
        const genres = this.props.genres.join('+')
        console.log('http://localhost:4000/genres/multiple/' + genres);
        axios.get('http://localhost:4000/genres/multiple/' + genres)
            .then(res => {
                const titles = res.data;
                this.setState({ titles: titles })

            })
            .catch(err => console.error(err))
    }

    render() {

        let content = ''
        if (this.state.titles) {
            content = this.state.titles.map(item => {
                return (
                <div className="AlsoLikeItem" key={item.media_id}>
                    <Link to={"/media/" + item.media_id}>
                        <p className="AlsoLikeScore">{(item.score_imdb === 'N/A') ? '__' : item.score_imdb}</p>
                        <img className="AlsoLikeImage"
                            src={item.poster_url}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = notFound
                            }}
                            alt={item.title + "-poster"} />
                        <p className="title">{item.title + " (" + item.released + ") "}</p>
                    </Link>
                </div>)
            })

        }

        return (this.state.titles == null) ? (
            <Spinner />
        ) : (
                <div className="AlsoLike">
                    {content}
                </div>
            );
    }
}

export default AlsoLike;