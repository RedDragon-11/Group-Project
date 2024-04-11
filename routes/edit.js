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
        res.render('edit', { wishlistItem });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route to handle updating the bought status of all items
router.post('/:id/update', async (req, res) => {
    try {
        const wishlistItemId = req.params.id;
        const itemBoughtValues = Object.values(req.body.itemBought || {}); // Get array of checkbox values
        const wishlistItem = await WishlistItems.findById(wishlistItemId);

        if (!wishlistItem) {
            return res.status(404).send('Wishlist item not found');
        }

        // Map checkbox values to boolean values for itemBought array
        wishlistItem.itemBought = wishlistItem.itemBought.map((_, index) => itemBoughtValues.includes(index.toString()));
        await wishlistItem.save();

        res.redirect(`/edit/${wishlistItemId}`);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
