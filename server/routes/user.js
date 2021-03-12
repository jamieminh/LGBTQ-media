const express = require('express');
const Media = require('../models/Media');
const { Users, Users_Comments } = require('../models/Users')
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


router.get('/:email', userAuthCheck, (req, res) => {
    const email = req.params.email

    Users.findOne({
        where: { email: email },
        attributes: ['user_id', 'role', 'display_name']
    })
        .then(response => res.send(response))
        .catch(err => console.log(err))
})

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
        }

    })
        .then(results => {
            const comments = results.map(result => {
                const createdAt = result.createdAt.toString().replace('T', '').replace('.000Z', '')
                return {
                    comment: result.comment,
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
    const comment = req.body.comment
    const media_id = req.body.media_id
    const user_id = req.body.user_id

    // Users_Comments.create({media_id: media_id, user_id: user_id, })
})


// const escapeSpecialChars
module.exports = router