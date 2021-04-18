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
        res.status(201).send(insertPlayer);
    } catch (error) {
        res.status(400).send(error);
    };
});

app.get('/player', async (req, res) => {
    try {
        const getPlayers = await PlayersRanking.find({}).sort({ "ranking": 1 });
        res.status(201).send(getPlayers);
    } catch(error) {
        res.status(400).send(error)
    }
})

app.get('/player/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const getOnePlayer = await PlayersRanking.findById(_id);
        res.status(201).send(getOnePlayer)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.patch('/player/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const updatePlayer = await PlayersRanking.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(201).send(updatePlayer)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/player/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const deletePlayer = await PlayersRanking.findByIdAndDelete(_id);
        res.status(201).send(deletePlayer)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, () => {
    console.log('server started')
})