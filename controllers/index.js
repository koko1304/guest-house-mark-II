const express = require("express");
const router = express.Router();

router.use(require("./login"));
router.use(require("./logout"));
router.use(require("./create-user"));
router.use(require("./home-page"));
router.use(require("./check-login"));
router.use(require("./dashboard"));
router.use(require("./edit-profile"));
router.use(require("./change-password"));
router.use(require("./users-list"));
router.use(require("./delete-user"));
router.use(require("./edit-user"));
router.use(require("./check-in"));

module.exports = router;
