const express = require('express');
const router = express.Router();
const User = require('../models/Question');
const { ensureAuth } = require('../middleware/auth');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
var ObjectId = require('mongodb').ObjectID;


// POST /question/create
router.post('/create', async (req, res) => {  
    const question = await Question.create({
        topic: req.body.topic,
        subject: req.body.subject,
        text: req.body.text,
        askedBy: ObjectId("5f17acfb2ff9a991dd58f872")
    })
    res.json({question})
})

router.post('/:id/answer/create', async (req, res) => {
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
})
    
// GET /question/:id for specific question
router.get('/:id', async (req, res) => {
    const question = await Question.findById(req.params.id).populate('askedBy')
    res.json(question)
})


module.exports = router;
