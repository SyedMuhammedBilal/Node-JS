const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.post('/students', (res, req) => {
    res.send('registration form')
});

app.listen(PORT, () => {
    console.log(`server started at port number ${PORT}`)
});