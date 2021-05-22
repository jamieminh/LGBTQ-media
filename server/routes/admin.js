const express = require('express');
const Media = require('../models/Media');
const { Users, Users_Comments } = require('../models/Users')
const { Artist, Media_Artist } = require('../models/Artist')
const { Director, Media_Director } = require('../models/Director')
const { Genre, Media_Genre } = require('../models/Genre')
const { Reviewer, Media_Reviewer } = require('../models/Reviewer')

const sequelize = require('../config/index');
const router = express.Router();
const Op = sequelize.Op;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const adminAuthCheck = (req, res, next) => {
    const token = req.session.token

    if (!token)
        return res.sendStatus(401)
    else {
        jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.sendStatus(401)
            }
            else {
                console.log(decoded);
                req.userId = decoded.id
                next()
            }
        })
    }
}

// admin commenting on a title will have brackets showing they're an admin
router.post('/add-comment', adminAuthCheck, (req, res) => {
    const comment = encodeURIComponent("[ADMIN] " + req.body.comment)
    const media_id = req.body.media_id
    const user_id = req.body.user_id

    Users_Comments.create({ media_id: media_id, user_id: user_id, comment: comment })
        .then(_ => {
            res.send({ isSuccess: true })
        })
        .catch(err => console.error(err))
})



router.get('/:email', adminAuthCheck, (req, res) => {
    const email = req.params.email

    Users.findOne({
        where: { email: email },
        attributes: ['user_id', 'role']
    })
        .then(response => res.send(response))
        .catch(err => console.log(err))
})

router.post('/create-media', adminAuthCheck, (req, res) => {
    let { title, type, rated, released, yearEnd, plot, posterUrl,
        runtime, imdbTitle, languages, genres, directors, artists, reviewers } = req.body.titleDetails

    title = title.replace(/\'/g, "\\\'")       // escape single quote characters
    plot = plot.replace(/\'/g, "\\\'")       // escape single quote characters

    console.log(req.body.titleDetails);

    Media.create({
        title: title, type: type, rated: rated, released: released,
        year_end: yearEnd, plot: plot, poster_url: posterUrl,
        runtime: runtime, imdb_url: 'https://www.imdb.com/title/tt' + imdbTitle,
        language: languages.join(', ')
    })
        .then(resp => {
            const media_id = resp.dataValues.media_id
            insertM2M(artists, Artist, 'Media_Artists', 'artist_id', media_id)
            insertM2M(directors, Director, 'Media_Directors', 'director_id', media_id)
            insertM2MGenre(genres, media_id)
            insertM2MReviewers(reviewers, media_id)
        })
        .then(_ => {
            res.send({ isSuccess: true })
        })
        .catch(_ => {
            res.send({ isSuccess: false, message: "Error Occured, Check your inputs" })
        })
})

router.post('/update-media', adminAuthCheck, (req, res) => {
    let { title, type, rated, released, yearEnd, plot, posterUrl,
        runtime, imdbTitle, languages, genres, directors, artists, reviewers } = req.body.titleDetails

    const media_id = req.body.media_id
    title = title.replace(/\'/g, "\\\'")       // escape single quote characters
    plot = plot.replace(/\'/g, "\\\'")       // escape single quote characters

    console.log(req.body.titleDetails);

    Media.update({
        title: title, type: type, rated: rated, released: released, year_end: yearEnd, plot: plot, poster_url: posterUrl,
        runtime: runtime, imdb_url: 'https://www.imdb.com/title/tt' + imdbTitle, language: languages.join(', ')
    }, {
        where: { media_id: media_id }
    })
        .then(async _ => {
            await deleteM2M(media_id)   // remove old junctions

            // re-insert
            insertM2M(artists, Artist, 'Media_Artists', 'artist_id', media_id)
            insertM2M(directors, Director, 'Media_Directors', 'director_id', media_id)
            insertM2MGenre(genres, media_id)
            insertM2MReviewers(reviewers, media_id)

        })
        .then(_ => {
            res.send({ isSuccess: true })
        })
        .catch(_ => res.send({ isSuccess: false }))
})

router.post('/delete-media', adminAuthCheck, (req, res) => {
    const media_id = req.body.media_id;

    Media.destroy({where: {media_id: media_id}})
    .then(_ => res.send({isSuccess: true}))
    .catch(_ => res.send({isSuccess: false}))
})

// handle insertion for artists and directors
const insertM2M = (names, main_table, junction_table, id_col_name, media_id) => {
    names.forEach(async name => {
        let id = null
        name = name.replace(/\'/g, "\\\'")       // escape single quote characters

        // check if main table has that name
        main_table.findOne({
            where: { name: name }
        })
            .then(async res => {
                if (res && res.dataValues) {      // has record
                    id = res.dataValues[id_col_name]
                }
                else {
                    await main_table.create({ name: name })
                        .then(res1 => {
                            id = res1.dataValues[id_col_name]
                        })
                        .catch(err => console.log('[Error] INSERTING NAME'))
                }
            })
            .then(async _ => {        // insert into junction table
                await insertJuntion(junction_table, id_col_name, media_id, id)
            })
            .catch(err => console.log(err))
    })
}

// handle insertion for genres
const insertM2MGenre = (genres, media_id) => {
    genres.forEach(async genre => {
        let id = null

        // get genre_id
        Genre.findOne({
            where: { name: genre }
        })
            .then(res => {
                id = res.genre_id
            })
            .then(async _ => {        // insert into junction table
                await insertJuntion('Media_Genres', 'genre_id', media_id, id, true)
            })
            .catch(err => console.log(err))
    })
}

// handle insertion for reviewers
const insertM2MReviewers = (reviewers, media_id) => {
    reviewers.forEach(async reviewer => {
        let id = null
        const [rev, score, votes] = reviewer

        // get genre_id
        Reviewer.findOne({
            where: { name: rev }
        })
            .then(res => {
                id = res.reviewer_id
            })
            .then(async _ => {        // insert into junction table
                const query = `INSERT INTO media_reviewers (media_id, reviewer_id, score, votes) 
                VALUES (${media_id}, '${id}', ${score}, ${votes})`
                await sequelize.query(query)
            })
            .catch(err => console.log(err))
    })
}

// handle delete from junction table for artists, directors, reviewer and genres
async function deleteM2M (media_id) {
    Media_Artist.destroy({
        where: { media_id: media_id }
    })

    Media_Director.destroy({
        where: { media_id: media_id }
    })

    Media_Genre.destroy({
        where: { media_id: media_id }
    })

    Media_Reviewer.destroy({
        where: { media_id: media_id }
    })
}

async function insertJuntion(junction_table, id_col_name, media_id, id, isString = false) {

    const query = isString ?
        `INSERT INTO ${junction_table} (media_id, ${id_col_name}) VALUES (${media_id}, '${id}')` :
        `INSERT INTO ${junction_table} (media_id, ${id_col_name}) VALUES (${media_id}, ${id}) `
    await sequelize.query(query)
}


module.exports = router