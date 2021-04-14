const express = require("express");
const port = process.env.PORT || 8080
require('./db/connection')
const PlayersRanking = require('./models/index')
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    res.send('hello from homepage')
});

app.post('/player', async (req, res) => {
    try {
        const addingPlayer = new PlayersRanking(req.body);
        const insertPlayer = await addingPlayer.save();
        res.send(insertPlayer);
    } catch (error) {
        res.send(error);
    };
});

app.listen(port, () => {
    console.log('server started')
})