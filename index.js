const express = require('express');
const bodyParser = require('body-parser');

const playlistRouter = require('./playlist/router');
const songRouter = require('./song/router');
const userRouter = require('./user/router')
const authRouter = require('./auth/router');

const app = express();

const jsonParser = bodyParser.json()

app.use(jsonParser);
app.use(authRouter);
app.use(userRouter);
app.use(playlistRouter);
app.use(songRouter);;

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`))
