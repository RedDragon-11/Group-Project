const express = require('express');
const router = express.Router();
const collection = require('../config');
const bcrypt = require('bcrypt');

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

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
