const express = require("express");
const { registerUser, loginUser, logoutUser,  forgotPassword, resetPassword, getUserDetails, getAllUsers, changePassword, updateUserProfile } = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();


router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").post(logoutUser);
router.route("/Password/forgot").post(forgotPassword);
router.route("/Password/reset/:token").put(resetPassword);
router.route("/getAllUsers").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUsers);
router.route("/myProfile").get(isAuthenticatedUser, getUserDetails);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/myProfile/update").put(isAuthenticatedUser, updateUserProfile);


module.exports = router;

 