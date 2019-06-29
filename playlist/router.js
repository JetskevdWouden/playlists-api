const { Router } = require('express');
const Playlist = require('./model');
const Song = require('../song/model');
const auth = require('../auth/middelware');

const router = new Router();

// '/playlist
//get all playlists
router.get('/playlist', auth, (req, res, next) => {
    const thisUserId = req.user.id
    Playlist
        .findAll({
            where: {
                userId: thisUserId
            }
        })               
        .then(playlists => {
            res
                .status(200)
                .send({
                    playlists: playlists
                })
        })
        .catch(error => next(error))
})

//add playlist
router.post('/playlist', auth, (req, res, next) => {
    const newPlaylist = {
        name: req.body.name,
        userId: req.user.id
    }
    Playlist
        .create(newPlaylist)
        .then(playlist => {
            res
                .status(201)
                .send({
                    message: "A NEW PLAYLIST WAS CREATED",
                    new_playlist: playlist
                })
        })
        .catch(error => next(error))
})

// '/playlist/:id'
//get playlist by id with all songs
router.get('/playlist/:id', auth, (req, res, next) => {
    const playlist_id = req.params.id
    const thisUserId = req.user.id
    Promise.all([
        Playlist.findByPk(playlist_id),
        Song.findAll({
            where: {
                playlistId: playlist_id
            }
        })
    ])
        .then(([playlist, songs]) => {
            if (!playlist) {
                res
                    .status(404)
                    .send({
                        message: "PLAYLIST WITH THAT ID DOES NOT EXIST"
                    })
            } else if (playlist.userId !== thisUserId) {
                res
                    .status(404)
                    .send({
                        message: "THIS IS NOT YOUR PLAYLIST DUDE"
                    })
            } else {
                res
                    .status(200)
                    .send({
                        message: `SONGS ON PLAYLIST WITH ID: ${playlist_id}`,
                        playlist_name: playlist.name,
                        songs_on_playlist: songs
                    })
            }
        })
        .catch(error => next(error))
})

//delete playlist by id
router.delete('/playlist/:id', auth, (req, res, next) => {
    const playlist_id = req.params.id
    const thisUserId = req.user.id
    Playlist
        .findByPk(playlist_id)
        .then(playlist => {
            if (!playlist) {
                res
                    .status(404)
                    .send({
                        message: "PLAYLIST WITH THAT ID DOES NOT EXIST"
                    })
            } else if (playlist.userId !== thisUserId) {
                res
                    .status(404)
                    .send({
                        message: "YOU CANNOT DELETE SOMEONE ELSE'S PLAYLIST DUDE"
                    })

            } else {
                playlist
                    .destroy()
                    .then(response => {
                        res
                            .status(200)
                            .send({
                                message: `PLAYLIST WITH ID ${playlist_id} HAS BEEN DELETED`
                            })
                    })
                
            }
        })
        .catch(error => next(error))
})

module.exports = router;