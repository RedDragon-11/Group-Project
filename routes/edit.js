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

// POST route to handle form submission and update wishlist item
router.post('/:id/update', async (req, res) => {
    try {
        const wishlistItemId = req.params.id;
        const updatedItemBought = req.body.itemBought === 'on'; // assuming it's a checkbox
        const updatedWishlistItem = await WishlistItems.findByIdAndUpdate(
            wishlistItemId,
            { $set: { itemBought: updatedItemBought } },
            { new: true }
        );
        res.redirect('/'); // Redirect to the home page or any other page after successful update
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
