const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");
const router = express.Router();


router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").post(logoutUser);

module.exports = router;

