const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')

//MODELS
const playlist = require('./playlist/model');
const song = require('./song/model');

//ROUTERS
const playlistRouter = require('./playlist/router');
const songRouter = require('./song/router');


//CREATING OUR SERVER
const app = express();

//CREATING A BODY-PARSER OBJECT
const jsonParser = bodyParser.json()

//CONFIGURING OUR SERVER
app.use(jsonParser);
app.use(playlistRouter);
app.use(songRouter);



const port = process.env.PORT || 4000;

//OPENING SERVER FOR TRAFFIC
app.listen(port, () => console.log(`Listening on port ${port}`))
