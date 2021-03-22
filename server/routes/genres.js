const express = require('express');
const { Genre, Media_Genre, genre_ids } = require('../models/Genre');
const { Review, Media_Reviewer, Reviewer } = require('../models/Reviewer')
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
        include: [
            { model: Genre, where: { name: genre } },
            { model: Reviewer, where: { name: 'imdb' } }
        ],
        order: [
            ['released', 'DESC']
        ],
        attributes: ['title', 'imdb_url', 'media_id', 'released', 'year_end', 'poster_url'],
    })

        .then(results => {
            const titles = results.map(r => {
                const score = r.Reviewers[0].Media_Reviewer.score
                return {
                    title: r.title, imdb_url: r.imdb_url,
                    media_id: r.media_id, released: r.released,
                    year_end: r.year_end, poster_url: r.poster_url, score: score
                }
            })
            res.send(titles)
        })
        .catch(err => console.log(err))
})

// get title with multiple genres (also like features)
router.get('/multiple/:genres', (req, res) => {
    const genres = req.params.genres.split("+")
    let len = genres.length
    let limit = len * 100       // get 100 titles for each genre
    let offset = Math.round(Math.random() * 500)
    let query_in = []
    let same_genres_titles = []
    const suggestionNums = 4


    // if there's only 1 genre
    if (len == 1)
        limit = suggestionNums

    query_in = genres.map(genre => ({ genre_id: genre_ids[genre.replace('-', '_')] }))

    Media_Genre.findAll({
        where: { [Op.or]: query_in },
        attributes: ['media_id'],
        offset: offset,
        order: [['media_id', 'ASC']],
        limit: limit
    })
        .then(results => {
            // res.send(results)
            if (len != 1) {
                let count = {}
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
                        if (same_genres_titles.length === suggestionNums)
                            break

                        if (count[media_id] === target) {
                            same_genres_titles.push(media_id)
                            delete count[media_id]
                        }
                    }

                    if (same_genres_titles.length === suggestionNums)
                        break
                }
            }
            else {
                same_genres_titles = results.map(item => item.media_id)
            }


            // res.send(count)
        })
        .then(r => {
            // find information of ids found
            console.log(same_genres_titles);

            Media.findAll({
                include: [{
                    model: Media_Reviewer,
                    attributes: ['score'],
                    where: { reviewer_id: 'im' }
                }],
                where: {
                    media_id: { [Op.in]: same_genres_titles }
                },
                attributes: ['media_id', 'title', 'released', 'poster_url', 'year_end'],
            })
                .then(results => {
                    const titles = results.map(item => {
                        return {
                            media_id: item.media_id, title: item.title,
                            released: item.released, year_end: item.year_end,
                            poster_url: item.poster_url, score_imdb: item.Media_Reviewers[0].score
                        }
                    })
                    res.send(titles)
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
})

module.exports = router