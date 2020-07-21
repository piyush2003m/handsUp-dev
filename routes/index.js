const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET to /
router.get('/', (req, res, next) => {
	res.status(200).json({ data: 'success' });
});

const sampleObj = {
	googleId: '141311414',
	displayName: 'Alex M.',
	firstName: 'Alex',
	role: 'student',
	email: 'demo@gmail.com',
	image: 'https://image.com',
};

// POST: '/demo' - > create route will add a sample object without login ( test )
router.get('/demo', async (req, res, next) => {
	try {
		const user = await User.create({ ...sampleObj });

		res.json({ user });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

module.exports = router;
