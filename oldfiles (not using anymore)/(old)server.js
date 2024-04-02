const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const connect = mongoose.connect("mongodb+srv://natemvm:mongodb9009@mycluster.nmdwt65.mongodb.net/group1database")

//check if database connected
connect.then(() => {
    console.log("Database connected successfully");
})
.catch(() => {
    console.log("Connection failed to database");
})



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));




//app.post

app.listen(3000, function() {
    console.log("server is running on 3000");
})


















// Serve static files from the 'public' directory
// app.use(express.static('public'));