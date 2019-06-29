const Playlist = require('../playlist/model');
const { Router } = require('express');
const Song = require('./model');

const router = new Router();

// '/playlist/:id/songs'
//POST - user add song to playlist
///***add check if song is already in another playlist --> not allowed***
router.post('/playlist/:id/songs', (req, res, next) => {
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
            }
        })
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
})

module.exports = router;

// Song
//                     .create({
                        // title: req.body.title,
                        // artist: req.body.artist,
                        // album: req.body.album,
                        // playlistId: playlistId
//                     })
//                     .then(song => {
//                         res
                            // .status(200)
                            // .send({
                            //     message: `NEW SONG CREATED WITH PLAYLISTID: ${playlistId}`,
                            //     song: song
                            // })
//                     })

    // Promise.all([
    //     Playlist.findByPk(playlistId),
    //     Song.findAll({
    //         where: {
    //             title: songTitle,
    //             artist: songArtist,
    //             album: songAlbum
    //         }
    //     })
    // ])
    //     .then(([playlist, song]) => {
    //         if (!playlist) {
    //             res
    //                 .status(404)
    //                 .send({
    //                     message: "PLAYLIST DOES NOT EXIST"
    //                 })
    //         }
    //         if (song) {
    //             res
    //                 .status(209)
    //                 .send({
    //                     message: "I EXIST"
    //                 }) 
    //         }
    //     })