const express = require('express');
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

router.post('/register', (req, res) => {
    const { name, email, phone, work, password, cPassword } = req.body;

    if(!name || !email || !phone || !work || !password || !cPassword) {
        res.status(400).json({error: 'Please enter all fields'})
    }

    User.findOne({ email: email })
        .then((userExist) => {
            if(userExist) {
                return res.status(422).json({error: 'user already exist'});
            }

            const user = new User({ name, email, phone, work, password, cPassword });
            user.save()
                .then(() => {
                    res.status(201).json({ message: 'user registered successfully' })
                }).catch((error) => {
                    console.log(error)
                    res.status(500).json({ error })
                })
        })
})

module.exports = router