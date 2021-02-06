const express = require('express');
const { Genre, Media_Genres } = require('../models/Genre');
const Media = require('../models/Media');

const router = express.Router();


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

module.exports = router