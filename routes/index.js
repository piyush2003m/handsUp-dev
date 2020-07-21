const express = require('express');
const router = express.Router();

//login page
router.get('/', (req, res) => {
	res.send('login');
});

module.exports = router;
