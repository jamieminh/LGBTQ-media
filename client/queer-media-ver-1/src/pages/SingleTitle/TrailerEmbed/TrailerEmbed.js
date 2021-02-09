import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import axios from 'axios'
import { config_3 } from '../../../config'
import Spinner from '../../../common/components/UI/Spinner/Spinner'
import './TrailerEmbed.css'


class TrailerEmbed extends Component {
    state = {
        // trailerId: null,
        trailerId: 'YJVLNt2ZNmM'
    }

    componentDidMount() {
        let url = 'https://www.googleapis.com/youtube/v3/search'
        let params = {
            key: config_3.KEY,
            q: this.props.titleName + ' trailer',
            type: "video",
            order: 'relevance',
            maxResults: 1,
            videoEmbeddable: 'true'
        }

        // axios.get(url, { params: params })
        //     .then(res => {
        //         const vidId = res.data.items[0].id.videoId
        //         this.setState({ trailerId: vidId })
        //     })
        //     .catch(err => console.log(err))

    }


    render() {


        return (this.state.trailerId == null) ? (
            <Spinner />
        ) : (
                <div className="YoutubeEmbedded">
                    <ReactPlayer
                        url={'https://www.youtube.com/watch?v=' + this.state.trailerId}
                        volume={0.1}
                        controls={true}
                        config={{
                            youtube: {
                                playerVars: { rel: 0 },
                            }
                        }}
                    />
                </div>
            );
    }
}

export default TrailerEmbed;