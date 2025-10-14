const express = require('express');
const app = express();
require('./db/conc'); // Assuming this connects to MongoDB
const User = require('./models/userSchema'); // Assuming userSchema exists
const Blog = require('./models/blogSchema'); // Import the new Blog schema

const PORT = process.env.PORT || 3000;

app.use(express.json()); // To parse JSON request bodies

app.get('/', (req, res) => {
    res.send('Hello from the home page');
});

// Example route to create a new user (assuming userSchema is defined)
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(422).json({ error: "Please fill all fields" });
        }
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

// New route to create a blog post
app.post('/blogs', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            return res.status(422).json({ error: "Please fill all blog fields" });
        }
        const blog = new Blog({ title, content, author });
        await blog.save();
        res.status(201).json({ message: "Blog post created successfully", blog });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to create blog post" });
    }
});

// New route to get all blog posts
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch blog posts" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});