//config.js

const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://natemvm:mongodb9009@mycluster.nmdwt65.mongodb.net/group1database");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const wishlistItemSchema = new mongoose.Schema({
    wishlistName: {
        type: String,
        required: true,
    },
    itemName: {
        type: Array,
        required: true
    },
    itemURL: {
        type: Array,
        required: true
    },
    itemColor: {
        type: Array,
        required: true
    },
    itemPrice: {
        type: Array,
        required: true
    }
});






// Define WishlistItem model
const WishlistItems = mongoose.model("WishlistItems", wishlistItemSchema);

// Define Collection model
const collection = mongoose.model("users", loginSchema);

// Export both models
module.exports = { WishlistItems, collection };

