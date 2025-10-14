const express = require('express');
const router = new express.Router();
const Student = require('../Schema/studentSchema');

// Create a new student
router.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        const createStudent = await student.save();
        res.status(201).send(createStudent);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all students
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).send(students);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific student by ID
router.get('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const student = await Student.findById(_id);
        if (!student) {
            return res.status(404).send();
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a student by ID
router.patch('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updatedStudent = await Student.findByIdAndUpdate(_id, req.body, {
            new: true // Returns the updated document
        });
        if (!updatedStudent) {
            return res.status(404).send();
        }
        res.status(200).send(updatedStudent);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a student by ID
router.delete('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete(_id);
        if (!deletedStudent) {
            return res.status(404).send();
        }
        res.status(200).send(deletedStudent);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;