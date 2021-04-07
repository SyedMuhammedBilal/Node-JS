const express = require('express');
const app = express();
require('./Auth/index')
const Student = require('./Schema/studentSchema')
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home Page')
});

app.post('/students', (req, res) => {
    console.log(req.body)
    const user = new Student(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch(err => {
        res.status(400).send(err)
    })
});

app.listen(PORT, () => {
    console.log(`server started at port number ${PORT}`)
});