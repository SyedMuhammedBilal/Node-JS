const express = require('express');
const app = express();
require('./Auth/index')
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Home Page')
});

app.post('/students', (res, req) => {
    res.send('registration form')
});

app.listen(PORT, () => {
    console.log(`server started at port number ${PORT}`)
});