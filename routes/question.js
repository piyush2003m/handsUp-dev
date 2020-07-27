const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
var ObjectId = require('mongodb').ObjectID;
const sanitizeHtml = require('sanitize-html');

// GET /question display all questions
router.get('/', async (req, res, next) => {
	try {
		if (req.query.search) {
			const regex = new RegExp(escapeRegex(req.query.search), 'gi');
			const foundQuestion = await Question.find({ $or: [ {text: regex}, {topic: regex}  ] });
			var noMatch;
			if (foundQuestion.length < 1) {
				noMatch = "Sorry no matching questions were found"
			}
			res.render('ques', { question: foundQuestion, noMatch: noMatch, currentUser: req.user });
		}
		else {
			const foundQuestion = await Question.find({"correctAnswer" : null})
			// .populate({
			// 	path : 'askedBy',
			// });
			res.render('ques', { question: foundQuestion, currentUser: req.user });
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// Create question view route
router.get('/create', ensureAuth, (req, res, next) => {
	res.render('newQuestion', {currentUser: req.user});
});

// POST /question/
router.post('/', ensureAuth, async (req, res, next) => {
	try {
		const MCEtext = sanitizeHtml(req.body.text, {
			allowedTags: [],
			allowedAttributes: {}
		});
		const tags = await req.body.tags.split(',');
		const question = await Question.create({
			topic: req.body.topic,
			subject: req.body.subject,
			text: MCEtext,
			askedBy: req.user.id,
			tags: tags
		});
		await User.findOneAndUpdate(
			{ _id: req.user.id },
			{ $inc: { points: 10 } },
			{ new: true },
		);
		res.redirect('/question');
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// GET /question/id/answer
router.get('/:id/answer', ensureAuth, async (req, res, next) => {
	try {
		var question = await Question.findById(req.params.id);
		res.render('newAnswer', { question: question, currentUser: req.user });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// POST /question/id/answer add answer to a question
router.post('/:id/answer/', ensureAuth, async (req, res, next) => {
	try {
		const MCEtext = sanitizeHtml(req.body.text, {
			allowedTags: [],
			allowedAttributes: {}
		});
		var answer = await Answer.create({
			text: MCEtext,
			answeredBy: req.user.id,
		});
		Question.findById(req.params.id, (err, question) => {
			User.findOneAndUpdate(
				{ _id: req.user.id },
				{ $inc: { points: 20 } },
				{ new: true },
				async() => {
					question.answers = question.answers || [];
					question.answers.push(answer._id);
					question.save(async (err, answeredQuestion) => {
						res.redirect('/question/' + question._id )
					});
				});
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// mark answer as correct
router.post('/:questionid/:answerid/correct', ensureAuth, async(req, res) => {
	try {
		const question = await Question.findById(req.params.questionid)
		const answer = await Answer.findById(req.params.answerid)
		if (question.askedBy = req.user.id) {
			await User.findOneAndUpdate(
				{ _id: answer.answeredBy },
				{ $inc: { points: 50 } },
				{ new: true },
			);
			question.correctAnswer = answer._id;
			question.save();
			res.redirect('/question')
		}
		else {
			res.redirect('/question')
		}
	} catch(err) {
		console.log(err);
		next(err);	
	}
})

// GET /question/:id for specific question
router.get('/:id', ensureAuth, async (req, res) => {
	try {
		const question = await Question.findById(req.params.id).populate({
            path : 'answers',
            populate : {
                path : 'answeredBy'
            }
        })
		res.render('specificQuestion', { question: question, currentUser: req.user });
		console.log(question)
	} catch (err) {
		console.log(err);
		next(err);
	}
});


// POST /question/:id/update for specific question
router.put('/:id', ensureAuth, async (req, res, next) => {
	try {
		const updatedQuestion = await Question.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					topic: req.body.topic,
					text: req.body.text,
				},
			},
			{ new: true },
		);
		res.json({ updatedQuestion });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// POST /question/:id/delete delete specific question
router.delete('/:id', ensureAuth, async (req, res) => {
	try {
		await Question.findById(
			req.params.id,
			(err, question) => {
				console.log('this is question ' + question);
				question.answers.forEach((answer) => {
					Answer.findByIdAndDelete({ _id: answer });
				});
			},
			async () => {
				await Question.findByIdAndDelete({ _id: req.params.id });
				res.redirect('/question');
			},
		);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// GET /question/:id for specific question
router.get('/:id', ensureAuth, async (req, res) => {
	try {
		const question = await Question.findById(req.params.id).populate({
			path: 'answers',
			populate: {
				path: 'answeredBy',
			},
		});
		res.render('question', { question, currentUser: req.user });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports = router;
