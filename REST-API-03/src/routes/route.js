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

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });
            } else {
                // Generate token (if using JWT)
                // const token = await userLogin.generateAuthToken(); // Assuming a method on userSchema
                // res.cookie("jwtoken", token, {
                //     expires: new Date(Date.now() + 25892000000),
                //     httpOnly: true
                // });

                res.json({ message: "User Signin Successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to signin" });
    }
});

// Blog Related Routes

// Route to create a new blog post
router.post('/blogs', async (req, res) => {
    try {
        const { title, content, author, publishDate, tags, category, imageUrl } = req.body;

        if (!title || !content || !author || !publishDate) {
            return res.status(400).json({ error: "Please fill in all required blog fields" });
        }

        const blog = new Blog({
            title,
            content,
            author,
            publishDate,
            tags,
            category,
            imageUrl
        });

        await blog.save();
        res.status(201).json({ message: "Blog post created successfully", blog });
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: "Failed to create blog post" });
    }
});

// Route to get all blog posts with pagination and filtering
router.get('/blogs', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; // Default to 10 blogs per page
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        if (req.query.tags) {
            // Assuming tags are comma-separated in the query string
            filter.tags = { $in: req.query.tags.split(',').map(tag => tag.trim()) };
        }
        // Add more filters here as needed (e.g., author, title search)

        const totalBlogs = await Blog.countDocuments(filter);
        const blogs = await Blog.find(filter)
                                .skip(skip)
                                .limit(limit)
                                .sort({ publishDate: -1, createdAt: -1 }); // Sort by most recent

        res.status(200).json({
            page,
            limit,
            totalPages: Math.ceil(totalBlogs / limit),
            totalBlogs,
            blogs
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve blog posts" });
    }
});

// Route to get a single blog post by ID
router.get('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        res.status(200).json(blog);
    } catch (err) {
        console.error(err);
        if (err.name === 'CastError') { // Handle invalid ID format
            return res.status(400).json({ error: "Invalid blog ID format" });
        }
        res.status(500).json({ error: "Failed to retrieve blog post" });
    }
});

// Route to update a blog post by ID
router.patch('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Run schema validators on update
        });

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        res.status(200).json({ message: "Blog post updated successfully", blog: updatedBlog });
    } catch (err) {
        console.error(err);
        if (err.name === 'CastError') {
            return res.status(400).json({ error: "Invalid blog ID format" });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: "Failed to update blog post" });
    }
});

// Route to delete a blog post by ID
router.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        res.status(200).json({ message: "Blog post deleted successfully", blog: deletedBlog });
    } catch (err) {
        console.error(err);
        if (err.name === 'CastError') {
            return res.status(400).json({ error: "Invalid blog ID format" });
        }
        res.status(500).json({ error: "Failed to delete blog post" });
    }
});

module.exports = router;