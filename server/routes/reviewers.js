const express = require('express');
const { Genre, Media_Genre } = require('../models/Genre');
const { Reviewer, Media_Reviewer } = require('../models/Reviewer')
const Media = require('../models/Media');
const sequelize = require('sequelize');
const router = express.Router();
const Op = sequelize.Op;


// get highest rated animation
router.get('/highest/animation', (req, res) => {
    getHighest('animation', res)
})


// get highest rated movies or series
router.get('/highest/:type', (req, res) => {
    let type = req.params.type
    getHighest(type, res)
})



// function to get highest titles of type: movie, series and animation
const getHighest = (type, res) => {
    Media_Genre.findAll({
        attributes: ['media_id'],
        include: { model: Genre, attributes: [], where: { name: 'animation' } },
    })
        .then(media_ids => {
            const ids = media_ids.map(item => item.media_id);   // ids of animations
            let findAllParams = {
                attributes: ['score'],
                include: {
                    model: Media,
                    as: 'Media',
                    attributes: ['media_id', 'title', 'poster_url', 'released'],
                    // 'where' to be added conditionally 
                    include: { model: Genre, attributes: ['name'] }
                },
                where: {
                    reviewer_id: 'im',
                    // media_id to be added conditionally ignore animations
                    score: { [Op.ne]: 'N/A' }
                },
                order: [['score', 'DESC']],
                limit: 12
            }

            if (type !== 'animation') {
                findAllParams.include.where = { type: type }        // add where clause
                findAllParams.where.media_id = { [Op.notIn]: ids }  // add media_id
            }
            else {
                findAllParams.where.media_id = { [Op.in]: ids }
            }

            Media_Reviewer.findAll(findAllParams)
                .then(result => {
                    const titles = result.map(item => {
                        const media = item.Media;
                        return {
                            score: item.score, media_id: media.media_id, released: media.released,
                            title: media.title, poster_url: media.poster_url,
                            genres: media.Genres.map(genre => genre.name)
                        }
                    })
                    res.send(titles)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

module.exports = router