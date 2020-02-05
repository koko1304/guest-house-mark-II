const express = require("express");
const router = express.Router();
const authRequire = require("../middlewares/auth-require");

router.get("/dashboard", authRequire, (req, res) => {
	req.flash("username-field", "");
	req.flash("nickname-field", "");

	const roomslist = [6, "Second Floor", 11, "Third Floor", 11, "Fourth Floor", 11];
	const busyrooms = [{ room: 0 }];

	res.render("dashboard", { user: req.user, roomslist, busyrooms });
});

module.exports = router;
