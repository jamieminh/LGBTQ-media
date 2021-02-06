'use strict';
const { DataTypes } = require('sequelize')
const db = require('../config');
const Media = require('./Media');

const Artist = db.define('Artist', {
    artist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
{   
    timestamps: false
})

const Media_Artist = db.define('Media_Artist', {}, {timestamps: false})

// Super Many-to-Many relationship
Media.belongsToMany(Artist, {through: Media_Artist, foreignKey: 'media_id', otherKey: 'artist_id'})
Artist.belongsToMany(Media, {through: Media_Artist, foreignKey: 'artist_id', otherKey: 'media_id'})

Artist.hasMany(Media_Artist, {foreignKey: 'artist_id'});
Media_Artist.belongsTo(Artist, {foreignKey: 'artist_id'});

Media.hasMany(Media_Artist, {foreignKey: 'media_id'});
Media_Artist.belongsTo(Media, {foreignKey: 'media_id'});
//
module.exports = { Artist, Media_Artist};