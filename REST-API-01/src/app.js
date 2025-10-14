require('dotenv').config();
const express = require('express');
const app = express();
require('./db/connection'); // Database connection
const studentRouter = require('./routes/Students');

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(studentRouter); // Use the student router for API routes

app.get('/', (req, res) => {
    res.send('Welcome to the Student API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});