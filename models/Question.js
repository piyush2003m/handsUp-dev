const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	subject: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
	correctAnswer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	askedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
    },
	answers: [
        {type : mongoose.Schema.ObjectId, 
        ref : 'Answer'} 
    ],
    images: [
        {type: String} 
    ],
    tags: [
        {type: String} 
    ],
    createdAt: {
		type: Date,
		default: Date.now,
    },
    upVotes : [ 
        { type: mongoose.Schema.Types.ObjectId, 
        ref: "User"}
    ],
    downVotes : [
        { type: mongoose.Schema.Types.ObjectId, 
        ref: "User"}
    ],
    voteScore : {type: Number,
    default: 0}
});

module.exports = mongoose.model('Question', questionSchema);
