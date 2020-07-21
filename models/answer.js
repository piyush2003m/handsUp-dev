const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
	votes: {
        type: Number
    },
    text: {
        type: String
    },
	createdAt: {
		type: Date,
		default: Date.now,
    },
    answeredBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
});

module.exports = mongoose.model('Answer', answerSchema);
