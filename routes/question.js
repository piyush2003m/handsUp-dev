const express = require("express");
const router = express.Router();
const User = require("../models/Question");
const { ensureAuth } = require("../middleware/auth");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
var ObjectId = require("mongodb").ObjectID;

// To get a template to show the client all the top questions.
router.get("/", (req, res) => {
  res.render("question.ejs");
});

// GET /question display all questions
router.get("/", async (req, res) => {
  try {
    const foundQuestion = await Question.find({});
    res.json({ foundQuestion });
  } catch (err) {
    console.log(err);
    next(err);
  }
});


router.get("/create", (req, res) => {
  res.render("newQuestion");
});

// POST /question/create
router.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    const question = await Question.create({
      topic: req.body.topic,
      subject: req.body.subject,
      text: req.body.text,
      askedBy: ObjectId("5f17acfb2ff9a991dd58f872"),
    });
    res.json({ question });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// POST /question/id/answer/create add answer to a question
router.post("/:id/answer/create", async (req, res) => {
  try {
    var answer = await Answer.create({
      text: req.body.text,
      answeredBy: ObjectId("5f17acfb2ff9a991dd58f872"),
    });
    Question.findById(req.params.id, (err, question) => {
      question.answers.push(answer._id);
      question.save(async (err, answeredQuestion) => {
        const populatedQuestion = await answeredQuestion.populate("answers");
        res.json({ populatedQuestion });
      });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/:id', async (req,res)=> {
  var question = await Question.findById(req.params.id, async(err, question) => {
    const populatedQuestion = await question.populate("answers")
    res.render('specificQuestion', {question: populatedQuestion})
  }) 
})

// POST /question/:id/update for specific question
router.put("/:id", async (req, res) => {
  try {
    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          topic: req.body.topic,
          text: req.body.text,
        },
      },
      { new: true }
    );
    res.json({ updatedQuestion });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// POST /question/:id/delete delete specific question
router.delete("/:id", async (req, res) => {
  try {
    await Question.findById(
      req.params.id,
      (err, question) => {
        console.log("this is question " + question);
        question.answers.forEach((answer) => {
          Answer.findByIdAndDelete({ _id: answer });
        });
      },
      async () => {
        await Question.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/question");
      }
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// GET /question/:id for specific question
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      "askedBy answers"
    );
    res.json(question);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
