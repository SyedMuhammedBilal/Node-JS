const express = require('express');
const Student = require('../Schema/studentSchema')
const router = new express.Router();


router.get('/', (req, res) => {
    res.send('Hello from Home Page')
})


router.post('/students', async (req, res) => {
    try {
        const createUser = new Student(req.body);
        const saveUser = await createUser.save();
        res.status(201).send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    };
});

// GET Student Data 
router.get('/students', async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.status(201).send(studentsData);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get only one data
router.get('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const studentData = await Student.findById(_id);
        res.status(201).send(studentData);
    } catch (error) {
        res.status(400).send(error)
    }
})

// Delete Document
router.delete('/students/:id', async (req, res) => {
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
    };
});

// Update Document
router.patch('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateUser = new Student(_id, req.body);
        const updateStudent = await updateUser.findByIdAndUpdate()
        res.send(updateStudent);
    } catch (error) {
        res.status(400).send(error);
    };
});

module.exports = router