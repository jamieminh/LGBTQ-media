'use strict';
const { DataTypes } = require('sequelize');
const db = require('../config');
const Media = require('./Media')

const Genre = db.define('Genre', {
    genre_id: {
        type: DataTypes.CHAR(3),
        allowNull:false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
},
{
    timestamps: false       // do not generate createdAt and updatedAt
})

const Media_Genre = db.define('Media_Genre', {}, {timestamps: false })


// Super M-M Association
Genre.belongsToMany(Media, {through: Media_Genre, foreignKey: 'genre_id'})
Media.belongsToMany(Genre, {through: Media_Genre, foreignKey: 'media_id'})

Genre.hasMany(Media_Genre, {foreignKey: 'genre_id'});
Media_Genre.belongsTo(Genre, {foreignKey: 'genre_id'});

Media.hasMany(Media_Genre, {foreignKey: 'media_id'});
Media_Genre.belongsTo(Media, {as: 'Media', foreignKey: 'media_id'});

const genre_ids = {action: 'act', adventure: 'adv', adult: 'adult', animation: 'ani', biography: 'bio',
    comedy: 'com', crime: 'crm', documentary: 'doc', drama: 'dra', family: 'fam', fantasy: 'fns', 
    film_noir: 'nir', game_show: 'gms', history: 'his', horror: 'hor', musical: 'mus',
    mystery: 'mys', na: 'n/a', news: 'nws', reality_tv: 'rlt', romance: 'rom', sci_fi: 'sci-fi',
    short: 'shr', 'sport': 'spr', talk_show: 'tlk', thriller: 'thr', war: 'war', western: 'wes'
}


module.exports = {Genre, Media_Genre, genre_ids};
