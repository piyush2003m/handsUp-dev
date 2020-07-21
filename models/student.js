const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    googleId: {
		type: String,
		required: true
	},
	displayName: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	image: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Student', studentSchema);