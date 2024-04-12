// edit.js

const express = require('express');
const router = express.Router();
const { WishlistItems } = require('../config');

// GET route to render the edit page
router.get('/:id', async (req, res) => {
    try {
        const wishlistItem = await WishlistItems.findById(req.params.id);
        if (!wishlistItem) {
            return res.status(404).send('Wishlist item not found');
        }
        // Assuming loggedInUser is set in the session
        const loggedInUser = req.session.user; // Adjust this according to your session management
        res.render('edit', { wishlistItem, loggedInUser });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route to handle updating the bought status of all items

router.post('/:id/update', async (req, res) => {
    try {
        const wishlistItemId = req.params.id;
        const itemBoughtValues = req.body.itemBought || []; // Get array of checkbox values
        const wishlistItem = await WishlistItems.findById(wishlistItemId);

        if (!wishlistItem) {
            return res.status(404).send('Wishlist item not found');
        }

        // Update itemBought array based on checkbox values
        wishlistItem.itemBought = wishlistItem.itemBought.map((_, index) => itemBoughtValues.includes(index.toString()));
        await wishlistItem.save();

        res.redirect(`/edit/${wishlistItemId}`);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
