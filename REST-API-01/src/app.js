const express = require('express');
const app = express();
require('./Auth/index')
const Student = require('./Schema/studentSchema')
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home Page')
});

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

// ASYNC AWAIT Method ===== POST Method =====
app.post('/students', async (req, res) => {
    try {
        const createUser = new Student(req.body);
        const saveUser = await createUser.save();
        res.status(201).send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    };
});

// GET Student Data 
app.get('/students', async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.status(201).send(studentsData);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get only one data
app.get('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const studentData = await Student.findById(_id);
        res.status(201).send(studentData);
    } catch (error) {
        res.status(400).send(error)
    }
})

// Delete Document
app.delete('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const deleteStudent = await Student.findByIdAndDelete(_id);
        if(!_id) {
            res.status(400).send();
        } else {
            res.status(201).send(deleteStudent)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(PORT, () => {
    console.log(`server started at port number ${PORT}`)
});