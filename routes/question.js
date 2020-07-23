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

router.post('/answer'), async(req, res) => {
    // const question = await Question.findById(req.params.id)
    const answer = await Answer.create({
        text: req.body.text,
        answeredBy: ObjectId("5f17acfb2ff9a991dd58f872")
    })
    // const createdAnswer = await question.answers.push(answer._id).populate('askedBy answers')
    res.json({answer});
}

// GET /question/:id for specific question
router.get('/:id', async (req, res) => {
    const question = await Question.findById(req.params.id).populate('askedBy')
    res.json(question)
})


module.exports = router;
