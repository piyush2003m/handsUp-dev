const express = require('express');
const passport = require('passport');
const router = express.Router();


// POST /auth/google
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// POST /auth/google/callback
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
	res.json({ user: req.user });
});

// Logout /auth/logout
router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

module.exports = router;
