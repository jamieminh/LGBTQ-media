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

module.exports = {Genre, Media_Genre};
