const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// home page
router.get('/', (req, res) => {
    Student.create({displayName: "Piyush"}, (err, student) => {
        res.send(student);
        console.log(student);
    })
})

// doubts
router.get('/doubts', (req, res) => {
    res.send("you have logged in and ready to see the doubts!");
})



module.exports = router;
