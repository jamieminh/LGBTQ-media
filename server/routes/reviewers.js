const express = require('express');
const {Genre, Media_Genre} = require('../models/Genre');
const {Reviewer, Media_Reviewer} = require('../models/Reviewer')
const Media = require('../models/Media');
const sequelize = require('sequelize');
const router = express.Router();
const Op = sequelize.Op;


// get highest rated animation
router.get('/highest/animation', (req, res) => {
    Media.findAll({
        include: [{
            attributes: [],
            model: Genre,
            where: { name: 'animation' }
        },{
            model: Media_Reviewer,
            attributes: ['score'],
            where: {
                reviewer_id: 'im',
                score: {[Op.ne]: 'N/A'}
            },
            order: [ ['score', 'DESC'] ],
        }],
        attributes: ['media_id', 'title', 'poster_url', 'released'],
        order: [[Media_Reviewer, 'score', 'DESC']],
        limit: 12
    })
    .then(result => {
        const titles = result.map(item => {
            return {
                media_id: item.media_id, title: item.title, released: item.released,
                poster_url: item.poster_url, score: item.Media_Reviewers[0].score
            }
        })
        res.send(titles)
    })
    .catch(err => console.log(err))
    
})


// get highest rated movies or series
router.get('/highest/:type', (req, res) => {
    let type = req.params.type

    Media_Reviewer.findAll({
        attributes: ['score'],
        include: {
            attributes: ['media_id', 'title', 'poster_url', 'released'],
            model: Media,
            as: 'Media',
            where: {
                type: type
            }
        },
        where: {
            reviewer_id: 'im',
            score: {[Op.ne]: 'N/A'}
        },
        order: [ ['score', 'DESC'] ],
        limit: 12
    })
    .then(result => {
        const titles = result.map(item => {
            const media = item.Media;
            return { score: item.score, media_id: media.media_id, released: media.released,
                title: media.title, poster_url: media.poster_url}
        })
        res.send(titles)
    })
    .catch(err => console.log(err))
}) 

module.exports = router