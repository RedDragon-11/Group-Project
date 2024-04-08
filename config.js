//config.js



//Connecting to the database server
const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://natemvm:mongodb9009@mycluster.nmdwt65.mongodb.net/group1database");





// Database connection notification
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})






// Schemas
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


const wishlistSchema = new mongoose.Schema({
    name: String,
    items: [{
        name: String,
        url: String,
        color: String,
        price: Number
    }]
});







// collection part
const collection = new mongoose.model("users", Loginschema);
const wldb = new mongoose.model('Wishlist', wishlistSchema);

module.exports = collection;
module.exports = wldb;
