const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });

require('./db/conc'); // Database connection
// const User = require('./models/userSchema'); // Not directly used here, but imported in routes

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(require('./routes/route')); // Link the router file

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at port no ${PORT}`);
});