const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureAuth } = require('../middleware/auth');

// GET to /
router.get('/', (req, res, next) => {
	res.render('index');
});

module.exports = router;
