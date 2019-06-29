const Playlist = require('../playlist/model');
// const User = require('../user/model');
const Sequelize = require('sequelize');
const db = require ('../db');

//song can only be on one playlist

const Song = db.define(
    'song',
    {
        title: {
            type: Sequelize.STRING,
            field: 'song_title'
        },
        artist: {
            type: Sequelize.STRING,
            field: 'artist_name'
        },
        album: {
            type: Sequelize.STRING,
            field: 'album_title'
        }
    },
    {tableName: 'songs'}
);

Song.belongsTo(Playlist);

module.exports = Song;