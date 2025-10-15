const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); // Assuming userSchema exports the User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Assuming jsonwebtoken is installed

// User Registration Route
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cPassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cPassword) {
        return res.status(422).json({ error: "Please fill in all fields" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        } else if (password !== cPassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        } else {
            const user = new User({ name, email, phone, work, password, cPassword });

            // Hash the password before saving
            // This logic should ideally be in the userSchema pre-save hook,
            // but for demonstration, it's here.
            // In a real app, you'd use a pre-save hook in the schema.
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.cPassword = await bcrypt.hash(cPassword, salt); // Also hash confirm password if storing

            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

// User Signin Route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials" });
            } else {
                // Generate JWT token
                const token = jwt.sign({ _id: userLogin._id }, process.env.SECRET_KEY || 'YOUR_SECRET_KEY_HERE'); // Use environment variable for secret key

                // Store token in cookies (example)
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000), // Expires in 30 days
                    httpOnly: true
                });

                res.json({ message: "User signed in successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to sign in" });
    }
});

module.exports = router;