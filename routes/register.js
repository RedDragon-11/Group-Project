const express = require('express');
const router = express.Router();
const collection = require('../config');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        try {
            await collection.create(data);
            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error registering user.');
        }
    }
});

module.exports = router;
