import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import axios from 'axios'
import { config_3 } from '../../../config'
import Spinner from '../../../common/components/UI/Spinner/Spinner'
import './TrailerEmbed.css'

const TrailerEmbed = (props) => {

    const [trailerId, setTrailerId] = useState(null)

    useEffect(() => {
        let url = 'https://www.googleapis.com/youtube/v3/search'
        let params = {
            key: config_3.KEY,
            q: props.titleName + ' trailer',
            type: "video",
            order: 'relevance',
            maxResults: 1,
            videoEmbeddable: 'true'
        }

        axios.get(url, { params: params, withCredentials: false })
            .then(res => {
                const vidId = res.data.items[0].id.videoId
                setTrailerId(vidId)
            })
            .catch(err => console.error(err))

    }, [])

    return (!trailerId) ? <Spinner /> : (
            <div className="YoutubeEmbedded">
                <ReactPlayer
                    url={'https://www.youtube.com/watch?v=' + trailerId}
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

export default TrailerEmbed;