// edit.js

const express = require('express');
const router = express.Router();
const { WishlistItems } = require('../config');

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

module.exports = router;
