const express = require('express');
const passport = require('passport');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();

// View Route
router.get('/signin', (req, res, next) => {
	res.render('signin');
});

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/signin' }),
	(req, res) => {
		res.redirect('/question');
	},
);

// Logout /auth/logout
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
