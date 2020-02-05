const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

require("./utils/passport");

app.set("view engine", "ejs");

app.use(require("./middlewares"));
app.use(require("./controllers"));

mongoose.connect("mongodb://localhost:27017/pa-guest-house", { useNewUrlParser: true, useFindAndModify: false }, err => {
	if (err) return console.log(err);
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
});
