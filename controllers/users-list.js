const express = require("express");
const router = express.Router();
const authRequire = require("../middlewares/auth-require");
const adminAccess = require("../middlewares/admin-access");
const superuserAccess = require("../middlewares/superuser-access");
const userModel = require("../models/user");

router.get("/userslist", authRequire, adminAccess, superuserAccess, (req, res) => {
	userModel.find({ _id: { $ne: req.user._id }, role: { $nin: ["admin", "superuser"] } }, (err, users) => {
		res.render("users-list", { users });
	});
});

module.exports = router;
