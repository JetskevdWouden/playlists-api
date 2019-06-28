const express = require('express');
const db = require('./db')

//MODELS
const playlist = require('./playlist/model');

//ROUTERS




//CREATING OUR SERVER
const app = express();

//CREATING A BODY-PARSER OBJECT


//CONFIGURING OUR SERVER
//app.use



const port = process.env.PORT || 4000;

//OPENING SERVER FOR TRAFFIC
app.listen(port, () => console.log(`Listening on port ${port}`))
