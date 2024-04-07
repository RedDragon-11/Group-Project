//login.js

const express = require('express');
const router = express.Router();
const collection = require('../config');
const bcrypt = require('bcrypt');
const session = require('express-session');

// Initialize express session middleware
router.use(session({
    secret: 'trashbags',
    resave: false,
    saveUninitialized: false
}));

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.username });
        if (!user) {
            return res.send('User not found');
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.send('Incorrect password');
        }

        // Set user session
        req.session.user = user;

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
