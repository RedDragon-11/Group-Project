// routes/logout.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        // Redirect the user to the home page after logging out
        res.redirect('/');
    });
});

module.exports = router;
