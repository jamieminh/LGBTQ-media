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
        include: [{ model: Genre, where: { name: genre } }],
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
    let len = genres.length
    let limit = len * 300
    let offset = Math.round(Math.random() * 50)
    const query_in = []
    let same_genres = []

    

    // if drama is the only genre
    if (len == 1 && genres[0] === 'drama') {
        query_in.push({ genre_id: genre_ids['drama']})
        offset += 100
    }

    // if there's only 1 genre
    if (len == 1) 
        limit = 5
    else {
        genres.map(genre => {
            if (genre !== 'drama')      // omit drama because there're too many (nearly 3200)
                query_in.push({ genre_id: genre_ids[genre.replace('-', '_')] })
            else if (genre === 'drama' && len != 1)
                len -= 1
            if (genre === 'romance' && genres.length !=1)
                limit += 500
        })
    }


    console.log(query_in);


    Media_Genre.findAll({
        where: { [Op.or]: query_in },
        attributes: ['media_id'],
        offset: offset,
        limit: limit
    })
        .then(results => {
            let count = {}
            // res.send(results)
            // count the appearance of each id
            for (let i = 0; i < results.length; i++) {
                const media_id = results[i].media_id
                if (count[media_id] == null)        // if not visited, add it
                    count[media_id] = 1
                else {                              // update value of a visited genre
                    const update = count[media_id] + 1
                    count[media_id] = update
                }
            }


            for (let target = len; target > 0; target--) {
                for (const media_id in count) {
                    if (same_genres.length === 4)
                        break

                    if (count[media_id] === target) {
                        same_genres.push(media_id)
                        delete count[media_id]
                    }
                }

                if (same_genres.length === 4)
                    break
            }

            // res.send(count)
        })
        .then(r => {
            // find information of ids found
            console.log(same_genres.length);
            // res.send(same_genres)

            Media.findAll({
                include: [{
                    model: Media_Reviewer,
                    attributes: ['score'],
                    where: { reviewer_id: 'im' }
                }],
                where: {
                    media_id: { [Op.in]: same_genres }
                },
                attributes: ['media_id', 'title', 'released', 'poster_url'],
            })
                .then(results => {
                    const titles = results.map(item => {
                        return {media_id: item.media_id, title: item.title, released: item.released,
                            poster_url: item.poster_url, score_imdb: item.Media_Reviewers[0].score}
                    })
                    res.send(titles) 
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
})

module.exports = router