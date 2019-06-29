// const Playlist = require('../playlist/model');
const { Router } = require('express');
const Song = require('./model');

const router = new Router();

// '/playlist/:id/songs'
//POST - user add song to playlist
///***add error if playlist does not exist??///
///***add check is song is already in another playlist --> not allowed***
router.post('/playlist/:id/songs', (req, res, next) => {
    const playlistId = req.params.id
    Song
        .create({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            playlistId: playlistId

        })
        .then(song => {
            res
                .status(201)
                .send({
                    message: `NEW SONG CREATED WITH PLAYLISTID: ${playlistId}`,
                    song: song
                })
        })
        .catch(error => next(error))
})


module.exports = router;