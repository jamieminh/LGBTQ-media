const express = require('express');
const { Genre, Media_Genre } = require('../models/Genre');
const { Reviewer, Media_Reviewer } = require('../models/Reviewer')
const { Artist } = require('../models/Artist')
const { Director } = require('../models/Director')
const Media = require('../models/Media');
// const sequelize = require('sequelize');
const sequelize = require('../config');

const { QueryTypes } = require('sequelize');
const { Sequelize } = require('../config');



const router = express.Router();
const Op = Sequelize.Op;


// get latest movies or series
router.get('/latest/:type/:limit', (req, res) => {
    const type = req.params.type;
    const limit = req.params.limit;
    const findParams = {
        include: [{
            model: Media_Reviewer,
            attributes: ['score'],
            where: { reviewer_id: 'im' }
        }, {
            model: Genre,
            attributes: ['name']
        }],
        where: { type: type },
        attributes: ['media_id', 'title', 'released', 'poster_url', 'year_end', 'createdAt'],
        order: [['released', 'DESC'], ['createdAt', 'DESC']],
    }

    if (limit !== 'all')
        findParams.limit = parseInt(limit)

    Media.findAll(findParams)
        .then(medias => {
            const titles = medias.map(item => {
                return {
                    media_id: item.media_id,
                    title: item.title,
                    released: item.released,
                    poster_url: item.poster_url,
                    score: item.Media_Reviewers[0].score,
                    genres: item.Genres.map(genre => genre.name),
                    year_end: item.year_end,
                }
            })
            res.send(titles)
        })
        .catch(err => console.log(err))
})


router.get("/search/:words", async (req, res) => {
    console.log(req.params.words);
    let words = req.params.words.split("+");
    let where_and = ""
    let where_or = ""

    const omit_words = ["am", "is", "are", "a", "an", "the", "this", "that", "these", "those"]
    const special_chars = ["\"", "\'", "\\"]

    let filtered = []

    // remove auxiliary words
    words.forEach(w => {
        // if word is not found in omit_words array
        if (omit_words.indexOf(w) === -1)
            filtered.push(w)
    })


    if (filtered.length === 0) {
        res.send({ isAllAux: true })
    }
    else {
        // if orCount > 0, prefix OR querries with an OR
        for (let i = 0; i < filtered.length; i++) {
            const escaped_word = filtered[i].replace(/'/g, '\\\'').replace(/"/g, '\\"')
            // use word boundaries to avoid result where word is part of another word
            // e.g. 'me' can be part of 'merry'
            // \\bword\\b : since \ is recognized as ecape char, \\\\b instead (4 slashes)
            where_and += "`Media`.`title` REGEXP '\\\\b" + escaped_word + "\\\\b'"    // word boundaries
            where_and += (i == filtered.length - 1) ? "" : " AND "

            where_or += "`Media`.`title` REGEXP '\\\\b" + escaped_word + "\\\\b'"
            where_or += (i == filtered.length - 1) ? "" : " OR "

        }

        let query_and = "SELECT `media_id`, `title`, `released`, `poster_url`, `year_end` FROM `Media` AS `Media` WHERE (" + where_and + ")"
        let query_or = "SELECT `media_id`, `title`, `released`, `poster_url`, `year_end` FROM `Media` AS `Media` WHERE (" + where_or + ")"

        // res.send(query_or)

        const results_and = await sequelize.query(query_and, { type: QueryTypes.SELECT });  // contains all search words
        const results_or = await sequelize.query(query_or, { type: QueryTypes.SELECT });    // contains each search words

        const uniqueAND = new Map([
            ...results_and.map(tt => [tt.media_id, tt]),
        ])

        const uniqueOR = new Map([
            ...results_or.map(tt => [tt.media_id, tt]),
        ])

        // so the result for AND will be shown first
        res.send(Array.from(uniqueAND.values()).concat(Array.from(uniqueOR.values())));
    }



})


// get full media data based on id 
router.get("/full/:id", (req, res) => {
    const id = req.params.id
    Media.findOne({
        include: [{
            model: Genre,
            attributes: ['name']
        }, {
            model: Reviewer,
            attributes: ['name']
        }, {
            model: Artist,
            attributes: ['name']
        }, {
            model: Director,
            attributes: ['name']
        }],
        where: { media_id: id }
    })
        .then(result => {
            if (result == null)
                res.send(null)
            else {
                const media = {
                    media_id: result.media_id, title: result.title,
                    released: result.released, plot: result.plot,
                    poster_url: result.poster_url, rated: result.rated,
                    imdb_url: result.imdb_url, type: result.type,
                    runtime: result.runtime, year_end: result.year_end,
                    languages: result.language.split(", ")
                }

                const genres = result.Genres.map(item => item.name)
                const reviewers = result.Reviewers.map(item => {
                    return { name: item.name, score: item.Media_Reviewer.score, votes: item.Media_Reviewer.votes }
                })
                const artists = result.Artists.map(item => {
                    return { name: item.name, artist_id: item.Media_Artist.artist_id }
                })
                const directors = result.Directors.map(item => {
                    return { name: item.name, director_id: item.Media_Director.director_id }
                })

                res.send({ media: media, genres: genres, reviewers: reviewers, artists: artists, directors: directors })
            }

        })
        .catch(err => console.log(err))
})


// get media based on id 
router.get("/:id", (req, res) => {
    const id = req.params.id
    Media.findOne({
        include: [{
            model: Genre,
            attributes: ['name']
        }, {
            model: Media_Reviewer,
            attributes: ['score'],
            where: { reviewer_id: 'im' }
        }],
        attributes: ['media_id', 'title', 'released', 'poster_url'],
        where: { media_id: id }
    })
        .then(result => {
            if (result == null)
                res.send(null)
            else {
                const genres = result.Genres.map(item => item.name);
                const media = {
                    id: result.media_id, title: result.title, released: result.released,
                    poster: result.poster_url, genres: genres, score: result.Media_Reviewers[0].score
                }
                res.send(media)
            }
        })
        .catch(err => console.log(err))
})


module.exports = router