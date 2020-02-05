const express = require("express");
const router = express.Router();
const authRequire = require("../middlewares/auth-require");
const adminAccess = require("../middlewares/admin-access");
const userModel = require("../models/user");

router.delete("/deleteuser", authRequire, adminAccess, (req, res) => {
	userModel.findOne({ username: req.body.username }, (err, user) => {
		if (!user) return res.send(true);

		userModel.deleteOne({ username: req.body.username }, err => {
			if (err) return res.send(false);
			res.send(true);
		});
	});
});

router.delete("/deleteusers", authRequire, adminAccess, (req, res) => {
	userModel.deleteMany({ username: { $in: JSON.parse(req.body.username) } }, err => {
		if (err) return res.send(false);

		res.send(true);
	});
});

module.exports = router;
