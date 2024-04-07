const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
