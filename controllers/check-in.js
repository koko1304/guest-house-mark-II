const express = require("express");
const router = express.Router();
const authRequire = require("../middlewares/auth-require");

router.get("/checkin", authRequire, (req, res) => {
	res.render("check-in", { user: req.user, roomNumber: req.query.room });
});

module.exports = router;
