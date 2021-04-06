const mongoose = require('mongoose')
const validator = require('validator')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already in use'],
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    }
})