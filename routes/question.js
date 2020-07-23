const express = require('express');
const router = express.Router();
const User = require('../models/Question');
const { ensureAuth } = require('../middleware/auth');
const Question = require('../models/Question');
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

// GET /question/:id for specific question
router.get('/:id', async (req, res) => {
    const question = await Question.findById(req.params.id).populate('askedBy')
    res.json(question)
})

module.exports = router;
