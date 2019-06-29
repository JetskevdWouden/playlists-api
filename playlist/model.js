const Sequelize = require('sequelize');
const User = require('../user/model')
const db = require('../db');

const Playlist = db.define(
    'playlist',
    {
        name: {
            type: Sequelize.STRING,
            field: 'playlist_name'
        }
    },
    { tableName: 'playlists'}
)

Playlist.belongsTo(User);

module.exports = Playlist;