const express = require('express');
const router = express.Router();
const User = require('../models/Question');
const { ensureAuth } = require('../middleware/auth');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
var ObjectId = require('mongodb').ObjectID;

// POST /id/answer/show all answers to a question
router.get('/', async (req, res, next) => {
	try {
		const foundAnswer = await Answer.find({});
		res.json({ foundAnswer });
	} catch (err) {
		console.log(err);
		next(err);
	}
});


// POST /id/answer/update update answer to a question
router.put('/:id', async (req, res, next) => {
	try {
		const updatedAnswer = await Answer.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					text: req.body.text,
					answeredBy: req.body.answeredBy,
				},
			},
			{ new: true },
		);
		res.json({ updatedAnswer });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// POST /id/answer/create delete answer to a question
router.delete('/:id', async (req, res, next) => {
	try {
		await Answer.findByIdAndDelete({ _id: req.params.id });
		res.redirect('/answer');
	} catch (err) {
		console.log(err);
		next(err);
	}
});

module.exports = router;
