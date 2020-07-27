const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
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
  ],
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

module.exports = mongoose.model('Answer', answerSchema);
