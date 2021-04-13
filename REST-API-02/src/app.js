const express = require("express");
const port = process.env.PORT || 8080
require('./db/connection')
const PlayersRanking = require('./models/index')
const app = express();

app.get('/', async (req, res) => {
    res.send('hello from homepage')
});

app.post()

app.listen(port, () => {
    console.log('server started')
})