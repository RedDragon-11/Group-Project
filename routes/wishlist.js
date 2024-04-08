// server.js



const express = require('express');
const router = express.Router();
const collection = require('../config');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = require('../app'); // Import the app instance

router.get('/', (req, res) => {
    res.render('wishlist', { loggedInUser: req.session.user }); // Assuming you have a search.ejs file in your views directory
});


router.post('/addwishlist', (req, res) => {
    const { wishlistName, itemName, itemURL, itemColor, itemPrice } = req.body;

    // Create new wishlist document
    const wishlist = new Wishlist({
        name: wishlistName,
        items: itemName.map((name, index) => ({
            name,
            url: itemURL[index],
            color: itemColor[index],
            price: itemPrice[index]
        }))
    });

    // Save wishlist to database
    wishlist.save((err, savedWishlist) => {
        if (err) {
            console.error('Error saving wishlist:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Wishlist saved:', savedWishlist);
            res.redirect('/wishlist');
        }
    });
});

// Route to query wishlist by name
router.get('/wishlist/:name', (req, res) => {
    const wishlistName = req.params.name;

    Wishlist.findOne({ name: wishlistName }, (err, wishlist) => {
        if (err) {
            console.error('Error querying wishlist:', err);
            res.status(500).send('Internal Server Error');
        } else if (!wishlist) {
            res.status(404).send('Wishlist not found');
        } else {
            res.json(wishlist);
        }
    });
});




// Export the router
module.exports = router;