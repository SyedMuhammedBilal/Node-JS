const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const User = require('../models/userSchema');

// Middleware
const Middleware = (req, res, next) => {
    console.log('middleware running')
    next();
}

router.get('/', (req, res) => {
    res.send('home page')
});

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cPassword } = req.body;

    if(!name || !email || !phone || !work || !password || !cPassword) {
        res.status(422).json({error: 'Please enter all fields'})
    }

    try {
        const response = await User.findOne({ email: email });
        
        if(response) {
            return res.status(422).json({ error: 'user already exist' })
        } else if(password !== cPassword) {
            res.status(422).json({error: "password not matched"})
        } else {
            const user = new User({ name, email, phone, work, password, cPassword });
            await user.save();
            res.status(201).json({ message: 'user registered successfully' });
        }
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error })
    }
})

router.post('/signin', async (req, res) => {
    // console.log(req.body)
    // res.json({ message: "wow" })

    try {
        const  { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ error: "please fill all data!" })
        }

        const userLogin = await User.findOne({email: email});

        if(userLogin) {
            const isMatched = await bcrypt.compare(password, userLogin.password);
    
            if(!isMatched ) {
                res.status(400).json({error: "invalid credentials"})
            } else {
                res.status(200).json({error: "user Logged-in successfully"})
            }
        } else {
            res.status(400).json({error: "invalid credentials"})
        }


    } catch(error) {
        res.status(500).json({error})
    }
});

module.exports = router