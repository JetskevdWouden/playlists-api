const {Router} = require('express');
const Playlist = require('./model');

const router = new Router();

// '/playlist
//get all playlists
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

//add playlist
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

// '/playlist/:id'
//get playlist by id
router.get('/playlist/:id', (req, res, next) => {
    const id = req.params.id
    Playlist
        .findByPk(id)
        .then(playlist => {
            res
                .status(200)
                .send({
                    message: `PLAYIST WITH ID: ${id}`,
                    playist: playlist
                })
        })
        .catch(error => next(error))
})

//delete playlist by id
//***DOES NOT WORK YET***
router.delete('/playlist/:id', (req, res, next) => {
    const id = req.params.id
        Playlist
            .findByPk(id)
            .destory()
            .then(playlist => {
                res
                    .status(200)
                    .send({
                        message: `DELETED PLAYLIST WITH ID: ${id}`
                        // deleted_playlist: playlist
                    })
            })
            .catch(error => next(error))

})

module.exports = router;