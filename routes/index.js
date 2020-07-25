const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Question = require('../models/Question');
const { ensureAuth } = require('../middleware/auth');
const Answer = require('../models/Answer');

// GET to /
router.get('/', (req, res, next) => {
	res.render('index');
});

const sampleObj = {
	googleId: '141311414',
	displayName: 'Alex M.',
	firstName: 'Alex',
	role: 'student',
	email: 'demo@gmail.com',
	image: 'https://image.com',
};

const demoQ = {
	subject: 'Maths',
	topic: 'Calculus',
	text: 'Big Question!',
	votes: 4,
	correctAnswer: null,
	answers: null,
	images: 'blankImg',
};

// POST: '/demo' - > create route will add a sample object without login ( test )
router.get('/demo', async (req, res, next) => {
	try {
		const user = await User.create(sampleObj);
		const question = await Question.create({ ...demoQ, askedBy: user.id });
		res.json({ user, question });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

router.get('/profile', async(req, res, next) => {
	try {
		const myQuestions = await Question.find({askedBy: req.user.id})
		const myAnswers = await Answer.find({answeredBy: req.user.id})
		console.log(myQuestions)
		console.log(myAnswers)
	} catch(err) {
		console.log(err);
		next(err);
	}
})

router.get('/profle', async(req, res, next) => {
	try {

	} catch(err) {
		console.log(err);
		next(err);
	}
})

module.exports = router;
