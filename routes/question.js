const express = require('express');
const router = express.Router();
const User = require('../models/Question');
const { ensureAuth } = require('../middleware/auth');
const Question = require('../models/Question');

// POST /question/create
router.post('/create', ensureAuth(), async (req, res) => {
    const newQuestion = {
        topic: "Trigonometry functions",
        subject: "Math AA HL",
        text: "How to integrate sec(x)",
        askedBy: req.user.id
    }
    const question = await Question.create({newQuestion})
    res.json({question})
})

module.exports = router;

