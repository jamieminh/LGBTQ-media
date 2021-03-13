'use strict';
const { DataTypes } = require('sequelize');
const db = require('../config');
const Media = require('./Media');


const Users = db.define('Users', {
    user_id : {
        type: DataTypes.CHAR(24),
        primaryKey: true,
    },
    display_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.CHAR(255),
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    }
},
{
    timestamps: false
})

const Users_Comments = db.define('Users_Comments', {
    comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    comment: {
        type: DataTypes.CHAR(6000)
    },
    // date: {
    //     type: DataTypes.Da
    // }
},
{
    createdAt: true,
    updatedAt: false
})

const Users_Ratings = db.define('Users_Ratings', {
    score: {
        type: DataTypes.TINYINT
    }
},
{
    timestamps: false
})

// Super M-M Relationship
Media.belongsToMany(Users, {through: Users_Comments, foreignKey: 'media_id', otherKey: 'user_id'})
Media.belongsToMany(Users, {through: Users_Ratings, foreignKey: 'media_id', otherKey: 'user_id'})

Users.belongsToMany(Media, {through: Users_Comments, foreignKey: 'user_id', otherKey: 'media_id'})
Users.belongsToMany(Media, {through: Users_Ratings, foreignKey: 'user_id', otherKey: 'media_id'})

Users.hasMany(Users_Ratings, {foreignKey: 'user_id'});
Users_Ratings.belongsTo(Users, {foreignKey: 'user_id'});

Users.hasMany(Users_Comments, {foreignKey: 'user_id'});
Users_Comments.belongsTo(Users, {foreignKey: 'user_id'});

Media.hasMany(Users_Ratings, {foreignKey: 'media_id'});
Users_Ratings.belongsTo(Media, {as: 'Media', foreignKey: 'media_id'});

Media.hasMany(Users_Comments, {foreignKey: 'media_id'});
Users_Comments.belongsTo(Media, {as: 'Media', foreignKey: 'media_id'});

module.exports = {Users, Users_Comments, Users_Ratings};