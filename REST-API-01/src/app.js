const express = require('express');
const app = express();
require('./Auth/index')
const Router = require('./routes/Students')
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(Router);

// PROMISE Returning Method
// app.post('/students', (req, res) => {
    // console.log(req.body)
    // const user = new Student(req.body)
    // user.save().then(() => {
        // res.status(201).send(user)
    // }).catch(err => {
        // res.status(400).send(err)
    // })
// });

app.listen(PORT, () => {
    console.log(`server started at port number ${PORT}`)
});