const express = require('express');
const { Genre, Media_Genre } = require('../models/Genre');
const { Reviewer, Media_Reviewer } = require('../models/Reviewer')
const Media = require('../models/Media');
const sequelize = require('sequelize');
const router = express.Router();
const Op = sequelize.Op;


// get highest rated movies or series
router.get('/highest/:type', (req, res) => {
    let type = req.params.type

    Media_Reviewer.findAll({
        include: {
            model: Media,
            as: 'Media',
            attributes: ['media_id', 'title', 'poster_url', 'released', 'year_end'],
            include: { model: Genre, attributes: ['name'] },
            where: { type: type }
        },
        where: {
            reviewer_id: 'im',
            score: { [Op.ne]: 'N/A' }
        },
        order: [['score', 'DESC']],
        attributes: ['score'],
        limit: 12
    })
        .then(result => {
            const titles = result.map(item => {
                const media = item.Media;
                return {
                    score: item.score, media_id: media.media_id, released: media.released,
                    title: media.title, poster_url: media.poster_url, year_end: media.year_end,
                    genres: media.Genres.map(genre => genre.name)
                }
            })
            res.send(titles)
        })
        .catch(err => console.log(err))
})

module.exports = router