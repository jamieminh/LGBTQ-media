const express = require('express');
const Media = require('../models/Media');
const { Users, Users_Comments, Users_Ratings } = require('../models/Users')
const sequelize = require('sequelize');
const router = express.Router();
const Op = sequelize.Op;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const userAuthCheck = (req, res, next) => {
    const token = req.session.token;

    if (!token)
        return res.sendStatus(401)
    else {
        jwt.verify(token, process.env.JWT_SECRET_USER, (err, decoded) => {
            if (err) {
                return res.sendStatus(401)
            }
            else {
                req.userId = decoded.id
                next()
            }
        })
    }
}

// get all comments of a media
router.get('/comments/:media_id', (req, res) => {
    const media_id = req.params.media_id
    console.log(media_id);
    Users_Comments.findAll({
        where: { media_id: media_id },
        attributes: ['comment_id', 'comment',
            [sequelize.fn('date_format', sequelize.col('createdAt'), '%M %d, %Y at %h:%i'), 'createdAt']],
        include: {
            model: Users,
            attributes: ['display_name']
        },
        order: [['createdAt', 'DESC']]

    })
        .then(results => {
            const comments = results.map(result => {
                const createdAt = result.createdAt.toString().replace('T', '').replace('.000Z', '')
                return {
                    comment: decodeURIComponent(result.comment),
                    comment_id: result.comment_id,
                    createdAt: createdAt,
                    user: result.User.display_name
                }
            })

            res.send(comments)
        })
        .catch(err => console.error(err))
})


// add a comment 
router.post('/add-comment', userAuthCheck, (req, res) => {
    const comment = encodeURIComponent(req.body.comment)
    const media_id = req.body.media_id
    const user_id = req.body.user_id

    Users_Comments.create({media_id: media_id, user_id: user_id, comment: comment})
    .then(response => {
        res.send({ isSuccess: true })
        console.log(response)
    })
    .catch(err => console.error(err))
})


// get rating made by a user 
router.get('/get-rating', userAuthCheck, (req, res) => {
    const {media_id, user_id} = req.query
    // const media_id = req.params.media_id
    // console.log('[GET-RATING] ----------------' + media_id);
    Users_Ratings.findOne({
        where: {media_id: media_id, user_id: user_id},
        attributes: ['score']
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => console.error(err))
})

// change/add rating from a user
router.post('/add-rating', userAuthCheck, (req, res) => {
    const {media_id, user_id, score} = req.body.params
    console.log(media_id, user_id, score);

    // remove the old score, then insert the new one
    Users_Ratings.destroy({
        where: {media_id: media_id, user_id: user_id}
    })
    .then(_ => {
       Users_Ratings.create({media_id: media_id, user_id: user_id, score: score}) 
       .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})


router.get('/:email', userAuthCheck, (req, res) => {
    const email = req.params.email

    Users.findOne({
        where: { email: email },
        attributes: ['user_id', 'role', 'display_name']
    })
        .then(response => res.send(response))
        .catch(err => console.log(err))
})

module.exports = router