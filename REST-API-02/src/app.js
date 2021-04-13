const express = require("express");
const port = process.env.PORT || 8080
const app = express();

app.get('/', async (req, res) => {
    res.send('hello from homepage')
});

app.listen(port, () => {
    console.log('server started')
})