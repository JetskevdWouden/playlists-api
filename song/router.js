const Playlist = require('../playlist/model');
const { Router } = require('express');
const Song = require('./model');
const auth = require('../auth/middelware');

const router = new Router();

// '/playlist/:id/songs'
//POST - user add song to playlist
///***add check if song is already in another playlist --> not allowed***
router.post('/playlist/:id/songs', auth, (req, res, next) => {
    const thisUserId = req.user.id
    const playlistId = req.params.id
    const songTitle = req.body.title
    const songArtist = req.body.artist
    const songAlbum = req.body.album

    Playlist
        .findByPk(playlistId)
        .then(playlist => {
            if (!playlist) {
                res
                    .status(404)
                    .send({
                        message: `PLAYLIST WITH ID ${playlistId} DOES NOT EXIST`
                    })
            } else if (playlist.userId !== thisUserId) {
                res
                    .status(404)
                    .send({
                        message: "THIS IS NOT YOUR PLAYLIST DUDE"
                    })
            } else {
                Song
                    .create({
                        title: songTitle,
                        artist: songArtist,
                        album: songAlbum,
                        playlistId: playlistId
                    })
                    .then(song => {
                        res
                            .status(200)
                            .send({
                                message: `NEW SONG CREATED WITH PLAYLISTID: ${playlistId}`,
                                song: song
                            })
                    })
                    .catch(error => next(error))
            }
        })
})

module.exports = router;
