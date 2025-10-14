const express = require('express');
const router = new express.Router();
const User = require('../models/userSchema'); // Assuming userSchema is already defined
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(409).json({ error: "Email already exists" });
        } else {
            const user = new User({ username, email, password });

            // Hash password before saving
            // This would typically be done in a pre-save hook in the schema
            // For now, let's assume it's handled by the schema or add it here explicitly
            // const salt = await bcrypt.genSalt(10);
            // user.password = await bcrypt.hash(password, salt);

            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            // Compare hashed password
            const isMatch = await bcrypt.compare(password, userLogin.password);

            // Generate JWT token
            const token = await userLogin.generateAuthToken();
            console.log(token);

            // Store token in cookie
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000), // 30 days expiry
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials" });
            } else {
                res.json({ message: "User Signin Successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Example route (can be removed or modified based on existing structure)
router.get('/', (req, res) => {
    res.send('Hello from the home page');
});

module.exports = router;