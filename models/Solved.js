const mongoose = require('mongoose');

const solvedSchema = new mongoose.Schema({
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
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
	askedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	answers: 
        {type : mongoose.Schema.ObjectId, 
        ref : 'Answer'
    },
    images: [
        {type: String} 
    ],
    createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Solved', solvedSchema);
