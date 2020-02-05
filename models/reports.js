const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
	room: String,
	name: String,
	nationalid: Number,
	phone: Number
});
