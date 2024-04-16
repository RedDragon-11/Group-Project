// wishlist.js

const express = require('express');
const router = express.Router();
const { WishlistItems, collection } = require('../config');

router.get('/', (req, res) => {
    res.render('wishlist', { loggedInUser: req.session.user }); 
});

// Route to add a new wishlist item
router.post('/addwishlist', async (req, res) => {
    try {
        // Extract wishlist item data from request body
        const { wishlistName, itemName, itemURL, itemColor, itemPrice, itemBought } = req.body;

        // Get the email of the logged-in user
        const userEmail = req.session.user.email;

        // Ensure itemBought is an array
        const itemBoughtArray = Array.isArray(itemBought) ? itemBought : [itemBought];
        
        // Convert itemBought values from string to boolean
        const itemBoughtBool = itemBoughtArray.map(value => value === 'true');

        // Create a new wishlist item document
        const newItem = new WishlistItems({
            wishlistName,
            itemName,
            itemURL,
            itemColor,
            itemPrice,
            itemBought: itemBoughtBool,
            createdBy: userEmail // Associate the wishlist with the email of the user who created it
        });

        // Save the new wishlist item to the database
        await newItem.save();

        // Send a success response
        res.redirect('/search');
    } catch (error) {
        // If an error occurs, send an error response
        console.error("Error adding wishlist item:", error);
        res.status(500).send("Error adding wishlist item");
    }
});


module.exports = router;
