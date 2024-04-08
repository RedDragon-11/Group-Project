const express = require('express');
const router = express.Router();

// This route handles the GET request for displaying the search page
router.get('/', (req, res) => {
    res.render('search', { loggedInUser: req.session.user }); // Assuming you have a search.ejs file in your views directory
});



// This route handles the POST request for processing the search query
router.post('/results', (req, res) => {
    // Here you would handle the search query sent from the form
    const searchQuery = req.body.search; // Assuming your form sends the search query with the name "search"

    // Process the search query, perform database search, etc.

    // Render the search results page with the results (assuming you have a search_results.ejs file)


    
    // res.render('search_results', { results: /* Pass your search results here */ });


    //This is where i left off^^



});

module.exports = router;
