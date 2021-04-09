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

// ASYNC AWAIT Method
app.post('/students', async (req, res) => {
    try {
        const createUser = new Student(req.body);
        const saveUser = await createUser.save();
        res.status(201).send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    };
});

app.listen(PORT, () => {
    console.log(`server started at port number ${PORT}`)
});