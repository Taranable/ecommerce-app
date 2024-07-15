const express = require("express");
const { registerUser, loginUser, logoutUser,  forgotPassword, resetPassword } = require("../controllers/userController");
const router = express.Router();


router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").post(logoutUser);
router.route("/Password/forgot").post(forgotPassword);
router.route("/Password/reset/:token").put(resetPassword);


module.exports = router;

