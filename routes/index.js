const express = require('express');
const router = express.Router();
const User = require('../models/User');

// home page
// unable to create a new user
router.get('/', async (req, res, next) => {
    try {
        const user = await User.create({ displayName: 'Nishil', googleId: 'gibberish', firstName: 'Pi' });
        res.json({ user });
    } catch (err) {
        next(err);
    }
});

// doubts
router.get('/doubts', (req, res) => {
    res.send("you have logged in and ready to see the doubts!");
})



module.exports = router;
