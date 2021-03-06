'use strict';
const { DataTypes } = require('sequelize');
const db = require('../config');


const Media = db.define('Media', {
    media_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    released: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plot: {
        type: DataTypes.TEXT
    },
    poster_url: {
        type: DataTypes.STRING
    },
    runtime: {
        type: DataTypes.INTEGER
    },
    rated: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    year_end: {
        type: DataTypes.STRING
    },
    imdb_url: {
        type: DataTypes.STRING
    },
    language: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,  // do not pluralize the name
    timestamps: false       // do not generate createdAt and updatedAt
})


module.exports = Media