'use strict';
const { DataTypes } = require('sequelize');
const db = require('../config');
const Media = require('./Media');


const Reviewer = db.define('Reviewer', {
    reviewer_id : {
        type: DataTypes.CHAR(2),
        primaryKey: true,
        autoIncrement: true
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

const Media_Reviewer = db.define('Media_Reviewer', {
    score: {
        type: DataTypes.STRING(3)
    },
    votes: {
        type: DataTypes.INTEGER
    }
},
{
    timestamps: false
})

// Super M-M Relationship
Media.belongsToMany(Reviewer, {through: Media_Reviewer, foreignKey: 'media_id', otherKey: 'reviewer_id'})
Reviewer.belongsToMany(Media, {through: Media_Reviewer, foreignKey: 'reviewer_id', otherKey: 'media_id'})

Reviewer.hasMany(Media_Reviewer, {foreignKey: 'reviewer_id'});
Media_Reviewer.belongsTo(Reviewer, {foreignKey: 'reviewer_id'});

Media.hasMany(Media_Reviewer, {foreignKey: 'media_id'});
Media_Reviewer.belongsTo(Media, {as: 'Media', foreignKey: 'media_id'});

module.exports = {Reviewer, Media_Reviewer};