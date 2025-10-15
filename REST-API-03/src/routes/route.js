const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); // Assuming userSchema exports the User model
const Blog = require('../models/blogSchema'); // Import the Blog model
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

        // ... (rest of the signin logic would go here)
        // For brevity, assuming it continues from the provided snippet.
        // If userLogin is found, compare passwords and issue a token.

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred during signin" });
    }
});

// Blog Newsfeed Endpoint
router.get('/blogs', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category; // Optional category filter
        const skip = (page - 1) * limit;

        let query = {};
        if (category) {
            query.category = category; // Add category to query if provided
        }

        const blogs = await Blog.find(query)
                                .sort({ publishDate: -1, createdAt: -1 }) // Sort by newest first
                                .skip(skip)
                                .limit(limit);

        const totalBlogs = await Blog.countDocuments(query);

        res.status(200).json({
            page,
            limit,
            totalBlogs,
            totalPages: Math.ceil(totalBlogs / limit),
            blogs
        });

    } catch (err) {
        console.error("Error fetching blog newsfeed:", err);
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
});


module.exports = router;