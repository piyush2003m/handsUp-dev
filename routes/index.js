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
	} catch(err) {
		console.log(err);
		next(err);
	}
})

router.put("/posts/:id/vote-up", function(req, res) {
	Question.findById(req.params.id).exec(function(err, post) {
		if(err) {
			console.log(err);
		}
		post.downVotes = post.downVotes || []
		const index = post.downVotes.indexOf(req.user.id);
		if (index > -1) {
		  post.downVotes.splice(index, 1);
		  post.voteScore = post.voteScore + 1
		}
		post.upVotes = post.upVotes || []
		const upIndex = post.upVotes.indexOf(req.user.id);
		if (upIndex == -1) {
			post.upVotes.push(req.user._id);
			post.voteScore = post.voteScore + 1;
			post.save();
		}
	  res.status(200);
	});
  });

router.put("/posts/:id/vote-down", function(req, res) {
	Question.findById(req.params.id).exec(function(err, post) {
		if(err) {
			console.log(err);
		}
		post.upVotes = post.upVotes || []
		const index = post.upVotes.indexOf(req.user.id);
		if (index > -1) {
			post.upVotes.splice(index, 1);
		  post.voteScore = post.voteScore - 1;
		}
		post.downVotes = post.downVotes || []
		const downIndex = post.downVotes.indexOf(req.user.id);
		if (downIndex == -1) {
			post.downVotes.push(req.user._id);
			post.voteScore = post.voteScore - 1;
			post.save();
		}
	  res.status(200);
	});
  });

module.exports = router;
