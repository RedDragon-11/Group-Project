const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

// Serve static files from the 'public' directory
app.use(express.static('public'));

mongoose.connect("mongodb+srv://natemvm:mongodb9009@mycluster.nmdwt65.mongodb.net/group1database")

//Create a schema

const notesSchema = {
    title: String,
    content: String



}



const Note = mongoose.model("Note", notesSchema);



// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/index.html");
// })
app.use(express.static(__dirname));




//app.post

app.listen(3000, function() {
    console.log("server is running on 3000");
})