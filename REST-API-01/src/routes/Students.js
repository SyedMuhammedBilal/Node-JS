const express = require('express');
const router = new express.Router();
const Student = require('../Schema/studentSchema');

// Create a new student
router.post('/students', async (req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Read all students
router.get('/students', async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.status(200).send(studentsData);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Read individual student by ID
router.get('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if (!studentData) {
            return res.status(404).send();
        } else {
            res.status(200).send(studentData);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

// Update student by ID
router.patch('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Run schema validators on update
        });

        if (!updateStudents) {
            return res.status(404).send();
        }

        res.status(200).send(updateStudents);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;