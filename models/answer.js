const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
	votes: {
        type: Number,
        default: 0
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
  images: [
    {type: String} 
  ]
});

module.exports = mongoose.model('Answer', answerSchema);
