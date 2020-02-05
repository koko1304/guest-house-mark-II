const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	nickname: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
