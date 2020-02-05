const express = require("express");
const session = require("express-session");
const passport = require("passport");
const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

router.use(express.static(__dirname + "/../assets"));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser("iloveyou"));
router.use(session({ secret: "iloveyou", resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

module.exports = router;
