// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/wishlist', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});

// Define Mongoose schema
const wishlistSchema = new mongoose.Schema({
    name: String,
    items: [{
        name: String,
        url: String,
        color: String,
        price: Number
    }]
});
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Route to handle form submission
app.post('/addwishlist', (req, res) => {
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
app.get('/wishlist/:name', (req, res) => {
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});