const express = require('express');
const { Artist, Media_Artist } = require('../models/Artist');
const { Media_Reviewer } = require('../models/Reviewer');
const Media = require('../models/Media');
const { Sequelize } = require('../config');

const router = express.Router();
const Op = Sequelize.Op;


// get titles of artist
router.get('/media/:artist_id', (req, res) => {
    const artist_id = req.params.artist_id
    Media_Artist.findAll({
        attributes: ['media_id', 'artist_id'],
        where: { 'artist_id': artist_id }
    })
        .then(results => {
            const ids = results.map(item => item.media_id)

            Media.findAll({
                include: [{
                    model: Media_Reviewer,
                    attributes: ['score'],
                    where: { reviewer_id: 'im' }
                }],
                attributes: ['media_id', 'title', 'released', 'poster_url', 'year_end'],
                where: { media_id: { [Op.in]: ids } }
            })
                .then(medias => {
                    const titles = medias.map(item => {
                        return {
                            media_id: item.media_id, title: item.title,
                            released: item.released, year_end: item.year_end,
                            poster_url: item.poster_url, score: item.Media_Reviewers[0].score
                        }
                    })
                    res.send(titles)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})


// get artist information
router.get('/:artist_id', (req, res) => {
    const artist_id = req.params.artist_id

    Artist.findOne({
        where: { 'artist_id': artist_id }
    })
        .then(result => {
            res.send(result.name)
        })
        .catch(err => console.log(err))
})


module.exports = router