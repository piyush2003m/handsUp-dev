const express = require("express");
const passport = require('passport');
const { Router } = require("express");
const router = express.Router();

// Auth with google
// GET /auth/google
router.get('/google', passport.authenticate('google', {scope : ['profile']}))

// After user accepts
// GET /auth/google
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/doubts')
})

module.exports = router;