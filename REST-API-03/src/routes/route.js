const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Blog = require('../models/blogSchema'); // Import the Blog schema

// User registration route (existing)
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cPassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cPassword) {
        return res.status(422).json({ error: 'Please fill all the fields' });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: 'Email already exists' });
        } else if (password !== cPassword) {
            return res.status(422).json({ error: 'Passwords do not match' });
        } else {
            const user = new User({ name, email, phone, work, password, cPassword });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to register' });
    }
});

// User login route (existing)
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please fill the data' });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            if (password === userLogin.password) { // This should ideally be hashed password comparison
                res.json({ message: 'User Signin Successful' });
            } else {
                res.status(400).json({ error: 'Invalid Credentials' });
            }
        } else {
            res.status(400).json({ error: 'Invalid Credentials' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Blog Endpoints

// Create a new blog post
router.post('/blogs', async (req, res) => {
    const { title, content, author, tags } = req.body;

    if (!title || !content || !author) {
        return res.status(422).json({ error: 'Please fill all required fields: title, content, and author' });
    }

    try {
        const blog = new Blog({ title, content, author, tags });
        await blog.save();
        res.status(201).json({ message: 'Blog post created successfully', blog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

// Get all blog posts
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve blog posts' });
    }
});

// Get a single blog post by ID
router.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(200).json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve blog post' });
    }
});

// Update a blog post by ID
router.patch('/blogs/:id', async (req, res) => {
    const { title, content, author, tags } = req.body;

    if (!title && !content && !author && !tags) {
        return res.status(400).json({ error: 'No fields provided for update' });
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(200).json({ message: 'Blog post updated successfully', blog: updatedBlog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update blog post' });
    }
});

// Delete a blog post by ID
router.delete('/blogs/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

module.exports = router;