const express = require('express');
const User = require('../models/userSchema');
const Blog = require('../models/blogSchema'); // Import Blog model
const router = new express.Router();

// User Routes
router.post('/users', async (req, res) => {
    try {
        const addUser = new User(req.body);
        const insertUser = await addUser.save();
        res.status(201).send(insertUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users', async (req, res) => {
    try {
        const getUsers = await User.find({});
        res.status(200).send(getUsers);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getUser = await User.findById(_id);
        if (!getUser) {
            return res.status(404).send();
        } else {
            res.status(200).send(getUser);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateUser = await User.findByIdAndUpdate(_id, req.body, {
            new: true // Returns the updated document
        });
        if (!updateUser) {
            return res.status(404).send();
        } else {
            res.status(200).send(updateUser);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteUser = await User.findByIdAndDelete(_id);
        if (!deleteUser) {
            return res.status(404).send();
        } else {
            res.status(200).send(deleteUser);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

// Blog Routes

// Create a new blog post
router.post('/blogs', async (req, res) => {
    try {
        const addBlog = new Blog(req.body);
        const insertBlog = await addBlog.save();
        res.status(201).send(insertBlog);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get all blog posts
router.get('/blogs', async (req, res) => {
    try {
        const getBlogs = await Blog.find({});
        res.status(200).send(getBlogs);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get a single blog post by ID
router.get('/blogs/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getBlog = await Blog.findById(_id);
        if (!getBlog) {
            return res.status(404).send();
        } else {
            res.status(200).send(getBlog);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

// Update a blog post by ID
router.patch('/blogs/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateBlog = await Blog.findByIdAndUpdate(_id, req.body, {
            new: true // Returns the updated document
        });
        if (!updateBlog) {
            return res.status(404).send();
        } else {
            res.status(200).send(updateBlog);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

// Delete a blog post by ID
router.delete('/blogs/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteBlog = await Blog.findByIdAndDelete(_id);
        if (!deleteBlog) {
            return res.status(404).send();
        } else {
            res.status(200).send(deleteBlog);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;