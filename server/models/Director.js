'use strict';
const { DataTypes } = require('sequelize')
const db = require('../config')
const Media = require('./Media');


const Director = db.define('Director', {
    director_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false
})

const Media_Director = db.define('Media_Director', {}, {timestamps: false})

Media.belongsToMany(Director, {through: Media_Director, foreignKey: 'media_id', otherKey: 'director_id'})
Director.belongsToMany(Media, {through: Media_Director, foreignKey: 'director_id', otherKey: 'media_id'})

Director.hasMany(Media_Director, {foreignKey: 'director_id'});
Media_Director.belongsTo(Director, {foreignKey: 'director_id'});

Media.hasMany(Media_Director, {foreignKey: 'media_id'});
Media_Director.belongsTo(Media, {foreignKey: 'media_id'});

module.exports = { Director, Media_Director }