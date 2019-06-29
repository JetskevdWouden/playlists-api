const Playlist = require('../playlist/model');
const {Router} = require('express');
const Song = require('./model');

const router = new Router();

// '/playlists/:id/songs'
//get all songs on that playist (where foreign key === :id)
router.get('/playlist/:id/songs', (req, res, next) => {
    const playlistId = req.params.id
    console.log(playlistId);
    Song
        .findAll()              //where foreign key === playlistId
        .then(songs => {
            res
                .status(200)
                .send({
                    message: `ALL SONGS IN PLAYLIST WITH ID:${playlistId}`,
                    songs: songs
                })
        })
        .catch(error => next(error))
})


//POST - user add song to playlist
router.post('/playlist/:id/songs', (req, res, next) => {

})


module.exports = router;