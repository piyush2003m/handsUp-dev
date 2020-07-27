const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Question = require('../models/Question');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Answer = require('../models/Answer');

// GET to /
router.get('/', (req, res, next) => {
	res.render('index');
});

// profile page of user
router.get('/profile', ensureAuth, async(req, res, next) => {
	try {
		const myQuestionsUnanswered = await Question.find({ $and: [ {askedBy: req.user.id}, {"correctAnswer" : null} ]})
		const myQuestionsAnswered = await Question.find({ $and: [ {askedBy: req.user.id}, {"correctAnswer" : { $ne: null }} ]})
		const myAnswers = await Answer.find({answeredBy: req.user.id})
		const upVotedQuestions = await Question.find({upVotes: req.user.id})
		const upVotesAnswers = await Question.find({upVotes: req.user.id})
		const user = await User.findById(req.user.id)
		res.render('profile', {
			myQuestionsUnanswered: myQuestionsUnanswered, 
			myQuestionsAnswered: myQuestionsAnswered,
			myAnswers: myAnswers,
			upVotedQuestions: upVotedQuestions,
			upVotesAnswers: upVotesAnswers,
			user: user 
		})
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

  router.put("/answer/:id/vote-up", function(req, res) {
	Answer.findById(req.params.id).exec(function(err, post) {
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

  router.put("/answer/:id/vote-down", function(req, res) {
	Answer.findById(req.params.id).exec(function(err, post) {
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
