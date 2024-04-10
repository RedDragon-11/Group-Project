// wishlist.js

const express = require('express');
const router = express.Router();
const { WishlistItems, collection } = require('../config');



router.get('/', (req, res) => {
    res.render('wishlist', { loggedInUser: req.session.user }); // Assuming you have a search.ejs file in your views directory
});





// Route to add a new wishlist item
router.post('/addwishlist', async (req, res) => {
    try {
        // Extract wishlist item data from request body
        const { wishlistName, itemName, itemURL, itemColor, itemPrice } = req.body;

        // Create a new wishlist item document
        const newItem = new WishlistItems({
            wishlistName,
            itemName,
            itemURL,
            itemColor,
            itemPrice
        });

        // Save the new wishlist item to the database
        await newItem.save();

        // Send a success response
        res.status(201).send("Wishlist item added successfully");
    } catch (error) {
        // If an error occurs, send an error response
        console.error("Error adding wishlist item:", error);
        res.status(500).send("Error adding wishlist item");
    }
});

module.exports = router;
