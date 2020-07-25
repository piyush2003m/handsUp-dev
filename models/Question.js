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
    votes: {
        type: Number,
        default: 0,
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
    createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Question', questionSchema);
