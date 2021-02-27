const express = require('express');
const Media = require('../models/Media');
const {Users} = require('../models/Users')
const sequelize = require('sequelize');
const router = express.Router();
const Op = sequelize.Op;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const userAuthCheck = (req, res, next) => {
    const token = req.headers["x-access-token"]

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


router.get('/:email', (req, res) => {
    const email = req.params.email

    Users.findOne({
        where: {email: email},
        attributes: ['user_id', 'role']
    })
    .then(response => res.send(response))
    .catch(err => console.log(err))
})


module.exports = router