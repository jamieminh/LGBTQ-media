const express = require('express');
const {Genre, Media_Genre} = require('../models/Genre');
const sequelize = require('sequelize');
const router = express.Router();

let animation_ids = []

router.get('/', (req, res) => {
    Media_Genre.findAll({
        attributes: ['media_id'],
        include: {model: Genre, attributes: [], where: {name: 'animation'}},
    })
    .then(result => {
        result.forEach(item => animation_ids.push(item.media_id))
        res.send(animation_ids)
    })
})


module.exports = animation_ids