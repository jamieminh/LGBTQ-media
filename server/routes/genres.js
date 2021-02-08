const express = require('express');
const { Genre, Media_Genre, genre_ids } = require('../models/Genre');
const { Review, Media_Reviewer } = require('../models/Reviewer')
const Media = require('../models/Media');
const { Sequelize, random } = require('../config');

const router = express.Router();
const Op = Sequelize.Op;



// Get genres list
router.get('/', (req, res) => {
    Genre.findAll()
        .then(genres => res.send(genres))
        .catch(err => res.send(err))

})

// get titles through genres
router.get('/:genre', (req, res) => {
    let genre = req.params.genre;
    Media.findAll({
        include: [{model: Genre, where: {name: genre}}],
        order: [
            ['released', 'DESC']
        ]
        // limit: 5
    })
    
    .then(results => {      
        // res.send("length = " + results.length)
        res.send(results)
    })
    .catch(err => console.log(err))
})

// get title with multiple genres
router.get('/multiple/:genres', (req, res) => {
    const genres = req.params.genres.split("+")
    const hasRomance = false
    const limit = genres.length * 300
    const query_in = []
    let same_genres = []

    genres.map(genre => {
        if (genres === 'romance')   
            hasRomance = true
        else 
            query_in.push({genre_id: genre_ids[genre.replace('-', '_')]})
    })

    // put romance at the end bc there are alot of romance title
    if (hasRomance)
        query_in.push({genre_id: genre_ids['romance']})

    // find 1000 result with one of the genre
    Media_Genre.findAll({
        where: { [Op.or]: query_in },
        attributes: ['media_id'],
        limit: limit
    })
    .then(results => {
        let count = {}
        // count the appearance of each id
        for (let i=0; i<results.length; i++) {
            const media_id = results[i].media_id
            if (count[media_id] == null)        // if not visited, add it
                count[media_id] = 1
            else {                              // update value of a visited genre
                const update = count[media_id] + 1
                count[media_id] = update
            }
        }
        
        // add media_id of titles that have all genres
        for (const key in count) {
            if (count[key] == genres.length)
                same_genres.push(key)
        }

        if (same_genres.length < 5) {
            for (const key in count) {
                if (count[key] == genres.length - 1)
                    same_genres.push(key)
                if (same_genres.length == 5)
                    break
            }
        }

    })
    .then(r => {
        // find information of ids found
        console.log(same_genres.length);
        res.send(same_genres)
        
        Media.findAll({
            include: [{
                model: Media_Reviewer,
                attributes: ['score'],
                where: { reviewer_id: 'im' }
            }],
            where: { 
                media_id: {[Op.in] : same_genres}
            },
            attributes: ['media_id', 'title', 'released', 'poster_url'],
        })
        .then(results => {
            res.send(results) 
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

module.exports = router