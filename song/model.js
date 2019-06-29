const Playlist = require('../playlist/model');
const Sequelize = require('sequelize');
const db = require('../db');

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
    { tableName: 'songs' }
);

Song.belongsTo(Playlist);

module.exports = Song;