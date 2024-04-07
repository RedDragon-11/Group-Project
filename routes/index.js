//index.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Pass the user information to the template
    res.render('index', { loggedInUser: req.session.user });
});

module.exports = router;












// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//     res.render('index');
// });

// module.exports = router;
