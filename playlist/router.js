const {Router} = require('express');
const Playlist = require('./model');

const router = new Router();

// '/playlist
router.get('/playlist', (req, res, next) => {
    Playlist
        .findAll()
        .then(playlists => {
            res
                .status(200)
                .send({
                    playlists: playlists
                })
        })
        .catch(error => next(error))
})

router.post('/playlist', (req, res, next) => {
    Playlist
        .create(req.body)
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

module.exports = router;