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
const Loginschema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


//added
// const wishlistSchema = new mongoose.Schema({
//     name: String,
//     items: [{
//         name: String,
//         url: String,
//         color: String,
//         price: Number
//     }]
// });
// const Wishlist = mongoose.model('Wishlist', wishlistSchema);

// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;