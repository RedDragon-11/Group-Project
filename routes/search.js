const express = require('express');
const { WishlistItems } = require('../config');
const router = express.Router();


// This route handles the GET request for displaying the search page
router.get('/', (req, res) => {
    res.render('search', { loggedInUser: req.session.user, searchResults: req.session.results }); // Assuming you have a search.ejs file in your views directory
});



// This route handles the POST request for processing the search query
 router.post('/', async (req, res) => {
    const searchQuery = req.body.search;
    if (searchQuery == null){
        req.session.results = null
    }
    else {
    try {
    const results = await WishlistItems.find({createdBy: searchQuery })
    if (!results) {
        return('Error querying wishlist items:');
        return res.status(404).send('No results found');
    }
    else {
        req.session.results = results
    }
    
    res.render('search', { loggedInUser: req.session.user, searchResults: req.session.results });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Internal Server Error');
    }
    }
    }); 



module.exports = router;
