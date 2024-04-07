//app.js

const express = require("express");
const path = require("path");
const session = require('express-session'); // Import express-session module
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Use express-session middleware
app.use(session({
    secret: 'trashbags',
    resave: false,
    saveUninitialized: false
}));

// Routes
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const searchRouter = require('./routes/search');
const wishlistRouter = require('./routes/wishlist');


app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/search', searchRouter);
app.use('/wishlist', wishlistRouter);


// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
