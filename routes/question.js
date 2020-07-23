const express = require('express');
const router = express.Router();
const User = require('../models/Question');
const { ensureAuth } = require('../middleware/auth');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
var ObjectId = require('mongodb').ObjectID;

// GET /question display all questions
router.get('/', async (req, res) => {
    try {
        const foundQuestion = await Question.find({})
        res.json({foundQuestion})
    } catch(err) {
        console.log(err);
		next(err); 
    }
})

// POST /question/create
router.post('/create', async (req, res) => {
    try {  
    const question = await Question.create({
        topic: req.body.topic,
        subject: req.body.subject,
        text: req.body.text,
        askedBy: ObjectId("5f17acfb2ff9a991dd58f872")
    })
    res.json({question})
    } catch (err) {
        console.log(err);
		next(err);
    }
})

// POST /question/id/answer/create add answer to a question
router.post('/:id/answer/create', async (req, res) => {
    try {
    var answer = await Answer.create({
        text: req.body.text,
        answeredBy: ObjectId("5f17acfb2ff9a991dd58f872")
    })  
    Question.findById(req.params.id, (err, question) => {
        question.answers.push(answer._id);
        question.save(async (err, answeredQuestion) => {
            const populatedQuestion = await answeredQuestion.populate('answers')
            res.json({populatedQuestion})
        })
    })
    } catch(err) {
        console.log(err)
        next(err)
    }
})
    
// GET /question/:id for specific question
router.get('/:id', async (req, res) => {
    try {
    const question = await Question.findById(req.params.id).populate('askedBy')
    res.json(question)
    } catch(err) {
        console.log(err)
        next(err)
    }
})


module.exports = router;
