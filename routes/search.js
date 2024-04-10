const express = require('express');
const { WishlistItems } = require('../config');
const router = express.Router();


// This route handles the GET request for displaying the search page
router.get('/', (req, res) => {
    res.render('search', { loggedInUser: req.session.user }); // Assuming you have a search.ejs file in your views directory
});



// This route handles the POST request for processing the search query
router.get('/results', (req, res) => {
    const searchQuery = req.body.search;

    WishlistItems.find({ createdBy: searchQuery })
    .then(items => {
        res.render('search', { loggedinUser: req.session.user, searchResults: items });
    })
    .catch(error => {
        console.error('Error querying wishlist items:', error);
        res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
